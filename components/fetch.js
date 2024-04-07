import React, { useState } from "react";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";

function Fetch() {
    const [allDocs, setAllDocs] = useState([]);

    function fetchAll() {
        // Reference to the collection you want to fetch documents from
        const collectionRef = collection(db, "PropertyListings");

        // Fetch documents
        getDocs(collectionRef)
            .then((querySnapshot) => {
                const documents = [];
                querySnapshot.forEach((doc) => {
                    documents.push({ id: doc.id, ...doc.data() });
                });
                setAllDocs(documents);
                console.log("Documents fetched:", documents);
            })
            .catch((error) => {
                console.error("Error fetching documents: ", error);
            });
    }

    return (
        <div>
            <h1>Flat Search Page</h1>
            <button onClick={fetchAll}>View All Listings</button>
            {/* Display fetched documents */}
            <ul>
                {allDocs.map((doc) => (
                    <li key={doc.id}>
                        <strong>(Firestore)Document ID:</strong> {doc.id}
                        <br />
                        <img src={doc.Image} alt={`Image`} style={{ maxWidth: '200px' }}/>
                        <br />
                        <strong>Name:</strong> {doc.Title}
                        <br />
                        <strong>Price</strong> {doc.Price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Fetch;
