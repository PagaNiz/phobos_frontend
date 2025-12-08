import { SupplierType } from "@/types/Supplier";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import { useState } from "react";
import { SupplierModal } from "./components/SupplierModal";
import { TableSupplier } from "./components/TableSupplier";
import styles from "./suppliersScreen.module.scss";
import { useReloadTables } from "@/components/Common/useReloadTables";

export const SuppliersScreen = () => {
  const [modalSupplier, setModalSupplier] = useState(false);
  const [supplier, setSupplier] = useState<SupplierType | null>(null);

  const toggleModal = (supplier: SupplierType | null) => {
    setModalSupplier((prev) => !prev);
    setSupplier(supplier);
  };

  return (
    <>
      <Button
        variant="contained"
        className={styles.addButton}
        onClick={() => {
          toggleModal(null);
        }}
      >
        <AddCircleIcon className={styles.addIcon} />
        <div>Adicionar</div>
      </Button>
      <TableSupplier toggleModal={toggleModal} />
      <SupplierModal
        open={modalSupplier}
        toggleModal={toggleModal}
        supplier={supplier}
      />
    </>
  );
};
