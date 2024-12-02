import { CollectionConfig } from "payload/types"

export const QuizPlayer: CollectionConfig = {
    slug: "quiz-player",
    access: {
        // read: () => true,
        // create: () => true,
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

                if (req.body?.name) {
                    res[`quiz-${result.id}`] = {
                        name: req.body.name
                    }
                }
                
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
                    name: "round",
                    type: "array",
                    required: false,
                    fields: [
                        {
                            name: "question",
                            type: "text"
                        },
                        {
                            name: "answer",
                            type: "text"
                        }
                    ]
                }, 
            ]
        }
    ],
}
