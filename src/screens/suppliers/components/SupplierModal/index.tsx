import { SupplierType } from "@/types/Supplier";
import { Fade } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { SupplierForm } from "./SupplierForm";
import style from "./styles.module.scss";
import { useReloadTables } from "@/components/Common/useReloadTables";

type Props = {
  open: boolean;
  toggleModal: (supplier: SupplierType | null) => void;
  supplier: SupplierType | null;
};

export const SupplierModal = ({ open, toggleModal, supplier }: Props) => {
  const onClose = () => {
    toggleModal(null);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box
          className={style.boxContainer}
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <div className={style.inputContainer}>
            <SupplierForm supplier={supplier} onSubmitSuccess={onClose} />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
