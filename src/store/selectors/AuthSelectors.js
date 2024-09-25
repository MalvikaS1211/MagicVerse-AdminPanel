export const isAuthenticated = (state) => {
  console.log(state.auth, ":::is authen");
  if (state.auth) return true;
  return false;
};
