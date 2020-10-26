export const isAuthenticated = (state) => {
  const { auth, isInitializing } = state.firebase;

  if (isInitializing || !auth.isLoaded) {
    return null;
  }

  if (auth.isLoaded) {
    return !!auth.uid;
  }

  return false;
};
