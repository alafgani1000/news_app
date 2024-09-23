import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import ErrorLabel from "@/Components/ErrorLabel";
import Toast from "@/Components/Toast";

export default function Media({ auth, media, pgSearch, pgSort, pgPerPage }) {
    const [search, setSearch] = useState(pgSearch || "");
    const [sort, setSort] = useState(pgSort || "");
    const [perPage, setPerPage] = useState(pgPerPage || 10);
    const [wasSearch, setWasSearch] = useState(false);
    const [modalCreate, setModalCreate] = useState();
    const [fileData, setFileData] = useState([]);
    const [uploadError, setUploadError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastData, setToastData] = useState({
        message: "",
        color: "",
    });

    const closeModal = () => {
        setModalCreate(false);
    };

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

    const showFormUplod = () => {
        setModalCreate(true);
    };

    const handleFileUpload = (e) => {
        if (e.target.files) {
            const files = e.target.files[0];
            setFileData(files);
        }
    };

    const resetForm = () => {
        setFileData([]);
        setUploadError("");
    };

    const handleUploadImage = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("image", fileData);
        axios
            .post(`/admin/galery/upload`, formData, {
                headers: {
                    "Content-Type": `multipart/form-data`,
                },
            })
            .then((res) => {
                setToastData({
                    message: res.data,
                    color: "success",
                });
                setShowToast(true);
                resetForm();
                setModalCreate(false);
                handleRefresh();
            })
            .catch((err) => {
                setUploadError(err.response.data?.errors?.image[0]);
                setToastData({
                    message: "Upload Failed",
                    color: "error",
                });
                setShowToast(true);
            });
    };

    const closeToast = () => {
        setShowToast(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            permissions={auth.permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    Galery
                </h2>
            }
        >
            <Head title="Media" />

            <div className="py-4 lg:py-12 md:py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 md:px-8 space-y-6">
                    <div className="bg-white rounded-md shadow">
                        <div className="text-gray-900 relative overflow-x-auto">
                            <div className="bg-white p-3 mt-0 mb-4 text-gray-600 font-bold border-b border-zinc rounded-t-md text-xl">
                                Data Galery
                            </div>
                            <div className="flex justify-end mr-8">
                                <button
                                    onClick={() => showFormUplod()}
                                    className="border border-indigo-600 py-2 px-3 bg-indigo-600 hover:text-white hover:bg-indigo-700 hover:border-indigo-700 rounded text-white text-sm"
                                >
                                    <span className="text-sm mr-2">
                                        <i className="bi bi-upload"></i>
                                    </span>
                                    Upload File
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
                                                <option value="name">
                                                    Name
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
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {media.data.map((data, index) => {
                                            return (
                                                <tr
                                                    className="border-t last:border-b"
                                                    key={index}
                                                >
                                                    <td className="text-left py-3 px-4">
                                                        {data.name}
                                                    </td>
                                                    <td className="content-center">
                                                        <div className="flex flex-wrap space-x-1">
                                                            <button className="bg-yellow-500 px-3 py-2 text-white text-sm rounded">
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>
                                                            <button className="bg-rose-600 px-3 py-2 text-white text-sm rounded">
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
                                        {media.links.map((link, index) => {
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
                                                Page {media.current_page}
                                                &nbsp; from {
                                                    media.last_page
                                                }{" "}
                                            </span>{" "}
                                        </div>
                                        <div className="flex justify-start space-x-4">
                                            <Link
                                                href={`${media.prev_page_url}&search=${search}&perPage=${perPage}`}
                                                className="border py-2 px-4 rounded-md hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                                            >
                                                Prev
                                            </Link>
                                            <Link
                                                href={`${media.next_page_url}&search=${search}&perPage=${perPage}`}
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
                <div className="bg-white rounded max-w-2xl w-full mx-auto">
                    <div className="flex flex-col items-end m-0 p-0">
                        <button
                            onClick={() => closeModal()}
                            className="bg-zinc-700 px-3 py-1 text-white hover:bg-rose-600 rounded-tr"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <form onSubmit={handleUploadImage} className="px-6 pb-6">
                        <h2 className="text-xl font-medium text-gray-900">
                            Upload Image
                        </h2>
                        <div className="grid mt-4">
                            <div className="grid mt-4">
                                <label className="mb-2">Image:</label>
                                <input
                                    type="file"
                                    className="file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-zinc-200 file:text-gray-500
                                        hover:file:bg-violet-100"
                                    onChange={handleFileUpload}
                                />
                                <ErrorLabel
                                    message={uploadError}
                                    className="mt-1"
                                />
                            </div>
                            <div className="grid justify-end mt-4">
                                <button
                                    type="submit"
                                    className="border border-blue-500 py-2 px-4 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>

            <Toast
                show={showToast}
                message={toastData.message}
                time={30000}
                falseShow={closeToast}
                color={toastData.color}
            />
        </AuthenticatedLayout>
    );
}
