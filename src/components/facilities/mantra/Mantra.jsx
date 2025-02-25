import React from "react";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getMantras,
  addMantra,
  updateMantra,
  deleteMantra,
} from "../../../Datafiles/MantraData";

const Mantra = () => {
  return <></>;
};

export default withMaterialTable(Mantra, {
  title: "Mantra Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "title", header: "Mantra Title" },
    { accessorKey: "duration", header: "Duration" },
  ],
  getData: async () => {
    const data = await getMantras();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addMantra(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateMantra(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteMantra(id);
    return id;
  },
});
