import { SharedNoteType } from "@/app/type/note";
import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  darkDefaultTheme,
  useBlockNote,
} from "@blocknote/react";
import { format, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default function SharedView({ note }: { note: SharedNoteType }) {
  const editor: BlockNoteEditor = useBlockNote({
    initialContent: JSON.parse(note.contents),
    editable: false,
  });

  return (
    <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden">
      <div className="sticky inset-x-0 top-0 flex justify-between gap-2 p-4">
        <div className="flex gap-2">
          <div className="mask mask-squircle w-6">
            <img src={note.userProfile} />
          </div>
          <div className="text-sm font-light">@{note.username}</div>
        </div>

        <div
          className="tooltip tooltip-left overflow-visible text-xs opacity-60"
          data-tip={format(new Date(note.lastSaved), "yyyy-MM-dd HH:mm:ss")}
        >
          {formatDistanceToNow(new Date(note.lastSaved), {
            locale: ko,
            addSuffix: true,
          })}
        </div>
      </div>
      <div className="px-8">
        <BlockNoteView editor={editor} theme={darkDefaultTheme} />
      </div>
    </div>
  );
}
