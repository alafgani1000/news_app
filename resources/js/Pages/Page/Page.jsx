import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import parse from "html-react-parser";
import Modal from "@/Components/Modal";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Index({ auth, pages, pgSearch, pgSort, pgPerPage }) {
    const [search, setSearch] = useState(pgSearch || "");
    const [sort, setSort] = useState(pgSort || "");
    const [perPage, setPerPage] = useState(pgPerPage || 10);
    const [wasSearch, setWasSearch] = useState(false);
    const [modalConfirmDelete, setModalConfirmDelete] = useState(false);
    const [idDelete, setIdDelete] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [formTitle, setFormTitle] = useState("Create New Page");

    const [uuid] = useState(uuidv4());

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
        // handle search
        router.get(
            route(route().current()),
            { search: search, sort: sort, perPage: perPage },
            {
                replace: true,
                preserveState: true,
            }
        );
    };

    useEffect(() => {
        handleSearch();
    }, [search, sort, perPage]);

    const closeModalDelete = () => {
        setModalConfirmDelete(false);
        setIdDelete("");
    };

    const confirmDeletePage = (data) => {
        setModalConfirmDelete(true);
        setIdDelete(data.id);
    };

    const deletePage = (e) => {
        e.preventDefault();
        axios
            .delete(`/admin/page/${idDelete}/delete`)
            .then((res) => {
                closeModalDelete();
                handleRefresh();
            })
            .catch((res) => {
                console.log(res.data);
            });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            permissions={auth.permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    Page
                </h2>
            }
        >
            <Head title="Page" />

            <div className="py-4 lg:py-12 md:py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 md:px-8 space-y-6">
                    <div className="bg-white rounded-md shadow">
                        <div className="text-gray-900 relative overflow-x-auto">
                            <div className="bg-white p-3 mt-0 mb-4 text-gray-600 font-bold border-b border-zinc rounded-t-md text-xl">
                                Page List
                            </div>
                            <div className="flex justify-end mr-8">
                                <Link
                                    className="bg-indigo-600 py-2 p-3 text-white rounded"
                                    href={`/admin/page/${uuid}/create`}
                                >
                                    <i className="bi bi-journal me-1"></i>{" "}
                                    Create Page
                                </Link>
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
                                                <option value="name">
                                                    Name
                                                </option>
                                                <option value="content">
                                                    Content
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
                                            <th className="text-left py-4 px-4">
                                                Name
                                            </th>
                                            <th className="text-left py-4 px-4">
                                                Status
                                            </th>
                                            <th className="text-center py-4 px-4">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pages.data.map((page, index) => {
                                            return (
                                                <tr
                                                    className="border-t last:border-b"
                                                    key={index}
                                                >
                                                    <td className="text-left py-3 px-4">
                                                        {page.name}
                                                    </td>
                                                    <td className="text-left py-3 px-4">
                                                        {page.status === 0 ? 'Unpublished' : 'Published'}
                                                    </td>
                                                    <td className="content-center">
                                                        <div className="flex flex-wrap space-x-1 justify-center">
                                                            <Link
                                                                href={`/admin/page/${page.code}/edit`}
                                                                className="bg-yellow-500 py-1 px-2 rounded text-white font-bold"
                                                            >
                                                                <i className="bi bi-pencil-fill"></i>
                                                            </Link>
                                                            <button
                                                                onClick={() => {
                                                                    confirmDeletePage(
                                                                        page
                                                                    );
                                                                }}
                                                                className="bg-rose-600 px-3 py-2 text-white text-sm rounded"
                                                            >
                                                                <i className="bi bi-trash3-fill"></i>
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
                                        {pages.links.map((link, index) => {
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
                                                Page {pages.current_page}
                                                &nbsp; from {
                                                    pages.last_page
                                                }{" "}
                                            </span>{" "}
                                        </div>
                                        <div className="flex justify-start space-x-4">
                                            <Link
                                                href={`${pages.prev_page_url}&search=${search}&perPage=${perPage}`}
                                                className="border py-2 px-4 rounded-md hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                                            >
                                                Prev
                                            </Link>
                                            <Link
                                                href={`${pages.next_page_url}&search=${search}&perPage=${perPage}`}
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

            <Modal show={modalConfirmDelete}>
                <div className="bg-white rounded max-w-lg mx-auto">
                    <div className="flex flex-col items-end m-0 p-0">
                        <button
                            onClick={() => closeModalDelete()}
                            className="bg-zinc-700 px-3 py-1 text-white hover:bg-black rounded-tr"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <form onSubmit={deletePage} className="px-6 pb-6">
                        <div className="mt-4">
                            <h2 className="text-lg font-medium text-gray-900">
                                Are you sure you want to delete this page?
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Data will be permanently deleted.
                            </p>
                            <div className="flex space-x-2 justify-end mt-4">
                                <button
                                    onClick={() => closeModalDelete()}
                                    type="button"
                                    className="border border-gray-500 py-2 px-4 rounded text-sm bg-gray-500 text-white hover:bg-gray-600"
                                >
                                    No, Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="border border-rose-500 py-2 px-4 rounded text-sm bg-rose-500 text-white hover:bg-rose-600"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
