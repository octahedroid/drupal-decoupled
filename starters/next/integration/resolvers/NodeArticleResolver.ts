import type { ResultOf } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import { resolveMediaImage, resolveUser } from "@/integration/resolvers/helpers";

export { NodeArticleFragment };

export const nodeArticleResolver = ({
  node,
}: {
  node: ResultOf<typeof NodeArticleFragment>;
}) => {
  const { id, title, summary, body, image, author, changed } = node;

  return {
    id,
    title,
    summary: summary ?? undefined,
    content: body?.processed?.toString() ?? "",
    image: resolveMediaImage(image) ?? {},
    author: author ? resolveUser(author) : { name: "", avatar: { name: "" } },
    publishDate: Number(changed?.timestamp ?? 0),
  };
};
