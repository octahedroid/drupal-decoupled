import { FragmentOf, readFragment } from "gql.tada";
import { TermTagsFragment } from "@/graphql/fragments/terms";
import Title from "@/components/field/Title";

type TermTagsComponentProps = {
  term: FragmentOf<typeof TermTagsFragment>;
};

export default function TermTagsComponent({ term }: TermTagsComponentProps) {
  const termTags = readFragment(TermTagsFragment, term);

  return (
    <>
      <Title>{termTags.name}</Title>
      <div
        dangerouslySetInnerHTML={{
          __html: termTags.description.processed as string,
        }}
      />
    </>
  );
}
