import { FragmentOf, readFragment } from "gql.tada";
import { ParagraphViewReferenceFragment } from "~/graphql/fragments/paragraph";
import BlogTeaser from "~/components/view/BlogTeaser";

interface ParagraphViewReferenceProps {
  paragraph: FragmentOf<typeof ParagraphViewReferenceFragment>
}

export default function ParagraphViewReference({ paragraph } : ParagraphViewReferenceProps) {
  const { reference: { view, display, results } } = readFragment(ParagraphViewReferenceFragment, paragraph);
  if (view === 'blog' && display === 'blog_teaser') {
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        <BlogTeaser results={results} />
      </div>
    );
  }
  
  return (
    <>
      <h2>ParagraphViewReference</h2>
      <pre>
        {JSON.stringify( {view, display, results}, null, 2)}
      </pre>
    </>
  );
}
