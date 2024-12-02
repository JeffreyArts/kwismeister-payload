import { CollectionConfig } from "payload/types"

export const QuizSession: CollectionConfig = {
    slug: "quiz-session",
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
    },
    custom: {
        socketAccess: {
            updateByID: (args, operation,result) => {
                console.log("Update by ID")
                // Return false to disallow emit
                // Return {public: boolean | Object<result>}
                // Return {self: boolean | Object<result>}
                // Return {<room>: boolean | Object<result>}
                const res = {
                    public: true
                }
                res[`quiz-${result.id}`] = result
                return res
            }
        }
    },
    hooks: {
        beforeValidate: [
            async ({req, data, originalDoc}) => {
                // const id = data.id
                
                if (!data?.quiz) {
                    
                    const result = await req.payload.find({
                        collection: "quiz",
                    })
                    if (result.docs.length <= 0) {
                        throw new Error("There should be at least 1 quiz")
                    }
                    
                    // This line will select 1 quiz 
                    const docIndex = Math.floor(Math.random()*result.docs.length)
                    
                    if (originalDoc) {
                        await req.payload.update({
                            collection: "quiz-session",
                            id: originalDoc.id,
                            data: {
                                "quiz": result.docs[docIndex]
                            }
                        })
                    } else {
                        data.quiz = result.docs[docIndex].id
                    }
                }
                return data
            }
        ]
    },
    endpoints: [
        {
            path: "/join/:id",
            method: "get",
            handler: async (req,res) => {
                let activeQuizId
                // V3 version
                // if (req.routeParams?.id) {
                //     activeQuizId = req.routeParams?.id
                // }

                // V2 version
                if (req.params?.id) {
                    activeQuizId = req.params?.id
                }
                // const activeQuizId = req.routeParams?.id
                const result = await req.payload.find({
                    collection: "quiz-session",
                    depth: 2,
                    where: {
                        id: {
                            equals: activeQuizId
                        }
                    }
                })

                if (result.docs.length != 1) {
                    const error = "Quiz%20bestaat%20niet"
                    return res.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URI}/kwis?error=${error}`)
                    // return Response.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URI}/kwis?error=${error}`)
                }
                
                const activeQuiz = result.docs[0]
                
                // Add quizmaster if it is set
                if (!activeQuiz["quizMaster"]) {
                    const quizMaster = crypto.randomUUID()
                    await req.payload.update({
                        collection: "quiz-session",
                        id: activeQuiz.id,
                        data: {
                            "quizMaster": quizMaster
                        }
                    })

                    // Redirect to the new URL
                    return res.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URI}/kwis/${activeQuiz.id}/kwismeister?kwismeister=${quizMaster}`)
                    // return Response.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URI}/kwis/${quiz.id}/kwismeister?kwismeister=${quizMaster}`)
                } 
                
                // Add as player if quiz master is already
                console.log(activeQuiz)
                
                let playerName = "Speler 1"
                const playerIds = []
                if (Array.isArray(activeQuiz.players)) {
                    playerName = `Speler ${activeQuiz.players.length + 1}`
                    
                    activeQuiz.players.forEach(p=> {
                        playerIds.push(p.id)
                    })
                }

                const player = await req.payload.create({
                    collection: "quiz-player",
                    data: {
                        quizSession: activeQuizId,
                        name: playerName
                    }
                })

                playerIds.push(player.id)

                await req.payload.update({
                    collection: "quiz-session",
                    id: activeQuiz.id,
                    data: {
                        players: playerIds
                    }
                })

                // Redirect to the new URL
                return res.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URI}/kwis/${activeQuiz.id}/speler?speler=${player.id}`)
                // return Response.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URI}/kwis/${activeQuiz.id}/speler?speler=${player}`)
            }
        }  
    ],
    fields: [
        {
            name: "title",
            type: "text",
            required: false,
        },
        {
            name: "quiz",
            type: "relationship",
            relationTo: "quiz",
            hasMany: false
        },
        {
            name: "quizMaster",
            type: "text",
            required: false,
        },
        {
            name: "finished",
            type: "checkbox",
            defaultValue: false,
            required: false,
        },
        {
            name: "state",
            type: "json",
            required: false,
            defaultValue: {
                roundIndex: 0,
                questionIndex: 0,
                page: "quizNotStarted" as "splashscreen" | "intro" | "question" | "quizNotStarted" | "quizFinished"
            }
        },
        {
            name: "players",
            type: "relationship",
            relationTo: "quiz-player",
            required: false,
            hasMany: true,
        },
    ],
}
