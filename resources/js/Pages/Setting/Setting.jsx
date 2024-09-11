import Badge from "@/Components/Badge";
import Confirm from "@/Components/Confirm";
import ErrorLabel from "@/Components/ErrorLabel";
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
    const [menus, setMenus] = useState([]);
    const [menuName, setMenuName] = useState("");
    const [menuUrl, setMenuUrl] = useState("");
    const [menuStatus, setMenuStatus] = useState(true);
    const [menuId, setMenuId] = useState("");
    const [isMenuEdit, setIsMenuEdit] = useState(false);
    const [showConfirmDelMenu, setShowConfirmDelMenu] = useState(false);
    const [menuError, setMenuError] = useState({
        name: "",
    });

    // function process
    const closeToast = () => {
        setShowToast(false);
    };

    useEffect(() => {
        getDataCategory();
        getDataMenu();
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
            .delete(`/category/${categoryId}/delete`)
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

    const handleSubmitMenu = (e) => {
        e.preventDefault();
        if (isMenuEdit === true) {
            axios
                .put(`/menu/${menuId}/update`, {
                    name: menuName,
                    url: menuUrl,
                    status: menuStatus,
                })
                .then((res) => {
                    setToastData({
                        message: res.data,
                        color: "success",
                    });
                    setShowToast(true);
                    cancelEditMenu();
                    getDataMenu();
                })
                .catch((err) => {
                    let errors = err.response.data.errors;
                    if (errors.name[0] !== undefined) {
                        setMenuError({
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
                .post("/menu", {
                    name: menuName,
                    url: menuUrl,
                    status: menuStatus,
                })
                .then((res) => {
                    setToastData({
                        message: res.data,
                        color: "success",
                    });
                    setShowToast(true);
                    resetMenu();
                    getDataMenu();
                })
                .catch((err) => {
                    let errors = err.response.data.errors;
                    if (errors.name[0] !== undefined) {
                        setMenuError({
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

    const deleteMenu = () => {
        axios
            .delete(`/menu/${menuId}/delete`)
            .then((res) => {
                setShowConfirmDelMenu(false);
                setMenuId("");
                getDataMenu();
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
                setShowConfirmDelMenu(false);
            });
    };

    const confirmDeleteMenu = (menu) => {
        setMenuId(menu.id);
        setShowConfirmDelMenu(true);
    };

    const cancelDeleteMenu = () => {
        setShowConfirmDelMenu(false);
        setMenuId("");
    };

    const getDataMenu = () => {
        axios
            .get(`/menu`)
            .then((res) => {
                setMenus(res.data);
            })
            .catch((err) => console.log(err));
    };

    const editMenu = (menu) => {
        setMenuName(menu.name);
        setMenuId(menu.id);
        setMenuUrl(menu.url);
        if (menu.status === 0) {
            setMenuStatus(false);
        } else {
            setMenuStatus(true);
        }
        setIsMenuEdit(true);
    };

    const resetMenu = () => {
        setMenuId("");
        setMenuName("");
        setMenuUrl("");
        setMenuStatus(true);
        setMenuError({
            name: "",
        });
    };

    const cancelEditMenu = () => {
        setMenuName("");
        setMenuId("");
        setMenuUrl("");
        setMenuStatus(true);
        setIsMenuEdit(false);
        setMenuError({
            name: "",
        });
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
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 max-h- overflow-y-scroll mt-8">
                    <div className="text-xl mb-4 font-semibold text-gray-600 grid justify-start">
                        Menu
                    </div>
                    <div className="bg-white overflow-hidden sm:rounded-lg grid grid-cols-1">
                        <div className="p-6 text-gray-700 bg-white rounded col-span-1">
                            <form onSubmit={handleSubmitMenu}>
                                <span className="text-lg">Create Menu</span>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="mt-4 grid">
                                        <label className="mb-2 font-normal">
                                            Name:
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setMenuName(e.target.value)
                                            }
                                            value={menuName}
                                            type="text"
                                            className="rounded-lg ring-gray-400 border-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorLabel
                                            className="text-xs mt-1"
                                            message={menuError.name}
                                        />
                                    </div>
                                    <div className="mt-4 grid">
                                        <label className="mb-2 font-normal">
                                            Url:
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setMenuUrl(e.target.value)
                                            }
                                            value={menuUrl}
                                            type="text"
                                            className="rounded-lg ring-gray-400 border-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorLabel
                                            className="text-xs mt-1"
                                            message={menuError.name}
                                        />
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 content-center">
                                        <div className="grid content-center">
                                            <label className="mb-2">
                                                Status
                                            </label>
                                            <label className="inline-flex items-center mb-5 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    value=""
                                                    className="sr-only peer"
                                                    checked={menuStatus}
                                                    onChange={() =>
                                                        checkStatus()
                                                    }
                                                />
                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    {menuStatus === false
                                                        ? "Disable"
                                                        : "Enable"}
                                                </span>
                                            </label>
                                        </div>
                                        <div className="pt-4 content-center space-x-1">
                                            <button
                                                type="submit"
                                                className={
                                                    "text-white px-3 py-2 rounded hover:bg-indigo-600 " +
                                                    (isMenuEdit === false
                                                        ? "bg-gray-500"
                                                        : "bg-yellow-500")
                                                }
                                            >
                                                {isMenuEdit === false
                                                    ? "Save"
                                                    : "Update"}
                                            </button>
                                            {isMenuEdit === true ? (
                                                <button
                                                    onClick={() => {
                                                        cancelEditMenu();
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
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 text-gray-600 bg-gray-200 col-span-2">
                            <span className="text-lg">List of Menu</span>
                            <div className="mt-4 grid">
                                <table>
                                    <thead className="bg-gray-100 rounded">
                                        <tr>
                                            <th className="text-left p-3">
                                                Name
                                            </th>
                                            <th className="text-left p-3">
                                                Url
                                            </th>
                                            <th className="text-left p-3">
                                                Status
                                            </th>
                                            <th className="text-left p-3">
                                                Categories
                                            </th>
                                            <th className="text-center p-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {menus.map((menu, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    className="border-b border-white border-dashed"
                                                >
                                                    <td className="px-3 py-2">
                                                        {menu.name}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {menu.url}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {menu.status === 1 ? (
                                                            <Badge
                                                                color="success"
                                                                message="Enable"
                                                            />
                                                        ) : (
                                                            "Disable"
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {menu.menu_categories?.map(
                                                            (
                                                                menu_category,
                                                                index1
                                                            ) => {
                                                                return (
                                                                    <span
                                                                        key={
                                                                            index1
                                                                        }
                                                                        className="bg-white px-2 py-1 me-2 rounded text-xs font-semibold"
                                                                    >
                                                                        {
                                                                            menu_category
                                                                                ?.category
                                                                                ?.name
                                                                        }
                                                                    </span>
                                                                );
                                                            }
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-3 text-center">
                                                        <div className="text-sm text-white">
                                                            <button
                                                                onClick={() => {
                                                                    editMenu(
                                                                        menu
                                                                    );
                                                                }}
                                                                className="bg-yellow-500 px-2 py-1 rounded me-1"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    confirmDeleteMenu(
                                                                        menu
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

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 max-h-80 overflow-y-scroll mt-8">
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

            <Confirm
                show={showConfirmDelMenu}
                question="Are you sure delete this menu ?"
                yes={deleteMenu}
                no={cancelDeleteMenu}
            />
        </AuthenticatedLayout>
    );
}
