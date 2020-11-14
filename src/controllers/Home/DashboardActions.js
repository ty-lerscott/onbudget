import { LOADING_COMPLETE } from "state/UIReducer";

export const setLoadingComplete = (componentName) => ({
  type: `SET_${LOADING_COMPLETE}`,
  payload: componentName,
});
