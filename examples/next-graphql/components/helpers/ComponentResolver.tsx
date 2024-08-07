import { FragmentOf, readFragment } from "gql.tada";

// Drupal
import ParagraphHero from "@/components/drupal/paragraph/ParagraphHero";
import ParagraphCardGroup from "@/components/drupal/paragraph/ParagraphCardGroup";
import ParagraphText from "@/components/drupal/paragraph/ParagraphText";
import ParagraphImage from "@/components/drupal/paragraph/ParagraphImage";
import ParagraphCodeBlock from "@/components/drupal/paragraph/ParagraphCodeBlock";
import ParagraphStaticComponent from "@/components/drupal/paragraph/ParagraphStaticComponent";
import ParagraphViewReference from "@/components/drupal/paragraph/ParagraphViewReference";

import {
  ParagraphHeroFragment,
  ParagraphCardGroupFragment,
  ParagraphCodeBlockFragment,
  ParagraphImageFragment,
  ParagraphTextFragment,
  ParagraphStaticComponentFragment,
  ParagraphUnionFragment,
  ParagraphViewReferenceFragment,
} from "@/graphql/drupal/fragments/paragraph";

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

const calculateComponent = function (type: string, paragraph: ParagraphFragmentType): JSX.Element {
  if (type === 'ParagraphHero') {
    return <ParagraphHero paragraph={paragraph as FragmentOf<typeof ParagraphHeroFragment>} />;
  }
  if (type === 'ParagraphCardGroup') {
    return <ParagraphCardGroup paragraph={paragraph as FragmentOf<typeof ParagraphCardGroupFragment>} />;
  }
  if (type === 'ParagraphText') {
    return <ParagraphText paragraph={paragraph as FragmentOf<typeof ParagraphTextFragment>} />;
  }
  if (type === 'ParagraphImage') {
    return <ParagraphImage paragraph={paragraph as FragmentOf<typeof ParagraphImageFragment>} />;
  }
  if (type === 'ParagraphCodeBlock') {
    return <ParagraphCodeBlock paragraph={paragraph as FragmentOf<typeof ParagraphCodeBlockFragment>} />;
  }
  if (type === 'ParagraphStaticComponent') {
    return <ParagraphStaticComponent paragraph={paragraph as FragmentOf<typeof ParagraphStaticComponentFragment>} />;
  }
  if (type === 'ParagraphViewReference') {
    return <ParagraphViewReference paragraph={paragraph as FragmentOf<typeof ParagraphViewReferenceFragment>} />;
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

