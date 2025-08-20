import * as React from "react";

function cn(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

export type InputVariant = "outlined" | "filled" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  variant?: InputVariant;
  size?: InputSize;
  invalid?: boolean;
  loading?: boolean;
  clearable?: boolean;
  passwordToggle?: boolean;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      helperText,
      errorMessage,
      variant = "outlined",
      size = "md",
      disabled = false,
      invalid = false,
      loading = false,
      clearable = false,
      passwordToggle = false,
      type = "text",
      value,
      onChange,
      className,
      ...rest
    },
    ref
  ) => {
    const inputId = React.useId();
    const resolvedId = id ?? inputId;
    const helperId = `${resolvedId}-helper`;
    const errorId = `${resolvedId}-error`;

    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType =
      isPassword && passwordToggle ? (showPassword ? "text" : "password") : type;

    const sizeStyles: Record<InputSize, string> = {
      sm: "h-7 px-3 text-sm rounded-md",
      md: "h-10 px-3 text-base rounded-lg",
      lg: "h-14 px-4 text-lg rounded-xl",
    };

    const variantStyles: Record<InputVariant, string> = {
      outlined:
        "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
      filled:
        "bg-neutral-100 dark:bg-neutral-800 border border-transparent focus:ring-2 focus:ring-blue-500",
      ghost:
        "bg-transparent border border-transparent border-b-neutral-300 dark:border-b-neutral-700 focus:border-b-blue-500 focus:ring-0",
    };

    const invalidStyles = invalid
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "";
    const disabledStyles = disabled ? "opacity-60 cursor-not-allowed" : "";
    const base =
      "w-full outline-none transition-colors placeholder:text-neutral-400 dark:placeholder:text-neutral-500";
    const withRightPad =
      loading || clearable || (isPassword && passwordToggle) ? "pr-10" : "";

    const canClear =
      clearable &&
      !disabled &&
      !loading &&
      typeof value === "string" &&
      value.length > 0;

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!onChange) return;
      const target = { value: "" } as unknown as React.ChangeEvent<HTMLInputElement>["target"];
      onChange({ target } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className="w-full max-w-md">
        {label && (
          <label
            htmlFor={resolvedId}
            className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={resolvedId}
            ref={ref}
            aria-invalid={invalid || undefined}
            aria-busy={loading || undefined}
            aria-describedby={
              invalid && errorMessage ? errorId : helperText ? helperId : undefined
            }
            disabled={disabled || loading}
            className={cn(
              base,
              sizeStyles[size],
              variantStyles[variant],
              invalidStyles,
              disabledStyles,
              withRightPad,
              className
            )}
            type={inputType}
            value={value}
            onChange={onChange}
            {...rest}
          />

          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center gap-1">
            {loading && (
              <svg
                className="h-4 w-4 animate-spin text-neutral-500"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            )}
          </div>

          <div className="absolute inset-y-0 right-2 flex items-center gap-1">
            {canClear && (
              <button
                type="button"
                onClick={handleClear}
                className="pointer-events-auto rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
                aria-label="Clear input"
                title="Clear"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}

            {isPassword && passwordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="pointer-events-auto rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide" : "Show"}
              >
                {showPassword ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3l18 18" />
                    <path d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-3.42" />
                    <path d="M16.88 16.88C15.26 17.9 13.66 18.5 12 18.5 6 18.5 2.5 12 2.5 12a19.6 19.6 0 014.13-4.93" />
                    <path d="M9.9 4.24A10.84 10.84 0 0112 3.5c6 0 9.5 6.5 9.5 6.5a19.66 19.66 0 01-3.13 3.75" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4.5-7.5 11-7.5S23 12 23 12s-4.5 7.5-11 7.5S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {invalid && errorMessage ? (
          <p id={errorId} className="mt-1 text-xs text-red-600">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={helperId} className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;



