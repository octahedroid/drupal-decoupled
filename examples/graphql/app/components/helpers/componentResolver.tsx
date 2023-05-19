import ParagraphHeroCta from "../paragraph/ParagraphHeroCta";
import ParagraphText from "../paragraph/ParagraphText";
import ParagraphImage from "../paragraph/ParagraphImage";
import ParagraphCodeBlock from "../paragraph/ParagraphCodeBlock";

const resolve = (component: any) => {
  if (component.__typename.includes(`ParagraphHeroCta`)) {
    return (
      <ParagraphHeroCta
        intro={component.intro}
        title={component.title}
        text={component.text}
        links={component.cta}
      />
    );
  }

  if (component.__typename.includes(`ParagraphText`)) {
    return (
      <ParagraphText
        title={component.title}
        text={component.textRich.processed}
      />
    );
  }

  if (component.__typename.includes(`ParagraphImage`)) {
    return (
      <ParagraphImage
        image={component.image}
      />
    );
  }

  if (component.__typename.includes(`ParagraphCodeBlock`)) {
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

export const componentResolver = (data = [] as any) => {
  const components: any = [];

  data.forEach((component: any) => {
    components.push(resolve(component));
  });

  return components;
};

export default componentResolver;