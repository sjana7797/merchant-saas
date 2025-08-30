import { useState } from "react";

const OPEN = {
  OPEN: true,
  CLOSE: false,
} as const;

export const useDialog = (initialState: boolean = false) => {
  const [open, setOpen] = useState(initialState);

  const handleOpen = (open: boolean) => {
    setOpen(open);
  };

  const closeDialog = () => {
    setOpen(OPEN.CLOSE);
  };

  const openDialog = () => {
    setOpen(OPEN.OPEN);
  };

  return {
    actions: { handleOpen, openDialog, closeDialog } as const,
    open,
  };
};
