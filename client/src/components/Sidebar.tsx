import React, { useEffect, useState } from "react";
import { BackendDataItem } from "../pages/Home";

interface SidebarProps {
  backendData: BackendDataItem[];
  setBackendData: React.Dispatch<React.SetStateAction<BackendDataItem[]>>;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedNote: React.Dispatch<
    React.SetStateAction<BackendDataItem[] | undefined>
  >;
  selectedNote: BackendDataItem[] | undefined;
}

function Sidebar({
  backendData,
  setBackendData,
  selectedId,
  setSelectedId,
  setSelectedNote,
  selectedNote,
}: SidebarProps) {
  const timeDiff = (time: Date) => {
    //   return new Date().getTime() - time;
    const updatedTime = new Date(time);
    const diffMs = new Date().getTime() - updatedTime.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 60) {
      return `${diffMinutes}分前`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) {
        return `${diffHours}時間前`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}日前`;
      }
    }
  };

  const onAddId = () => {
    console.log("add note");
    const newNote: BackendDataItem = {
      id: Date.now().toString(),
      title: "",
      body: "",
      created_at: new Date(),
      updated_at: new Date(),
    };
    setBackendData([...backendData, newNote]);
    console.log(backendData);
  };

  const onSelected = (id: string) => {
    setSelectedId(id);
    const note: BackendDataItem | undefined = backendData.find(
      (data) => data.id === id
    );
    console.log(id);
    setSelectedNote(note ? [note] : undefined);
  };

  return (
    <div className="sidebar border mx-5">
      <div className="sidebar_header flex border-b p-5 ">
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
        />
        <span
          className="ml-4 border p-4 flex items-center justify-center"
          onClick={onAddId}>
          ＋
        </span>
      </div>
      <div className="sidebar_notes">
        {backendData.map((data: BackendDataItem) => (
          <div
            key={data.id}
            className={`note border m-5 p-4 ${
              selectedId === data.id ? "bg-gray-200" : ""
            }`}
            onClick={() => onSelected(data.id)}>
            <p className="note_ttl">{data.title || "無題のノート"}</p>
            <span className="update block text-right">
              {timeDiff(data.updated_at)}
            </span>
            <p className="text-sm text-gray-500">ID: {data.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
