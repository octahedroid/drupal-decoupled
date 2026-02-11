interface CalculatePathArgs {
  path: string | undefined;
  url: Request["url"];
}

export const calculatePath = ({
  path = "/",
  url,
}: CalculatePathArgs): string => {
  if (path.startsWith("node/preview")) {
    const { searchParams } = new URL(url);
    if (searchParams.has("token")) {
      return `${path}?token=${searchParams.get("token")}`;
    }
  }

  return path;
};
