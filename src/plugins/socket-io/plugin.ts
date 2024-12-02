/* eslint-disable no-async-promise-executor */
import { Payload } from "payload"
import { CollectionAfterOperationHook } from "payload/types"
import type { Plugin } from "payload/config"
import type { Server, Socket } from "socket.io"
  
import type { OptionsPluginSocketIO, CustomSession, CustomSocket, CustomSocketRequest, CustomPayloadRequest } from "./types"

interface extendedPayload extends Payload {
  io: Server
}

export const PluginSocketIO = (pluginOptions: OptionsPluginSocketIO): Plugin => (incomingConfig) => {
    const config = { ...incomingConfig }
    let io = undefined as undefined | Server
    const dev = !!pluginOptions.dev

  
    // If the plugin is disabled, return the config without modifying it
    if (pluginOptions.enabled === false) {
        return config
    }
  
    if (config.collections && config.collections.length > 1) {
        config.collections.map(collection => {
            if (collection?.custom?.socketAccess) {
                const socketAccess = collection.custom.socketAccess
        
                for (const socketAccessType in socketAccess) {
          
                    if (dev) {
                        console.info("Create new socket hook for:", `${collection.slug}.${socketAccessType}`)
                    }
                    if (socketAccess[socketAccessType] === false) {
                        break
                    }
          
                    if (typeof socketAccess[socketAccessType] !== "function") {
                        break
                    }
          
                    const newHook : CollectionAfterOperationHook = ({
                        args, // arguments passed into the operation
                        operation, // name of the operation
                        req, // full express request
                        result, // the result of the operation, before modifications
                    }) => new Promise(async (resolve, reject) => {
                        /**
                            * data = {
                            *  public?: {}
                            *  self?: {}
                            *  <room>: {}
                            * }
                            */
                        const request = req as CustomPayloadRequest
                        let data = {} as {
                              public?: any
                              self?: any
                              [key: string]: any
                            }
                            
                        // Process socketaccess method
                        if (typeof socketAccess[operation] === "function") { 
                            data = await socketAccess[operation](args, req, result)
                        }
            
                        if (typeof socketAccess[operation] === "object") { 
                            for (const accessType in socketAccess[operation]) {
                                if (socketAccess[operation][accessType]) {
                                    data[accessType] = result
                                }
                            }
                        }

            
                        // Escape hook, since the data property indicates that it is not allowed to emit messages
                        if (!data) {
                            return resolve(result)
                        }

            
                        // Escape hook, since it can't emit any messages
                        if (!io) {
                            resolve(result)
                            throw new Error("Internal error: Missing io object")
                        }

                        // console.log("request.session",request.session)
                        // // Escape the hook, only process events when there is a session object available
                        // if (!request.session) {
                        //     // reject(new Error("Internal error: Missing session object"))
                        //     throw new Error("Internal error: Missing session object")
                        // }
                        const session = request.session as CustomSession
                        let socketID, socket
                        if (session) {
                            socketID = session.socketID
                            socket = io.sockets.sockets.get(socketID)
                        }
                        // if (!socketID) {
                        //     // This occurs when no clients are connected
                        //     // So if there are no clients connected, no need to emit socket events 🤷‍♂️
                        //     return resolve(result)
                        //     throw new Error("Internal error: Missing socket id")
                        // }
            
            
                        // Method processed, now emit socket(s)
                        // `Public` emit
                        if (io && data["public"]) {

                            if (dev) {
                                console.log("⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴")
                                console.log(`io.emit("public.${collection.slug}.${operation}", ${JSON.stringify(data["public"], null, 2)}`)
                                console.log("⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵")
                            }
                            io.emit(`public.${collection.slug}.${operation}`, data["public"])
                        }
            
                        // `Self` emit
                        if (io && data["self"]) {
                            if (!socket) {
                                return reject(new Error(`Can't emit to self; missing socket for id ${socketID}`))
                            }

                            if (dev) {
                                console.log("⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴")
                                console.log(`socket.emit("self.${collection.slug}.${operation}", ${JSON.stringify(data["self"], null, 2)}`)
                                console.log("⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵")
                            }
                            socket.emit(`self.${collection.slug}.${operation}`, data["self"])
                        }
                        
                        // `<room>` emit
                        if (io && (!data.id)) {
                            for (const room in data) {
                                if (room == "public" || room == "self") {
                                    continue
                                }

                                if (dev) {
                                    console.log("⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴⎴")
                                    console.log(`io.to("${room}").emit("${room}.${collection.slug}.${operation}", ${JSON.stringify(data[room], null, 2)}`)
                                    console.log("⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵⎵")
                                }

                                io.to(room).emit(`${room}.${collection.slug}.${operation}`,data[room])
                            }
                        }
            
                        // Disallow socketAccess to intervine with data flow
                        return resolve(result)
                    })
          
                    // Add hook to collection hook
                    if (!collection.hooks){
                        collection.hooks = {}
                    }
          
                    if (!collection.hooks.afterOperation){
                        collection.hooks.afterOperation = []
                    }
          
                    collection.hooks.afterOperation.push(newHook)
                }
            }
        })
    }
  
    config.onInit = async (p) => {
        const payload = p as extendedPayload
        io = payload.io
            
        if (!io) {
            throw new Error("Missing io object on payload instance")
        }
    

        if (!payload.express) {
            throw new Error("Missing express object on payload instance")
        }
    
        // Add socket on connect methods
        const defaultOnConnectMethod = (socket: CustomSocket) => {
            const request = socket.request as CustomSocketRequest
            // Add socketID to session on connection
            if (request.session) {
                request.session.socketID = socket.id
                request.session.save()
        
                // Add sessionID to socket
                socket.sessionID = request.sessionID
            }
        }
    
        const onConnectMethods = [defaultOnConnectMethod] as Array<(socket: Socket | CustomSocket, io?: Server ) => void>
        if (pluginOptions.onConnect && typeof pluginOptions.onConnect != "undefined" && typeof pluginOptions.onConnect != "function") {
            if (typeof pluginOptions.onConnect === "function") {
                onConnectMethods.push(pluginOptions.onConnect)
            } else {
                pluginOptions.onConnect.forEach(onConnect => {
                    if (onConnectMethods) {
                        onConnectMethods.push(onConnect)
                    }
                })
            }
      
            io.on("connect", (socket) => {
                if (onConnectMethods) {
                    onConnectMethods.forEach(onConnect => onConnect(socket, io))
                }
            })
        }
    }
  
    return config
}
