import React from "react";
import Styles from "./MyYugaLibrary.module.css";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getLibraryItems,
  addLibraryItem,
  updateLibraryItem,
  deleteLibraryItem,
} from "../../../Datafiles/MyYugaLibraryData";

const MyYugaLibrary = () => {
  return (
    <>
      <div className={Styles.Container}>
      </div>
    </>
  );
};

export default withMaterialTable(MyYugaLibrary, {
  title: "Yuga Library Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "author", header: "Author" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "publishedYear", header: "Published Year" },
    { accessorKey: "description", header: "Description" },
  ],
  getData: async () => {
    const data = await getLibraryItems();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addLibraryItem(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateLibraryItem(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteLibraryItem(id);
    return id;
  },
});
