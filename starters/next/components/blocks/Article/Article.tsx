import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import {
  Avatar,
  type AvatarProps,
  Badge,
  type ImageProps,
  RichText,
} from "@/components/primitives";
import { cn } from "@/lib/utils";

const articleVariants = cva("w-full mb-12 md:mb-16", {
  variants: {},
  defaultVariants: {},
});

type AuthorProps = {
  avatar: AvatarProps;
  name: string;
};

export interface ArticleProps
  extends ComponentPropsWithoutRef<"article">,
    VariantProps<typeof articleVariants> {
  title: string;
  summary?: string;
  content: string;
  image: ImageProps;
  tags?: string[];
  publishDate: number;
  author: AuthorProps;
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleDateString("en-US", options);
};

export const Article = ({
  className,
  title,
  summary,
  content,
  image,
  tags,
  publishDate,
  author,
  ...props
}: ArticleProps) => {
  return (
    <article className={cn(articleVariants(), className)} {...props}>
      <div className="container mx-auto mb-12 md:mb-16">
        <img
          {...image}
          alt={image.alt}
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="mx-auto mb-8 max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
          {title}
        </h1>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar src={author.avatar.src} name={author.name} />
            <p className="text-sm font-medium">{author.name}</p>
          </div>
          <p className="text-sm text-gray-500">{formatDate(publishDate)}</p>
        </div>
        {tags && (
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge text={tag} variant="secondary" key={tag} />
            ))}
          </div>
        )}
        {summary && <p className="mb-8 text-gray-400 italic">{summary}</p>}
        <RichText content={content} />
      </div>
    </article>
  );
};
