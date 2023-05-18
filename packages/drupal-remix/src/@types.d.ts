type MetaTagUnion = (MetaTagLink | MetaTagValue | MetaTagProperty) & {
    __isUnion?: true;
  };
  
  interface MetaTagLink {
    tag: string;
    attributes: MetaTagLinkAttributes;
    __typename: "MetaTagLink";
  }
  
  type MetaTag = (MetaTagLink | MetaTagValue | MetaTagProperty) & {
    __isUnion?: true;
  };
  
  interface MetaTagLinkAttributes {
    rel?: string;
    href?: string;
    __typename: "MetaTagLinkAttributes";
  }
  
  interface MetaTagValue {
    tag: string;
    attributes: MetaTagValueAttributes;
    __typename: "MetaTagValue";
  }
  
  interface MetaTagValueAttributes {
    name?: string;
    content?: string;
    __typename: "MetaTagValueAttributes";
  }
  
  interface MetaTagProperty {
    tag: string;
    attributes: MetaTagPropertyAttributes;
    __typename: "MetaTagProperty";
  }
  
  interface MetaTagPropertyAttributes {
    property?: string;
    content?: string;
    __typename: "MetaTagPropertyAttributes";
  }
  