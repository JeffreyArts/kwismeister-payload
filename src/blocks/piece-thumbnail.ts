import { Block } from "payload/types"

const PieceThumbnail: Block = {
    slug: "pieceThumbnail", // required
    imageURL: "/images/piece-thumbnail-block.jpg",
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
            name: "piece",
            type: "relationship",
            relationTo: "pieces",
            required: true,
            hasMany: false,
        }
    ],
}

export { PieceThumbnail }
export default PieceThumbnail