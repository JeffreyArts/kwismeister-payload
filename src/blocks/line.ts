import { Block } from "payload/types"

const Line: Block = {
    slug: "line", // required
    imageURL: "/images/line-block.jpg",
    labels: {
        singular: "Line",
        plural: "Line",
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
            name: "charset",
            type: "text",
            required: true,
            admin: {
                description: "Enter one or more characters that will be used to create a line, for example: ─ _ ⪑⪒ ⭐️"
            }
        }
    ]
}

export { Line }
export default Line