import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Chart from "./Chart";
function CompanyInfoMain({ setactiveStep, GeneratedJson }) {
  function DataTable() {
    const tableRows = [];

    for (const key in GeneratedJson) {
      tableRows.push(
        <tr key={key}>
          <td className='category'>{key}</td>
          <td className='details'>{GeneratedJson[key]}</td>
        </tr>
      );
    }

    return (
      <div>
        <h2>Skills Table</h2>
        <table className='data-table'>
          <thead>
            <tr>
              <th>Category</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }

  return (
    <div class='form-container'>
      <form class='form'>
        <ArrowBackIcon
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
          onClick={() => setactiveStep(0)}
        />
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: 5,
          }}
        >
          <Chart GeneratedJson={GeneratedJson} />
        </div>
        <DataTable />
      </form>
    </div>
  );
}

export default CompanyInfoMain;
