import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const DashboardChart = ({ hourlyData = [] }) => {

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(255, 255, 255, 1)',
                    font: { size: 13 }
                }
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.2)',
                    lineWidth: 1
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 1)',
                },
                border: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 1
                }
            },
            x: {
                grid: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.1)',
                    lineWidth: 1
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 1)',
                },
                border: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.5)',
                    width: 1
                }
            }
        }
    };

    const labels = Array.from({ length: 24 }, (_, i) =>
        `${String(i).padStart(2, '0')}:00`
    );


    const totalCounts = labels.map(label => {
        const found = hourlyData.find(item => item._id === label);
        return found ? found.totalCount : 0;
    });

    const overspeedCounts = labels.map(label => {
        const found = hourlyData.find(item => item._id === label);
        return found ? found.overspeedCount : 0;
    });

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Vehicles',
                data: totalCounts,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderRadius: 4,
            },
            {
                label: 'Overspeeding',
                data: overspeedCounts,
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                borderRadius: 4,
            }
        ],
    };

    return (
        <div style={{ height: "350px" }} >
            <Bar options={options} data={data} />
        </div >
    );
};

export default DashboardChart;