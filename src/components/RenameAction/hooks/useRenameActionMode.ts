import { useState } from "react";
import { RenameActionMode } from "../types";

function useRenameActionMode() {
  const [mode, setMode] = useState<RenameActionMode>(RenameActionMode.Pending);

  return {
    mode,
    setPending() {
      setMode(RenameActionMode.Pending);
    },
    setInAction() {
      setMode(RenameActionMode.InAction);
    },
  };
}

export default useRenameActionMode;
