"use client";

import { useState, type FormEvent } from "react";
import { Button } from "../ui/button";
import { TextField } from "../ui/text-field";

export type NoteFormProps = {
  label: string;
  placeholder?: string;
  submitLabel?: string;
};

export function NoteForm({
  label,
  placeholder,
  submitLabel = "Save",
}: NoteFormProps) {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(value.trim());
  }

  return (
    <form className="flex flex-col gap-3.5" onSubmit={onSubmit}>
      <TextField
        label={label}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          setSaved(null);
          setValue(event.target.value);
        }}
      />
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={value.trim().length === 0}>
          {submitLabel}
        </Button>
        {saved !== null ? (
          <p className="m-0 text-sm text-primary" role="status">
            {saved.length > 0 ? `Saved: ${saved}` : "Cleared."}
          </p>
        ) : null}
      </div>
    </form>
  );
}
