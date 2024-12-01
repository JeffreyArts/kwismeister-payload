import { Block } from "payload/types"

const Banner: Block = {
    slug: "banner", // required
    imageURL: "/images/banner-block.jpg",
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
            label: "Title",
            type: "text",
            required: true,
        },
        {
            name: "image",
            label: "Image",
            required: true,
            type: "upload",
            relationTo: "media"
        },

        {
            type: "row",
            fields: [
                {
                    name: "link",
                    label: "Link",
                    type: "text",
                    admin: {
                        placeholder: "/link-to-page"
                    },
                    required: true,
                },
                {
                    name: "_blank",
                    label: "Open in new tab",
                    type: "checkbox",
                    required: false,
                },
            ]
        }
    ],
}

export { Banner }
export default Banner