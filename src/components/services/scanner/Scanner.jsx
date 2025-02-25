import React from "react";
import Styles from "./Scanner.module.css";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getScannerItems,
  addScannerItem,
  updateScannerItem,
  deleteScannerItem,
} from "../../../Datafiles/ScannerData";

const Scanner = () => {
  return (
    <>
      <div className={Styles.Container}>
        Scanner Management
      </div>
    </>
  );
};

export default withMaterialTable(Scanner, {
  title: "Scanner Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "code", header: "Code" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "scannedBy", header: "Scanned By" },
    { accessorKey: "scannedAt", header: "Scanned At" },
  ],
  getData: async () => {
    const data = await getScannerItems();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addScannerItem(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateScannerItem(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteScannerItem(id);
    return id;
  },
});
