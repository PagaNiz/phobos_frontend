import { Button, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import style from "./style.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
};

export const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}: Props) => {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          className={style.boxContainer}
          sx={{ bgcolor: "background.paper" }}
        >
          <div className={style.contentContainer}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Divider />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {message}
            </Typography>
            <div className={style.buttonContainer}>
              <Button
                onClick={onClose}
                className={style.cancelButton}
                variant="contained"
              >
                Cancelar
              </Button>
              <Button onClick={onConfirm} color="error" variant="contained">
                Deletar
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
