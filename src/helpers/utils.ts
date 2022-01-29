/**
 * No operation (dummy function)
 */
export const noop = () => { };

export const isNotNullAndUndefined = (value: any) =>
  value !== null && value !== undefined;


export const secondsToMinutes = (value: Number) => {
  return value / 60;
}
