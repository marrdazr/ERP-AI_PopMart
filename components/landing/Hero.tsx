
import React from 'react';

const Hero: React.FC = () => {
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587049352846-4a2225a34e38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
      <div className="relative z-10 p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
          Digital Business ERP System <span className="text-primary">PopMart</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200 drop-shadow-md">
          Temukan, koleksi, dan tukar action figure dan mainan vinyl paling dicari. Koleksi hebat berikutnya hanya dengan sekali klik.
        </p>
        <div className="mt-8">
          <a
            href="#featured"
            onClick={(e) => handleScrollClick(e, '#featured')}
            className="inline-block bg-primary text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:bg-primary-dark transition-transform duration-300 hover:scale-105"
          >
            Jelajahi Koleksi
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
