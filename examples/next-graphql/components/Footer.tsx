import Container from './Container'

export default function Footer() {
  const technologies = [
    {
      name: 'Next.js',
      url: 'https://nextjs.org/',
    },
    {
      name: 'Tailwind',
      url: 'https://tailwindcss.com/',
    },
    {
      name: 'Drupal',
      url: 'https://www.drupal.org/',
    },
    {
      name: 'GraphQL Compose',
      url: 'https://www.drupal.org/project/graphql_compose',
    },
    {
      name: 'GQL Tada',
      url: 'https://gql-tada.0no.co/',
    },
  ]
  return (
    <footer className="bg-accent-1 border-t border-accent-2 mt-28 mb-24">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl font-bold">
            A blog example using:{' '}
            {technologies.map((tech, index) => (
              <span key={tech.name}>
                <a
                  href={tech.url}
                  className="underline hover:text-success duration-200 transition-colors"
                >
                  {tech.name}
                </a>
                {index < technologies.length - 1 ? (index === technologies.length - 2 ? ' & ' : ', ') : ''}
              </span>
            ))}
          </h3>
        </div>
      </Container>
    </footer>
  )
}
