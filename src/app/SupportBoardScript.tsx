"use client";

import Script from "next/script";
import { supportBoardScriptSrc } from "@/lib/supportBoard";

const SupportBoardScript = () => {
  if (!supportBoardScriptSrc) {
    return null;
  }

  return (
    <Script
      id="chat-init"
      src={supportBoardScriptSrc}
      strategy="lazyOnload"
      async
    />
  );
};

export default SupportBoardScript;
