import { Link } from '@remix-run/react'
import { FragmentOf, readFragment } from "gql.tada";
import { NodeArticleFragment } from "~/graphql/fragments/node";
import { UserFragment } from '~/graphql/fragments/user';
import { extractImageFromMedia } from '~/graphql/helpers';
import Avatar from "~/components/ui/Avatar";
import CoverImage from "~/components/ui/CoverImage";

interface NodeArticleTeaserProps {
  node: FragmentOf<typeof NodeArticleFragment>
}

export default function NodeArticleTeaser({node}:NodeArticleTeaserProps)  {
  const { title, path, image: mediaImage, author, summary } = readFragment(NodeArticleFragment, node);
  const image = extractImageFromMedia(mediaImage);
  const authorFragment = readFragment(UserFragment, author)
  if (!authorFragment) {
    return null;
  }

  const picture = extractImageFromMedia(authorFragment.picture);

  return (
    <div>
      <div className="mb-5">
        <CoverImage title={title} path={path} image={image} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link prefetch='intent' to={path} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        { picture &&  <Avatar name={authorFragment.name} picture={picture} /> }
      </div>
      <div className="text-lg mb-4">
        {/* <Date dateString={created} /> */}
      </div>
      <p className="text-lg leading-relaxed mb-4">{summary}</p>
    </div>
  );
}
