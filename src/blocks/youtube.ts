import { Block } from "payload/types"

const Youtube: Block = {
    slug: "youtube", // required
    imageURL: "/images/youtube-block.jpg",
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
            name: "ratio",
            type: "text",
            required: false,
            admin: {
                placeholder: "16/9, 4/3 or any other aspect ration"
            },
        },
        {
            name: "url",
            type: "text",
            defaultValue: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            required: true,
            admin: {

            },
            validate: async (val) => {
                const myregexp = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi

                if (myregexp.test(val)) {
                    return true // URL is valid
                } else {
                    return "Invalid YouTube URL" // Error message
                }
            },
            hooks: {
                beforeValidate: [
                    ({value}) => {
                        const myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi
                        const match = myregexp.exec(value)
                        if (match) {
                            const videoId = match[1]
                            value = `https://www.youtube-nocookie.com/embed/${videoId}`
                        }
                        
                        return value
                    }
                ]
            }
        }
    ],
}

export { Youtube }
export default Youtube