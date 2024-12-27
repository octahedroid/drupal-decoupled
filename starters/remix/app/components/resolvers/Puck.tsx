import type { Config} from "@measured/puck";
import { Puck as PuckEditor, Render as PuckRender } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "~/components/resolvers/Config";

import { Component, Field } from "~/components/resolvers/types";

// @todo: Move function to a helper file.
//        Return a new object with the same keys as the original object, 
//        but with the values transformed by the function.
function transformProps(data: any, config: Config) {

  // @todo: Remove this once PuckEditor is updated to handle this automatically or when when could
  //        pass the dataToUpdate to the transformProps function.
  // data = transformProps(data, {
  //   ParagraphFaq: ({ descriptionOptional, ...props }) => ({ description: descriptionOptional, ...props }),
  // });
  
  const dataToUpdate = {};
  Object.entries(config.components).forEach(([componentName, value]) => {
    const { fields } = value as Component;
    Object.entries(fields!).map(([key, value]) => {
      const { config } = value as Field;
      if (config?.fieldName) {
        const { fieldName } = config;
        // @ts-ignore
        dataToUpdate[componentName] = {
          originalFieldName: key,
          replaceFieldName: fieldName
        };
      }
    });
  });

  data.content.forEach((component: any, key: number) => {
    const { type } = component;
    if (type in dataToUpdate) {
      // @ts-ignore
      const { originalFieldName, replaceFieldName } = dataToUpdate[type];
      data.content[key]['props'][replaceFieldName] = data.content[key]['props'][originalFieldName];
      delete data.content[key]['props'][originalFieldName];
    }
  });
}

// @todo: Use a GraphQL mutation to save the data if possible
const save = async (data: any) => {
  // @fix: Update invalid CMS fields before saving.
  transformProps(data, config);
  
  // @ts-ignore
  const url = `http://drupal-decoupled.ddev.site/visual_editor/node/${data.root.props.id}/update`;
  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data),
  })
};

export function Render({ data }: { data: object }) {
  return <PuckRender
    config={config as Config}
    data={data}
  />;
}

export function Editor({ data }: { data: object }) {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-800">
      <PuckEditor
        config={config as Config}
        data={data}
        onPublish={save}
      />
    </div>
  )
}