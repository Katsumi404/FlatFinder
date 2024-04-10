import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase.js"; 

const UpdateUser = async (uid, newData) => {
    try {
        const userDocRef = doc(db, 'UserData', uid);
        const validData = {};
        for (const key in newData) {
            if (newData[key] !== undefined) {
                validData[key] = newData[key];
            }
        }
        await updateDoc(userDocRef, validData);
        console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating document: ', error);
    }
};

// Export the updateDocument function
export default UpdateUser;