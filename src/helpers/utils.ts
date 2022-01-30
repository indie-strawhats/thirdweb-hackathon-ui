/**
 * No operation (dummy function)
 */
export const noop = () => {};

export const isNotNullAndUndefined = (value: any) => value !== null && value !== undefined;

export const secondsToMinutes = (seconds: number) => {
  const minutes = seconds / 60;
  return minutes;
};
