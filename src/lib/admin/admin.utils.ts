export const isInAdminPath = (pathname: string) => {
  return new RegExp("^/admin(/.*)*$").test(pathname);
};
