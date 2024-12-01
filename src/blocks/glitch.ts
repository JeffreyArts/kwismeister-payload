import { Block } from "payload/types"

const Glitch: Block = {
    slug: "glitch", // required
    imageURL: "/images/glitch-block.jpg",
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
            label: "Effect options",
            type: "collapsible",
            admin: {
                initCollapsed: true,
                condition: (data, siblingData) => {
                    return !siblingData.redirect},
            },
            fields: [{
                type: "row",
                fields: [
                    {
                        name:"hover",
                        type: "checkbox",
                        required: false,
                        admin: {
                            width: "25%",
                            description: "When checked, only trigger effect on mouse hover"
                        }
                    },
                    {
                        name:"repeat",
                        type: "checkbox",
                        required: false,
                        admin: {
                            width: "25%",
                            description: "When checked, effect will loop through all values"
                        }
                    },
                ]
            },
            {
                type: "row",
                fields: [
                    {
                        name:"duration",
                        type: "number",
                        min: 0,
                        defaultValue: .5,
                        required: true,
                        admin: {
                            step: .1,
                            width: "25%",
                            description: "Amount of seconds that the glitch effect will take"
                        }
                    },
                    {
                        name:"delay",
                        type: "number",
                        min: 0,
                        defaultValue: 2,
                        required: true,
                        admin: {
                            step: .1,
                            width: "25%",
                            description: "Amount of seconds between glitches (if repeat: true)"
                        }
                    },
                    {
                        name:"fontSize",
                        type: "number",
                        min: 0,
                        defaultValue: 3,
                        admin: {
                            step: .1,
                            width: "25%",
                            description: "Font-size (in vw)"
                        }
                    },
                ]
            }]
        },
        {
            name: "values",
            type: "array",
            required: true,
            fields: [
                {
                    type: "row",
                    fields: [
                        {
                            name: "text",
                            type: "text",
                            required: true,
                            admin: {
                                width: "50%"
                            }
                        },
                        {
                            name: "url",
                            type: "text",
                            required: false,
                            admin: {
                                width: "50%",
                                placeholder: "/"
                            }
                        }
                    ]
                }
            ]
        }
    ],
}

export { Glitch }
export default Glitch