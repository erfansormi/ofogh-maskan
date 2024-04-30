import { useState } from "react";
import Button from "../../../components/ui/button";
import Modal from "../../../components/ui/modal";
import RegisterAdPage from "../../register-ad";
import { AdsDataType } from "../../../utils/schemas/ads";

interface Props {
  id: number;
  defaultValues: AdsDataType;
}

const EditAdModal = ({ defaultValues, id }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant={"success"}>
        ویرایش
      </Button>

      <Modal open={open} setOpen={setOpen} title="ویرایش آگهی">
        <RegisterAdPage setOpen={setOpen} defaultValues={defaultValues} id={id} type="edit" />
      </Modal>
    </div>
  );
};

export default EditAdModal;
