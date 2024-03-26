import ParagraphHeroCta from "~/components/paragraph/ParagraphHeroCta";
import ParagraphText from "~/components/paragraph/ParagraphText";
import ParagraphImage from "~/components/paragraph/ParagraphImage";
import ParagraphCodeBlock from "~/components/paragraph/ParagraphCodeBlock";

import {
  ParagraphCodeBlockFragment,
  ParagraphHeroCtaFragment,
  ParagraphImageFragment,
  ParagraphTextFragment,
  ParagraphUnionFragment,
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

interface ComponentResolverProps {
  data: FragmentOf<typeof ParagraphUnionFragment>[] | null;
  environment: string;
}

type ComponentType = Array<JSX.Element>

export const componentResolver = ({data = [], environment = 'preview'}: ComponentResolverProps): ComponentType => {
  if (!data) {
    return []
  }

  const paragraphUnionFragment = readFragment(ParagraphUnionFragment, data); 
  const components: Array<JSX.Element> = [];
  
  paragraphUnionFragment.forEach((paragraph) => {
    const type = paragraph.__typename as string;

    if (!type) {
      return <></>;
    }

    const calculateComponent = function (type: string): JSX.Element {
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

      return <></>;
    }

    const ParagraphComponent = calculateComponent(type);

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
