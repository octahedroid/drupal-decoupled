
import { initGraphQLTada } from 'gql.tada';
import { introspection } from '@/graphql/gql.tada.instrospection';

export const graphql = initGraphQLTada<{
  introspection: typeof introspection;
}>();
