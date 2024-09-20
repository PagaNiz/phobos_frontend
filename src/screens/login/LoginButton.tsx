import { Button } from "@mui/material";
import { useFormikContext } from "formik";

export const LoginButton = () => {
  const { handleSubmit } = useFormikContext();
  return (
    <Button type="submit" onClick={() => handleSubmit()}>
      Logar
    </Button>
  );
};
