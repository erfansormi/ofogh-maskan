import Input from "../../../components/ui/input";
import Button from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { LoginDataType, loginSchema } from "../../../utils/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDataStates } from "../../../hooks/use-data-states";
import axiosInstance from "../../../lib/axios";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface LoginResponse {
  accessToken: string;
}

const LoginPage = () => {
  const { loading, setLoading } = useDataStates();
  const navigate = useNavigate();

  const { handleSubmit, formState, register } = useForm<LoginDataType>({
    resolver: zodResolver(loginSchema),
  });

  const ouSubmit = (data: LoginDataType) => {
    setLoading(true);

    setTimeout(() => {
      axiosInstance
        .post<LoginResponse>("/login", data)
        .then((res) => {
          localStorage.setItem("token", res.data.accessToken);
          toast.success("ورود با موفقیت انجام شد");
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
          <h1>ورود به مسکینو</h1>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Input
            variant={"filled"}
            {...register("email")}
            label="ایمیل"
            error={formState.errors.email?.message}
          />
          <Input
            type="password"
            variant="filled"
            {...register("password")}
            label="رمز عبور"
            error={formState.errors.password?.message}
          />
          <div className="text-sm flex items-center gap-2">
            <span className="text-slate-500">حساب ندارید؟</span>
            <Link className="text-blue-500" to={"/auth/signup"}>
              صفحه ثبت نام
            </Link>
          </div>
        </div>
        <div className="self-end">
          <Button
            width={"lg"}
            type="submit"
            loading={loading}
            disabled={formState.submitCount > 0 && !formState.isSubmitSuccessful}
          >
            ورود
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
