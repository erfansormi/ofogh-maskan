import axiosInstance from "../../lib/axios";
import { User } from "../../types/user";
import { LoginDataType, SignupDataType } from "../../utils/schemas/auth";

export const AuthServiceAPI = {
  signup: (data: Omit<SignupDataType, "confirmPassword">) =>
    axiosInstance.post<SignupResponse>("/register", data),

  login: (data: LoginDataType) => axiosInstance.post<LoginResponse>("/login", data),

  getUserData: (id: string) => axiosInstance.get<User>(`/660/users/${id}`),
};

interface SignupResponse {
  accessToken: string;
}
type LoginResponse = SignupResponse;
