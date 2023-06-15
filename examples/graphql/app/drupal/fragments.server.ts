import type {
  ImageGenqlSelection,
  LinkGenqlSelection,
  MediaImageGenqlSelection,
  MetaTagGenqlSelection,
  ParagraphCodeBlockGenqlSelection,
  ParagraphHeroCtaGenqlSelection,
  ParagraphHeroTextGenqlSelection,
  ParagraphImageGenqlSelection,
  ParagraphTextGenqlSelection,
  TextGenqlSelection
} from '~/@types/gen';

const LinkFragment: LinkGenqlSelection = {
  url: true,
  title: true,
  internal: true,
};

const TextFragment: TextGenqlSelection = {
  format: true,
  value: true,
  processed: true,
}

const ImageFragment: ImageGenqlSelection = {
  url: true,
  width: true,
  height: true,
  title: true,
  alt: true,
};

export const MediaImageFragment: MediaImageGenqlSelection = {
  mediaImage: { ...ImageFragment },
};

export const ParagraphHeroCtaFragment: ParagraphHeroCtaGenqlSelection = {
  id: true,
  cta: LinkFragment,
  intro: true,
  text: true,
  title: true
}

export const ParagraphTextFragment: ParagraphTextGenqlSelection = {
  id: true,
  textRich: TextFragment,
  title: true
}

export const ParagraphCodeBlockFragment: ParagraphCodeBlockGenqlSelection = {
  id: true,
  titleOptional: true,
  code: true,
  language: true,
  showLineNumbers: true
}

export const ParagraphHeroTextFragment: ParagraphHeroTextGenqlSelection = {
  id: true,
  intro: true,
  text: true,
  title: true,
}

export const ParagraphImageFragment: ParagraphImageGenqlSelection = {
  id: true,
  image: {
    on_MediaImage: {
      mediaImage: { ...ImageFragment },
    }
  }
}

export const MetaTagFragment: MetaTagGenqlSelection = {
  on_MetaTagLink: {
    attributes: {
      rel: true,
      href: true,
    },
  },
  on_MetaTagValue: {
    attributes: {
      name: true,
      content: true,
    },
  },
  on_MetaTagProperty: {
    attributes: {
      property: true,
      content: true,
    },
  },
};