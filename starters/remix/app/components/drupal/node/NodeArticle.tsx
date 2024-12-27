import { FragmentOf, readFragment } from 'gql.tada'
import { Article } from '~/components/ui/Article'
import { NodeArticleFragment } from '~/graphql/drupal/fragments/node'
import { parseMediaImage, parseUser } from '~/graphql/drupal/helpers'

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
    image,
    author: nodeArticleAuthor,
    changed,
  } = readFragment(NodeArticleFragment, node)

  if (!image) {
    throw new Error('NodeArticleComponent: image is required')
  }
  if (!nodeArticleAuthor) {
    throw new Error('NodeArticleComponent: author is required')
  }
  if (!body || !body.processed) {
    throw new Error('NodeArticleComponent: body is required')
  }
  const author = parseUser(nodeArticleAuthor)

  return (
    <>
      {}
      <Article
        title={title}
        content={body.processed.toString()}
        author={author}
        image={parseMediaImage(image)}
        publishDate={Number(changed.timestamp)}
      />
    </>
  )
}
