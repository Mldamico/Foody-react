import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  SyntheticEvent,
} from "react";
import { Link } from "react-router-dom";

type styles = "primary" | "small" | "secondary" | "round";

interface IButton {
  children: string | string[];
  isSubmitting?: boolean;
  to?: string;
  type?: styles;
  onClick?: () => void;
  buttonType?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
}

export const Button = ({
  children,
  isSubmitting,
  to,
  type = "primary",
  buttonType = "button",
  isLoading,
  onClick,
}: IButton) => {
  const base =
    "inline-block text-sm font-semibold tracking-wide uppercase transition-colors duration-300 bg-yellow-400 rounded-full text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 sm:px-5 md:py-2.5 text-xs",
    secondary:
      "inline-block text-sm font-semibold tracking-wide uppercase transition-colors duration-300 border-2 border-stone-300 rounded-full text-stone-400 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-strone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
    round: base + " px-2.5 py-1 sm:px-3.5 md:py-2 text-sm",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type={buttonType}
        onClick={onClick}
        disabled={isSubmitting || isLoading}
        className={styles[type]}
      >
        {children}
      </button>
    );
  }
  return (
    <button disabled={isSubmitting} className={styles[type]}>
      {children}
    </button>
  );
};
