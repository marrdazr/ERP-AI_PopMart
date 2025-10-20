
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-surface rounded-xl shadow-md p-6 flex items-center transition-transform hover:scale-105 duration-300">
      <div className={`p-4 rounded-full mr-5`} style={{ backgroundColor: color + '20' }}>
         <div style={{color: color}}>{icon}</div>
      </div>
      <div>
        <p className="text-sm text-text-secondary font-medium">{title}</p>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
