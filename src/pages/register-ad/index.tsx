import React from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";
import { AdsServicesAPI } from "../../services/ads";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDataStates } from "../../hooks/use-data-states";
import { useUserContext } from "../../context/user-context";
import { AdsDataType, adsSchema, AdsSchemaType } from "../../utils/schemas/ads";
import RegisterAdBody from "./components/register-ad-body";

interface CreateProps {
  type: "create";
}

interface EditProps {
  id: number;
  type: "edit";
  defaultValues: AdsDataType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterAdPage = (props: CreateProps | EditProps) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { loading, setLoading } = useDataStates();
  const RootComponent = props.type === "create" ? Layout : React.Fragment;

  const form = useForm<AdsSchemaType>({
    resolver: zodResolver(adsSchema),
    defaultValues:
      props.type === "edit"
        ? {
            address: props.defaultValues.address,
            city: props.defaultValues.city,
            description: props.defaultValues.description,
            lat: props.defaultValues.location[0],
            lng: props.defaultValues.location[1],
            meterage: props.defaultValues.meterage,
            phoneNumber: props.defaultValues.phoneNumber,
            price: props.defaultValues.price,
            province: props.defaultValues.province,
            title: props.defaultValues.title,
          }
        : undefined,
  });

  if (!user) return;

  const onSubmit = (data: AdsSchemaType) => {
    setLoading(true);
    const body = { ...data, lat: undefined, lng: undefined };

    setTimeout(() => {
      // EDIT AD
      props.type === "edit"
        ? AdsServicesAPI.edit(props.id, {
            userId: props.defaultValues.userId,
            id: props.id,
            createdAt: props.defaultValues.createdAt,
            ...body,
            location: [data.lat, data.lng],
          })
            .then(() => {
              toast.success("آگهی با موفقیت ویرایش شد");
              window.location.reload();
            })
            .catch((err: AxiosError<string>) => {
              toast.error(err.response?.data || err.message);
            })
            .finally(() => setLoading(false))
        : props.type === "create" &&
          // CREATE AD
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
    <RootComponent>
      <div className="center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-2xl w-full flex flex-col gap-6 items-center"
        >
          <RegisterAdBody loading={loading} form={form} type={props.type} />
        </form>
      </div>
    </RootComponent>
  );
};

export default RegisterAdPage;
