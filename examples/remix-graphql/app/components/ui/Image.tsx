import { ImageType } from "~/components/ui/types";

type ImageProps = {
  variant?: "primary";
  style?: React.CSSProperties;
} & ImageType;

export default function Image({ alt, height, className, title, url, width, variant = "primary", style }: ImageProps) {
  const wrapperClass = {
    primary: "flex items-center justify-center",
  }; 
  
  return (
    <div className={wrapperClass[variant]}>
      <img
        title={title ?? ""}
        src={url}
        className={className ?? ""}
        alt={alt ?? ""}
        width={width ?? ""}
        height={height ?? ""}
        style={style ?? {}}
      />
    </div>
  );
}
