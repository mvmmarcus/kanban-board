import cookie from "js-cookie";

export const setCookie = (
  name: string,
  value: string,
  options: {
    [key: string]: string | number;
  } = {}
): void => {
  cookie.set(name, value, options);
};

export const getCookie = (name: string): string | undefined => {
  return cookie.get(name);
};

export const clearCookie = (name: string): void => {
  cookie.remove(name);
};
