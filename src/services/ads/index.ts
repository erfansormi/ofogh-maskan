import axiosInstance from "../../lib/axios";
import { AdsDataType } from "../../utils/schemas/ads";

export const AdsServicesAPI = {
  create: (data: Omit<AdsDataType, "id" | "createdAt">) =>
    axiosInstance.post("/664/ads", { ...data, createdAt: new Date().toLocaleString() }),
};
