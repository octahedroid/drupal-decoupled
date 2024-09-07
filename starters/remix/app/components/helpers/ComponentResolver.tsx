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
} from '~/graphql/drupal/fragments/paragraph'

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
} from '~/components/helpers/drupal'

// UI components
import {
  CardGroup,
  Hero,
  CTA,
  FAQ,
  LogoGroup,
  Testimonial,
} from '~/components/ui/';

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
  type: string,
  paragraph: ParagraphFragmentType,
): JSX.Element {
  if (type === 'ParagraphHero') {
    const paragraphHero = ParagraphHeroResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphHeroFragment>,
    })

    return <Hero key={paragraphHero.id} {...paragraphHero} />
  }

  if (type === 'ParagraphCardGroup') {
    const paragraphCardGroup = ParagraphCardGroupResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphCardGroupFragment>,
    })

    return <CardGroup key={paragraphCardGroup.id} {...paragraphCardGroup} />
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

      const featured = cards[0];
      return (
        <>
          <Hero
            heading={featured.heading}
            image={featured.image}
            description={featured.summary}
            actions={[
              {
                href: featured.link.href,
                text: featured.link.text
              }
            ]}
          />
          <CardGroup
            key={id}
            heading={heading}
            subheading={subheading}
            description={description}
            cards={cards.splice(1)}
            action={action}
          />
        </>
      )
    }

    if (view === 'blog' && display === 'blog_teaser') {
      return (
        <CardGroup
          key={id}
          heading={heading}
          subheading={subheading}
          description={description}
          cards={cards}
          action={action}
        />
      )
    }

    return <pre>{JSON.stringify(paragraph, null, 2)};</pre>
  }

  if (type === 'ParagraphCta') {
    const paragraphCta = ParagraphCtaResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphCtaFragment>,
    })

    return <CTA key={paragraphCta.id} {...paragraphCta} />
  }

  if (type === 'ParagraphFaq') {
    const paragraphFaq = ParagraphFaqResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphFaqFragment>,
    })

    return <FAQ key={paragraphFaq.id} {...paragraphFaq} />
  }

  if (type === 'ParagraphLogoGroup') {
    const paragraphLogoGroup = ParagraphLogoGroupResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphLogoGroupFragment>,
    })

    return <LogoGroup key={paragraphLogoGroup.id} {...paragraphLogoGroup} />
  }

  if (type === 'ParagraphTestimonial') {
    const paragraphTestimonial = ParagraphTestimonialResolver({
      paragraph: paragraph as FragmentOf<typeof ParagraphTestimonialFragment>,
    })

    return <Testimonial key={paragraphTestimonial.id} {...paragraphTestimonial} />
  }

  if (type === 'ParagraphWebform') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const paragraphWebform = ParagraphWebformResolver({
      paragraph: paragraph as FragmentOf<
        typeof ParagraphWebformFragment
      >,
    })
  }

  // @todo: implement Webform React Component
  return (
    <div className='container'>
      <h2 className="mb-5 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">Implement Form Componet</h2>
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

  return paragraphUnionFragment.map(paragraph => {
    const type = paragraph.__typename
    const skipComponents = [
      'ParagraphSimpleCard',
      'ParagraphLogo',
      'ParagraphPeople',
      'ParagraphQuestion',
      'ParagraphImage',
    ]

    if (!type || skipComponents.includes(type)) {
      return <></>
    }

    return calculateComponent(type, paragraph)
  })
}
