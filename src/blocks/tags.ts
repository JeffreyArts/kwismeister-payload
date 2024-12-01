import { Block } from "payload/types"

const Tags: Block = {
    slug: "tags-block", // required
    imageURL: "/images/block-thumbnail.png",
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
            name: "text",
            type: "text",
            hasMany: true,
            required: true,
        }
    ],
}

export { Tags }
export default Tags