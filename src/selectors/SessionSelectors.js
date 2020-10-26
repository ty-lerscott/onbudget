export const hasAppLoaded = (state) => {
  const { auth } = state.firebase;

  return !!auth.isLoaded;
};
