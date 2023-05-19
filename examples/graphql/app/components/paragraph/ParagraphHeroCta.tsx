interface ParagraphHeroCtaProps {
  intro: string;
  title: string;
  text: string;
  links: {
    link: string;
    title: string;
  }[];
}

export default function ParagraphHeroCta({ intro, title, text, links }: ParagraphHeroCtaProps) {
  return (
    <div className="bg-indigo-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            {intro}
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {title}
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-700">{text}</p>
        </div>
        <div className="mt-8 flex justify-center">
          {links.map((link, index) => {
            return (
              <div key={index} className="ml-3 inline-flex">
                <a
                  href={link.link}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-200"
                >
                  {link.title}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
