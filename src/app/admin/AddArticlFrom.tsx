"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const AddArticlFrom = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formSubmitHandler = (e:React.FormEvent) => {
    e.preventDefault()

    if (title == "") return toast.error("Title is required")
    if (description == "") return toast.error("Desciption is required")
  }

  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
      <input
        className="mb-4 border rounded p-2 text-xl"
        type="text"
        placeholder="Entre your Title"
        value={title} onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="mb-4 rounded p-2 lg:text-xl resize-none"
        rows={5}
        placeholder="Entre your Desciption"
        value={description} onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold"
      >
        Add
      </button>
    </form>
  );
}

export default AddArticlFrom