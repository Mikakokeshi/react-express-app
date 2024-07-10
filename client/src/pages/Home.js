import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [backendData, setBackendData] = useState([{}]);
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setBackendData(data));
  }, []);
  console.log(backendData);
  return (
    <div>
      <div>Home</div>
      {typeof props.backendData === "undefiend" ? (
        <p>Loading...</p>
      ) : (
        props.backendData.map((post, i) => <p key={i}>{post}</p>)
      )}
      <Link to="/form">Form</Link>
    </div>
  );
};

export default Home;
