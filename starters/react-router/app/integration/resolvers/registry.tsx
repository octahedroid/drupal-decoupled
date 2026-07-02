import { defineRegistry } from "@json-render/react";

import { CardGroup } from "~/components/blocks/CardGroup/CardGroup";
import { CTA } from "~/components/blocks/CTA/CTA";
import { FAQ } from "~/components/blocks/FAQ/FAQ";
import { Hero } from "~/components/blocks/Hero/Hero";
import { LogoGroup } from "~/components/blocks/LogoGroup/LogoGroup";
import { Testimonial } from "~/components/blocks/Testimonial/Testimonial";
import { ViewReference } from "~/components/blocks/ViewReference/ViewReference";
import { Webform, webformComponents } from "~/components/blocks/Webform/Webform";
import { ContactForm } from "~/integration/forms/ContactForm/ContactForm";
import { catalog } from "~/integration/resolvers/catalog";
import {
  Button,
  Grid,
  Heading,
  Image,
  Section,
  Stack,
  Text,
} from "~/components/primitives";

webformComponents.contact_form = ContactForm;

export const { registry } = defineRegistry(catalog, {
  components: {
    NodePage: ({ children }) => <>{children}</>,
    NodeArticle: ({ children }) => <>{children}</>,
    ParagraphHero: ({ props }) => <Hero {...props} />,
    ParagraphCta: ({ props }) => <CTA {...props} />,
    ParagraphCardGroup: ({ props }) => <CardGroup {...props} />,
    ParagraphFaq: ({ props }) => <FAQ {...props} />,
    ParagraphLogoGroup: ({ props }) => <LogoGroup {...props} />,
    ParagraphTestimonial: ({ props }) => <Testimonial {...props} />,
    ParagraphViewReference: ({ props }) => <ViewReference {...props} />,
    ParagraphWebform: ({ props }) => (<Webform {...props}  />),
    Section: ({ props, children }) => <Section {...props}>{children}</Section>,
    Grid: ({ props, children }) => <Grid {...props}>{children}</Grid>,
    Stack: ({ props, children }) => <Stack {...props}>{children}</Stack>,
    Heading: ({ props }) => <Heading {...props} />,
    Text: ({ props }) => <Text {...props} />,
    Button: ({ props }) => <Button {...props} />,
    Image: ({ props }) => <Image {...props} />,
  },
});
