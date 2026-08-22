import Card from "./Card";

export default function NoteBox({
  children
}) {
  return (
    <Card className="note-box">

      <div className="note-title">
        NOTE
      </div>

      <p>
        {children}
      </p>

    </Card>
  );
}