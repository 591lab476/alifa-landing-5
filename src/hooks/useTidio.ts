import { useSupportBoard } from "./useSupportBoard";

export const useTidio = () => {
  const { isSupportBoardReady, handleChat } = useSupportBoard();

  return {
    isTidioReady: isSupportBoardReady,
    handleChat,
  };
};
