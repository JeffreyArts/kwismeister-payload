import { CollectionConfig } from "payload/types"

const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: () => true
    },
    upload: {
        staticURL: "/media",
        staticDir: "./collections/media/uploads",
        imageSizes: [
            // Banner sizes
            {
                name: "banner_sm",
                width: 320,
                height: 80,
                position: "centre",
            },
            {
                name: "banner_md",
                width: 800,
                height: 200,
                position: "centre",
            },
            {
                name: "banner_lg",
                width: 1200,
                height: 300,
                position: "centre",
            },
            
            // Image sizes
            {
                name: "image_sm",
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
        // mimeTypes: [
        //     "image/*", 
        //     "application/octet-stream", "application/sla", "application/*.stl", "application/x-navistyle", "model/stl", "model/x.stl*" // STL files
        // ],
    },
    hooks: {
        beforeValidate: [
            async ({req}) => {
                const stlMimeTypes = ["application/octet-stream", "application/sla", "application/*.stl", "application/x-navistyle", "model/stl", "model/x.stl*"]
                if (stlMimeTypes.includes(req.body.mimeType)) {
                    if (req.files.file) {
                        // const image = await stlToPng(req.files.file)
                        // console.log(image)
                    }
                }
            }
        ]  
    },
    fields: [
        {
            name: "title",
            type: "text",
        },
        {
            name: "description",
            type: "text",
        },
    ],
}

export { Media }
export default Media 