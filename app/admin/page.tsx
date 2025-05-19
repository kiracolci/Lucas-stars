'use client';

import { useState, useRef } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Link from 'next/link';
import type { Id } from '../../convex/_generated/dataModel';


export default function AdminPage() {
    const images = useQuery(api.lucas.getImages);
    console.log("Fetched images from Convex:", images);
    const addImage = useMutation(api.lucas.addImage);
const deleteImage = useMutation(api.lucas.deleteImage);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file || !title) {
      alert('Please select a file and enter a title.');
      return;
    }
 
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: form,
    });

    if (!response.ok) {
      alert('Upload failed');
      return;
    }

    const saved = await response.json();

    await addImage({
      title: saved.title,
      description: saved.description,
      imageUrl: saved.url,
    });

    setFile(null);
    setTitle('');
    setDescription('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const confirmDelete = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this image?');
    if (confirmed) {
      deleteImage({ id: id as Id<"images"> });
    }
  };
  

  return (
    <div className="relative min-h-screen bg-[#02142b] text-[#f5f5dc] font-mono">
  <div className="absolute top-6 right-6">
  <Link href="/" id="return-home">
  Return homepage
</Link>

  </div>

  
      <h1 className="text-4xl mb-10 font-bold text-center tracking-wide">Admin Panel</h1>

{/* Upload Panel */}
<div id="light-box">
<div className="bg-white/5 text-[#f5f5dc] rounded-xl shadow-lg mx-auto px-6 py-6 mb-12 w-[350px]">
  <h2 className="text-lg font-bold text-center mb-6">New Image Panel</h2>

  {/* Inner rectangle background */}
  <div className="bg-white/20 rounded-md p-4 space-y-4 shadow-md">
    <form className="space-y-4">
      <div>
        <label className="block mb-1 text-sm">Title</label>
        <input
          type="text"
          placeholder="e.g. Andromeda Galaxy"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white text-black placeholder:text-black/50"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm">Description</label>
        <input
          type="text"
          placeholder="e.g. Captured in July 2024"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white text-black placeholder:text-black/50"
        />
      </div>
    

      <div>
  <label className="block mb-1 text-sm">Picture</label>

  <div className="flex items-center gap-3">
    {/* Underlined clickable text that opens file dialog */}
    <span
      onClick={() => fileInputRef.current?.click()}
      className="underline cursor-pointer text-[#f5f5dc] text-sm hover:text-white"
    >
      Select file
    </span>

    {/* File name display if selected */}
    {file && (
      <span className="text-sm text-[#f5f5dc] truncate max-w-[200px]">
        {file.name}
      </span>
    )}
  </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      <div className="text-center pt-2">
        <button
          type="button"
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          Upload
        </button>
      </div>
    </form>
  </div>
</div>
</div>


      {/* Gallery */}
      {/* Gallery */}
<h2 className="text-2xl font-semibold mb-6 text-center">Uploaded Images</h2>

<div className="gallery-columns">
  {images?.map((img) => (
    <div key={img._id} className="gallery-item">
      <img
        src={img.imageUrl}
        alt={img.title}
        className="gallery-img"
      />
      <h3 className="font-bold text-lg mb-1">{img.title}</h3>
      {img.description && (
        <p className="text-sm opacity-80 mb-2">{img.description}</p>
      )}
      <button
        onClick={() => confirmDelete(img._id)}
        className="bg-red-700 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition"
      >
        Delete
      </button>
    </div>
  ))}
</div>
    </div>
  );
}
}