import { Block } from "payload/types"

const Iframe: Block = {
    slug: "iframe", // required
    imageURL: "/images/iframe-block.jpg",
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
            name: "url",
            type: "text",
            admin: {
                placeholder: "https://",
                width: "75",
            },
            required: true,
            validate: async (val, {data}) => {
        
                // skip validation when it is just added as a new block
                if (data.blockType === "iframe") {
                    return true
                }
        
                if (!val || !val.startsWith("http")) {
                    return "Invalid url"
                }
                        
                return true
            }
        },
        {
            name: "showRefresh",
            type: "checkbox",
            required: false,
        },
        {
            type: "row",
            fields: [
                {
                    name: "autoScaling",
                    label: "Auto scale",
                    type: "checkbox",
                    admin: {
                        width: "50%",
                        description: "If set to true, this will display the website scaled in desktop (1440px x 810px), tablet (1024px x 768px) & mobile (375px x 812px)"
                    }
                },
                {
                    name: "landscapeRatio",
                    type: "text",
                    defaultValue: "16/9",
                    admin: {
                        condition: (data, siblingData) => {
                            if (siblingData.autoScaling) {
                                return false
                            }
                            return true
                        },
                        width: "25%",
                    }
                },
                {
                    name: "portraitRatio",
                    type: "text",
                    defaultValue: "9/16",
                    admin: {
                        condition: (data, siblingData) => {
                            if (siblingData.autoScaling) {
                                return false
                            }
                            return true
                        },
                        width: "25%",
                    }
                }
            ]
        }
    ],
}

export { Iframe }
export default Iframe