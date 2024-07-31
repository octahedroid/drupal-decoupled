import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import Cover from "@/components/ui/Cover";
import { resolve } from "@/components/helpers/ComponentResolver";
import { ComponentRenderer } from "@/components/helpers/ComponentRenderer";
import { extractImageFromMedia, extractUser } from "@/graphql/helpers";

type NodeArticleComponentProps = {
  node: FragmentOf<typeof NodeArticleFragment>;
  environment: string;
}

export default function NodeArticleComponent({ node, environment }: NodeArticleComponentProps) {
  const {id, title, image: nodeArticleImage, author: nodeArticleAuthor, components: nodeArticleComponents } = readFragment(NodeArticleFragment, node);
  const image = extractImageFromMedia(nodeArticleImage);
  if (!nodeArticleAuthor) {
    return null;
  }
  const author = extractUser(nodeArticleAuthor);
  const components = resolve({
    data: nodeArticleComponents,
  });

  return (
    <>
      <Cover
        title={title}
        image={image}
        author={author}
      />
      <ComponentRenderer key={id} components={components} environment={environment} />
    </>
  );
}
