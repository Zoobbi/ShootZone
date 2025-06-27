import type { ChangeEvent, KeyboardEvent } from "react";

export interface InputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  error?: string;
}
