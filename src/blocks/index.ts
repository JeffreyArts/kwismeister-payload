import { Block } from "payload/types"

import BannerBlock from "./banner"
import CodeBlock from "./code"
import GlitchBlock from "./glitch"
import IframeBlock from "./iframe"
import ImageBlock from "./image"
import LineBlock from "./line"
import Model3DBlock from "./model-3d"
import NewsletterBlock from "./newsletter"
import NoteBlock from "./note"
import PageCommentsBlock from "./page-comments"
import PageFavoriteBlock from "./page-favorite"
import TagsBlock from "./tags"
import TextBlock from "./text"
import PieceThumbnailBlock from "./piece-thumbnail"
import ProjectArticleBlock from "./project-article"
import TitleBlock from "./title"
import YearBlock from "./year"
import YoutubeBlock from "./youtube"

export type BlockTypes = "Banner" | "Code" | "Glitch" | "Iframe" | "Image" | "Line" | "Model3D" | "Newsletter" | "Note" | "PageComments" | "PageFavorite" | "PieceThumbnail" | "ProjectArticle" | "Tags" | "Text" | "Title" | "Year" | "Youtube"

const pickBlocks = (blocks: Array<BlockTypes> | "all") => {
    const result = [] as Array<Block>

    if (blocks == "all") {
        return [
            BannerBlock, 
            CodeBlock, 
            GlitchBlock, 
            IframeBlock, 
            ImageBlock, 
            LineBlock,
            Model3DBlock, 
            NewsletterBlock, 
            NoteBlock, 
            PageCommentsBlock, 
            PageFavoriteBlock, 
            PieceThumbnailBlock, 
            ProjectArticleBlock, 
            TagsBlock, 
            TextBlock, 
            TitleBlock, 
            YearBlock, 
            YoutubeBlock
        ]
    }

    blocks.forEach(block => {
        if (block === "Banner")         result.push(BannerBlock)
        if (block === "Code")           result.push(CodeBlock)
        if (block === "Glitch")         result.push(GlitchBlock)
        if (block === "Iframe")         result.push(IframeBlock)
        if (block === "Image")          result.push(ImageBlock)
        if (block === "Line")           result.push(LineBlock)
        if (block === "Model3D")        result.push(Model3DBlock)
        if (block === "Newsletter")     result.push(NewsletterBlock)
        if (block === "Note")           result.push(NoteBlock)
        if (block === "PageComments")   result.push(PageCommentsBlock)
        if (block === "PageFavorite")   result.push(PageFavoriteBlock)
        if (block === "PieceThumbnail") result.push(PieceThumbnailBlock)
        if (block === "ProjectArticle") result.push(ProjectArticleBlock)
        if (block === "Tags")           result.push(TagsBlock)
        if (block === "Text")           result.push(TextBlock)
        if (block === "Title")          result.push(TitleBlock)
        if (block === "Year")           result.push(YearBlock)
        if (block === "Youtube")        result.push(YoutubeBlock)
    })

    return result
}

export { pickBlocks }

export { BannerBlock } 
export { CodeBlock }
export { GlitchBlock }
export { IframeBlock }
export { ImageBlock }
export { LineBlock }
export { Model3DBlock }
export { NewsletterBlock }
export { NoteBlock }
export { PageCommentsBlock }
export { PageFavoriteBlock }
export { PieceThumbnailBlock }
export { ProjectArticleBlock }
export { TagsBlock }
export { TextBlock }
export { TitleBlock }
export { YearBlock }
export { YoutubeBlock }

export default pickBlocks