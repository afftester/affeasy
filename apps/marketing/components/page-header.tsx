interface DocsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
}

export function DocsPageHeader({
  heading,
  className,
  ...props
}: DocsPageHeaderProps) {
  return (
    <>
      <h1
        className={`mt-5 text-center font-display text-4xl font-extrabold leading-[1.15] sm:text-6xl sm:leading-[1.15] ${className}`}
      >
        {heading}
      </h1>
    </>
  );
}
