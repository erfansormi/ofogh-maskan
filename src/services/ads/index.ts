import axiosInstance from "../../lib/axios";
import { AdsDataType } from "../../utils/schemas/ads";

export const AdsServicesAPI = {
  create: (data: Omit<AdsDataType, "id" | "createdAt">) =>
    axiosInstance.post("/664/ads", { ...data, createdAt: new Date().toLocaleString() }),

  edit: (adId: number, data: AdsDataType) => axiosInstance.put(`/600/ads/${adId}`, data),

  delete: (adId: number) => axiosInstance.delete(`/600/ads/${adId}`),
};
