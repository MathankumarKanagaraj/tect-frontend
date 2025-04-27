import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";

const Table = ({ columns = [], data = [] }) => {
  return (
    <><div>
    </div><BootstrapTable hover responsive >
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col.accessor]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </BootstrapTable></>
  );
};

export default Table;
