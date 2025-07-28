import { FragmentOf } from 'gql.tada'

import { NodeArticleFragment, NodePageFragment } from '@/graphql/fragments/node'
import { TermTagsFragment } from '@/graphql/fragments/terms'

import NodeArticleComponent from '@/integration/node/NodeArticle'
import NodePageComponent from '@/integration/node/NodePage'
import TermTagsComponent from '@/integration/taxonomy/TermTags'

import { PageProps } from '@/.next/types/app/layout'
import { Footer, Header } from '@/components/blocks'
import { getDrupalData } from '@/services/graphql-helper'



export default async function Page({ params }: PageProps) {
  const { type, entity, environment, header, footer } = await getDrupalData({
    params: await params,
  })
  if (!type || !entity) {
    return null
  }

  return (
    <>
      <Header
        logo={header.logo}
        navItems={header.navItems}
        sticky={header.sticky}
        actions={header.actions}
      />
      {type === 'NodePage' && (
        <NodePageComponent
          node={entity as FragmentOf<typeof NodePageFragment>}
          environment={environment}
        />
      )}
      {type === 'NodeArticle' && (
        <NodeArticleComponent
          node={entity as FragmentOf<typeof NodeArticleFragment>}
          environment={environment}
        />
      )}
      {type === 'TermTags' && (
        <TermTagsComponent
          term={entity as FragmentOf<typeof TermTagsFragment>}
        />
      )}
      <Footer
        logo={footer.logo}
        copyrightText={footer.copyrightText}
        columns={[]}
      />
    </>
  )
}
