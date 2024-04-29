export const errorMessages = Object.freeze({
  required: (name: string) => `لطفا ${name} را وارد نمایید`,
  invalidFormat: (name: string) => `فرمت ${name} وارد شده صحیح نمی‌باشد`,
  minLength: (name: string, min: number) => `${name} نمی‌تواند کمتر از ${min} کاراکتر داشته باشد`,
  maxLength: (name: string, max: number) => `${name} نمی‌تواند بیشتر از ${max} کاراکتر داشته باشد`,
});
