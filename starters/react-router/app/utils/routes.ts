interface CalculatePathArgs {
  path?: string;
  url: string;
}

export const calculatePath = ({
  path = "/",
  url,
}: CalculatePathArgs): string => {
  if (path.startsWith("node/preview")) {
    const { searchParams } = new URL(url);
    const token = searchParams.get("token");
    if (token) {
      return `${path}?token=${token}`;
    }
  }

  return path;
};
