export const SITE_NAME = "FreeAPIHub";
export const SITE_URL = "https://freeapihub.xyz";

export function toAbsoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
