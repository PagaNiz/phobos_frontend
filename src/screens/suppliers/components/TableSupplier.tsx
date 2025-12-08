import { useReloadTables } from "@/components/Common/useReloadTables";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { LoadingCircle } from "@/components/LoadingCircle";
import api from "@/services/api";
import { SupplierType } from "@/types/Supplier";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import styles from "./TableSuppier.module.scss";

type Props = {
  toggleModal: (supplier: SupplierType | null) => void;
};

export const TableSupplier = ({ toggleModal }: Props) => {
  const [deleteSupplier, setDeleteSupplier] = useState<SupplierType | null>(
    null
  );
  const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState(false);

  const { data: suppliers, loading, reloadTable } =
    useReloadTables<SupplierType>("/api/suppliers/");

  if (loading) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                <Skeleton />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                <Skeleton />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>
                <LoadingCircle opacity="25%" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const deleteData = async (suppliers: SupplierType) => {
    try {
      await api.delete(`/api/suppliers/${suppliers.id}`);
      setModalDeleteConfirmation(false);
      toast.success("Fornecedor Deletado");
      reloadTable();
    } catch (error) {
      toast.error("Não foi possivel deletar o fornecedor!");
      console.log(error);
    }
  };

  const onClose = () => {
    setModalDeleteConfirmation(false);
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="supplier table">
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="left">
                Nome
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Endereço</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow
                key={supplier.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {supplier.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {`${supplier.address.street}, ${supplier.address.number}, ${supplier.address.neighborhood}, ${supplier.address.city}, ${supplier.address.country}`}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => {
                      toggleModal(supplier);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      setModalDeleteConfirmation(true);
                      setDeleteSupplier(supplier);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        open={modalDeleteConfirmation}
        onClose={() => onClose()}
        onConfirm={() => deleteData(deleteSupplier as SupplierType)}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja deletar este fornecedor?"
      />
    </Fragment>
  );
};
