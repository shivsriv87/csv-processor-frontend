import React from 'react';

const DataTable = ({ data }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg mt-4">
      <table className="table-auto border-collapse border border-gray-200 w-full text-sm text-gray-700">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <tr>
            {data[0].map((_, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-center"
              >
                Column {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-gray-100 transition-colors`}
            >
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
