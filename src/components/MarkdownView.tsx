import { ReactElement } from 'react'
import gfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

interface Props {
  md?: string
}

export default function MarkdownView({ md = '' }: Props): ReactElement {
  return (
    <div className="prose lg:prose-xl max-w-none">
      <ReactMarkdown remarkPlugins={[gfm]}>{md}</ReactMarkdown>
    </div>
  )
}
