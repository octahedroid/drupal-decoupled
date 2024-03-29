import ParagraphHeroCta from "~/components/paragraph/ParagraphHeroCta";
import ParagraphText from "~/components/paragraph/ParagraphText";
import ParagraphImage from "~/components/paragraph/ParagraphImage";
import ParagraphCodeBlock from "~/components/paragraph/ParagraphCodeBlock";
import ParagraphStaticComponent from "~/components/paragraph/ParagraphStaticComponent";
import ParagraphViewReference from "~/components/paragraph/ParagraphViewReference";

import {
  ParagraphCodeBlockFragment,
  ParagraphHeroCtaFragment,
  ParagraphImageFragment,
  ParagraphTextFragment,
  ParagraphHeroTextFragment,
  ParagraphStaticComponentFragment,
  ParagraphUnionFragment,
  ParagraphViewReferenceFragment,
} from "~/graphql/fragments/paragraph"

import type { ComposableComponentProps} from "drupal-composable"
import { openComposableComponent } from "drupal-composable"
import { FragmentOf, readFragment } from "gql.tada";
interface ComposableComponentContainerProps extends ComposableComponentProps {
  children?: React.ReactNode;
}

const ComposableComponentContainer = ({ action, storage, uuid, children }: ComposableComponentContainerProps) => (
  // eslint-disable-next-line
  <section
    id={`${storage}-${uuid}`}
    data-composable-component={`${storage}-${uuid}`}
    onClick={() => openComposableComponent({
      action,
      storage,
      uuid,
    })}
  >
    {children}
  </section>
)

type ComponentType = Array<JSX.Element>
type ParagraphFragmentType =
  FragmentOf<typeof ParagraphHeroCtaFragment> |
  FragmentOf<typeof ParagraphTextFragment> |
  FragmentOf<typeof ParagraphImageFragment> |
  FragmentOf<typeof ParagraphCodeBlockFragment> |
  FragmentOf<typeof ParagraphHeroTextFragment> |
  FragmentOf<typeof ParagraphStaticComponentFragment> |
  FragmentOf<typeof ParagraphViewReferenceFragment>;

interface ComponentResolverProps {
  data: FragmentOf<typeof ParagraphUnionFragment>[] | null;
  environment: string;
}

const calculateComponent = function (type: string, paragraph: ParagraphFragmentType): JSX.Element {
  if (type === 'ParagraphHeroCta') {
    return <ParagraphHeroCta paragraph={paragraph as FragmentOf<typeof ParagraphHeroCtaFragment>} />;
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

  return <p className="border-y border-neutral-500 p-4 break-words"><pre>{JSON.stringify(paragraph, null, 2)}</pre></p>;
}

export const componentResolver = ({data = [], environment = 'preview'}: ComponentResolverProps): ComponentType => {
  if (!data) {
    return []
  }

  const paragraphUnionFragment = readFragment(ParagraphUnionFragment, data); 
  const components: Array<JSX.Element> = [];
  
  paragraphUnionFragment.forEach((paragraph) => {
    const type = paragraph.__typename;

    if (!type) {
      return <></>;
    }

    const ParagraphComponent = calculateComponent(type, paragraph);

    if (environment === 'preview') {
      components.push(
        <ComposableComponentContainer
          action='edit'
          storage='paragraph'
          uuid={paragraph.id}
        >
          {ParagraphComponent}
        </ComposableComponentContainer>
      );

      return;
    }

    components.push(ParagraphComponent)
  });

  return components;
};

export default componentResolver;
