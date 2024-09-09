import { FragmentOf, readFragment } from 'gql.tada'
import { NodePageFragment } from '@/graphql/drupal/fragments/node'
import { resolve } from '@/components/helpers/ComponentResolver'
import { ComponentRenderer } from '@/components/helpers/ComponentRenderer'

type NodePageComponentProps = {
  node: FragmentOf<typeof NodePageFragment>
  environment: string
}

export default function NodePageComponent({
  node,
  environment,
}: NodePageComponentProps) {
  const { id, components: nodePageComponents } = readFragment(
    NodePageFragment,
    node
  )
  const components = resolve({
    data: nodePageComponents,
  })

  return (
    <>
      <ComponentRenderer
        key={id}
        components={components}
        environment={environment}
      />
    </>
  )
}
