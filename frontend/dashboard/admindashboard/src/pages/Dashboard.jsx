import React, { useState, useEffect } from 'react';
import DashboardBox from '../components/dashboardBox';
import DashboardChart from '../components/DashboardChart';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalVehicles: { value: '0', trend: '', isUp: true },
        avgSpeed: { value: '0 km/h', trend: '', isUp: true },
        overspeeding: { value: '0', trend: '', isUp: false },
        criticalAlerts: { value: '0', trend: 'Stable', isUp: false },
        hourlyData: [],
    });


    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch('http://localhost:3000/api/v1/analytics');
                const data = await response.json();


                setDashboardData(prev => ({
                    totalVehicles: { ...prev.totalVehicles, value: (data.totalVehicles || 0).toLocaleString() },
                    avgSpeed: { ...prev.avgSpeed, value: Math.round(data.averageSpeed || 0) + ' km/h' },
                    overspeeding: { ...prev.overspeeding, value: (data.totalOverspeeding || 0).toLocaleString() },
                    criticalAlerts: { ...prev.criticalAlerts, value: '0' },
                    hourlyData: data.hourlyData || []
                }));
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 3000);


        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className="page-header">
                <h1>Speed Monitoring</h1>
                <p>Real-time monitoring and analytics of vehicle speeds</p>
            </div>


            <div className="boxes-section">
                <DashboardBox
                    title="Total Vehicles"
                    value={dashboardData.totalVehicles.value}
                />
                <DashboardBox
                    title="Avg Speed"
                    value={dashboardData.avgSpeed.value}
                />
                <DashboardBox
                    title="Overspeeding"
                    value={dashboardData.overspeeding.value}
                />

            </div>


            <DashboardChart hourlyData={dashboardData.hourlyData} />
        </>
    );
};

export default Dashboard;
