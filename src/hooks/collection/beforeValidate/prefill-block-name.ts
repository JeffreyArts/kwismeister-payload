import payload from "payload"

// Prefill blockName
const prefillBlockName = async (data) => {
    for (const block of data.blocks) {
        let res
        if (!block.blockName) {
            switch (block.blockType) {
            case "banner":
            case "iframe":
            case "text":
                if (block.title) {
                    block.blockName = `${block.title}-${block.size}`
                } else {
                    block.blockName = `size-${block.size}`
                }

                break
            case "year":
                block.blockName = `${block.year}-${block.size}`
                break
            case "line":
                block.blockName = `${block.charset}-${block.size}`
                break
            case "image":
                
                res = await payload.findByID({
                    collection: "media",
                    id: block.image,
                })
                
                block.blockName = `${res.filename.split(".")[0]}-${block.size}`
                break
            case "newsletter":
                block.blockName = `size-${block.size}`
                break
            case "projectArticle":
                res = await payload.findByID({
                    collection: "projects",
                    id: block.project,
                })
                block.blockName = `${res.title}-${block.size}`
                break
            default:
                // block.blockName = `size-${block.size}`
                break
            }
        }
    }
    return data
}

export { prefillBlockName }
export default prefillBlockName