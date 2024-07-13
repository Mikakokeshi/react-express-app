import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

const Home = () => {
  interface BackendDataItem {
    id: string;
    title: string;
    body: string;
    created_at: Date;
    updated_at: Date;
  }

  const [backendData, setBackendData] = useState<BackendDataItem[]>([]);
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl my-5 ">Notes</h1>

      <div className="flex w-full h-full max-w-full">
        <Sidebar backendData={backendData} />
        <Main />
      </div>
    </>
  );
};

export default Home;
