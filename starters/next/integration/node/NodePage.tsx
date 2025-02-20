import { FragmentOf, readFragment } from 'gql.tada'
import { NodePageFragment } from '@/graphql/fragments'
import NodeRenderer from '@/integration/helpers/NodeRenderer'

type NodePageComponentProps = {
  node: FragmentOf<typeof NodePageFragment>
  environment: string
}

export default function NodePageComponent({
  node,
  environment,
}: NodePageComponentProps) {
  const { id, components } = readFragment(NodePageFragment, node)

  return (
    <>
      <NodeRenderer
        key={id}
        node={{
          id,
          components,
        }}
        environment={environment}
      />
    </>
  )
}
