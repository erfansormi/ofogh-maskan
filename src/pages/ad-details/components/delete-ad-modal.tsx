import React, { useState } from "react";
import Button from "../../../components/ui/button";
import ConfirmModal from "../../../components/ui/confirm-modal";
import { useNavigate, useParams } from "react-router-dom";
import { AdsServicesAPI } from "../../../services/ads";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const DeleteAdModal = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const deleteAd = () => {
    if (params.id) {
      AdsServicesAPI.delete(+params.id)
        .then((res) => {
          toast.success("آگهی با موفقیت حذف گردید");
          setOpen(false);
          navigate("/");
        })
        .catch((err: AxiosError<string>) => {
          toast.error(err.response?.data || err.message);
        });
    }
  };

  return (
    <div>
      <Button variant={"error"} onClick={() => setOpen(true)}>
        حذف
      </Button>
      <ConfirmModal onClick={deleteAd} open={open} setOpen={setOpen} title="حذف آگهی" />
    </div>
  );
};

export default DeleteAdModal;
