import Input from "../../../components/ui/input";
import Button from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { LoginDataType, loginSchema } from "../../../utils/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
  const { handleSubmit, formState, register } = useForm<LoginDataType>({
    resolver: zodResolver(loginSchema),
  });

  const ouSubmit = async (data: LoginDataType) => {
    console.log(data);
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
        </div>
        <div className="self-end">
          <Button
            width={"lg"}
            type="submit"
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
