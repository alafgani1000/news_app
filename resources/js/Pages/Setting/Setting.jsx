import Confirm from "@/Components/Confirm";
import ErrorLabel from "@/Components/ErrorLabel";
import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Setting({ auth }) {
    const [menuName, setMenuName] = useState("");
    const [menus, setMenus] = useState([]);
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
                .put(`/category/${categoryId}/update`, {
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
                .post("/category", {
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
            .get(`/category`)
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
        alert("test delete");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    Setting
                </h2>
            }
        >
            <Head title="Setting" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 max-h-80 overflow-y-scroll">
                    <div className="text-xl mb-4 font-semibold text-gray-600">
                        Category
                    </div>
                    <div className="bg-white overflow-hidden sm:rounded-lg grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
                        <div className="p-6 text-gray-700 bg-gray-200 rounded">
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
                        <div className="p-6 text-gray-600 ">
                            <span className="text-lg">List of Category</span>
                            <div className="mt-4 grid">
                                <table>
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
                                                    className="border-b border-dashed"
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
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    confirmDeleteCategory(
                                                                        category
                                                                    );
                                                                }}
                                                                className="bg-rose-500 px-2 py-1 rounded me-1"
                                                            >
                                                                Delete
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

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 max-h- overflow-y-scroll mt-8">
                    <div className="text-xl mb-4 font-semibold text-gray-600 grid justify-start">
                        Menu
                    </div>
                    <div className="bg-white overflow-hidden sm:rounded-lg grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
                        <div className="p-6 text-gray-700 bg-white rounded">
                            <span className="text-lg">Create Menu</span>
                            <div className="mt-4 grid">
                                <label className="mb-2 font-normal">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    className="rounded-lg ring-gray-400 border-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div className="pt-4 grid justify-end">
                                <button className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-indigo-600">
                                    Submit
                                </button>
                            </div>
                        </div>
                        <div className="p-6 text-gray-600 bg-gray-200">
                            <span className="text-lg">List of Menu</span>
                            <div className="mt-4 grid">
                                <table>
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
                                        <tr className="border-b border-white border-dashed">
                                            <td className="px-3 py-2">
                                                Ekonomi
                                            </td>
                                            <td className="px-3 py-3 text">
                                                <div className="text-sm text-white">
                                                    <button className="bg-yellow-500 px-2 py-1 rounded me-1">
                                                        Edit
                                                    </button>
                                                    <button className="bg-rose-500 px-2 py-1 rounded me-1">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white border-dashed">
                                            <td className="px-3 py-2">Hukum</td>
                                            <td className="px-3 py-3 text">
                                                <div className="text-sm text-white">
                                                    <button className="bg-yellow-500 px-2 py-1 rounded me-1">
                                                        Edit
                                                    </button>
                                                    <button className="bg-rose-500 px-2 py-1 rounded me-1">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-white border-dashed">
                                            <td className="px-3 py-2">
                                                Kriminal
                                            </td>
                                            <td className="px-3 py-3 text">
                                                <div className="text-sm text-white">
                                                    <button className="bg-yellow-500 px-2 py-1 rounded me-1">
                                                        Edit
                                                    </button>
                                                    <button className="bg-rose-500 px-2 py-1 rounded me-1">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
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
                question="Are you sure delete this data ?"
                yes={deleteCategory}
                no={cancelDeleteCategory}
            />
        </AuthenticatedLayout>
    );
}
