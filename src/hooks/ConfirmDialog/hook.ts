"use client";
import { useCallback } from "react";
import { ConfirmDialogT, confirmDialogAtom } from "./state";
import { useSetRecoilState } from "recoil";
// https://dev.to/metamodal/control-a-dialog-box-asynchronously-using-react-hooks-4ik7

// eslint-disable-next-line
export function useConfirmDialog() {
  const setConfirmDialog = useSetRecoilState(confirmDialogAtom);

  const showConfirmDialog = useCallback(
    (options: ConfirmDialogT): Promise<null | boolean> => {
      return new Promise((res) => {
        setConfirmDialog({
          ...options,
          isOpen: true,
          onOk: () => res(true),
          onCancel: () => res(false),
          onDismiss: () => res(null),
        });
      });
    },
    []
  );

  return {
    showConfirmDialog,
  };
}
