import React from "react";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getTestimonies,
  addTestimony,
  updateTestimony,
  deleteTestimony,
} from "../../../Datafiles/TestimonyData";

const Testimony = () => {
  return <></>;
};

export default withMaterialTable(Testimony, {
  title: "Testimony Management",
  columns: [
    { accessorKey: "id", header: "Sr.No." },
    { accessorKey: "userId", header: "UserId" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "content", header: "Content" },
    { accessorKey: "rating", header: "Rating" },
    { accessorKey: "feedback", header: "Feedback" },
    { accessorKey: "createdAt", header: "Created At" },
  ],
  getData: async () => {
    const data = await getTestimonies();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addTestimony(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateTestimony(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteTestimony(id);
    return id;
  },
});
