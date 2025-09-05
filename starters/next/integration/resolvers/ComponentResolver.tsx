import { readFragment } from 'gql.tada';
import React from 'react';
import { ParagraphUnionFragment } from '@/graphql/fragments/paragraph';
import { resolveComponent } from '@/services/component-mapping';
import { ResolverProps } from '@/types/component-resolver';

export const ComponentResolver =
  ({
  components,
}: ResolverProps) => {
  const paragraphUnionFragment = readFragment(
    ParagraphUnionFragment,
    components
  )

  if (!paragraphUnionFragment) {
    return []
  }

  return paragraphUnionFragment.map((paragraph, index) => {
    // @ts-expect-error - __typename defined on paragraph
    const type = paragraph.__typename as string
    const resolver = resolveComponent(type);

    if (!resolver) {
      return <div>No resolver found for:</div>;
    }

    const Component = resolver.component;

    return <Component key={index} paragraph={paragraph} />;
  }
)}

export default ComponentResolver;
