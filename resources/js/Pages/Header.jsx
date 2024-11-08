import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import NavLinkFront from "@/Components/NavLinkFront";

export default function Header({ user, categories, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-indigo-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-14 px-2 py-2">
                        {/* app logo */}
                        <div className="flex">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current font-bold text-white" />
                            </Link>
                            <div className="content-center ms-4 text-white text-xl font-semibold">
                                ICON Text
                            </div>
                        </div>
                        {/* media social icon */}
                        <div className="sm:flex sm:items-center sm:ms-6 content-center">
                            <div className="ms-3 relative px-4">
                                <ul className="flex space-x-4">
                                    <li>
                                        <i className="bi bi-envelope-fill text-base text-white"></i>
                                    </li>
                                    <li>
                                        <i className="bi bi-youtube text-base text-white"></i>
                                    </li>
                                    <li>
                                        <i className="bi bi-twitter-x text-base text-white"></i>
                                    </li>
                                    <li>
                                        <i className="bi bi-facebook text-base text-white"></i>
                                    </li>
                                    <li>
                                        <i className="bi bi-instagram text-base text-white"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* fixed w-full z-50 top-0 sticky */}
            <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="hidden space-x-1 sm:-my-px sm:flex">
                                <NavLinkFront
                                    href={route("home")}
                                    active={route().current("home")}
                                >
                                    Home
                                </NavLinkFront>

                                {categories.map((category, index) => {
                                    return (
                                        <NavLinkFront
                                            key={index}
                                            href={route("news-menu", {
                                                name: category.name,
                                            })}
                                            active={route().current(
                                                "news-menu",
                                                { name: category.name }
                                            )}
                                        >
                                            {category.name}
                                        </NavLinkFront>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                {user ? (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        user.name.slice(1)}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("dashboard")}
                                            >
                                                Dashboard
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                ) : (
                                    <NavLinkFront
                                        href={route("login")}
                                        active={route().current("login")}
                                    >
                                        Sign In
                                    </NavLinkFront>
                                )}
                            </div>
                        </div>

                        <div className="me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>
                    {user ? (
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-white">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-white">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    ) : (
                        <ResponsiveNavLink
                            href={route("login")}
                            active={route().current("login")}
                        >
                            Sign In
                        </ResponsiveNavLink>
                    )}
                </div>
            </nav>

            <main className="my-10">{children}</main>

            <div className="px-0 md:px-6 lg:px-12 bg-white py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-12">
                    <div className="px-4 text-gray-600 sm:rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-4">
                        <div className="contact-us">
                            <h1 className="text-lg font-bold">Contact Us</h1>
                            <ul className="space-y-4 mt-6 text-sm font-medium">
                                <li>
                                    <i className="bi bi-map me-4"></i> Serang,
                                    Banten, Indonesia
                                </li>
                                <li>
                                    <i className="bi bi-telephone me-4"></i>
                                    (021) 010 912 9121
                                </li>
                                <li>
                                    <i className="bi bi-envelope me-4"></i>
                                    info@testemail.com
                                </li>
                            </ul>
                        </div>
                        <div className="category-footer">
                            <h1 className="text-lg font-bold">Category</h1>
                            <ul className="space-y-4 mt-6 text-sm font-medium">
                                <li>Ekonomi</li>
                                <li>Politik</li>
                                <li>Kesehatan</li>
                            </ul>
                        </div>
                        <div className="category-footer text-end">
                            <h1 className="text-lg font-bold">Follow US</h1>
                            <ul className="mt-6 text-sm font-medium flex justify-end">
                                <li className="bg-white py-0.5 px-3 rounded-md me-2 shadow">
                                    <i className="bi bi-youtube text-base text-rose-600"></i>
                                </li>
                                <li className="bg-white py-0.5 px-3 rounded-md me-2 shadow">
                                    <i className="bi bi-twitter-x text-base text-slate-800"></i>
                                </li>
                                <li className="bg-white py-0.5 px-3 rounded-md me-2 shadow">
                                    <i className="bi bi-facebook text-base text-blue-500"></i>
                                </li>
                                <li className="bg-white py-0.5 px-3 rounded-md shadow">
                                    <i className="bi bi-instagram text-base text-fuchsia-600"></i>
                                </li>
                            </ul>
                            <div className="mt-8 text-slate-400 text-end">
                                2024 Free Software
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
