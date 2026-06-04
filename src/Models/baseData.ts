export interface TCategory_Meta {
  icon: string;
  bg: string;
  label: string;
}

const formatLabel = (key: string) =>
  key.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const createMeta = (
  key: string,
  icon: string,
  bg: string,
): TCategory_Meta => ({
  icon,
  bg,
  label: formatLabel(key),
});
