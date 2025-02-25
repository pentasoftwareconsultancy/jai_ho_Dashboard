import React from "react";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getJaaps,
  addJaap,
  updateJaap,
  deleteJaap,
} from "../../../Datafiles/JaapData";

const Jaap = () => {
  return <></>;
};

export default withMaterialTable(Jaap, {
  title: "Jaap Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "title", header: "Jaap Title" },
    { accessorKey: "count", header: "Count" },
  ],
  getData: async () => {
    const data = await getJaaps();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addJaap(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateJaap(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteJaap(id);
    return id;
  },
}); 
