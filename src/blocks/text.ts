import { Block } from "payload/types"

const Text: Block = {
    slug: "text", // required
    imageURL: "/images/text-block.jpg",
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
            name: "title",
            type: "text",
            required: false,
        },
        {
            name: "text",
            type: "richText",
            required: true,
        }
    ],
}

export { Text }
export default Text