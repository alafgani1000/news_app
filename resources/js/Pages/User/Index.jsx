import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import parse from "html-react-parser";
import Modal from "@/Components/Modal";

export default function Index({
    auth,
    users,
    pgSearch,
    pgSort,
    pgPerPage,
    roles,
}) {
    const [search, setSearch] = useState(pgSearch || "");
    const [sort, setSort] = useState(pgSort || "");
    const [perPage, setPerPage] = useState(pgPerPage || 10);
    const [wasSearch, setWasSearch] = useState(false);
    const [sorts, setSorts] = useState({
        id: false,
        name: false,
        email: false,
    });
    const [modalCreate, setModalCreate] = useState(false);
    const [formData, setFormData] = useState({});

    const handleSearch = () => {
        // handle search
        if (wasSearch) {
            router.get(
                route(route().current()),
                { search: search, sort: sort, perPage: perPage },
                {
                    replace: true,
                    preserveState: true,
                }
            );
        }
    };

    const handleRefresh = () => {
        // handle refresh
        router.get(
            route(route().current()),
            { search: search, sort: sort, perPage: perPage },
            {
                replace: true,
                preserveState: true,
            }
        );
    };

    const closeModalCreate = () => {
        setModalCreate(false);
    };

    const createUser = () => {
        setModalCreate(true);
    };

    useEffect(() => {
        handleSearch();
    }, [search, sort, perPage]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight bg-blue-">
                    User
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-4 lg:py-12 md:py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 md:px-8 space-y-6">
                    <div className="bg-white rounded-md shadow">
                        <div className="text-gray-900 relative overflow-x-auto">
                            <div className="bg-white-400 text-gray-600 p-4 mt-0 mb-4 font-bold border-b border-zinc rounded-t-md text-xl">
                                Data User
                            </div>
                            <div className="flex justify-end mr-8">
                                <button
                                    onClick={() => {
                                        createUser();
                                    }}
                                    className="border py-2 px-3 bg-indigo-500 hover:text-white hover:bg-indigo-600 hover:border-blue-500 rounded-md text-white text-sm"
                                >
                                    <span className="text-xs mr-2">
                                        <i className="bi bi-plus-square"></i>
                                    </span>
                                    New User
                                </button>
                            </div>
                            <div className="lg:mx-8 md:mx-8 mx-0 my-8 border border-zinc-100 md:rounded-lg lg:rounded-lg">
                                <div className="grid bg-zinc-100 py-4 px-4 border-b border-zinc-200 items-center">
                                    <div className="lg:flex lg:space-x-4 justify-start">
                                        <div className="flex items-center space-x-2 bg-white rounded-md ps-3 md:mb-2 mb-2">
                                            <span className="text-base text-slate-400">
                                                <i className="bi bi-book-half"></i>
                                            </span>
                                            <select
                                                value={perPage}
                                                onChange={(e) => {
                                                    setPerPage(e.target.value);
                                                    setWasSearch(true);
                                                }}
                                                className="py-2 bg-white border-none focus:outline-none focus:border-white focus:ring-white block rounded-md text-base focus:ring-0 text-gray-500 w-full"
                                            >
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-white rounded-md ps-3 md:mb-2 mb-2">
                                            <span className="text-base text-slate-500">
                                                <i className="bi bi-sort-down-alt"></i>
                                            </span>
                                            <select
                                                value={sort}
                                                onChange={(e) => {
                                                    setSort(e.target.value);
                                                    setWasSearch(true);
                                                }}
                                                className="py-2 bg-white border-none focus:outline-none focus:border-white focus:ring-white block rounded-md text-base focus:ring-0 text-gray-500 w-full"
                                            >
                                                <option value="id">ID</option>
                                                <option value="name">
                                                    Name
                                                </option>
                                                <option value="email">
                                                    Email
                                                </option>
                                            </select>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-white rounded-md ps-3 md:mb-2 mb-2">
                                            <span className="text-sm text-slate-400">
                                                <i className="bi bi-search"></i>
                                            </span>
                                            <input
                                                value={search}
                                                type="text"
                                                className="bg-white shadow-sm border-none placeholder-slate-400 rounded-md focus:outline-none focus:ring-0 block sm:text-base text-gray-500 w-full"
                                                placeholder="Search"
                                                onChange={(e) => {
                                                    setSearch(e.target.value);
                                                    setWasSearch(true);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <table className="text-sm md:text-base w-full table-auto me-4">
                                    <thead className="bg-zinc-100 p-2">
                                        <tr className="p-8">
                                            <th className="py-4 px-2">ID</th>
                                            <th className="text-left py-4">
                                                Name
                                            </th>
                                            <th className="py-4 text-left hidden mb:block lg:block sm:block align-middle">
                                                Email
                                            </th>
                                            <th className="text-left py-4">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.data.map((user, index) => {
                                            return (
                                                <tr
                                                    className="border-t last:border-b"
                                                    key={index}
                                                >
                                                    <td className="text-center py-3">
                                                        {user.id}
                                                    </td>
                                                    <td>
                                                        <span>{user.name}</span>
                                                        <br />
                                                        <span className="lg:hidden md:hidden sm:hidden inline-table font-semibold">
                                                            {user.email}
                                                        </span>
                                                    </td>
                                                    <td className="hidden mb:block lg:block sm:block">
                                                        {user.email}
                                                    </td>
                                                    <td>
                                                        <div className="flex flex-wrap space-x-1">
                                                            <button className="bg-yellow-500 py-1 px-2 rounded text-white font-bold">
                                                                <i className="bi bi-pencil-fill"></i>
                                                            </button>
                                                            <button className="bg-rose-500 py-1 px-2 rounded text-white font-bold">
                                                                <i className="bi bi-x-lg"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                {/* pagination */}
                                <div className="hidden mt-4 mb-4 w-full md:block md:w-auto">
                                    <ul className="flex justify-center items-center -space-x-px text-base h-10">
                                        {users.links.map((link, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className="first:rounded-l-md border last:rounded-e-md"
                                                >
                                                    {link.active === false ? (
                                                        link.url === null ? (
                                                            <Link
                                                                href={null}
                                                                className="flex items-center justify-center px-2 py-1 text-sm lg:text-base md:px-3 md:py-2"
                                                                disabled
                                                            >
                                                                {parse(
                                                                    link.label
                                                                )}
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                href={`${link.url}&search=${search}&perPage=${perPage}`}
                                                                className="flex items-center justify-center px-2 py-1 text-sm lg:text-base md:px-3 md:py-2"
                                                                disabled
                                                            >
                                                                {parse(
                                                                    link.label
                                                                )}
                                                            </Link>
                                                        )
                                                    ) : (
                                                        <Link
                                                            href={null}
                                                            className="flex items-center justify-center px-2 py-1 lg:text-base bg-slate-100 text-sm md:px-3 md:py-2"
                                                        >
                                                            {`${parse(
                                                                link.label
                                                            )}`}
                                                        </Link>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="md:hidden lg:hidden">
                                    <div className="grid grid-cols-2 text-sm md:grid-cols-2 lg:grid-cols-2 md:text-base lg:text-base space-x-4 my-4 mx-8">
                                        <div className="flex justify-start text-zinc-600 ">
                                            <span className="py-2 px-2 bg-zinc-100 rounded">
                                                Page {users.current_page}
                                                &nbsp; from {
                                                    users.last_page
                                                }{" "}
                                            </span>{" "}
                                        </div>
                                        <div className="flex justify-start space-x-4">
                                            <Link
                                                href={`${users.prev_page_url}&search=${search}&perPage=${perPage}`}
                                                className="border py-2 px-4 rounded-md hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                                            >
                                                Prev
                                            </Link>
                                            <Link
                                                href={`${users.next_page_url}&search=${search}&perPage=${perPage}`}
                                                className="border py-2 px-4 rounded-md hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                                            >
                                                Next
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={modalCreate}>
                <div className="bg-white rounded max-w-3xl w-full mx-auto">
                    <div className="flex flex-col items-end m-0 p-0">
                        <button
                            onClick={() => closeModalCreate()}
                            className="bg-zinc-700 px-3 py-1 text-white hover:bg-rose-600 rounded-tr"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <form onSubmit={createUser} className="px-6 pb-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Create User
                        </h2>
                        <div className="grid mt-4">
                            <label className="mb-2">Name:</label>
                            <input
                                type="text"
                                className="rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="grid mt-4">
                            <label className="mb-2">Email:</label>
                            <input
                                type="email"
                                className="rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="grid mt-4">
                            <label className="mb-2">Password:</label>
                            <input
                                type="password"
                                className="rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="grid mt-4">
                            <label className="mb-2">Re Password:</label>
                            <input
                                type="password"
                                className="rounded-lg focus:ring-sky-500 focus:border-sky-500"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="grid mt-4">
                            <label className="mb-2">Role:</label>
                            <select className="rounded-lg focus:ring-sky-500 focus:border-sky-500">
                                <option>-- Please select role --</option>
                                {roles.map((value, key) => {
                                    return (
                                        <option value={value.name}>
                                            {value.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="grid justify-end mt-4">
                            <button
                                type="submit"
                                className="border border-sky-500 py-2 px-4 rounded-md text-sm bg-sky-500 text-white hover:bg-sky-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
