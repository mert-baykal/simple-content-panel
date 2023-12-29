"use client"
import { Api } from "@/app/core/api/contents";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {

  const [data, setDatas] = useState();
  const { id } = params;

  const router = useRouter();

  useEffect(() => {
    const response = Api.readContent(id);

    setDatas(response);
  }, []);

  return (
    <div className="p-4">
      <button className="text-white bg-black p-2 rounded-md" onClick={() => router.back()}>
        Geri Dön
      </button>
      <div className="text-center">
        <div dangerouslySetInnerHTML={{ __html: data?.title }}></div>
        <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
        <div className="text-end text-xs p-1">{data?.user.name} - {data?.createdDate} </div>
      </div>
    </div>
  );
}
