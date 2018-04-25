export const updateState = (oldState, updatedProperties) => {
  return {
    ...oldState,
    ...updatedProperties
  };
};