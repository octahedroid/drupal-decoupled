
import { FragmentOf, readFragment } from 'gql.tada'
import { NodePageFragment } from '@/graphql/fragments/node'
import ComponentResolver from '../resolvers/ComponentResolver'

type NodePageComponentProps = {
  node: FragmentOf<typeof NodePageFragment>
  environment: string
}

export default function NodePageComponent({ node }: NodePageComponentProps) {
  const { title, showTitle, components } = readFragment(NodePageFragment, node)

  return (
    <>
      {showTitle && (
        <h1 className="container mx-auto text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
          {title}
        </h1>
      )}
      
      <ComponentResolver components={components as any} /> 
    </>
  )
}
