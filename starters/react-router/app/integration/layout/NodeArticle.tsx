import { Article } from "~/components/blocks";
import type { NodeArticleResultOf } from "~/graphql/types";
import { nodeArticleResolver } from "~/integration/resolvers/NodeArticleResolver";

interface NodeArticleProps {
  node: NodeArticleResultOf;
}

export default function NodeArticle({ node }: NodeArticleProps) {
  const { title, content, image, author, publishDate } = nodeArticleResolver({ node });

  return (
    <Article
      title={title}
      content={content}
      author={author}
      image={image}
      publishDate={publishDate}
    />
  );
}
