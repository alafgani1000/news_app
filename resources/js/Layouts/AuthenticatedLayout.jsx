import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-indigo-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current font-bold text-white" />
                                </Link>
                            </div>

                            <div className="hidden space-x-3 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    <i className="bi bi-graph-up-arrow me-2"></i>
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    href={route("news.index")}
                                    active={route().current("news.index")}
                                >
                                    <i className="bi bi-card-heading me-2"></i>
                                    News
                                </NavLink>

                                <NavLink
                                    href={route("setting.index")}
                                    active={route().current("setting.index")}
                                >
                                    <i className="bi bi-gear-fill me-2"></i>
                                    Settings
                                </NavLink>

                                <NavLink
                                    href={route("media.index")}
                                    active={route().current("media.index")}
                                >
                                    <i className="bi bi-card-image me-2"></i>
                                    Media
                                </NavLink>

                                <NavLink
                                    href={route("user.index")}
                                    active={route().current("user.index")}
                                >
                                    <i className="bi bi-people-fill me-2"></i>
                                    User
                                </NavLink>
                                <div className="hidden sm:flex sm:items-center sm:ms-6">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className=" rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md hover:text-white hover:border-b-gray-400 focus:outline-none transition ease-in-out duration-150 text-white"
                                                >
                                                    <i className="bi bi-lock-fill me-2"></i>
                                                    Access
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
                                                href={route("role.index")}
                                            >
                                                Role
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("permission.index")}
                                            >
                                                Permission
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("role-perms.index")}
                                            >
                                                Role Have Permission
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

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
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
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

                        <ResponsiveNavLink
                            href={route("user.index")}
                            active={route().current("user.index")}
                        >
                            User
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("role.index")}
                            active={route().current("role.index")}
                        >
                            Role
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route("role-perms.index")}
                            active={route().current("role.index")}
                        >
                            Role Have Permission
                        </ResponsiveNavLink>
                    </div>

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
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>

            <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8 space-y-6">
                <div className="bg-white overflow-hidden shadow-sm lg:rounded md:rounded py-4 px-4">
                    <div className="text-gray-400">2024 Free Sorfware</div>
                </div>
            </div>
        </div>
    );
}
