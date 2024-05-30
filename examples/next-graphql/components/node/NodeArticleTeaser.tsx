import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "@/graphql/fragments/node";
import { UserFragment } from "@/graphql/fragments/user";
import Avatar from "@/components/Avatar";
import CoverImage from "@/components/CoverImage";
import { MediaImageFragment } from "@/graphql/fragments/media";

interface NodeArticleTeaserProps {
  node: FragmentOf<typeof NodeArticleFragment>;
}

export default function NodeArticleTeaser({ node }: NodeArticleTeaserProps) {
  const { title, path, image, author, summary } = readFragment(
    NodeArticleFragment,
    node
  );
  const authorFragment = readFragment(UserFragment, author);
  if (!authorFragment) {
    return null;
  }

  const picture = readFragment(MediaImageFragment, authorFragment.picture);

  return (
    <div>
      <div className="mb-5">
        <CoverImage
          title={title}
          path={path}
          image={image}
          width={800}
          height={600}
          styleName="medium"
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <a href={path} className="hover:underline">
          {title}
        </a>
      </h3>
      <div className="text-lg mb-4">
        {picture && <Avatar name={authorFragment.name} picture={picture.mediaImage} />}
      </div>
      <div className="text-lg mb-4">{/* <Date dateString={created} /> */}</div>
      <p className="text-lg leading-relaxed mb-4">{summary}</p>
    </div>
  );
}
