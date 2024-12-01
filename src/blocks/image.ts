import { Block } from "payload/types"

const Image: Block = {
    slug: "image", // required
    imageURL: "/images/image-block.jpg",
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
            name: "image",
            label: "Image",
            type: "upload",
            relationTo: "media"
        },
        {
            name: "link",
            label: "Link",
            type: "text",
            admin: {
                placeholder: "/link-to-page"
            },
            required: false,
        },
        {
            name: "description",
            label: "Description",
            type: "text",
            required: false,
        },
    ],
}

export { Image }
export default Image