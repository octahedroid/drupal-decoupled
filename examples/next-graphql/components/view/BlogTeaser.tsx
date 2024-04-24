import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment, NodeArticleTeaserFragment } from "@/graphql/fragments/node";
import NodeArticleTeaser from "@/components/node/NodeArticleTeaser";

interface BlogTeaserProps {
  results: Array<FragmentOf<typeof NodeArticleTeaserFragment>>
}

export default function BlogTeaser(
    {results}: BlogTeaserProps
  ) {

  return (
    <>
      {
        results.map((result, index) => {
          // @todo fix use of NodeArticleTeaserFragment
          const node = readFragment(NodeArticleTeaserFragment, result) as unknown as FragmentOf<typeof NodeArticleFragment>
          return (
            <NodeArticleTeaser key={index} node={node}  />
          );
        })
      }
    </>
  )
}
