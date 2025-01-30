import { Editor, Render } from '~/integration/editor'


interface Parapraph {
  __typename: string
}

interface NodeRenderer {
  node: {
    id: string
    components: Parapraph[]
  }
  environment: string
}

export default function NodeRenderer({
  node,
  environment,
}: NodeRenderer) {
  // @todo: implement toolbar to enable editing
  const data = {
    root: {
      props: {
        id: node.id,
      },
    },
    content: node.components ? node.components.map((component) => {
      return {
        type: component.__typename,
        props: {
          ...component,
        }
      }
    }) : []
  }

  if (environment === 'preview') {
    return <Editor data={data} />
  }

  return <Render data={data} />
}
