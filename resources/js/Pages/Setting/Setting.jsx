import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Setting({ auth }) {
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
                            <span className="text-lg">Create Category</span>
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
                        <div className="p-6 text-gray-600 ">
                            <span className="text-lg">List of Category</span>
                            <div className="mt-4 grid">
                                <table>
                                    <thead className="bg-gray-100 rounded">
                                        <th className="text-left p-3 w-2/3">
                                            Name
                                        </th>
                                        <th className="text-left p-3">
                                            Action
                                        </th>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-dashed">
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
                                        <tr className="border-b border-dashed">
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
                                        <tr className="border-b border-dashed">
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
                                        <th className="text-left p-3 w-2/3">
                                            Name
                                        </th>
                                        <th className="text-left p-3">
                                            Action
                                        </th>
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
        </AuthenticatedLayout>
    );
}
