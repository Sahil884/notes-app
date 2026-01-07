"use client";

import { Note } from "@/app/page";
import axios from "axios";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NoteCreatingModel } from "./AddNote";

export function NoteCard({ note }: { note: Note }) {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/notes/${id}`);
      if (res.status === 200) {
        toast.success(res.data.message);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <section>
      <ul
        id="notesList"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      ></ul>
      <p id="emptyState" className="text-center text-gray-500 py-10 hidden">
        No notes yet—add your first one above.
      </p>
    </section>
  );
}
