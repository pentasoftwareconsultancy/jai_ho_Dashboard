import React from "react";
import withMaterialTable from "../shared/withMaterialTable";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "../../Datafiles/HanumanChalisaData";

const HanumanChalisa = () => {
  return <></>;
};

export default withMaterialTable(HanumanChalisa, {
  title: "Hanuman Chalisa Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "verse", header: "Verse" },
    { accessorKey: "maleVersion", header: "Male Version" },
    { accessorKey: "femaleVersion", header: "Female Version" },
    { accessorKey: "childVersion", header: "Child Version" },
  ],
  getData: async () => {
    const data = await getItems();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addItem(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateItem(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteItem(id);
    return id;
  },
});
