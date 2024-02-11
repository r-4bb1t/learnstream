"use client";

import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote,
  darkDefaultTheme,
} from "@blocknote/react";
import "@blocknote/react/style.css";

export default function Editor() {
  const editor: BlockNoteEditor = useBlockNote();

  return (
    <div className="h-full w-full">
      <BlockNoteView editor={editor} theme={darkDefaultTheme} />
    </div>
  );
}
