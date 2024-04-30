import { z } from "zod";
import { errorMessages } from "../error-message";

export const adsSchema = z.object({
  lat: z
    .number({
      required_error: errorMessages.required("موقعیت مکانی"),
      invalid_type_error: errorMessages.required("موقعیت مکانی"),
    })
    .min(-90)
    .max(90),

  lng: z
    .number({
      required_error: errorMessages.required("موقعیت مکانی"),
      invalid_type_error: errorMessages.required("موقعیت مکانی"),
    })
    .min(-180)
    .max(180),

  province: z
    .string({ required_error: errorMessages.required("استان") })
    .min(2, errorMessages.minLength("استان", 2)),

  city: z
    .string({ required_error: errorMessages.required("شهر") })
    .min(2, errorMessages.minLength("شهر", 2)),

  address: z
    .string({ required_error: errorMessages.required("جزئیات آدرس") })
    .min(3, errorMessages.minLength("جزئیات آدرس", 3)),

  meterage: z.number({
    required_error: errorMessages.required("متراژ"),
    invalid_type_error: errorMessages.required("متراژ"),
  }),

  price: z.number({
    required_error: errorMessages.required("قیمت"),
    invalid_type_error: errorMessages.required("قیمت"),
  }),

  phoneNumber: z
    .string({ required_error: errorMessages.required("شماره موبایل") })
    .min(11, errorMessages.minLength("شماره موبایل", 11))
    .max(11, errorMessages.minLength("شماره موبایل", 11))
    .regex(/^09/, errorMessages.invalidFormat("شماره موبایل")),

  title: z
    .string({ required_error: errorMessages.required("عنوان") })
    .min(3, errorMessages.minLength("عنوان", 3)),

  description: z
    .string({ required_error: errorMessages.required("توضیحات") })
    .min(3, errorMessages.minLength("توضیحات", 3)),
});
export type AdsSchemaType = z.infer<typeof adsSchema>;
export type AdsDataType = Omit<AdsSchemaType, "lat" | "lng"> & {
  id: number;
  location: [number, number];
};
