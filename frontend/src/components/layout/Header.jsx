import React from 'react';

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-lg font-bold">TravelHub</a>
        <div>
          <a href="/flights" className="mr-4">Flights</a>
          <a href="/hotels" className="mr-4">Hotels</a>
          <a href="/packages" className="mr-4">Packages</a>
          <a href="/cars">Cars</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
