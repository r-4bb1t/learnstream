"use client";

import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  darkDefaultTheme,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { NoteType } from "@/app/type/note";
import { formatDistanceToNow, isValid } from "date-fns";
import { ko } from "date-fns/locale";
import { IoMdCheckmark } from "react-icons/io";
import { useUserStore } from "@/app/store/user-store";
import SignIn from "@/app/components/layout/header/sign-in";

export default function Editor({
  video,
  defaultNote,
}: {
  video: string;
  defaultNote: NoteType | null;
}) {
  const [noteId, setNoteId] = useState<string | null>(defaultNote?.id || null);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(
    defaultNote ? defaultNote.lastSaved : null,
  );

  const { user } = useUserStore();

  const handleSave = useMemo(
    () =>
      debounce(async () => {
        if (!editor.topLevelBlocks.length) return;
        setSaving(true);
        if (noteId) {
          await fetch(`/api/note/${noteId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: JSON.stringify(editor.topLevelBlocks),
            }),
          });
        } else {
          const res = await fetch("/api/note", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: JSON.stringify(editor.topLevelBlocks),
              video,
            }),
          });
          const { id } = await res.json();
          alert(id);
          setNoteId(id);
        }
        setSaving(false);
        setLastSaved(new Date().toISOString());
      }, 2000),
    [noteId, video],
  );

  const editor: BlockNoteEditor = useBlockNote({
    onEditorContentChange: handleSave,
    initialContent: defaultNote ? JSON.parse(defaultNote.contents) : undefined,
  });

  if (!user) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        <h1>Sign in to edit notes</h1>
        <SignIn />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-end gap-1 p-2 text-xs">
        {saving ? (
          <>
            <div className="loading loading-ring loading-xs" />
            Saving...
          </>
        ) : (
          lastSaved &&
          isValid(new Date(lastSaved)) && (
            <>
              <IoMdCheckmark />
              {formatDistanceToNow(new Date(lastSaved), {
                addSuffix: true,
                locale: ko,
              })}
              에 저장됨
            </>
          )
        )}
      </div>
      <BlockNoteView editor={editor} theme={darkDefaultTheme} />
    </div>
  );
}
