import payload from "payload"
import { CollectionConfig } from "payload/types"
import { SocketAccess } from "./../../plugins/socket-io"
import authenticateUser from "./../../hooks/access/create/authenticate-user"


const Messages: CollectionConfig = {
    slug: "messages",
    access: {
        create: authenticateUser(true)
    },
    custom: {
        socketAccess: {
            create: async (args, req, result) => {
                // Return false to disallow emit
                // Return {public: boolean | Object<result>}
                // Return {authenticated: boolean | Object<result>}
                // Return {<room>: boolean | Object<result>}
                // Return {self: boolean | Object<result>}
                // Return undefined will emit to public by default
                if (typeof result.user === "string") {
                    const qry = await payload.find({
                        collection: "site-users",
                        where: {
                            id: {
                                equals: result.user,
                            },
                        },
                    })
                    if (qry?.docs.length === 1) {
                        result.user = qry.docs[0]
                    }
                }

                const data = {
                    id: result.id,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                    text: result.text,
                    user: {
                        id: result.user.id,
                        username: result.user.username
                    }
                }
                return {
                    public: data,
                    self: result
                }
            }
        }  as SocketAccess
    },
    hooks: {},
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "site-users",
            label: "User",
            required: true
        },
        {
            name:"text",
            type: "text",
            required: true
        }
    ]
}


export default Messages
