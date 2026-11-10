"use client";

import type { ReactNode } from "react";
import { Button } from "./button";
import { Card } from "./card";

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-secondary-950/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="w-full max-w-md">
        <Card>
          <div className="flex flex-col gap-3">
            <h2
              id="confirm-dialog-title"
              className="m-0 text-lg font-semibold tracking-tight"
            >
              {title}
            </h2>
            {description ? (
              <p className="m-0 text-sm leading-normal text-secondary-600">
                {description}
              </p>
            ) : null}
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="secondary" onClick={onCancel}>
                {cancelLabel}
              </Button>
              <Button type="button" onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
