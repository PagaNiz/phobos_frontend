export function matchRoute(pathname: string, openRoutes: string[]): boolean {
  return openRoutes.some((route) => {
    const regex = new RegExp(
      "^" +
        route
          .replace(/\[.*?\]/g, "[^/]+") // substitui qualquer [param] por um grupo que aceita qualquer caractere exceto '/'
          .replace(/\//g, "\\/") +
        "$"
    );
    return regex.test(pathname);
  });
}

export const openRoutes = ["/esqueci-a-senha", "/trocar-a-senha", "/login"];
