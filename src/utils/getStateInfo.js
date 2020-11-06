const getStateInfo = (state1, state2, key) => {
  state1 = JSON.stringify(state1?.[key]);
  state2 = JSON.stringify(state2?.[key]);

  return {
    defined: !!state1 && !!state2,
    changed: state2 !== state1,
  };
};

export default getStateInfo;
