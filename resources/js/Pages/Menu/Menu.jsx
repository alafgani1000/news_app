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
    const [showToast, setShowToast] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [toastData, setToastData] = useState({
        message: "",
        color: "",
    });
    const [menus, setMenus] = useState([]);
    const [menuName, setMenuName] = useState("");
    const [menuUrl, setMenuUrl] = useState("");
    const [menuStatus, setMenuStatus] = useState(true);
    const [menuId, setMenuId] = useState("");
    const [orderIndex, setOrderIndex] = useState(0);
    const [isMenuEdit, setIsMenuEdit] = useState(false);
    const [showConfirmDelMenu, setShowConfirmDelMenu] = useState(false);
    const [menuError, setMenuError] = useState({
        name: "",
    });
    const [modalSetting, setModalSetting] = useState(false);
    const [modalChoose, setModalChoose] = useState(false)
    const [menuIdSetting, setMenuIdSetting] = useState("");
    const [categorySetting, setCategorySetting] = useState("");
    const [categoryAvailable, setCategoryAvailable] = useState([]);
    const [categoryNotAvailable, setCategoryNotAvailable] = useState([]);
    const [categories, setCategories] = useState([])
    const [pages, setPages] = useState([])

    // function process
    const closeToast = () => {
        setShowToast(false);
    };

    useEffect(() => {
        getDataMenu();
    }, []);

    const checkStatus = () => {
        if (menuStatus === false) {
            setMenuStatus(true);
        } else {
            setMenuStatus(false);
        }
    };

    const handleSubmitMenu = (e) => {
        e.preventDefault();
        if (isMenuEdit === true) {
            axios
                .put(`/admin/menu/${menuId}/update`, {
                    name: menuName,
                    url: menuUrl,
                    status: menuStatus,
                    order_index: orderIndex,
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
                .post("/admin/menu", {
                    name: menuName,
                    url: menuUrl,
                    status: menuStatus,
                    order_index: orderIndex
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
            .delete(`/admin/menu/${menuId}/delete`)
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
            .get(`/admin/menu-data`)
            .then((res) => {
                setMenus(res.data);
            })
            .catch((err) => console.log(err));
    };

    const editMenu = (menu) => {
        setMenuName(menu.name);
        setMenuId(menu.id);
        setMenuUrl(menu.url || "");
        setOrderIndex(menu.order_index);
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

    const closeModalSetting = () => {
        setModalSetting(false);
        setMenuIdSetting("");
        setCategorySetting("");
    };

    const showModalSetting = (data) => {
        setModalSetting(true);
        setMenuIdSetting(data.id);
        getCategoryAvailable(data.id);
        getCategoryNotAvailable(data.id);
    };

    const getCategoryAvailable = (id) => {
        axios.get(`/admin/menu-category/${id}/available`).then((res) => {
            setCategoryAvailable(res.data);
        });
    };

    const getCategoryNotAvailable = (id) => {
        axios.get(`/admin/menu-category/${id}/not-available`).then((res) => {
            setCategoryNotAvailable(res.data);
        });
    };

    const getCategories = () => {
        axios.get('/admin/category-data').then((res) => {
            setCategories(res.data);
        })
    }

    const getPages = () => {
        axios.get('/admin/page-data').then((res) => {
            setPages(res.data);
        })
    }

    const handleAssignCategory = (e) => {
        e.preventDefault();
        axios
            .post("/admin/menu-category-assign", {
                menu: menuIdSetting,
                category: categorySetting,
            })
            .then((res) => {
                getCategoryAvailable(menuIdSetting);
                getCategoryNotAvailable(menuIdSetting);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRemoveCategory = (categoryId) => {
        axios
            .post("/admin/menu-category-remove", {
                menu: menuIdSetting,
                category: categoryId,
            })
            .then((res) => {
                getCategoryAvailable(menuIdSetting);
                getCategoryNotAvailable(menuIdSetting);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const showChooseMenu = () => {
        setModalChoose(true)
        getCategories()
        getPages()
    }

    const closeChooseMenu = () => {
        setModalChoose(false)
    }

    const chooseCategory = (data) => {
        const name = data.name;
        const url = '/category/' + name;
        setMenuName(name)
        setMenuUrl(url)
        closeChooseMenu();
    }

    const choosePage = (data) => {
        const name = data.name;
        const url = '/page/' + name;
        setMenuName(name)
        setMenuUrl(url)
        closeChooseMenu();
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            permissions={auth.permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    Menu
                </h2>
            }
        >
            <Head title="Setting" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-lg font-semibold text-gray-600 grid justify-start bg-white border-b border-gray-100 rounded-t-lg px-5 py-3">
                        Menu
                    </div>
                    <div className="overflow-hidden grid grid-cols-1">
                        <div className="px-5 py-3 text-gray-700 bg-white border-gray-100 col-span-1">
                            <form onSubmit={handleSubmitMenu}>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="mb-2 grid">
                                        <label className="mb-2 font-normal">
                                            Category or Page:
                                        </label>
                                        <button type="button" onClick={() => showChooseMenu()} className="bg-blue-500 rounded-full px-3 py-2 text-sm text-white">Chose Category / Page</button>
                                    </div>
                                    <div className="mb-2 grid">
                                        <label className="mb-2 font-normal">
                                            Order Index:
                                        </label>
                                        <input onChange={(e) => setOrderIndex(e.target.value)} value={orderIndex} type="number" className="rounded-lg ring-gray-300 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" />
                                    </div>
                                </div>
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
                                            className="rounded-lg ring-gray-300 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
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
                                            className="rounded-lg ring-gray-300 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                        <ErrorLabel
                                            className="text-xs mt-1"
                                            message={menuError.name}
                                        />
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 content-center">
                                        <div className="grid content-center mt-4">
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
                        <div className="px-5 py-3 text-gray-600 bg-white mt-1 col-span-2 rounded-b-lg">
                            <span className="text-lg font-semibold">List of Menu</span>
                            <div className="mt-4 grid">
                                <table>
                                    <thead className="bg-gray-100">
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
                                                Order Index
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
                                                        {menu.order_index}
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
                                                                        className="bg-indigo-600 text-white px-2 py-1 me-2 rounded-full text-xs font-semibold"
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
                                                                <i className="bi bi-pencil-square"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    confirmDeleteMenu(
                                                                        menu
                                                                    );
                                                                }}
                                                                className="bg-rose-500 px-2 py-1 rounded me-1"
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    showModalSetting(
                                                                        menu
                                                                    );
                                                                }}
                                                                className="bg-blue-500 px-2 py-1 rounded me-1"
                                                            >
                                                                <i className="bi bi-gear-fill"></i>
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
                show={showConfirmDelMenu}
                question="Are you sure delete this menu ?"
                yes={deleteMenu}
                no={cancelDeleteMenu}
            />

            <Modal show={modalSetting}>
                <div className="bg-white rounded max-w-3xl w-full mx-auto">
                    <div className="flex flex-col items-end m-0 p-0">
                        <button
                            onClick={() => closeModalSetting()}
                            className="bg-zinc-700 px-3 py-1 text-white hover:bg-rose-600 rounded-tr"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <form onSubmit={handleAssignCategory} className="px-6 pb-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Setting Menu
                        </h2>
                        <div className="grid mt-4">
                            <label className="mb-2">Name:</label>
                            <select
                                onChange={(e) => {
                                    setCategorySetting(e.target.value);
                                }}
                                className="rounded-lg focus:ring-indigo-600 focus:border-indigo-600"
                            >
                                <option value="">
                                    --- Select Category ---
                                </option>
                                {categoryNotAvailable.map(
                                    (categoryData, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={categoryData.id}
                                            >
                                                {categoryData.name}
                                            </option>
                                        );
                                    }
                                )}
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
                    <div className="mt-2 grid px-4 pb-4">
                        <table>
                            <thead className="bg-gray-100 rounded">
                                <tr>
                                    <th className="text-left p-3 w-2/3">
                                        Name
                                    </th>
                                    <th className="text-left p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryAvailable?.map(
                                    (categoryMenu, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className="border-b border-dashed"
                                            >
                                                <td className="px-3 py-2">
                                                    {
                                                        categoryMenu.category
                                                            ?.name
                                                    }
                                                </td>
                                                <td className="px-3 py-3 text">
                                                    <div className="text-sm text-white">
                                                        <button
                                                            onClick={() => {
                                                                handleRemoveCategory(
                                                                    categoryMenu.category_id
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
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>

            <Modal show={modalChoose}>
                <div className="bg-white rounded max-w-3xl w-full mx-auto">
                    <div className="flex flex-col items-end m-0 p-0">
                        <button
                            onClick={() => closeChooseMenu()}
                            className="bg-zinc-700 px-3 py-1 text-white hover:bg-rose-600 rounded-tr"
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className="px-6 pb-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Choose Category or Page
                        </h2>
                        <div className="mt-2 grid pb-4">
                            <div className="rounded-t bg-blue-400 text-white px-2 py-2">
                                Categories
                            </div>
                            <table>
                                <tbody>
                                    {categories?.map(
                                        (category, index) => {
                                            return (
                                                <tr
                                                    onClick={() => chooseCategory(category)}
                                                    key={index}
                                                    className="border-b border-dashed hover:bg-blue-500 hover:text-white cursor-pointer"
                                                >
                                                    <td className="px-3 py-2">
                                                        {
                                                            category
                                                                ?.name
                                                        }
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-2 grid pb-4">
                            <div className="rounded-t bg-blue-400 text-white px-2 py-2">
                                Pages
                            </div>
                            <table>
                                <tbody>
                                    {pages?.map(
                                        (page, index) => {
                                            return (
                                                <tr
                                                    onClick={() => choosePage(page)}
                                                    key={index}
                                                    className="border-b border-dashed hover:bg-blue-500 hover:text-white cursor-pointer"
                                                >
                                                    <td className="px-3 py-2">
                                                        {
                                                            page
                                                                ?.name
                                                        }
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
