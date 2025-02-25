import React from "react";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getLiveAartis,
  addLiveAarti,
  updateLiveAarti,
  deleteLiveAarti,
} from "../../../Datafiles/LiveAartiData";

const LiveAarti = () => {
  return <></>;
};

export default withMaterialTable(LiveAarti, {
  title: "Live Aarti Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "title", header: "Live Aarti Title" },
    { accessorKey: "time", header: "Time" },
  ],
  getData: async () => {
    const data = await getLiveAartis();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addLiveAarti(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateLiveAarti(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteLiveAarti(id);
    return id;
  },
});
