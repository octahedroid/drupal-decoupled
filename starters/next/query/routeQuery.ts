import { graphql } from "gql.tada";
import { NodeArticleFragment, NodePageFragment } from '@/graphql/fragments/node'
import { TermTagsFragment } from "@/graphql/fragments/terms";
import { MenuFragment } from "@/graphql/fragments/menu";

export const RouteQuery= graphql(` query route($path: String!) {
        route(path: $path) {
          __typename
          ... on RouteInternal {
            entity {
              __typename
              ... on NodePage {
                id
                title
              }
              ...NodePageFragment
              ...NodeArticleFragment
              ...TermTagsFragment
            }
          }
        }

        menuMain: menu(name: MAIN) {
          ...MenuFragment
        }

        menuFooter: menu(name: FOOTER) {
          ...MenuFragment
        }
      }`,
          [NodePageFragment, NodeArticleFragment, TermTagsFragment, MenuFragment]
    )