export type ImageType = {
  url: string;
  alt: string;
  title: string | null;
  width: number | string | null;
  height: number | string | null;
  className: string | null;
}

export type UserType = {
  name: string;
  picture: ImageType;
}
