import Badge from "@/Components/Badge";
import Confirm from "@/Components/Confirm";
import ErrorLabel from "@/Components/ErrorLabel";
import Modal from "@/Components/Modal";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Setting({ auth }) {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [isCategoryEdit, setIsCategoryEdit] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [toastData, setToastData] = useState({
        message: "",
        color: "",
    });
    const [categoryError, setCategoryError] = useState({
        name: "",
    });

    // function process
    const closeToast = () => {
        setShowToast(false);
    };

    useEffect(() => {
        getDataCategory();
    }, []);

    const resetCategoryComp = () => {
        setCategoryId("");
        setCategoryName("");
        setCategoryError({
            name: "",
        });
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (isCategoryEdit === true) {
            axios
                .put(`/admin/category/${categoryId}/update`, {
                    name: categoryName,
                })
                .then((res) => {
                    setToastData({
                        message: res.data,
                        color: "success",
                    });
                    setShowToast(true);
                    cancelEditCategory();
                    getDataCategory();
                })
                .catch((err) => {
                    let errors = err.response.data.errors;
                    if (errors.name[0] !== undefined) {
                        setCategoryError({
                            name: errors.name[0],
                        });
                    }
                    setToastData({
                        message: "Update Failed!",
                        color: "error",
                    });
                    setShowToast(true);
                });
        } else {
            axios
                .post("/admin/category", {
                    name: categoryName,
                })
                .then((res) => {
                    setToastData({
                        message: res.data,
                        color: "success",
                    });
                    setShowToast(true);
                    resetCategoryComp();
                    getDataCategory();
                })
                .catch((err) => {
                    let errors = err.response.data.errors;
                    if (errors.name[0] !== undefined) {
                        setCategoryError({
                            name: errors.name[0],
                        });
                    }
                    setToastData({
                        message: "Process Failed!",
                        color: "error",
                    });
                    setShowToast(true);
                });
        }
    };

    const getDataCategory = () => {
        axios
            .get(`/admin/category-data`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => console.log(err));
    };

    const editCategory = (category) => {
        setCategoryName(category.name);
        setCategoryId(category.id);
        setIsCategoryEdit(true);
    };

    const confirmDeleteCategory = (category) => {
        setCategoryId(category.id);
        setShowConfirm(true);
    };

    const checkStatus = () => {
        if (menuStatus === false) {
            setMenuStatus(true);
        } else {
            setMenuStatus(false);
        }
    };

    const cancelEditCategory = () => {
        setCategoryName("");
        setCategoryId("");
        setIsCategoryEdit(false);
        setCategoryError({
            name: "",
        });
    };

    const cancelDeleteCategory = () => {
        setShowConfirm(false);
        setCategoryId("");
    };

    const deleteCategory = () => {
        axios
            .delete(`/admin/category/${categoryId}/delete`)
            .then((res) => {
                setShowConfirm(false);
                setCategoryId("");
                getDataCategory();
                setToastData({
                    message: res.data,
                    color: "success",
                });
                setShowToast(true);
            })
            .catch((err) => {
                setToastData({
                    message: "Delete Failed!",
                    color: "error",
                });
                setShowToast(true);
                setShowConfirm(false);
            });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            permissions={auth.permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    Setting
                </h2>
            }
        >
            <Head title="Setting" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-xl font-semibold text-gray-600 bg-white border-b border-gray-100 p-4 rounded-t-lg">
                        Category
                    </div>
                    <div className="grid">
                        <div className="px-5 py-3 text-gray-700 bg-white">
                            <form onSubmit={handleCategorySubmit}>
                                <span className="text-lg">Create Category</span>
                                <div className="mt-4 grid">
                                    <label className="mb-2 font-normal">
                                        Name:
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setCategoryName(e.target.value)
                                        }
                                        type="text"
                                        value={categoryName}
                                        className="rounded-lg ring-gray-400 border-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <ErrorLabel
                                        className="text-xs mt-1"
                                        message={categoryError.name}
                                    />
                                </div>
                                <div className="pt-4 flex space-x-1 justify-end">
                                    <button
                                        type="submit"
                                        className={
                                            "text-white px-3 py-2 rounded hover:bg-indigo-600 " +
                                            (isCategoryEdit === false
                                                ? "bg-gray-500"
                                                : "bg-yellow-500")
                                        }
                                    >
                                        {isCategoryEdit === false
                                            ? "Save"
                                            : "Update"}
                                    </button>
                                    {isCategoryEdit === true ? (
                                        <button
                                            onClick={() => {
                                                cancelEditCategory();
                                            }}
                                            type="button"
                                            className="bg-rose-500 text-white px-3 py-2 rounded hover:bg-rose-600"
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="px-5 py-3 text-gray-600 mt-1 bg-white rounded-b-lg">
                            <span className="text-lg">List of Category</span>
                            <div className="mt-4">
                                <table className="w-full">
                                    <thead className="bg-gray-100 rounded">
                                        <tr>
                                            <th className="text-left p-3 w-2/3">
                                                Name
                                            </th>
                                            <th className="text-left p-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.map((category, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    className=""
                                                >
                                                    <td className="px-3 py-2">
                                                        {category.name}
                                                    </td>
                                                    <td className="px-3 py-3 text">
                                                        <div className="text-sm text-white">
                                                            <button
                                                                onClick={() => {
                                                                    editCategory(
                                                                        category
                                                                    );
                                                                }}
                                                                className="bg-yellow-500 px-2 py-1 rounded me-1"
                                                            >
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    confirmDeleteCategory(
                                                                        category
                                                                    );
                                                                }}
                                                                className="bg-rose-500 px-2 py-1 rounded me-1"
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Toast
                show={showToast}
                message={toastData.message}
                time={10000}
                falseShow={closeToast}
                color={toastData.color}
            />

            <Confirm
                show={showConfirm}
                question="Are you sure delete this category ?"
                yes={deleteCategory}
                no={cancelDeleteCategory}
            />

        </AuthenticatedLayout>
    );
}
