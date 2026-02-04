export const toPublicUser = (user: any) => {
  const { ...rest } = user;
  return rest;
};
