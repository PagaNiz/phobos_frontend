import { Button } from "@mui/material";
import style from "./styles.module.scss";
import { useFormikContext } from "formik";

type Props = {
  children: React.ReactNode;
  variant?: "text" | "contained" | "outlined";
  label: string;
};

export const SubmitButton = ({ children, variant, label }: Props) => {
  const { handleSubmit, isSubmitting } = useFormikContext();
  return (
    <Button
      variant={variant}
      className={style.addButton}
      type="submit"
      onClick={() => handleSubmit()}
      disabled={isSubmitting}
    >
      {children}
      <p>{label}</p>
    </Button>
  );
};
