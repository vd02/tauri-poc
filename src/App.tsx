import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<any[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleGoButtonClick = () => {
    const solrBaseUrl = "http://localhost:8983/solr/gst-excus-sample3/select";
    const queryParams = new URLSearchParams({
      q: `heading:"${inputValue}" OR subheading:"${inputValue}"`, // Search in heading or subheading fields
      rows: "101",
    });
    const solrUrl = `${solrBaseUrl}?${queryParams}`;

    fetch(solrUrl)
      .then((response) => response.json())
      .then((result) => {
        setData(result.response.docs);
        toast.success("Search results retrieved successfully");
      })
      .catch((error) => {
        toast.error("Failed to retrieve search results");
        console.log("Error:", error);
      });
  };


  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>CaseLawsIndex Search (Heading + Subheading)</h1>
      <div className="input-container">
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleGoButtonClick}>Search</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((doc, index) => (
            <tr key={index}>
              {Object.values(doc).map((value: any, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} limit={1} />
    </div>
  );
};

export default App;
