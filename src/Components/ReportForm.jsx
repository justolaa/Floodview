// src/components/ReportForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

// We'll pass props to show/hide the form and the location of the click
const ReportForm = ({ location, onClose, onReportSubmitted }) => {
    const [severity, setSeverity] = useState('Low');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const newReport = {
                latitude: location.lat,
                longitude: location.lng,
                severity,
                description,
            };
            
            // The URL should point to your backend's endpoint
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reports`, newReport);
            
            // Call the callback function to update the map with the new report
            onReportSubmitted(response.data);

            // Close the form on success
            onClose();

        } catch (err) {
            setError('Failed to submit report. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // If no location is provided, don't render the form
    if (!location) return null;

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Report a Flood Incident</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severity</label>
                        <select
                            id="severity"
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 rounded-md"
                        >
                            <option>Low</option>
                            <option>Moderate</option>
                            <option>High</option>
                            <option>Severe</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (optional)</label>
                        <textarea
                            id="description"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            placeholder="e.g., Water is knee-deep, road is impassable."
                        ></textarea>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportForm;