import React, { useState, useEffect } from 'react';

const UpdateItem = () => {
    const [existingItem, setExistingItem] = useState(null);
    const [updatedItem, setUpdatedItem] = useState('');
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const response = await fetch(`http://${import.meta.env.VITE_API_URI}/doors/1`);
            const data = await response.json();
            setExistingItem(data);
            setUpdatedItem(data.name); // Assuming the item has a 'name' property
        };
        fetchItem();
    }, []);

    const handleInputChange = (e) => {
        setUpdatedItem(e.target.value);
    };

    const handleSubmit = async (e) => {
        console.log("Submitting update for item:", updatedItem); // Log the item being updated
        console.log("Submitting update for item:", updatedItem); // Log the item being updated
        e.preventDefault();
        const response = await fetch(`http://${import.meta.env.VITE_API_URI}/doors/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: updatedItem }), // Assuming the item has a 'name' property
        });
        if (!response.ok) {
            console.error("Error updating item:", response.statusText); // Log any errors
        }
        if (!response.ok) {
            console.error("Error updating item:", response.statusText); // Log any errors
        }
        const result = await response.json();
        console.log("Update response:", result); // Log the response from the API
        console.log("Update response:", result); // Log the response from the API
        setApiResponse(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={updatedItem} onChange={handleInputChange} />
            <button type="submit">Update Item</button>
            {apiResponse && <p>{apiResponse.message}</p>}
        </form>
    );
};

export default UpdateItem;
