
import React from 'react';

interface HeaderProps {
    title: string;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onLogout }) => {
    return (
        <header className="bg-surface/80 backdrop-blur-lg p-4 sticky top-0 z-10 flex justify-between items-center shadow-sm">
            <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <button className="p-2 bg-background rounded-full hover:bg-gray-200 transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-text-secondary"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                    </button>
                     <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background"></span>
                </div>
                <div className="flex items-center">
                    <img src="https://picsum.photos/seed/user/40/40" alt="User Avatar" className="w-9 h-9 rounded-full" />
                    <div className="ml-2">
                        <p className="text-sm font-semibold text-text-primary">Admin</p>
                        <p className="text-xs text-text-secondary">Store Owner</p>
                    </div>
                </div>
                <button onClick={onLogout} className="flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
