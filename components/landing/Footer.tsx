
import React from 'react';
import { TwitterIcon, InstagramIcon, FacebookIcon } from '../icons/Icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-text-primary text-white">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <a href="#" className="text-2xl font-bold">
                            <span className="text-primary">Pop</span>
                            <span className="text-white">Mart</span>
                            <span className="text-sm font-light text-gray-400">Collections</span>
                        </a>
                        <p className="text-sm text-gray-400 mt-1">Menciptakan kebahagiaan, satu figur di setiap waktu.</p>
                    </div>
                    <div className="flex space-x-5">
                        <a href="#" className="text-gray-400 hover:text-primary transition-colors"><TwitterIcon className="w-6 h-6" /></a>
                        <a href="#" className="text-gray-400 hover:text-primary transition-colors"><InstagramIcon className="w-6 h-6" /></a>
                        <a href="#" className="text-gray-400 hover:text-primary transition-colors"><FacebookIcon className="w-6 h-6" /></a>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} PopMart Collections. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
