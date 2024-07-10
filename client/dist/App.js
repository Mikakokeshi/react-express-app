import React, { useEffect, useState } from "react";
import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Form from "./pages/Form";
function App() {
    const [backendData, setBackendData] = useState();
    useEffect(() => {
        fetch("/api")
            .then((response) => response.json())
            .then((data) => setBackendData(data));
    }, []);
    return (React.createElement(React.Fragment, null, backendData === undefined ? (React.createElement("p", null, "Loading...")) : (backendData?.map((post) => (React.createElement("p", { key: post?.id }, post?.title))))));
}
export default App;
