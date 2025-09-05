import { ParagraphCardGroupResolver } from "@/integration/resolvers/ParagraphCardGroupResolver";
import { ParagraphCtaResolver } from "@/integration/resolvers/ParagraphCtaResolver";
import { ParagraphFaqResolver } from "@/integration/resolvers/ParagraphFaqResolver";
import { ParagraphHeroResolver } from "@/integration/resolvers/ParagraphHeroResolver";
import { ParagraphLogoGroupResolver } from "@/integration/resolvers/ParagraphLogoGroupResolver";
import { ParagraphTestimonialResolver } from "@/integration/resolvers/ParagraphTestimonialResolver";
import { ParagraphViewReferenceResolver } from "@/integration/resolvers/ParagraphViewReferenceResolver";
import { ParagraphWebformResolver } from "@/integration/resolvers/ParagraphWebformResolver";

type ComponentResolver = {
  component: React.ComponentType<any>;
  // getprops: (item: any) => any;
};

const componentMap: Record<string, ComponentResolver> = {
  ParagraphHero: {
    component: ParagraphHeroResolver, // ✅ This is now correct
    // getprops: (item) => item,
  },
  ParagraphLogoGroup:{
    component: ParagraphLogoGroupResolver,
  },
  ParagraphCardGroup:{
    component: ParagraphCardGroupResolver,
  },
  ParagraphCta:{
    component: ParagraphCtaResolver,
  },
  ParagraphTestimonial:{
    component: ParagraphTestimonialResolver,
  },
  ParagraphFaq:{
    component: ParagraphFaqResolver,
  },
  ParagraphWebform:{
    component: ParagraphWebformResolver,
  },
  ParagraphViewReference:{
    component: ParagraphViewReferenceResolver,
  }
}

export function resolveComponent(type: string): ComponentResolver | null {
  return componentMap[type] || null;
}