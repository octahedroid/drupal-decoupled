import { Fragment } from "react";
import ParagraphHeroCta from "../paragraph/ParagraphHeroCta";
import ParagraphText from "../paragraph/ParagraphText";
import ParagraphImage from "../paragraph/ParagraphImage";
import ParagraphCodeBlock from "../paragraph/ParagraphCodeBlock";

import type { ComposableComponentProps} from "drupal-composable";
import { openComposableComponent } from "drupal-composable"
interface ComposableComponentContainerProps extends ComposableComponentProps {
  children?: React.ReactNode;
}

const ComposableComponentContainer = ({ action, storage, uuid, children }: ComposableComponentContainerProps) => (
  <section
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

const resolve = (component: any) => {
  if (component.__typename === 'ParagraphHeroCta') {
    return (
        <ParagraphHeroCta
          intro={component.intro}
          title={component.title}
          text={component.text}
          links={component.cta}
        />
    );
  }

  if (component.__typename === 'ParagraphText') {
    return (
        <ParagraphText
          title={component.title}
          text={component.textRich.processed}
        />
    );
  }

  if (component.__typename === 'ParagraphImage') {
    return (
        <ParagraphImage
          image={component.image}
        />
    );
  }

  if (component.__typename === 'ParagraphCodeBlock') {
    return (
        <ParagraphCodeBlock
            title={component.title}
            code={component.code}
            language={component.language}
            showLineNumbers={component.showLineNumbers}
        />
    )
  }

  return <></>;
};

export const componentResolver = (data = [] as any, environment: string) => {
  const components: any = [];

  data.forEach((component: any) => {
    const reactComponent = resolve(component);
    if (environment === 'preview') {
      components.push(
        <ComposableComponentContainer
          action='edit'
          storage='paragraph'
          uuid={component.id}
        >
          {reactComponent}
        </ComposableComponentContainer>
      );

      return;
    }

    components.push(reactComponent);
  });

  return components;
};

export default componentResolver;