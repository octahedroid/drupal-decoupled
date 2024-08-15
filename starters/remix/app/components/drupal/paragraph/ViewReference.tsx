import BlogTeaser from "~/components/drupal/view/BlogTeaser";

export type ViewReferenceProps = {
  view: string;
  display: string;
  results?: [];
}

export const ViewReferenceDefaultProps: ViewReferenceProps = {
  view: '',
  display: '',
  results: [] || null, 
}

export default function ViewReference({ view, display, results = [] } : ViewReferenceProps) {
  
  if (view === 'blog' && display === 'blog_teaser') {
    return (
      <BlogTeaser results={results} />
    );
  }
  
  return (
    <>
      <h2>ViewReference</h2>
      <pre>
        {JSON.stringify({ view, display, results }, null, 2)}
      </pre>
    </>
  );
}
