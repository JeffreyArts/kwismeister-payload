import { Block } from "payload/types"

const Note: Block = {
    slug: "note", // required
    imageURL: "/images/note-block.jpg",
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
            label: "Text",
            type: "richText",
        },
    ],
}

export { Note }
export default Note