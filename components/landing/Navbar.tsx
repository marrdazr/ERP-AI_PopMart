import React, { useState, useEffect } from 'react';
import { ShoppingCartIcon } from '../icons/Icons';

interface NavbarProps {
    onLoginClick: () => void;
    onCartClick: () => void;
    cartItemCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onCartClick, cartItemCount }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const navLinks = [
        { name: 'Koleksi Unggulan', href: '#featured' },
        { name: 'Tentang Kami', href: '#about' },
        { name: 'Testimoni', href: '#testimonials' },
    ];
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 shadow-md backdrop-blur-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="text-2xl font-bold">
                    <span className="text-primary">Pop</span>
                    <span className="text-text-primary">Mart</span>
                    <span className="text-sm font-light text-text-secondary">Collections</span>
                </a>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium"
                        >
                            {link.name}
                        </a>
                    ))}
                     <a 
                        href="#contact" 
                        onClick={(e) => handleNavClick(e, '#contact')}
                        className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium"
                    >
                        Hubungi Kami
                    </a>
                </nav>
                <div className="flex items-center gap-4">
                     <button onClick={onCartClick} className="relative text-text-secondary hover:text-primary transition-colors">
                        <ShoppingCartIcon className="w-6 h-6" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                    <button onClick={onLoginClick} className="hidden md:inline-block bg-secondary text-white font-bold py-2 px-5 rounded-full hover:bg-opacity-90 transition-transform duration-300 hover:scale-105">
                        Login Admin
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;