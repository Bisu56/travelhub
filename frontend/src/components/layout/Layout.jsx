import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingWhatsApp from '../FloatingWhatsApp';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <Header />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default Layout;
