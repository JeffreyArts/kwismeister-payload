import { CollectionConfig } from "payload/types"

export const QuizTheme: CollectionConfig = {
    slug: "quiz-theme",
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
    ],
}
