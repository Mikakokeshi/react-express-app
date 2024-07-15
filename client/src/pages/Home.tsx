import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

export interface BackendDataItem {
  id: string;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
}

const Home = () => {
  const [backendData, setBackendData] = useState<BackendDataItem[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedNote, setSelectedNote] = useState<
    BackendDataItem[] | undefined
  >([]);

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

  return (
    <>
      <h1 className="text-center text-4xl my-5 ">Notes</h1>

      <div className="flex w-full h-full max-w-full">
        <Sidebar
          backendData={backendData}
          setBackendData={setBackendData}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setSelectedNote={setSelectedNote}
          selectedNote={selectedNote}
        />
        <Main
          backendData={backendData}
          setBackendData={setBackendData}
          selectedId={selectedId}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />
      </div>
    </>
  );
};

export default Home;
