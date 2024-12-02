import { CollectionConfig } from "payload/types"

export const QuizPlayer: CollectionConfig = {
    slug: "quiz-player",
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
    },
    custom: {
        socketAccess: {
            updateByID: (args, req,result) => {
                // Return false to disallow emit
                // Return {public: boolean | Object<result>}
                // Return {self: boolean | Object<result>}
                // Return {<room>: boolean | Object<result>}
                const res = {}
                const msg = {
                    id: result.id,
                    name: req.body.name ? req.body.name : result.name,
                }
                res[`quiz-${result.quizSession.id}`] = msg

                return res
            }
        }
    },
    admin: {
        useAsTitle: "name"
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: false,
        },
        {
            name: "quizSession",
            type: "relationship",
            relationTo: "quiz-session",
            required: true,
        },
        {
            name: "answers",
            type: "array",
            required: false,
            fields: [
                {
                    name: "roundIndex",
                    type: "number"
                },
                {
                    name: "questionIndex",
                    type: "number"
                },
                {
                    name: "answer",
                    type: "text"
                }
            ]
        }
    ],
}
