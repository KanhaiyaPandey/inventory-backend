export const toPublicUser = (user: any) => {
  const { password, ...rest } = user;
  return rest;
};