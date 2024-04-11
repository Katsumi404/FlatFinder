import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase database instance

// Function to delete a listing
const DeleteListing = async (listingId) => {
  try {
    // Construct a reference to the document to be deleted
    const listingDocRef = doc(db, 'SavedListings', listingId);

    // Delete the document
    await deleteDoc(listingDocRef);

    // Listing deleted 
    console.log(listingId)
    console.log('Listing deleted successfully');
  } catch (error) {
    // Handle errors
    console.error('Error deleting listing:', error);
  }
};

// Export the deleteListing function
export default DeleteListing;