import { Block } from "payload/types"

const PageComments: Block = {
    slug: "page-comments", // required
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

export { PageComments }
export default PageComments