import { Editor, Render } from '~/components/resolvers/Puck'

interface ComponentsProps {
  data: object
  environment: string
}

export default function ComponentRenderer({
  data,
  environment,
}: ComponentsProps) {
  // @todo: implement toolbar to enable editing
  if (environment === 'preview') {
    return <Editor data={data} />
  }

  return <Render data={data} />
}
