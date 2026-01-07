"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { NoteCreatingModel } from "../components/AddNote";
import { NoteCard } from "../components/NoteCard";

export interface Note {
  title: string;
  content: string;
  _id: string;
  createdAt: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("/api/notes");
        setNotes(res.data.notes);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <>
      <header className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Notes</h1>
          <button
            id="clearAllBtn"
            className="text-sm px-3 py-2 rounded-md border border-gray-200 hover:bg-gray-100"
          >
            Clear all
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Composer */}
        <NoteCreatingModel />

        {/* Notes list */}
        {loading ? (
          <p className="text-center text-gray-500">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No notes yet—add your first one above.
          </p>
        ) : (
          <section>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                <li key={note?._id}>
                  <NoteCard note={note} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
