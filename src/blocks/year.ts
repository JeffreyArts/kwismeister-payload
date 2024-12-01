import { Block } from "payload/types"

const Year: Block = {
    slug: "year", // required
    imageURL: "/images/year-block.jpg",
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
            name: "year",
            type: "text",
            required: true,
            defaultValue: new Date().getFullYear() + ""
        }
    ]
}

export { Year }
export default Year