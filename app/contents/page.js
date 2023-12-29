"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Api } from "../core/api/contents";
import Link from "next/link";


// Helper function: Truncate text to a specified character limit
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export default function Page() {
  const router = useRouter();
  const [datas, setDatas] = useState([]);

  const clearUserDataAndRedirect = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('StoreContents');

    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('sessionId');
    }
  
    router.push('/login');
  };

  useEffect(() => {
    setDatas(Api.contents());
  }, []);

  const onCreateContent = () => {
    router.push('/contents/create');
  };

  const showDetail = (id) => {
    router.push(`/contents/detail/${id}`);
  };

  // Add button to clear user data
  const handleLogout = () => {
    clearUserDataAndRedirect();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
      <div className="text-white text-center bg-black p-2 rounded-md max-w-xs m-auto mt-10">
        <button onClick={onCreateContent}>Create New Content</button>
      </div>
      <div className="text-white text-center bg-red-500 p-2 rounded-md max-w-xs m-auto mt-10">
        <button onClick={handleLogout}>Logout</button>
      </div>
      </div>
      
      <hr />
      <div className="flex flex-wrap gap-4 justify-center">
      {datas.length === 0 ? (
          <div className="text-center text-white">Henüz bir içerik girişi bulunmamaktadır.</div>
        ) : (
          datas.map((data, i) => (
            <Link key={i} href={`/contents/detail/${data.id}`}>
              <div className="bg-white max-w-xs text-center p-2 rounded-lg shadow-md w-full">
                <div dangerouslySetInnerHTML={{ __html: data.title }}></div>
                <div dangerouslySetInnerHTML={{ __html: truncateText(data.description, 100) }}></div>
                <div className="text-end text-xs p-1">{data.user.name} - {data.createdDate} </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div >
  )

}
