import { useEffect, useCallback } from "react";

import { KEYBOARD_ELEMENTS } from "@app/common/constants";
import type { Player } from "@app/redux/types";

export const useKeyboard = ({
  activePlayer,
  handlePlayerMadeFreeThrow,
}: {
  activePlayer: Player | null;
  handlePlayerMadeFreeThrow: (player: Player | null) => void;
}) => {
  const handleMadeFreeThrow = useCallback(
    (e: KeyboardEvent) => {
      if (
        !e.ctrlKey &&
        (e.key === KEYBOARD_ELEMENTS.Z ||
          e.key === KEYBOARD_ELEMENTS.Z_CYRILLIC)
      ) {
        handlePlayerMadeFreeThrow(activePlayer);
      }
    },
    [activePlayer, handlePlayerMadeFreeThrow],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleMadeFreeThrow);

    return () => {
      document.removeEventListener("keydown", handleMadeFreeThrow);
    };
  }, [activePlayer, handleMadeFreeThrow]);

  return {
    handleMadeFreeThrow,
  };
};
