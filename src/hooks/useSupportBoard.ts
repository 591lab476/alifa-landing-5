import { useEffect, useState } from "react";
import { supportBoardScriptSrc } from "@/lib/supportBoard";

interface SupportBoardChatApi {
  open(open?: boolean): void;
}

declare global {
  interface Window {
    SBChat?: SupportBoardChatApi;
  }
}

const SUPPORT_BOARD_POLL_INTERVAL = 100;

export const useSupportBoard = () => {
  const [isSupportBoardReady, setIsSupportBoardReady] = useState(false);

  useEffect(() => {
    if (!supportBoardScriptSrc || typeof window === "undefined") {
      return;
    }

    const isChatReady = () => typeof window.SBChat?.open === "function";

    if (isChatReady()) {
      setIsSupportBoardReady(true);
      return;
    }

    const checkSupportBoardInterval = window.setInterval(() => {
      if (isChatReady()) {
        setIsSupportBoardReady(true);
        window.clearInterval(checkSupportBoardInterval);
      }
    }, SUPPORT_BOARD_POLL_INTERVAL);

    return () => {
      window.clearInterval(checkSupportBoardInterval);
    };
  }, []);

  const handleChat = () => {
    if (typeof window === "undefined" || typeof window.SBChat?.open !== "function") {
      console.warn("Support Board chat API not available");
      return;
    }

    try {
      window.SBChat.open();
      setIsSupportBoardReady(true);
    } catch (error) {
      console.error("Error opening Support Board chat:", error);
    }
  };

  return {
    isSupportBoardReady,
    handleChat,
  };
};
