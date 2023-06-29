import React, { useState } from "react";
import cors from "cors";
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
    var data = {
      add: {
        doc: {
          id: inputValue,
          title: "Doc 1"
        }
      }
    };

    var jsonData = JSON.stringify(data);
    var solrUrl = "http://localhost:8983/solr/techproducts/update?commit=true";

    fetch(solrUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonData
    })
      .then(function(response) {
        if (response.ok) {
          toast.success("Value inserted"); // Show success toast message
          console.log("Data posted successfully to Solr");
        } else {
          toast.error("Failed to insert value"); // Show error toast message
          console.log("Failed to post data to Solr");
        }
      })
      .catch(function(error) {
        console.log("Error:", error);
      });
  };

  const handleGetDataClick = () => {
    var solrUrl = "http://localhost:8983/solr/techproducts/select?q=*%3A*&rows=100";

    fetch(solrUrl)
      .then(response => response.json())
      .then(result => {
        setData(result.response.docs);
        toast.success("Data retrieved successfully"); // Show success toast message
      })
      .catch(error => {
        toast.error("Failed to retrieve data"); // Show error toast message
        console.log("Error:", error);
      });
  };

  return (
    <div className="container">
      <h1>Apache Solr + Tauri POC</h1>
      <div className="input-container">
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleGoButtonClick}>Go</button>
      </div>
      <button style={{alignSelf:"center"}} onClick={handleGetDataClick}>Get Data</button>
      <ul className="data-list">
        {data.map(doc => (
          <li key={doc.id}>
            <h3>{doc.title}</h3>
            <ul>
              {Object.keys(doc).map(key => (
                <li key={key}>
                  <strong>{key}: </strong> {doc[key]}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} limit={1} />
    </div>
  );
};

// Enable CORS in the Express server
cors();

export default App;
