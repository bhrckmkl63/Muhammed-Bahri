import React from 'react';
import { TableType, TableStatus } from '../types';

interface TableGridProps {
  tables: TableType[];
  onSelectTable: (id: number) => void;
}

const Table: React.FC<{ table: TableType; onClick: () => void }> = ({ table, onClick }) => {
  const isOccupied = table.status === TableStatus.Occupied;
  const bgColor = isOccupied ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600';
  const textColor = 'text-white';

  return (
    <button
      onClick={onClick}
      className={`rounded-xl shadow-lg p-4 flex flex-col justify-between items-center aspect-square transition-all duration-300 transform hover:scale-105 ${bgColor} ${textColor}`}
    >
      <div className="text-2xl font-bold">
        Masa {table.id}
      </div>
      <div className="text-sm font-semibold uppercase tracking-wider">
        {isOccupied ? 'Dolu' : 'Boş'}
      </div>
      <div className="text-xl font-bold">
        {table.total.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
      </div>
    </button>
  );
};

const TableGrid: React.FC<TableGridProps> = ({ tables, onSelectTable }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
      {tables.map(table => (
        <Table key={table.id} table={table} onClick={() => onSelectTable(table.id)} />
      ))}
    </div>
  );
};

export default TableGrid;