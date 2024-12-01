import { CollectionConfig } from "payload/types"
// import { RowLabel } from "@/app/multiple-choice-row-label"
export const QuizQuestion: CollectionConfig = {
    slug: "quiz-question",
    admin: {
        useAsTitle: "title"  
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeValidate: [
            ({data}) => {
                if (data?.question.multi)  {
                    data.question.multi.forEach(answer => {
                        if (!answer.correct) {
                            answer.correct = false
                        }
                    })
                }

                return data
            }
        ]
    },
    fields: [
        {
            name: "title",
            type: "text",
        },
        {
            name: "intro",
            admin: {
                className: "collection-title"
            },
            type: "textarea",
        },
        {
            name: "theme",
            type: "relationship",
            relationTo: "quiz-theme",
            hasMany: false,
            required: false,
        },
        {
            name: "question",
            admin: {
                className: "collection-title"
            },
            type: "group",
            fields: [
                {
                    name: "type",
                    type: "select",
                    options: [
                        { label: "Meerkeuze vraag", value: "multi" },
                        { label: "Cijfer raden", value: "closestNumber" },
                        { label: "Standaard", value: "-" },
                    ],
                    required: true,
                },{
                    name: "text",
                    label: "Text",
                    type: "text",
                },
                {
                    name: "media",
                    type: "upload",
                    relationTo: "media"
                },{
                    name: "multi",
                    label: "Meerkeuze opties",
                    type: "array",
                    admin: { 
                        condition: (data) => data.question?.type === "multi",
                        components: {
                            RowLabel: ({ data }) => {
                                const emoji = data?.correct ? "✅" : "❌"
                                const customLabel = `${emoji} | ${data?.answer || "No Answer"} `
                                return customLabel
                            }
                            // RowLabel: "/app/multiple-choice-row-label#ArrayRowLabel",
                        }
                    
                    },
                    fields: [
                        {
                            type: "row",
                            fields: [
                                {name: "answer", type:"text"}, {name:"correct", type: "checkbox"}
                            ]
                        }
                    ]
                },
                {
                    name: "closestNumber",
                    label: "Dichtst bijzijnde nummer",
                    type: "number",
                    admin: { 
                        condition: (data) => data.question?.type === "closestNumber",
                    
                    }
                },
            ]
        },
        {
            name: "answer",
            admin: {
                className: "collection-title"
            },
            type: "group",
            fields: [
                {
                    name: "text",
                    label: "Text",
                    type: "text",
                }, {
                    name: "media",
                    type: "upload",
                    required: false,
                    relationTo: "media",
                }, {
                    name: "addition",
                    label: "Toelichting",
                    type: "textarea",
                },
            ]
        },
    ],
}
