import { Block } from "payload/types"

const Title: Block = {
    slug: "title", // required
    imageURL: "/images/title-block.jpg",
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
            required: true,
        },
        {
            type: "row",
            fields: [
                {
                    name: "rows",
                    type: "number",
                    defaultValue: 1,
                    required: false,
                    admin: {
                        description: "Automatically update to the maximum font-size for the defined amount of rows",
                        width: "40%"
                    },
                },
                {
                    name: "maxSize",
                    label: "Max size (px)",
                    type: "number",
                    admin: {
                        description: "Maximum height in pixels for defining the maximum font-size of the title",
                        width: "40%",
                    },
                    required: false,
                },
            ]
        }
    ],
}

export { Title }
export default Title