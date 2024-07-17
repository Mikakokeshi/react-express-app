import React, { useEffect, useRef, useState } from "react";
import { BackendDataItem } from "../pages/Home";

interface SidebarProps {
  backendData: BackendDataItem[];
  setBackendData: React.Dispatch<React.SetStateAction<BackendDataItem[]>>;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedNote: React.Dispatch<
    React.SetStateAction<BackendDataItem | undefined>
  >;
  selectedNote: BackendDataItem | undefined;
}

function Sidebar({
  backendData,
  setBackendData,
  selectedId,
  setSelectedId,
  setSelectedNote,
  selectedNote,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState<BackendDataItem[]>([]);

  const ref = useRef<HTMLInputElement>(null);

  const timeDiff = (time: Date) => {
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

  const onAddId = async () => {
    console.log("add note");
    const newNote: BackendDataItem = {
      id: Date.now().toString(),
      title: "",
      body: "",
      created_at: new Date(),
      updated_at: new Date(),
    };
    setBackendData([...backendData, newNote]);
    setSelectedId(newNote?.id);
    const note: BackendDataItem | undefined = backendData.find(
      (data) => data.id === newNote?.id
    );
    setSelectedNote(note ? note : undefined);
    // console.log(backendData);
    console.log(backendData.find((data) => data.id === newNote?.id));

    try {
      const title = newNote.title;
      const body = newNote.body;
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

  const onSelected = (id: string) => {
    setSelectedId(id);
    const note: BackendDataItem | undefined = backendData.find(
      (data) => data.id === id
    );
    setSelectedNote(note ? note : undefined);
  };

  const sortedNotes = [...backendData].sort(
    (a: BackendDataItem, b: BackendDataItem) =>
      // new Date() を使用して updated_at の値を明示的に Date オブジェクトに変換
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  const handleSearch = () => {
    const query = ref.current?.value || "";
    const filteredNotes = backendData.filter(
      (data) =>
        data.title.toLowerCase().includes(query.toLowerCase()) ||
        data.body.toLowerCase().includes(query.toLowerCase())
    );
    setSearchQuery(filteredNotes);
  };

  console.log(searchQuery);
  return (
    <div className="sidebar border mr-5">
      <div className="sidebar_header flex border-b p-4  ">
        <input
          type="search"
          id="default-search"
          className="block w-full pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
          placeholder="Search"
          ref={ref}
          onChange={() => handleSearch()}
          required
        />
        <span
          className="ml-3 border px-2 py-1 flex items-center justify-center"
          onClick={onAddId}>
          ＋
        </span>
      </div>
      <div className="sidebar_notes">
        {(searchQuery.length > 0 ? searchQuery : sortedNotes).map(
          (data: BackendDataItem) => (
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
          )
        )}
      </div>
    </div>
  );
}

export default Sidebar;
