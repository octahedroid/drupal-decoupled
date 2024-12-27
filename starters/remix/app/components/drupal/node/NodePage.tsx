import { FragmentOf, readFragment } from 'gql.tada'
import { NodePageFragment } from '~/graphql/drupal/fragments/node'
import ComponentRenderer from '~/components/helpers/ComponentRenderer'

type NodePageComponentProps = {
  node: FragmentOf<typeof NodePageFragment>
  environment: string
}

export default function NodePageComponent({
  node,
  environment,
}: NodePageComponentProps) {
  const { id, title, summary, showTitle, components } = readFragment(
    NodePageFragment,
    node
  )

  const data = {
    root: {
      props: {
        id,
        title,
        summary,
        showTitle,
      },
    },
    content: components ? components.map((component) => {
      return {
        type: component.__typename,
        props: {
          ...component,
        }
      }
    }) : []
  }

  return (
    <>
      <ComponentRenderer
        key={id}
        data={data}
        environment={environment}
      />
    </>
  )
}
