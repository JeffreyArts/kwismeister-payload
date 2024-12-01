import { Block } from "payload/types"

const Newsletter: Block = {
    slug: "newsletter", // required
    imageURL: "/images/newsletter-block.jpg",
    labels: {
        singular: "Newsletter",
        plural: "Newsletter",
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
    ]
}

export { Newsletter }
export default Newsletter