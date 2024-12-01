import { Socket, Server } from "socket.io"

const quiz = (socket: Socket, io:Server) => {

    socket.on("joinQuizSession", string => {
        socket.join(`quiz-${string}`)

        // Add listener for sending path changes
        socket.on("changePath", (data) => {
            io.to(`quiz-${string}`).emit("changePath", data)
        })
    })
    socket.on("leaveQuizSession", string => {
        socket.leave(`quiz-${string}`)
    })
}

export default quiz
