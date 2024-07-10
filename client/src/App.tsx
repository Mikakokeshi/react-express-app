import React, { useEffect, useState } from "react";
import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Form from "./pages/Form";

function App() {
  // const [backendData, setBackendData] = useState([{}]);
  interface BackendDataItem {
    id: string;
    title: string;
  }
  const [backendData, setBackendData] = useState<BackendDataItem[]>();

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setBackendData(data));
  }, []);
  console.log(backendData);

  return (
    <>
      {backendData === undefined ? (
        <p>Loading...</p>
      ) : (
        backendData?.map((post: BackendDataItem) => (
          <p key={post.id}>{post.title}</p>
        ))
      )}

      {/* <Router>
        <Routes>
          <Route path="/" element={<Home backendData={backendData} />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
