import { FragmentOf, readFragment } from "gql.tada";

// Drupal - fragments
import {
  ParagraphHeroFragment,
  ParagraphCardGroupFragment,
  ParagraphCodeBlockFragment,
  ParagraphImageFragment,
  ParagraphTextFragment,
  ParagraphStaticComponentFragment,
  ParagraphUnionFragment,
  ParagraphViewReferenceFragment,
} from "~/graphql/drupal/fragments/paragraph";

// Drupal - resolvers
import {
  ParagraphViewReferenceResolver,
  ParagraphCardGroupResolver,
  ParagraphTextResolver,
  ParagraphImageResolver,  
  ParagraphHeroResolver,
  ParagraphStaticComponentResolver
} from "~/components/helpers/drupal";
 
// Drupal - components
import ViewReference from "~/components/drupal/paragraph/ViewReference";

// UI components
import CardGroup from "~/components/ui/CardGroup";
import RichText from "~/components/ui/RichText";
import Image from "~/components/ui/Image";
import Hero from "~/components/ui/Hero";
import { Fragment } from "react/jsx-runtime";

type ParagraphFragmentType =
  FragmentOf<typeof ParagraphHeroFragment> |
  FragmentOf<typeof ParagraphCardGroupFragment> |
  FragmentOf<typeof ParagraphTextFragment> |
  FragmentOf<typeof ParagraphImageFragment> |
  FragmentOf<typeof ParagraphCodeBlockFragment> |
  FragmentOf<typeof ParagraphStaticComponentFragment> |
  FragmentOf<typeof ParagraphViewReferenceFragment>;

interface ResolveProps {
  data: FragmentOf<typeof ParagraphUnionFragment>[] | null;
}

const calculateComponent = function (
  type: string,
  paragraph: ParagraphFragmentType
): JSX.Element {
  
  if (type === 'ParagraphHero') {
    const paragraphHero = ParagraphHeroResolver({ 
      paragraph: paragraph as FragmentOf<typeof ParagraphHeroFragment> 
    });

    if (!paragraphHero) {
      return <></>;
    }
    
    return <Hero key={paragraphHero.id} {...paragraphHero} />
  }

  if (type === 'ParagraphCardGroup') {
    const paragraphCardGroupResolver = ParagraphCardGroupResolver({ 
      paragraph: paragraph as FragmentOf<typeof ParagraphCardGroupFragment> 
    })

    return <CardGroup key={paragraphCardGroupResolver.id} {...paragraphCardGroupResolver} />;
  }
  if (type === 'ParagraphText') {
    const { id, title, content } = ParagraphTextResolver({ paragraph: paragraph as FragmentOf<typeof ParagraphTextFragment> });

    return <RichText key={id} title={title} content={content} />
  }
  if (type === 'ParagraphImage') {

    const image = ParagraphImageResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphImageFragment> 
    });

    return <Image key={paragraph.id} {...image} variant='primary' />;
  }
  // if (type === 'ParagraphCodeBlock') {
  //   return <ParagraphCodeBlock paragraph={paragraph as FragmentOf<typeof ParagraphCodeBlockFragment>} />;
  // }
  if (type === 'ParagraphStaticComponent') {
    const { id, component } = ParagraphStaticComponentResolver({ paragraph: paragraph as FragmentOf<typeof ParagraphStaticComponentFragment> });
    return <Fragment key={id}>
      <h2>ParagraphStaticComponent</h2>
      <pre>
        {JSON.stringify({ id, component }, null, 2)}
      </pre>
    </Fragment>;
  }
  if (type === 'ParagraphViewReference') {
    const { id, display, view, results } = ParagraphViewReferenceResolver({ paragraph: paragraph as FragmentOf<typeof ParagraphViewReferenceFragment> })

    return <ViewReference key={id} display={display} view={view} results={results} />;
  }

  return <>{JSON.stringify(paragraph, null, 2)}</>;
}

export const resolve = ({data = []}: ResolveProps) => {
  if (!data) {
    return []
  }

  const paragraphUnionFragment = readFragment(ParagraphUnionFragment, data);

  return paragraphUnionFragment.map((paragraph) => {
    const type = paragraph.__typename;

    if (!type ||  type === "ParagraphCard") {
      return <></>;
    }

    return calculateComponent(type, paragraph);
  });
};
