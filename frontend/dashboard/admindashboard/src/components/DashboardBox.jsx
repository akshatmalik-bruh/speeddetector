import React from 'react';

const DashboardBox = ({ title, value }) => {
    return (
        <div className="dashboard-box" style={{ flex: 1, minWidth: '200px' }}>
            <h3 className="box-title">{title}</h3>
            <div className="box-value">{value}</div>

        </div>
    );
};

export default DashboardBox;