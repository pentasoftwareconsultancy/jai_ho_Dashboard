import React from "react";
import Styles from "./YGallery.module.css";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../../../Datafiles/YGalleryData";

const YGallery = () => {
  return (
    <>
      <div className={Styles.Container}>
        YGallery Management
      </div>
    </>
  );
};

export default withMaterialTable(YGallery, {
  title: "Gallery Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "url", header: "URL" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "description", header: "Description" },
  ],
  getData: async () => {
    const data = await getGalleryItems();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addGalleryItem(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateGalleryItem(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteGalleryItem(id);
    return id;
  },
});
