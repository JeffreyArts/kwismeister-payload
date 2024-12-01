import { CollectionConfig } from "payload/types"

export const Quiz: CollectionConfig = {
    slug: "quiz",
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: "title"  
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "rounds",
            type: "relationship",
            relationTo: "quiz-round",
            hasMany: true,
            required: true,
        },
    ],
}
