import { Link } from "react-router-dom";

interface IButton {
  children: string;
  isSubmitting?: boolean;
  to?: string;
}

export const Button = ({ children, isSubmitting, to }: IButton) => {
  const classname =
    "inline-block px-4 py-3 font-semibold tracking-wide uppercase transition-colors duration-300 bg-yellow-400 rounded-full text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4";
  if (to) {
    return (
      <Link to={to} className={classname}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={isSubmitting} className={classname}>
      {children}
    </button>
  );
};
