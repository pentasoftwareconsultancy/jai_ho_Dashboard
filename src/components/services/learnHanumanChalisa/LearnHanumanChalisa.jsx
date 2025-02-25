import React from "react";
import Styles from "./LearnHanumanChalisa.module.css";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getHanumanChalisaItems,
  addHanumanChalisaItem,
  updateHanumanChalisaItem,
  deleteHanumanChalisaItem,
} from "../../../Datafiles/LearnHanumanChalisaData";

const LearnHanumanChalisa = () => {
  return (
    <>
      <div className={Styles.Container}>
        Learn Hanuman Chalisa
      </div>
    </>
  );
};

export default withMaterialTable(LearnHanumanChalisa, {
  title: "Learn Hanuman Chalisa",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "verse", header: "Verse" },
    { accessorKey: "meaning", header: "Meaning" },
    { accessorKey: "maleVersion", header: "Male Version" },
    { accessorKey: "femaleVersion", header: "Female Version" },
    { accessorKey: "childVersion", header: "Child Version" },
  ],
  getData: async () => {
    const data = await getHanumanChalisaItems();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addHanumanChalisaItem(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateHanumanChalisaItem(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteHanumanChalisaItem(id);
    return id;
  },
});
