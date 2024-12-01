import { CollectionConfig } from "payload/types"

export const QuizRound: CollectionConfig = {
    slug: "quiz-round",
    admin: {
        useAsTitle: "title"  
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media"
        },
        {
            name: "theme",
            label: "Thema",
            type: "relationship",
            relationTo: "quiz-theme",
            hasMany: false,
            required: false,
        },
        {
            name: "intro",
            type: "text",
            required: false,
        },
        {
            name: "questions",
            label: "Vragen",
            type: "relationship",
            relationTo: "quiz-question",

            filterOptions: ({ siblingData }) => {
                const sd = siblingData as {theme: string}

                if (!sd.theme) {
                    return true
                }
                return {
                    theme: {
                        equals: sd.theme
                    }
                }
            },
            hasMany: true,
            required: true,
        },
    ],
}
