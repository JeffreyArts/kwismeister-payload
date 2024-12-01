import { Block } from "payload/types"

const Image: Block = {
    slug: "model-3d", // required
    imageURL: "/images/block-thumbnail.png",
    labels: {
        singular: "3D Model",
        plural: "3D Models",
    },
    fields: [
        {
            name: "size",
            label: "Block size",
            type: "number",
            min: 1,
            required: true,
            admin: {
                "width": "128px"
            },
        },
        {
            name: "source",
            label: "3D model",
            type: "upload",
            filterOptions: () => {
                return {
                    filename: {
                        like: ".stl", // operator to use and value to compare against
                    },
                }
            },
            relationTo: "media"
        },
    ],
}

export { Image }
export default Image