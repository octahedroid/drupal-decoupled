export type ImageType = {
  url: string;
  alt: string;
  title?: string | null;
  width?: number | string | null;
  height?: number | string | null;
  className?: string | null;
}

export type ImageProps = {
  variant?: "primary";
  style?: React.CSSProperties;
} & ImageType;

export const ImageDefaultProps: ImageType = {
  title: "Lorem ipsum",
  url: "https://drupal-graphql-example.ddev.site/sites/default/files/2024-05/doc-tahedroid-avatar.png",
  alt: "Placeholder",
  width: 'auto',
  height: 'auto',
  className: ""
};

export default function Image(
  {
    url,
    alt = "Enter Image Alt",
    width,
    height,
    className,
    title,
    variant = "primary", 
    style 
  }: ImageProps
) {

  const wrapperClass = {
    primary: "flex items-center justify-center",
  };
  
  return (
    <div className={wrapperClass[variant]}>
      <img
        src={url}
        alt={alt}
        title={title ?? ""}
        className={className ?? ""}
        width={width ?? "auto"}
        height={height ?? "auto"}
        style={style ?? {}}
      />
    </div>
  );
}
