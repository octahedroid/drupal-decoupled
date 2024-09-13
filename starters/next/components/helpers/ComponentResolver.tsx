import { FragmentOf, readFragment } from 'gql.tada'

// Drupal - fragments
import {
  ParagraphHeroFragment,
  ParagraphCardGroupFragment,
  ParagraphWebformFragment,
  ParagraphViewReferenceFragment,
  ParagraphCtaFragment,
  ParagraphFaqFragment,
  ParagraphLogoGroupFragment,
  ParagraphTestimonialFragment,
  ParagraphUnionFragment,
} from '@/graphql/drupal/fragments/paragraph'

// Drupal - resolvers
import {
  ParagraphHeroResolver,
  ParagraphCardGroupResolver,
  ParagraphWebformResolver,
  ParagraphViewReferenceResolver,
  ParagraphCtaResolver,
  ParagraphFaqResolver,
  ParagraphLogoGroupResolver,
  ParagraphTestimonialResolver,
} from '@/components/helpers/drupal'

// UI components
import {
  CardGroup,
  Hero,
  CTA,
  FAQ,
  LogoGroup,
  Testimonial,
  TeaserCardProps,
} from '@/components/ui/'

type ParagraphFragmentType =
  | FragmentOf<typeof ParagraphHeroFragment>
  | FragmentOf<typeof ParagraphCardGroupFragment>
  | FragmentOf<typeof ParagraphWebformFragment>
  | FragmentOf<typeof ParagraphViewReferenceFragment>
  | FragmentOf<typeof ParagraphCtaFragment>
  | FragmentOf<typeof ParagraphFaqFragment>
  | FragmentOf<typeof ParagraphLogoGroupFragment>
  | FragmentOf<typeof ParagraphTestimonialFragment>

interface ResolveProps {
  data: FragmentOf<typeof ParagraphUnionFragment>[] | null
}

const calculateComponent = function (
  id: string,
  type: string,
  paragraph: ParagraphFragmentType
): JSX.Element {
  if (type === 'ParagraphHero') {
    const paragraphHero = ParagraphHeroResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphHeroFragment>,
    })

    return (
      <Hero
        id={paragraphHero.id}
        key={paragraphHero.id}
        heading={paragraphHero.heading}
        description={paragraphHero.description}
        image={paragraphHero.image}
        actions={paragraphHero.actions}
      />
    )
  }

  if (type === 'ParagraphCardGroup') {
    const paragraphCardGroup = ParagraphCardGroupResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphCardGroupFragment>,
    })

    return (
      <CardGroup
        id={paragraphCardGroup.id}
        key={paragraphCardGroup.id}
        heading={paragraphCardGroup.heading}
        subheading={paragraphCardGroup.subheading}
        description={paragraphCardGroup.description}
        cards={paragraphCardGroup.cards}
      />
    )
  }

  if (type === 'ParagraphViewReference') {
    const {
      id,
      display,
      view,
      heading,
      subheading,
      description,
      cards,
      action,
    } = ParagraphViewReferenceResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphViewReferenceFragment>,
    })

    if (cards.length === 0) {
      return <></>
    }

    if (view === 'blog' && display === 'blog_featured') {
      const featured = cards[0]
      const remainingCards = cards.splice(1) as TeaserCardProps[]

      return (
        <div id={id}>
          <Hero
            heading={featured.heading}
            image={featured.image}
            description={featured.summary}
            actions={[
              {
                href: featured.link.href,
                text: featured.link.text,
                internal: true,
              },
            ]}
          />
          {cards && (
            <CardGroup
              key={id}
              heading={heading}
              subheading={subheading}
              description={description}
              cards={remainingCards}
              action={action}
            />
          )}
        </div>
      )
    }

    if (view === 'blog' && display === 'blog_teaser') {
      return (
        <CardGroup
          id={id}
          key={id}
          heading={heading}
          subheading={subheading}
          description={description}
          cards={cards as TeaserCardProps[]}
          action={action}
        />
      )
    }
  }

  if (type === 'ParagraphCta') {
    const paragraphCta = ParagraphCtaResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphCtaFragment>,
    })

    return (
      <CTA
        id={paragraphCta.id}
        key={paragraphCta.id}
        heading={paragraphCta.heading}
        description={paragraphCta.description}
        actions={paragraphCta.actions}
      />
    )
  }

  if (type === 'ParagraphFaq') {
    const paragraphFaq = ParagraphFaqResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphFaqFragment>,
    })

    return (
      <FAQ
        id={paragraphFaq.id}
        key={paragraphFaq.id}
        heading={paragraphFaq.heading}
        description={paragraphFaq.description}
        questions={paragraphFaq.questions}
      />
    )
  }

  if (type === 'ParagraphLogoGroup') {
    const paragraphLogoGroup = ParagraphLogoGroupResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphLogoGroupFragment>,
    })

    return (
      <LogoGroup
        id={paragraphLogoGroup.id}
        key={paragraphLogoGroup.id}
        heading={paragraphLogoGroup.heading}
        logos={paragraphLogoGroup.logos}
      />
    )
  }

  if (type === 'ParagraphTestimonial') {
    const paragraphTestimonial = ParagraphTestimonialResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphTestimonialFragment>,
    })

    return (
      <Testimonial
        id={paragraphTestimonial.id}
        key={paragraphTestimonial.id}
        quote={paragraphTestimonial.quote}
        author={paragraphTestimonial.author}
      />
    )
  }

  if (type === 'ParagraphWebform') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const paragraphWebform = ParagraphWebformResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphWebformFragment>,
    })
    // @todo: implement Webform React Component
  }

  return (
    <div id={id} className="container">
      <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
        Implement Form Componet
      </h2>
      <hr />
      <pre>
        <code>{JSON.stringify(paragraph, null, 2)}</code>
      </pre>
    </div>
  )
}

export const resolve = ({ data = [] }: ResolveProps) => {
  if (!data) {
    return []
  }

  const paragraphUnionFragment = readFragment(ParagraphUnionFragment, data)

  return paragraphUnionFragment.map((paragraph) => {
    const type = paragraph.__typename
    const skipComponents = [
      'ParagraphSimpleCard',
      'ParagraphLogo',
      'ParagraphQuestion',
      'ParagraphAuthor',
    ]

    if (!type || skipComponents.includes(type)) {
      return <></>
    }

    return calculateComponent(
      paragraph.id,
      type,
      paragraph as ParagraphFragmentType
    )
  })
}
