import { CollectionConfig } from "payload/types"
import { uniqWith } from "lodash"

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
    hooks: {
        beforeValidate: [
            ({data}) => {
                if (data.answers.length > 0) {
                    const checkUnique =  (a:{roundIndex: number, questionIndex: number}, b: {roundIndex: number, questionIndex: number}) => {
                        return a.roundIndex === b.roundIndex && a.questionIndex === b.questionIndex
                    }
                    data.answers = uniqWith(data.answers, checkUnique)
                }
            }
        ]
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
                    type: "row",
                    fields: [
                        {
                            name: "answer",
                            type: "text",
                            admin: {
                                width: "25%"
                            }
                        },
                        {
                            name: "manual_correct",
                            type: "checkbox",
                            admin: {
                                width: "25%"
                            }
                        },
                        {
                            name: "roundIndex",
                            type: "number",
                            admin: {
                                width: "25%"
                            }
                        },
                        {
                            name: "questionIndex",
                            type: "number",
                            admin: {
                                width: "25%"
                            }
                        },
                    ]
                }
            ]
        }
    ],
}
