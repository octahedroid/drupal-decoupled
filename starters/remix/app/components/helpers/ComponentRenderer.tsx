import { Fragment } from 'react';
import { VisualEditor } from '~/components/helpers/VisualEditor';

interface ComponentsProps {
  components: Array<JSX.Element>;
  environment: string;
}

export function ComponentRenderer({ components, environment } : ComponentsProps) {
  
  // If we are in preview mode, render the VisualEditor
  if (environment === 'preview') {
    const ids = components.map((component) => {
      const id = component.props.paragraph ? component.props.paragraph.id : component.key;

      return id;
    });

    const componentMapping = components.reduce((acc, component) => {
      const id = component.props.paragraph ? component.props.paragraph.id : component.key;
      acc[id] = component;
      return acc;
    }, {} as { [key: string]: JSX.Element });

    return (
      <VisualEditor ids={ids} componentMapping={componentMapping} />
    );
  }

  // If we are not in preview mode, render the components as they are
  return (
    <>
      {components.map((component, index: number) => {
        return <Fragment key={index}>{component}</Fragment>;
      })}
    </>
  );
}