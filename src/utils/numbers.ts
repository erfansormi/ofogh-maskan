export const numberOutput = (value: string | number) => +String(value).replace(/\D/gi, "");

export const removeSeparator = (value: string) => value.replace(/,/g, "");

export const numberSeparator = (value: number | string) =>
  Number(String(value).replace(/\D/gi, "")).toLocaleString();
