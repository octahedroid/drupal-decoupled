export type ImageType = {
  url: string;
  title: string | null;
  alt: string | null;
  width: number | string | null;
  height: number | string | null;
  className: string | null;
}

export type UserType = {
  name: string;
  picture: ImageType;
}
