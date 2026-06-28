import { metaTags } from "drupal-decoupled/next";
import { type FragmentOf, readFragment } from "gql.tada";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { Footer, Header } from "@/components/blocks";
import { MenuFragment, MenuItemFragment } from "@/graphql/fragments/menu";
import {
  NodeArticleFragment,
  NodePageFragment,
} from "@/graphql/fragments/node";
import { graphql } from "@/graphql/gql.tada";
import type { Spec } from "@json-render/core";
import type { NodeResultOf } from "@/graphql/types";
import NodeArticle from "@/integration/layout/NodeArticle";
import NodePage from "@/integration/layout/NodePage";
import { resolve } from "@/integration/resolvers/resolver";
import { getClient } from "@/utils/client";
import { calculateMetaTags } from "@/utils/metatags";
import { calculatePath } from "@/utils/routes";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const getDrupalData = cache(
  async ({ params }: { params: { slug: string[] } }) => {
    const drupalUrl = process.env.DRUPAL_URL ?? "";
    const logoUrl = `${drupalUrl}/sites/default/files/2024-09/drupal-decoupled.png`;
    const pathFromParams = params.slug?.join("/") || "/home";
    const requestUrl = (await headers()).get("x-url") ?? "";
    const path = calculatePath({ path: pathFromParams, url: requestUrl });

    const client = await getClient({
      url: process.env.DRUPAL_GRAPHQL_URL ?? "",
      auth: {
        uri: drupalUrl,
        clientId: process.env.DRUPAL_CLIENT_ID ?? "",
        clientSecret: process.env.DRUPAL_CLIENT_SECRET ?? "",
      },
    });

    const nodeRouteQuery = graphql(
      `
        query route($path: String!) {
          route(path: $path, revision: "CURRENT") {
            __typename
            ... on RouteInternal {
              entity {
                __typename
                ...NodePageFragment
                ...NodeArticleFragment
              }
            }
          }

          menuMain: menu(name: MAIN) {
            ...MenuFragment
          }

          menuFooter: menu(name: FOOTER) {
            ...MenuFragment
          }
        }
      `,
      [NodePageFragment, NodeArticleFragment, MenuFragment],
    );

    const { data, error } = await client.query(nodeRouteQuery, { path });

    if (error) {
      throw error;
    }

    if (!data || !data.route || data.route.__typename !== "RouteInternal") {
      return redirect("/404");
    }

    if (!data.route.entity) {
      throw new Error("RouteInternal returned no entity");
    }

    const resolveEntity = ({
      entity,
    }: {
      entity: typeof data.route.entity;
    }): NodeResultOf => {
      if (entity.__typename === "NodePage") {
        return readFragment(
          NodePageFragment,
          entity as unknown as FragmentOf<typeof NodePageFragment>,
        );
      }

      if (entity.__typename === "NodeArticle") {
        return readFragment(
          NodeArticleFragment,
          entity as unknown as FragmentOf<typeof NodeArticleFragment>,
        );
      }

      throw new Error(`Unsupported entity type: ${entity.__typename}`);
    };

    const node = resolveEntity({ entity: data.route.entity });

    const menuMain = readFragment(MenuFragment, data.menuMain);
    const navItems = menuMain?.items
      ? menuMain.items.map((item) => {
          const menuItem = readFragment(MenuItemFragment, item);
          return {
            label: menuItem.label,
            href: menuItem.href || undefined,
            expanded: menuItem.expanded,
          };
        })
      : [];

    const menuFooter = readFragment(MenuFragment, data.menuFooter);
    const footerColumns = menuFooter?.items?.length
      ? [
          {
            title: "Navigation",
            links: menuFooter.items.map((item) => {
              const menuItem = readFragment(MenuItemFragment, item);
              return {
                href: menuItem.href || "/",
                children: menuItem.label,
                internal: true,
              };
            }),
          },
        ]
      : [];

    const logo = { src: logoUrl, alt: "Company Logo" };

    const resolveSpec = (entity: NodeResultOf): Spec | null => {
      if (entity.__typename === "NodePage") {
        return resolve({ node: entity });
      }
      return null;
    };

    return {
      node,
      spec: resolveSpec(node),
      header: {
        logo,
        navItems,
        sticky: true,
        actions: [
          {
            text: "Docs",
            href: "https://drupal-decoupled.octahedroid.com/docs",
          },
          {
            text: "Quickstart",
            href: "https://drupal-decoupled.octahedroid.com/docs/getting-started/quickstart/drupal",
          },
        ],
      },
      footer: {
        logo,
        copyrightText: `© ${new Date().getFullYear()} Drupal Decoupled`,
        columns: footerColumns,
      },
      tags: calculateMetaTags(node),
      drupalUrl,
    };
  },
);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tags, drupalUrl } = await getDrupalData({ params: await params });

  return metaTags({
    tags,
    metaTagOverrides: {
      MetaTagLink: {
        canonical: {
          kind: "replace",
          pattern: drupalUrl,
          replacement: drupalUrl,
        },
      },
      MetaTagProperty: {
        "og:url": {
          kind: "replace",
          pattern: drupalUrl,
          replacement: drupalUrl,
        },
      },
      MetaTagValue: {
        "twitter:url": {
          kind: "replace",
          pattern: drupalUrl,
          replacement: drupalUrl,
        },
      },
    },
  });
}

export default async function Page({ params }: PageProps) {
  const { node, spec, header, footer } = await getDrupalData({
    params: await params,
  });

  return (
    <>
      <Header
        logo={header.logo}
        navItems={header.navItems}
        sticky={header.sticky}
        actions={header.actions}
      />
      {node.__typename === "NodePage" && spec && (
        <NodePage node={node} spec={spec} />
      )}
      {node.__typename === "NodeArticle" && <NodeArticle node={node} />}
      <Footer
        logo={footer.logo}
        copyrightText={footer.copyrightText}
        columns={footer.columns}
      />
    </>
  );
}
