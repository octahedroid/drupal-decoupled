import { ImageType } from "./types";

type ImageProps = {
  variant?: "primary";
  style?: React.CSSProperties;
} & ImageType;

export default function Image({
  url,
  alt = "Enter Image Alt",
  width,
  height,
  className,
  title,
  variant = "primary", style }: ImageProps) {
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
