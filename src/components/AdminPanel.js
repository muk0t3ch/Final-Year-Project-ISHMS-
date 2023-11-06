import React from 'react';

export default function AdminPanel() {
    // Add your admin form here
    return (
        <div>
            {/* Add your admin form elements here */}
            <h2>Admin Panel</h2>
            {/* For example, you can add input fields for details and a file input for photos */}
            <input type="text" placeholder="Enter details" />
            <input type="file" accept="image/*" />
            <button>Upload</button>
        </div>
    );
}
