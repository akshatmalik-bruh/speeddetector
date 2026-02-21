import React, { useState, useEffect } from 'react';

const OverspeedDetails = () => {
    const [detailsData, setDetailsData] = useState([]);



    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/allinfo');
                const data = await response.json();


                setDetailsData(data.data || []);
            } catch (error) {
                console.error("Error fetching details data:", error);
            }
        };

        fetchDetails();

        const intervalId = setInterval(fetchDetails, 3000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className="page-header">
                <h1>Overspeed Details</h1>
                <p>Detailed logs of overspeeding violations</p>
            </div>

            <div style={{ color: 'var(--text-secondary)', flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    {!detailsData || detailsData.length === 0 ? (
                        <li>Waiting for records...</li>
                    ) : (
                        detailsData.map((log) => (
                            <li
                                key={log._id}
                                style={{
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--border-color)',
                                    margin: '8px 0',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <span><strong>ID:</strong> {log._id.slice(-6)}</span>
                                <span style={{ color: log.stat === 'overspeeding' ? '#ef4444' : '#10b981' }}>
                                    <strong>Status:</strong> {log.stat}
                                </span>
                                <span
                                    style={{
                                        color: log.speed <= 40 ? '#10b981' : '#ef4444'
                                    }}
                                >
                                    <strong>Speed:</strong> {log.speed} km/h
                                </span>
                                <span>
                                    <strong>Date:</strong>{" "}
                                    {log.createdAt
                                        ? new Date(log.createdAt).toLocaleString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        })
                                        : "N/A"}
                                </span>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </>
    );
};

export default OverspeedDetails;
