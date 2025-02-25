let donationList = [
    {
      id: 1,
      donorName: 'John Doe',
      amount: 1000,
      date: '2023-01-01',
      paymentMethod: 'Credit Card',
      note: 'For temple maintenance',
    },
    {
      id: 2,
      donorName: 'Jane Smith',
      amount: 500,
      date: '2023-02-15',
      paymentMethod: 'UPI',
      note: 'General donation',
    },
  ];
  
  // Get All Donations
  export const getDonations = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(donationList), 500);
    });
  };
  
  // Add New Donation
  export const addDonation = async (newDonation) => {
    return new Promise((resolve) => {
      const newId = donationList.length ? donationList[donationList.length - 1].id + 1 : 1;
      const donationToAdd = { ...newDonation, id: newId };
      donationList.push(donationToAdd);
      resolve(donationToAdd);
    });
  };
  
  // Update Existing Donation
  export const updateDonation = async (updatedDonation) => {
    return new Promise((resolve) => {
      donationList = donationList.map((donation) =>
        donation.id === updatedDonation.id ? updatedDonation : donation
      );
      resolve(updatedDonation);
    });
  };
  
  // Delete Donation
  export const deleteDonation = async (id) => {
    return new Promise((resolve) => {
      donationList = donationList.filter((donation) => donation.id !== id);
      resolve(id);
    });
  };
  