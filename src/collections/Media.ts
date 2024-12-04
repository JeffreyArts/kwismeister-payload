import { CollectionConfig } from "payload/types"

export const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "alt",
            type: "text",
            required: false,
        },
    ],
    upload: {
        staticURL: "/media",
        staticDir: "../media",
        imageSizes: [
            {
                name: "quiz_round",
                width: 1200,
                height: 900,
                position: "centre",
            },
            
            // Image sizes
            {
                name: "thumbnail",
                width: 320,
                position: "centre",
            },
            {
                name: "image_md",
                width: 720,
                position: "centre",
            },
            {
                name: "image_lg",
                width: 1440,
                position: "centre",
            },
        ],
        adminThumbnail: "thumbnail",
    }
}
