import React from "react";

function Sidebar(props: any) {
  console.log(props.backendData);

  interface BackendDataItem {
    id: string;
    title: string;
    body: string;
    created_at: Date;
    updated_at: Date;
  }

  const timeDiff: any = (time: Date) => {
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
        <span className="ml-4 border p-4 flex items-center justify-center">
          ＋
        </span>
      </div>
      {props.backendData.map((data: BackendDataItem) => (
        <div className="sidebar_notes" key={data.id}>
          <div className="note  border m-5 p-4">
            {data.title && <p className="note_ttl">{data.title}</p>}
            <span className="update block text-right">
              {timeDiff(data.updated_at)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
