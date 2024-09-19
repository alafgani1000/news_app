import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "border-indigo-700 font-semibold focus:border-indigo-700 bg-indigo-700 px-4 text-white"
                    : "border-transparent hover:text-white text-white hover:border-gray-400 focus:text-slate-400 focus:border-gray-400 px-4 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
