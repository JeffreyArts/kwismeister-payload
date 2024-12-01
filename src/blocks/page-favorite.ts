import { Block } from "payload/types"

const PageFavorite: Block = {
    slug: "page-favorite", // required
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
    ]
}

export { PageFavorite }
export default PageFavorite