import React from "react";
import Styles from "./Donation.module.css";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getDonations,
  addDonation,
  updateDonation,
  deleteDonation,
} from "../../../Datafiles/DonationData";

const Donation = () => {
  return (
    <>
      <div className={Styles.Container}>
        Donation Management
      </div>
    </>
  );
};

export default withMaterialTable(Donation, {
  title: "Donation Management",
  columns: [
    { accessorKey: "id", header: "Sr.No." },
    { accessorKey: "donorName", header: "Donor Name" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "paymentMethod", header: "Payment Method" },
    { accessorKey: "note", header: "Note" },
  ],
  getData: async () => {
    const data = await getDonations();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addDonation(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateDonation(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteDonation(id);
    return id;
  },
});
