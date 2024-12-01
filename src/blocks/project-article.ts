import { Block } from "payload/types"

const ProjectArticle: Block = {
    slug: "projectArticle", // required
    imageURL: "/images/project-article-block.jpg",
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
            name: "project",
            type: "relationship",
            relationTo: "projects",
            required: true,
            hasMany: false,
        }
    ],
}

export { ProjectArticle }
export default ProjectArticle