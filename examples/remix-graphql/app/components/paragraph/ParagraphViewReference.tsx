import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphViewReferenceFragment } from "~/graphql/fragments/paragraph";
import BlogTeaser from "~/components/view/BlogTeaser";
import { NodeArticleTeaserFragment } from "~/graphql/fragments/node";
interface ParagraphViewReferenceProps {
  paragraph: FragmentOf<typeof ParagraphViewReferenceFragment>
}

export default function ParagraphViewReference({ paragraph } : ParagraphViewReferenceProps) {
  const { reference: { view, display, results } } = readFragment(ParagraphViewReferenceFragment, paragraph);

  if (view === 'blog' && display === 'blog_teaser') {
    return (
      // @todo fix use of NodeArticleTeaserFragment
      <BlogTeaser results={results as Array<FragmentOf<typeof NodeArticleTeaserFragment>>} />
    );
  }
  
  return (
    <>
      <h2>ParagraphViewReference</h2>
      <pre>
        {JSON.stringify({ view, display, results }, null, 2)}
      </pre>
    </>
  );
}
