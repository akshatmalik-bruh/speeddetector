import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../index.css';

const RootLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="app-container">
            {/* Sidebar */}
            <nav className="sidebar">
                <div className="sidebar-brand">

                    <span>SpeedDetect</span>
                </div>

                <div className="nav-menu">
                    <a
                        className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
                        onClick={() => handleNavigation('/')}
                    >
                        Dashboard
                    </a>
                    <a
                        className={`nav-item ${location.pathname === '/details' ? 'active' : ''}`}
                        onClick={() => handleNavigation('/details')}
                    >
                        Overspeed Details
                    </a>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;
