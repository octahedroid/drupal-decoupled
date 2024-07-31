import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment, NodeArticleTeaserFragment } from "~/graphql/fragments/node";
import NodeArticleTeaser from "~/components/drupal/node/NodeArticleTeaser";

interface BlogTeaserProps {
  results: Array<FragmentOf<typeof NodeArticleTeaserFragment>>
}

export default function BlogTeaser(
    {results}: BlogTeaserProps
  ) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
      {
        results.map((result, index) => {
          // @todo fix use of NodeArticleTeaserFragment
          const node = readFragment(NodeArticleTeaserFragment, result) as unknown as FragmentOf<typeof NodeArticleFragment>
          return (
            <NodeArticleTeaser key={index} node={node}  />
          );
        })
      }
    </div>
  )
}
