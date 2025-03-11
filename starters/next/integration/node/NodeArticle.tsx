import { FragmentOf, readFragment } from 'gql.tada'
import { Article } from '@/components/blocks'
import { NodeArticleFragment } from '@/graphql/fragments/node'
import { resolveMediaImage, resolveUser } from '@/integration/resolvers/helpers'

type NodeArticleComponentProps = {
  node: FragmentOf<typeof NodeArticleFragment>
  environment: string
}

export default function NodeArticleComponent({
  node,
}: NodeArticleComponentProps) {
  const {
    title,
    body,
    image: nodeArticleImage,
    author: nodeArticleAuthor,
    changed,
  } = readFragment(NodeArticleFragment, node)
  const image = resolveMediaImage(nodeArticleImage)
  if (!image) {
    throw new Error('NodeArticleComponent: image is required')
  }
  if (!nodeArticleAuthor) {
    throw new Error('NodeArticleComponent: author is required')
  }
  if (!body || !body.processed) {
    throw new Error('NodeArticleComponent: body is required')
  }
  const author = resolveUser(nodeArticleAuthor)

  return (
    <>
      {}
      <Article
        title={title}
        content={body.processed.toString()}
        author={author}
        image={image}
        publishDate={Number(changed.timestamp)}
      />
    </>
  )
}
