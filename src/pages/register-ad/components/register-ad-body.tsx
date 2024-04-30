import Map from "../../../components/common/map";
import Input from "../../../components/ui/input";
import { UseFormReturn } from "react-hook-form";
import Button from "../../../components/ui/button";
import Textarea from "../../../components/ui/textarea";
import { AdsSchemaType } from "../../../utils/schemas/ads";
import { numberSeparator } from "../../../utils/numbers";
import { cn } from "../../../lib/utils";

interface Props {
  loading: boolean;
  type: "create" | "edit";
  form: UseFormReturn<AdsSchemaType>;
}

const RegisterAdBody = ({ form, loading, type }: Props) => {
  const { register, watch, formState, setValue, clearErrors } = form;

  return (
    <>
      {type === "create" ? <h1>ثبت آگهی</h1> : null}

      <div className="flex flex-col gap-4 items-center w-full">
        <span>موقعیت مکانی آگهی</span>

        {/* MAP */}
        <div className="w-full">
          <div className={cn("w-full h-96 rounded-lg overflow-hidden", type === "edit" && "h-60")}>
            <Map
              onChange={(lat, lng) => {
                setValue("lat", lat);
                setValue("lng", lng);
                clearErrors("lat");
                clearErrors("lng");
              }}
            />
          </div>
          <p className="h-5 mt-1.5 indent-1 text-xs text-red-500">
            {formState.errors.lat?.message || formState.errors.lng?.message}
          </p>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <Input
          variant={"filled"}
          label="استان"
          {...register("province")}
          error={formState.errors.province?.message}
        />
        <Input
          variant={"filled"}
          label="شهر"
          {...register("city")}
          error={formState.errors.city?.message}
        />
      </div>
      <Input
        variant={"filled"}
        label="جزئیات آدرس"
        {...register("address")}
        error={formState.errors.address?.message}
      />

      {/* METERAGE */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="flex flex-col">
          <Input
            {...register("meterage", { valueAsNumber: true })}
            dir="ltr"
            type="number"
            label="متراژ"
            variant={"filled"}
            inputMode="numeric"
            error={formState.errors.meterage?.message}
          />

          {watch("meterage") ? <p>{numberSeparator(watch("meterage"))} متر</p> : null}
        </div>
        <div className="flex flex-col">
          <Input
            {...register("price", { valueAsNumber: true })}
            type="number"
            dir="ltr"
            label="قیمت"
            variant={"filled"}
            inputMode="numeric"
            error={formState.errors.price?.message}
          />

          {watch("price") ? <p>{numberSeparator(watch("price"))} تومان</p> : null}
        </div>
      </div>
      <Input
        maxLength={11}
        label="شماره موبایل"
        variant={"filled"}
        type="tel"
        inputMode="tel"
        {...register("phoneNumber")}
        error={formState.errors.phoneNumber?.message}
      />
      <Input
        {...register("title")}
        label="عنوان"
        variant={"filled"}
        error={formState.errors.title?.message}
      />
      <Textarea
        {...register("description")}
        label="توضیحات"
        variant={"filled"}
        error={formState.errors.description?.message}
      />
      <div className="self-end">
        <Button
          type="submit"
          width={"lg"}
          loading={loading}
          disabled={formState.submitCount > 0 && Object.values(formState.errors).length > 0}
        >
          {type === "create" ? "ثبت آگهی" : "ویرایش آگهی"}
        </Button>
      </div>
    </>
  );
};

export default RegisterAdBody;
