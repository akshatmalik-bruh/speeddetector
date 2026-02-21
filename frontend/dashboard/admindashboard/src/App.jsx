import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import OverspeedDetails from './pages/OverspeedDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="details" element={<OverspeedDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
