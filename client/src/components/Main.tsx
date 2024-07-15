import React, { useEffect, useState } from "react";

import "../assets/style.css";
import { BackendDataItem } from "../pages/Home";

interface SidebarProps {
  backendData: BackendDataItem[];
  setBackendData: React.Dispatch<React.SetStateAction<BackendDataItem[]>>;
  setSelectedNote: React.Dispatch<
    React.SetStateAction<BackendDataItem[] | undefined>
  >;
  selectedId: string | undefined;
  selectedNote: BackendDataItem[] | undefined;
}

const Main = ({
  backendData,
  setBackendData,
  setSelectedNote,
  selectedId,
  selectedNote,
}: SidebarProps) => {
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

  const onChangeNote = async () => {
    try {
      const title = handleTitle;
      const body = handleDescription;
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

  const onDeleteNote = async (id: string | undefined) => {
    const filterNotes = backendData.filter((data) => data.id !== id);
    setBackendData(filterNotes);
    setSelectedNote([]);
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

  console.log(selectedId);
  console.log(selectedNote?.map((note) => note.title));
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
        <form
          onChange={onChangeNote}
          className="main_content flex flex-col p-5">
          <input
            placeholder="無題のノート"
            className="border p-4 mb-5"
            type="text"
            onChange={(e) => setHandleTitle(e.target.value)}
            value={selectedNote?.map((note) => note.title)}
          />
          <textarea
            placeholder="description"
            className="border p-4 h-full"
            onChange={(e) => setHandleDescription(e.target.value)}
            value={selectedNote?.map((note) => note.body)}
          />
        </form>
      )}
    </div>
  );
};

export default Main;
