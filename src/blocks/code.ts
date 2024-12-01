import { Block } from "payload/types"

const Code: Block = {
    slug: "code", // required
    imageURL: "/images/code-block.jpg",
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
            required: true,
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
            name: "language",
            label: "Programming language",
            type: "select",
            options: [
                {
                    label: "Arduino",
                    value: "arduino"
                }, {
                    label: "Bash",
                    value: "bash"
                }, {
                    label: "CSS",
                    value: "css"
                }, {
                    label: "HTML",
                    value: "html"
                }, {
                    label: "Javascript",
                    value: "javascript"
                }, {
                    label: "PHP",
                    value: "php"
                }, {
                    label: "Typescript",
                    value: "typescript"
                }
            ],
            required: true,
        },
        {
            name: "code",
            label: "Code",
            type: "code",
            required: true,
        },
    ],
}

export { Code }
export default Code