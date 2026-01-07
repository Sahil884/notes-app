"use client";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function NoteCreatingModel({ id }: { id?: string }) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    try {
      if (id) {
        // Edit mode
        const res = await axios.put(`/api/notes/${id}`, { title, content });
        toast.success("Note updated successfully");
        router.refresh();
        console.log(res);
      } else {
        // Create mode
        const res = await axios.post("/api/notes", { title, content });
        toast.success("Note created successfully");
        console.log(res);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            name="title"
            type="text"
            placeholder="Note title"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <textarea
          name="content"
          rows={4}
          placeholder="Write your note..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
        ></textarea>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              id="pinNote"
              name="pinned"
              type="checkbox"
              className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            <label htmlFor="pinNote" className="text-sm text-gray-600">
              Pin note
            </label>
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            {id ? "Update note" : "Add note"}
          </button>
        </div>
      </div>
    </form>
  );
}
