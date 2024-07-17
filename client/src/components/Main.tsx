import React, { useEffect, useState } from "react";

import "../assets/style.css";
import { BackendDataItem } from "../pages/Home";

interface SidebarProps {
  backendData: BackendDataItem[];
  setBackendData: React.Dispatch<React.SetStateAction<BackendDataItem[]>>;
  setSelectedNote: React.Dispatch<
    React.SetStateAction<BackendDataItem | undefined>
  >;
  selectedId: string;
  selectedNote: BackendDataItem | undefined;
  onUpdateNote: (updatedNote: BackendDataItem | undefined) => void;
  updatedNote: BackendDataItem | undefined;
}

const Main = ({
  backendData,
  setBackendData,
  setSelectedNote,
  selectedId,
  selectedNote,
  onUpdateNote,
  updatedNote,
}: SidebarProps) => {
  const [handleTitle, setHandleTitle] = useState("");
  const [handleDescription, setHandleDescription] = useState("");

  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      await fetch("/api")
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
    };
    fetchData();
  }, []);

  const onChangeNote = async (key: string, value: string) => {
    try {
      if (key === "title") {
        setHandleTitle(value);
      } else if (key === "body") {
        setHandleDescription(value);
      }

      const response = await fetch(`/api/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [key]: value,
          updated_at: new Date(),
        }),
      });
      console.log(key, value);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      // console.log(selectedId);
      setSelectedNote(data);
      console.log(data);
      onUpdateNote({
        ...selectedNote,
        id: selectedId,
        title: handleTitle,
        body: handleDescription,
        created_at: new Date(),
        updated_at: new Date(),
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(selectedNote);
  // console.log({ ...backendData, selectedNote });
  console.log(updatedNote);

  const onDeleteNote = async (id: string | undefined) => {
    const filterNotes = backendData.filter((data) => data.id !== id);
    setBackendData(filterNotes);
    setSelectedNote(undefined);
    try {
      const response = await fetch(`/api/${selectedId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(handleTitle);
  // console.log(selectedNote?.map((note) => note.title));
  return (
    <div className="main flex-1 border">
      <div className="main_head p-4 border-b">
        <span
          className="border p-4 flex items-center justify-center w-3 h-3"
          onClick={() => onDeleteNote(selectedId)}>
          ×
        </span>
      </div>

      {selectedId === "" || undefined ? (
        <p className="p-4 ">メモが選択されていません</p>
      ) : (
        <form className="main_content flex flex-col p-5">
          <input
            placeholder="無題のノート"
            className="border p-4 mb-5"
            type="text"
            onChange={(e) => onChangeNote("title", e.target.value)}
            value={selectedNote?.title}
          />
          <textarea
            placeholder="description"
            className="border p-4 h-full"
            onChange={(e) => onChangeNote("body", e.target.value)}
            value={selectedNote?.body}
          />
        </form>
      )}
    </div>
  );
};

export default Main;
