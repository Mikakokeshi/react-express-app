import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../assets/style.css";

const Form = () => {
  interface BackendDataItem {
    id: string;
    title: string;
  }

  const [backendData, setBackendData] = useState<BackendDataItem[]>();
  const [handleTitle, setHandleTitle] = useState("");
  const [handleDescription, setHandleDescription] = useState("");
  useEffect(() => {
    fetch("/api")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setBackendData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(backendData);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const title = handleTitle;
      const body = handleDescription;
      console.log(title);
      console.log(body);
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>Form</div>
      <Link to="/">Home</Link>
      <form onSubmit={onSubmitForm}>
        <input type="text" onChange={(e) => setHandleTitle(e.target.value)} />
        <textarea onChange={(e) => setHandleDescription(e.target.value)} />

        <button type="submit">追加</button>
      </form>
      {backendData === undefined ? (
        <p>Loading...</p>
      ) : (
        backendData?.map((post: BackendDataItem) => (
          <>
            <p key={post.id}>{post.title}</p>
          </>
        ))
      )}
    </div>
  );
};

export default Form;
