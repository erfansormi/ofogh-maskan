import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../lib/axios";
import Input from "../../../components/ui/input";
import Button from "../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDataStates } from "../../../hooks/use-data-states";
import { SignupDataType, signupSchema } from "../../../utils/schemas/auth";

interface SignupResponse {
  accessToken: string;
}

const SignupPage = () => {
  const { loading, setLoading } = useDataStates();
  const navigate = useNavigate();

  const { handleSubmit, formState, register } = useForm<SignupDataType>({
    resolver: zodResolver(signupSchema),
  });

  const ouSubmit = (data: SignupDataType) => {
    setLoading(true);

    setTimeout(() => {
      axiosInstance
        .post<SignupResponse>("/register", { ...data, confirmPassword: undefined })
        .then((res) => {
          localStorage.setItem("token", res.data.accessToken);
          toast.success("ثبت نام با موفقیت انجام شد");
          navigate("/");
        })
        .catch((err: AxiosError<string>) => {
          toast.error(err.response?.data || err.message);
        })
        .finally(() => setLoading(false));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-400/90 center">
      <form
        onSubmit={handleSubmit(ouSubmit)}
        className="max-w-2xl w-full bg-white px-8 py-8 rounded-lg shadow flex flex-col gap-6 center"
      >
        <div className="mb-4">
          <h1>ثبت نام در مسکینو</h1>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center w-full gap-3">
            <Input
              variant={"filled"}
              {...register("firstname")}
              label="نام"
              classNames={{ root: "basis-1/2" }}
              error={formState.errors.firstname?.message}
            />
            <Input
              variant={"filled"}
              {...register("lastname")}
              classNames={{ root: "basis-1/2" }}
              label="نام خانوادگی"
              error={formState.errors.lastname?.message}
            />
          </div>
          <Input
            variant={"filled"}
            {...register("email")}
            label="ایمیل"
            error={formState.errors.email?.message}
          />
          <Input
            variant="filled"
            type="password"
            {...register("password")}
            label="رمز عبور"
            error={formState.errors.password?.message}
          />
          <Input
            variant="filled"
            type="password"
            {...register("confirmPassword")}
            label="تکرار رمز عبور"
            error={formState.errors.confirmPassword?.message}
          />
          <div className="text-sm flex items-center gap-2">
            <span className="text-slate-500">حساب دارید؟</span>
            <Link className="text-blue-500" to={"/auth/login"}>
              صفحه ورود
            </Link>
          </div>
        </div>
        <div className="self-end">
          <Button
            width={"lg"}
            type="submit"
            disabled={formState.submitCount > 0 && Object.values(formState.errors).length > 0}
            loading={loading}
          >
            ثبت نام
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
