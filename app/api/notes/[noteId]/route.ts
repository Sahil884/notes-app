import connectDB from "@/lib/connectDb";
import NoteModel from "@/models/noteModel";

export async function DELETE(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  await connectDB();
  const note = await NoteModel.findByIdAndDelete(params.noteId);
  if (!note) {
    return Response.json(
      {
        success: false,
        message: "Note can't be deleted",
      },
      { status: 400 }
    );
  }
  return Response.json(
    {
      success: true,
      message: "Note  deleted successfully",
    },
    { status: 200 }
  );
}

export async function PUT(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  const { title, content } = await req.json();
  await connectDB();
  const note = await NoteModel.findByIdAndUpdate(params.noteId, {
    title,
    content,
  });
  if (!note) {
    return Response.json(
      {
        success: false,
        message: "Note can't be updated",
      },
      { status: 400 }
    );
  }
  return Response.json(
    {
      success: true,
      message: "Note  updated successfully",
    },
    { status: 200 }
  );
}
