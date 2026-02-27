interface CalculatePathArgs {
  path: string | undefined;
  token: string;
}

export const calculatePath = ({
  path = "/",
  token,
}: CalculatePathArgs): string => {
  if (path.startsWith("node/preview") && token) {
    return `${path}?token=${token}`;
  }

  return path;
};
