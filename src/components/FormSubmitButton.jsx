"use client";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton({ type, className, textContent }) {
    const status = useFormStatus();

  return (
    <button type={type} className={`btn btn-primary ${className}`}>
        {status.pending && <span className="loading loading-spinner" />}
        {textContent}
    </button>
  )
}
