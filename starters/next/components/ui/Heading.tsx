type HeadingProps = {
  level: 'h1' | 'h2';
  children: React.ReactNode;
};

export default function Heading({ level, children }: HeadingProps) {
  const HeadingTag = `${level}` as keyof JSX.IntrinsicElements;
  const headingClasses = {
    'h1': 'text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left',
    'h2': 'mt-2 block text-4xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl',
  };

  return (
    <HeadingTag className={headingClasses[level]}>
      {children}
    </HeadingTag>
  );
}
