import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types"

export const RowLabel = ({ data, index }: RowLabelArgs) => {
    const emoji = data?.correct ? "✅" : "❌"
    const customLabel = `${emoji} | ${data?.answer || "No Answer"} `

    return <div>{customLabel}</div>
}
