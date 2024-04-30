import axiosInstance from "../../lib/axios";
import { AdsDataType } from "../../utils/schemas/ads";

export const AdsServicesAPI = {
  create: (data: Omit<AdsDataType, "id">) => axiosInstance.post("/664/ads", data),
};
