import api from "@/services/api";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { number, object, string } from "yup";
import { SuppliersFormType } from "../../types";
import { SupplierInput } from "./SupplierInput";
import { SupplierType } from "@/types/Supplier";
import { useReloadTables, triggerReloadTables } from "@/components/Common/useReloadTables";

type Props = {
  supplier: SupplierType | null;
  onSubmitSuccess?: () => void;
};

export const SupplierForm = ({ supplier, onSubmitSuccess }: Props) => {
  const initialValues: SuppliersFormType = {
    id: supplier?.id,
    name: supplier?.name ?? "",
    addressId: supplier?.address.id,
    zipCode: supplier?.address.zipCode ?? "",
    street: supplier?.address.street ?? "",
    number: supplier?.address.number ?? 0,
    complement: supplier?.address.complement ?? "",
    neighborhood: supplier?.address.neighborhood ?? "",
    city: supplier?.address.city ?? "",
    state: supplier?.address.state ?? "",
    country: supplier?.address.country ?? "Brasil",
  };

  const validationSchema = object({
    name: string().required("Nome é necessario"),
    street: string().required("Endereço é necessário!"),
    number: number()
      .required("Número é necessário!")
      .moreThan(0, "O Número necessita ser maior que 0"),
    complement: string().optional(),
    neighborhood: string().required("Bairro é necessário!"),
    city: string().required("Cidade é necessária!"),
    state: string().required("Estado é necessário!"),
    country: string().required("País é necessário!"),
    zipCode: string()
      .required("CEP é necessário!")
      .matches(/^\d{5}-\d{3}$/, "Formato de CEP inválido!"),
  });

  const handleSubmit = async (values: SuppliersFormType) => {
    console.log("entrei aui");
    try {
      const payload = {
        id: values.id,
        name: values.name,
        addressId: values.addressId,
        street: values.street,
        number: values.number,
        complement: values.complement,
        neighborhood: values.neighborhood,
        city: values.city,
        state: values.state,
        country: values.country,
        zipCode: values.zipCode,
      };
      if (values.id) {
        await api.put(`/api/suppliers/${values.id}`, payload);
        console.log("ENTROU NO PUT");
        toast.success("Fornecedor alterado com sucesso.");
      } else {
        await api.post("/api/suppliers/", payload);
        console.log("ENTROU NO POST");
        toast.success("Fornecedor cadastado com sucesso.");
      }
      triggerReloadTables();
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível cadastrar o fornecedor.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div>
        <SupplierInput />
      </div>
    </Formik>
  );
};
