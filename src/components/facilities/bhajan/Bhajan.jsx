import React from "react";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getBhajans,
  addBhajan,
  updateBhajan,
  deleteBhajan,
} from "../../../Datafiles/BhajanData";

const Bhajan = () => {
  return <></>;
};

export default withMaterialTable(Bhajan, {
  title: "Bhajan Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "title", header: "Bhajan Title" },
    { accessorKey: "lyrics", header: "Lyrics" },
    { accessorKey: "language", header: "Language" },
  ],
  getData: async () => {
    const data = await getBhajans();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addBhajan(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateBhajan(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteBhajan(id);
    return id;
  },
});
