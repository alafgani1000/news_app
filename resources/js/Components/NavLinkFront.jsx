import { Link } from "@inertiajs/react";

export default function NavLinkFront({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "font-semibold bg-indigo-600 px-4 text-white"
                    : "border-transparent hover:text-gray-800 text-gray-700 focus:text-gray-800 px-4 ") +
                className
            }
        >
            {children}
        </Link>
    );
}
