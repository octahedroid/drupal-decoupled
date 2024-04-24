import { FragmentOf, readFragment } from "gql.tada";
import { LinkFragment } from "@/graphql/fragments/misc";
import { ParagraphHeroCtaFragment } from "@/graphql/fragments/paragraph";

interface ParagraphHeroCtaProps {
  paragraph: FragmentOf<typeof ParagraphHeroCtaFragment>
}

export default function ParagraphHeroCta({ paragraph }: ParagraphHeroCtaProps) {
  const { cta, text, title, intro } = readFragment(ParagraphHeroCtaFragment, paragraph)
  const linkFragments = readFragment(LinkFragment, cta)

  return (
    <div className="bg-indigo-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            {intro}
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {title}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-700">{text}</p>
        </div>
        <div className="mt-8 flex justify-center">
          {linkFragments.map((link, index) => {
            const { url, title, internal } = link
            return (
              <div key={index} className="ml-3 inline-flex">
                <a
                  target={internal ? "_self" : "_blank"}
                  href={url ? url : '#'}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-200" rel="noreferrer"
                >
                  {title}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
