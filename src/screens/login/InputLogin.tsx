import { FormControl, FormHelperText, Input } from "@mui/material";
import { useFormikContext } from "formik";
import { Fragment } from "react";
import { LoginForm } from "./types";

export const InputLogin = () => {
  const { handleChange, handleBlur, values, errors } =
    useFormikContext<LoginForm>();

  return (
    <Fragment>
      <FormControl>
        <Input
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.email}
        />
        <FormHelperText error>{errors.email}</FormHelperText>
      </FormControl>
      <FormControl>
        <Input
          id="password"
          name="password"
          placeholder="Senha"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.password}
        />
        <FormHelperText error>{errors.password}</FormHelperText>
      </FormControl>
    </Fragment>
  );
};
