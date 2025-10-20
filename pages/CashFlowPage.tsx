
import React, { useMemo } from 'react';
import { CashFlow, CashFlowType } from '../types';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

interface CashFlowPageProps {
  cashFlows: CashFlow[];
}

const CashFlowPage: React.FC<CashFlowPageProps> = ({ cashFlows }) => {
    
  const dataWithBalance = useMemo(() => {
    let balance = 0;
    return cashFlows.map(cf => {
      if (cf.type === CashFlowType.Pemasukan) {
        balance += cf.amount;
      } else {
        balance -= cf.amount;
      }
      return { ...cf, balance };
    });
  }, [cashFlows]);

  return (
    <div className="p-6">
      <div className="bg-surface rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Arus Kas</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-text-secondary">
            <thead className="text-xs text-text-primary uppercase bg-background">
              <tr>
                <th scope="col" className="px-6 py-3">Tanggal</th>
                <th scope="col" className="px-6 py-3">Jenis</th>
                <th scope="col" className="px-6 py-3">Sumber/Keterangan</th>
                <th scope="col" className="px-6 py-3 text-right">Jumlah</th>
                <th scope="col" className="px-6 py-3 text-right">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {dataWithBalance.map(item => (
                <tr key={item.id} className="bg-surface border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.type === CashFlowType.Pemasukan ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.source}</td>
                  <td className={`px-6 py-4 text-right font-medium ${item.type === CashFlowType.Pemasukan ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-text-primary">{formatCurrency(item.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CashFlowPage;
