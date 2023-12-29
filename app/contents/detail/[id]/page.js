"use client";

import { Api } from "@/app/core/api/contents";
import { useEffect, useState } from "react"

export default function Page({ params }) {

  const [data, setDatas] = useState();
  const { id } = params;

  useEffect(() => {
    const response = Api.readContent(id);

    setDatas(response);
  }, []);

  return <div>
    <p>detay sayfası</p>
    <div className="text-center">
      <div dangerouslySetInnerHTML={{ __html: data?.title }}></div>
      <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
      <div className="text-end text-xs p-1">{data?.user.name} - {data?.createdDate} </div>
    </div>
    
  </div>
}