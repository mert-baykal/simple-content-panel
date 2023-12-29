"use client";

import { Api } from "@/app/core/api/contents";
import { URLS } from "@/app/core/urls";
import { useState, } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"),{ssr:false})
import 'react-quill/dist/quill.snow.css';


export default function Page() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const onCancelForm = (e) => {
    e.preventDefault();
    router.push('/contents');
  }

  const onSubmitForm = (e) => {
    e.preventDefault();

    const userData = window.localStorage.getItem('user');

    if (!userData) { return; }

    const { user } = JSON.parse(userData);
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    const body = {
      title: title,
      description: content, // Quill içeriğini ekleyin
      createdDate: formattedDate,
      user
    }

    Api.createContent(body);
    setContent(''); // Quill içeriğini sıfırla
    setTitle(''); // Quill içeriğini sıfırla
    router.push(URLS.contents);
  }

  const handleQuillChangeContent = (value) => {
    setContent(value);
  };

  const handleQuillChangeTitle = (value) => {
    setTitle(value);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white max-w-sm p-4 m-auto rounded-md">
        <form method="POST" onSubmit={onSubmitForm} noValidate>
          <div className="mb-5 max-w-xs">
            <label className="text-2xl mb-1">Title</label>        
            <ReactQuill value={title} onChange={handleQuillChangeTitle} />
          </div>
          <div className="max-w-xs">
            <label className="text-2xl mb-1">Description</label>
            <ReactQuill value={content} onChange={handleQuillChangeContent} />
          </div>
          <div className="flex gap-2 justify-center mt-5">
            <button className="text-white text-center bg-black p-2 rounded-md">Send Form</button>
            <button className="text-white text-center bg-red-600 p-2 rounded-md" onClick={onCancelForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
