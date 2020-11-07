import { useReducer } from "react";

const SET_FORM_DIRTY = "SET_FORM_DIRTY";
const SET_FORM_VALUES = "SET_FORM_VALUES";
const SET_MODAL_IS_OPEN = "SET_MODAL_IS_OPEN";
const SET_FORM_SUBMITTING = "SET_FORM_SUBMITTING";
const SET_FORM_FIELDS_MOUNTED = "SET_FORM_FIELDS_MOUNTED";

const initialState = {
  values: {
    name: "",
    isBill: false,
    isDeposit: false,
  },
  state: {
    isModalOpen: false,
    isFormDirty: false,
    isSubmitting: false,
    areFieldsMounted: false,
  },
};

export const getInitialState = (importedState) => ({
  ...initialState,
  ...importedState,
});

const reducer = (initialState, { type, payload }) => {
  switch (type) {
    case SET_FORM_DIRTY:
      return {
        ...initialState,
        state: {
          ...initialState.state,
          isFormDirty: payload,
        },
      };

    case SET_FORM_VALUES:
      return {
        values: {
          ...initialState.values,
          ...payload,
        },
        state: {
          ...initialState.state,
          isFormDirty: true,
        },
      };

    case SET_MODAL_IS_OPEN:
      return {
        ...initialState,
        state: {
          ...initialState.state,
          isModalOpen: payload,
        },
      };

    case SET_FORM_SUBMITTING:
      return {
        ...initialState,
        state: {
          ...initialState.state,
          isSubmitting: payload,
          isFormDirty: false,
        },
      };

    case SET_FORM_FIELDS_MOUNTED:
      return {
        ...initialState,
        state: {
          ...initialState.state,
          areFieldsMounted: payload,
          isFormDirty: false,
        },
      };

    default:
      return initialState;
  }
};

const CategoryState = (importedState = {}) => {
  const [state, dispatch] = useReducer(reducer, getInitialState(importedState));
  const createAction = (type) => (payload) => dispatch({ type, payload });

  return [
    state,
    {
      setFormValues: createAction(SET_FORM_VALUES),
      setIsFormDirty: createAction(SET_FORM_DIRTY),
      setIsModalOpen: createAction(SET_MODAL_IS_OPEN),
      setIsSubmitting: createAction(SET_FORM_SUBMITTING),
      setAreFieldsMounted: createAction(SET_FORM_FIELDS_MOUNTED),
    },
  ];
};

export default CategoryState;
