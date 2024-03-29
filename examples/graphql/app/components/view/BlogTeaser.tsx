import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment, NodeArticleTeaserFragment } from "~/graphql/fragments/node";
import NodeArticleTeaser from "~/components/node/NodeArticleTeaser";

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
          const node = readFragment(NodeArticleTeaserFragment, result);
          return (
            // @todo fix use of NodeArticleTeaserFragment
            <NodeArticleTeaser key={index} node={node as unknown as FragmentOf<typeof NodeArticleFragment>}  />
          );
        })
      }
    </>
  )
}
