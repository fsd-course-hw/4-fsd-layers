import clsx from "clsx";
import { InputHTMLAttributes, PropsWithRef, TextareaHTMLAttributes, useId } from "react";

export type UiTextFieldWithInputProps = {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
  textareaProps?: never;
};

export type UiTextFieldWithTextareaProps = {
  className?: string;
  label?: string;
  error?: string;
  inputProps?: never;
  textareaProps?: PropsWithRef<TextareaHTMLAttributes<HTMLTextAreaElement>>;
};


export type UiTextFieldProps = UiTextFieldWithInputProps | UiTextFieldWithTextareaProps;

export function UiTextField({
  className,
  error,
  label,
  inputProps,
  textareaProps,
}: UiTextFieldProps) {
  const id = useId();

  return (
    <div className={clsx(className, "flex flex-col gap-1")}>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}

      {textareaProps ? (
        <textarea
          id={id}
          className="w-full px-3 py-2 border border-slate-3 rounded-lg"
          {...textareaProps}
        />
      ) : (
        <input
          {...inputProps}
          id={id}
          className={clsx(
            inputProps?.className,
            "rounded border border-slate-300 focus:border-teal-600 px-2 h-10 outline-none",
          )}
        />
      )}
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}
