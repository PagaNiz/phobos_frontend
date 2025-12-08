import { SubmitButton } from "@/components/SubmitButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, FormControl, FormHelperText, Grid2, Input } from "@mui/material";
import axios from "axios";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { PatternFormat } from "react-number-format";
import { SuppliersFormType } from "../../types";
import style from "./styles.module.scss";

export const SupplierInput = () => {
  const { handleChange, handleBlur, values, errors, setFieldValue } =
    useFormikContext<SuppliersFormType>();
  console.log(errors);
  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(
        `https://viacep.com.br/ws/${values.zipCode}/json/`
      );
      setFieldValue("city", response.data.localidade);
      setFieldValue("state", response.data.uf);
      setFieldValue("neighborhood", response.data.bairro);
      setFieldValue("street", response.data.logradouro);
    };
    const regexTeste = new RegExp(/^\d{5}-\d{3}$/);
    if (
      values.zipCode &&
      values.zipCode.length >= 8 &&
      regexTeste.test(values.zipCode)
    ) {
      loadData();
    }
  }, [values.zipCode, setFieldValue]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={10}>
          <FormControl fullWidth>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Nome do Fornecedor"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.name}
            />
            <FormHelperText error>{errors.name}</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth>
            <PatternFormat
              id="zipCode"
              name="zipCode"
              value={values.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.zipCode}
              customInput={Input}
              format="#####-###"
              allowEmptyFormatting
            />
            <FormHelperText error>{errors.zipCode}</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={10}>
          <FormControl fullWidth>
            <Input
              id="street"
              type="text"
              name="street"
              placeholder="Informe o endereço"
              value={values.street}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.street}
            />
            <FormHelperText error>{errors.street}</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth>
            <Input
              id="number"
              type="text"
              name="number"
              placeholder="Informe o número do endereço"
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.number}
            />
            <FormHelperText error>{errors.number}</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl fullWidth>
            <Input
              id="complement"
              type="text"
              name="complement"
              placeholder="Informe o complemento"
              value={values.complement}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.complement}
            />
            <FormHelperText error>{errors.complement}</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl fullWidth>
            <Input
              id="neighborhood"
              type="text"
              name="neighborhood"
              placeholder="Informe o Bairro"
              value={values.neighborhood}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.neighborhood}
            />
            <FormHelperText error>{errors.neighborhood}</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl fullWidth>
            <Input
              id="city"
              type="text"
              name="city"
              placeholder="Informe a Cidade"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.city}
            />
            <FormHelperText error>{errors.city}</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl fullWidth>
            <Input
              id="state"
              type="text"
              name="state"
              placeholder="Informe o Estado"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.state}
              inputProps={{ maxLength: 2 }}
            />
            <FormHelperText error>{errors.state}</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <FormControl fullWidth>
            <Input
              id="country"
              type="text"
              name="country"
              placeholder="Informe o País"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.country}
            />
            <FormHelperText error>{errors.country}</FormHelperText>
          </FormControl>
        </Grid2>
      </Grid2>
      <SubmitButton
        variant="contained"
        label={values.id ? "Atualizar" : "Criar"}
      >
        <AddCircleIcon className={style.addIcon} />
      </SubmitButton>
    </Box>
  );
};
