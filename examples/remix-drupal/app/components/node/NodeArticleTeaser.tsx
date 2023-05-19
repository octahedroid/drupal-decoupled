import { Link } from '@remix-run/react'
import type { NodeArticle } from '~/@types/gen/schema';
import Avatar from "~/components/Avatar";
// import Date from "~/components/Date";
import CoverImage from "~/components/CoverImage";

export default function NodeArticleTeaser({
  title,
  image,
  // created,
  body,
  author,
  path,
}: NodeArticle) {

  return (
    <div>
      <div className="mb-5">
        <CoverImage title={title} path={path} image={image} width={800} height={600} styleName='medium' />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link prefetch='intent' to={path} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Avatar name={author.name} picture={author?.picture} />
      </div>
      <div className="text-lg mb-4">
        {/* <Date dateString={created} /> */}
      </div>
      <p className="text-lg leading-relaxed mb-4">{body?.summary}</p>
    </div>
  );
}
