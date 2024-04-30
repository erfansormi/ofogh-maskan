import Layout from "../../components/layout";
import Map from "../../components/common/map";
import Input from "../../components/ui/input";
import Textarea from "../../components/ui/textarea";
import { useForm } from "react-hook-form";
import { adsSchema, AdsSchemaType } from "../../utils/schemas/ads";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/ui/button";
import { numberSeparator } from "../../utils/numbers";
import { AdsServicesAPI } from "../../services/ads";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useDataStates } from "../../hooks/use-data-states";
import { useUserContext } from "../../context/user-context";

const RegisterAdPage = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { loading, setLoading } = useDataStates();

  const { formState, clearErrors, handleSubmit, register, setValue, watch } =
    useForm<AdsSchemaType>({
      resolver: zodResolver(adsSchema),
    });

  const onSubmit = (data: AdsSchemaType) => {
    setLoading(true);
    const body = { ...data, lat: undefined, lng: undefined };

    setTimeout(() => {
      AdsServicesAPI.create({ ...body, location: [data.lat, data.lng], userId: user?.id || 1 })
        .then(() => {
          toast.success("آگهی با موفقیت ثبت شد");
          navigate("/");
        })
        .catch((err: AxiosError<string>) => {
          toast.error(err.response?.data || err.message);
        })
        .finally(() => setLoading(false));
    }, 1000);
  };

  return (
    <Layout>
      <div className="center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl w-full flex flex-col gap-6 items-center"
        >
          <h1>ثبت آگهی</h1>

          <div className="flex flex-col gap-4 items-center w-full">
            <span>موقعیت مکانی آگهی</span>

            {/* MAP */}
            <div className="w-full">
              <div className="w-full h-96 rounded-lg overflow-hidden">
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
          <div className="flex gap-3 *:basis-1/2 w-full">
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
          <div className="flex gap-3 *:basis-1/2 w-full">
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
              ثبت آگهی
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterAdPage;
