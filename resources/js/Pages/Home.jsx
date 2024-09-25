import { Head } from "@inertiajs/react";
import Header from "./Header";

export default function Welcome({ auth }) {
    return (
        <Header
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="sm:px-4 title-segment font-bold">
                    <h1 className="text-2xl">New Post</h1>
                </div>
                <div className="sm:px-4 sm:rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-6 lg:gap-4 overflow-y-hidden">
                    <div className="col-span-4">
                        <div className="box-news relative">
                            <img
                                src={`/storage/images/r1dVCF5iiwwze4b9EKPbGw4HIytkx4EpOn04TTjP.png`}
                                className="w-full object-contain"
                            />
                            <div className="absolute inset-0 rounded-md bg-black opacity-20"></div>
                            <div className="absolute inset-0 flex items-end justify-start w-full">
                                <div className="shadow p-4 mb-6 ms-2">
                                    <div className="text-white text-xl font-bold my-4 bg-indigo-500 w-fit py-2 px-4">
                                        Sport
                                    </div>
                                    <h2 className="text-white text-3xl font-bold">
                                        Exercitation Ullamco Laboris Nisi Ut
                                        Aliquip
                                    </h2>
                                    <div className="text-white mt-2 text-base font-medium">
                                        By Admin, January 11, 2022
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="box-news relative">
                            <img
                                src={`/storage/images/ziybasWr1tScGJPinSmwn7aVmw15y2RbitMPt4j0.png`}
                            />
                            <div className="absolute inset-0 rounded-md bg-black opacity-20"></div>
                            <div className="absolute inset-0 flex items-end justify-start w-full">
                                <div className="shadow p-4 mb-6 ms-2">
                                    <div className="text-white text-lg font-bold my-4 bg-indigo-500 w-fit py-2 px-4">
                                        Sport
                                    </div>
                                    <h2 className="text-white text-2xl font-bold">
                                        Exercitation Ullamco Laboris Nisi Ut
                                        Aliquip
                                    </h2>
                                    <div className="text-white mt-2 text-base font-medium">
                                        By Admin, January 11, 2022
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="box-news relative">
                            <img
                                src={`/storage/images/r1dVCF5iiwwze4b9EKPbGw4HIytkx4EpOn04TTjP.png`}
                            />
                            <div className="absolute inset-0 rounded-md bg-black opacity-20"></div>
                            <div className="absolute inset-0 flex items-end justify-start w-full">
                                <div className="shadow p-4 mb-6 ms-2">
                                    <div className="text-white text-lg font-bold my-4 bg-indigo-500 w-fit py-2 px-4">
                                        Sport
                                    </div>
                                    <h2 className="text-white text-2xl font-bold">
                                        Exercitation Ullamco Laboris Nisi Ut
                                        Aliquip
                                    </h2>
                                    <div className="text-white mt-2 text-base font-medium">
                                        By Admin, January 11, 2022
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mt-12">
                <div className="sm:px-4 title-segment font-bold">
                    <h1 className="text-2xl">Popular Post</h1>
                </div>
                <div className="sm:px-4 sm:rounded grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 md:gap-4 lg:gap-4">
                    <div className="box-news-category bg-white p-4 space-y-4">
                        <div className="grid grid-cols-4">
                            <div className="col-span-2 h-32 border overflow-y-hidden">
                                <img
                                    src={`/storage/images/r1dVCF5iiwwze4b9EKPbGw4HIytkx4EpOn04TTjP.png`}
                                />
                            </div>

                            <div className="col-span-2 bg-white w-full p-4">
                                <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                    Sport
                                </div>
                                <h2 className="text-gray-700 text-sm font-bold">
                                    Exercitation Ullamco Laboris Nisi Ut Aliquip
                                </h2>
                                <div className="text-gray-500 mt-2 text-xs font-bold">
                                    By Admin, January 11, 2022
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4">
                            <div className="col-span-2 h-36 border overflow-y-hidden">
                                <img
                                    src={`/storage/images/wvBXOAe4n0DDUaE83gnleTFNJyYT1soF4tcFhTPu.jpg`}
                                />
                            </div>

                            <div className="col-span-2 bg-white w-full p-4">
                                <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                    Sport
                                </div>
                                <h2 className="text-gray-700 text-sm font-bold">
                                    Exercitation Ullamco Laboris Nisi Ut Aliquip
                                </h2>
                                <div className="text-gray-500 mt-2 text-xs font-bold">
                                    By Admin, January 11, 2022
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4">
                            <div className="col-span-2 h-36 border overflow-y-hidden">
                                <img
                                    src={`/storage/images/7eevAMjGV5GYqP5zs3e21XEpOHjOWpmoLSJ45TIU.jpg`}
                                />
                            </div>

                            <div className="col-span-2 bg-white w-full p-4">
                                <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                    Sport
                                </div>
                                <h2 className="text-gray-700 text-sm font-bold">
                                    Exercitation Ullamco Laboris Nisi Ut Aliquip
                                </h2>
                                <div className="text-gray-500 mt-2 text-xs font-bold">
                                    By Admin, January 11, 2022
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box-news-category bg-white p-4 space-y-4">
                        <div className="grid grid-cols-4">
                            <div className="col-span-2 h-36 border overflow-y-hidden">
                                <img
                                    src={`/storage/images/ziybasWr1tScGJPinSmwn7aVmw15y2RbitMPt4j0.png`}
                                />
                            </div>

                            <div className="col-span-2 bg-white w-full p-4">
                                <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                    Sport
                                </div>
                                <h2 className="text-gray-700 text-sm font-bold">
                                    Exercitation Ullamco Laboris Nisi Ut Aliquip
                                </h2>
                                <div className="text-gray-500 mt-2 text-xs font-bold">
                                    By Admin, January 11, 2022
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4">
                            <div className="col-span-2 h-36 border overflow-y-hidden">
                                <img
                                    src={`/storage/images/xQfpTwxjWRgAY7Zwkvx3Ahgldb8qu001uifAnLLU.png`}
                                />
                            </div>

                            <div className="col-span-2 bg-white w-full p-4">
                                <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                    Sport
                                </div>
                                <h2 className="text-gray-700 text-sm font-bold">
                                    Exercitation Ullamco Laboris Nisi Ut Aliquip
                                </h2>
                                <div className="text-gray-500 mt-2 text-xs font-bold">
                                    By Admin, January 11, 2022
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4">
                            <div className="col-span-2 h-36 border overflow-y-hidden">
                                <img
                                    src={`/storage/images/r1dVCF5iiwwze4b9EKPbGw4HIytkx4EpOn04TTjP.png`}
                                />
                            </div>

                            <div className="col-span-2 bg-white w-full p-4">
                                <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                    Sport
                                </div>
                                <h2 className="text-gray-700 text-sm font-bold">
                                    Exercitation Ullamco Laboris Nisi Ut Aliquip
                                </h2>
                                <div className="text-gray-500 mt-2 text-xs font-bold">
                                    By Admin, January 11, 2022
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mt-12">
                <div className="sm:px-4 title-segment font-bold">
                    <h1 className="text-2xl">Sport</h1>
                </div>
                <div className="sm:px-4 sm:rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-4 lg:gap-4">
                    <div className="box-news max-h-[320px] overflow-hidden">
                        <div className="border max-h-[160px] overflow-y-hidden">
                            <img
                                src={`/storage/images/r1dVCF5iiwwze4b9EKPbGw4HIytkx4EpOn04TTjP.png`}
                            />
                        </div>

                        <div className="bg-white w-full p-4">
                            <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                Sport
                            </div>
                            <h2 className="text-gray-700 text-base font-bold">
                                Exercitation Ullamco Laboris Nisi Ut Aliquip
                            </h2>
                            <div className="text-gray-500 mt-2 text-sm font-bold">
                                By Admin, January 11, 2022
                            </div>
                        </div>
                    </div>

                    <div className="box-news max-h-[320px] overflow-hidden">
                        <div className="border max-h-[160px] overflow-y-hidden">
                            <img
                                src={`/storage/images/7eevAMjGV5GYqP5zs3e21XEpOHjOWpmoLSJ45TIU.jpg`}
                            />
                        </div>

                        <div className="bg-white w-full p-4">
                            <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                Cullinary
                            </div>
                            <h2 className="text-gray-700 text-base font-bold">
                                Exercitation Ullamco Laboris Nisi Ut Aliquip
                            </h2>
                            <div className="text-gray-500 mt-2 text-sm font-bold">
                                By Admin, January 11, 2022
                            </div>
                        </div>
                    </div>

                    <div className="box-news max-h-[320px] overflow-hidden">
                        <div className="border max-h-[160px] overflow-y-hidden">
                            <img
                                src={`/storage/images/wvBXOAe4n0DDUaE83gnleTFNJyYT1soF4tcFhTPu.jpg`}
                            />
                        </div>

                        <div className="bg-white w-full p-4">
                            <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                Sport
                            </div>
                            <h2 className="text-gray-700 text-base font-bold">
                                Maecenas accumsan tortor ut velit...
                            </h2>
                            <div className="text-gray-500 mt-2 text-sm font-bold">
                                By Admin, January 11, 2022
                            </div>
                        </div>
                    </div>

                    <div className="box-news max-h-[320px] overflow-hidden">
                        <div className="border max-h-[160px] overflow-y-hidden">
                            <img
                                src={`/storage/images/ziybasWr1tScGJPinSmwn7aVmw15y2RbitMPt4j0.png`}
                                className=""
                            />
                        </div>

                        <div className="bg-white w-full p-4">
                            <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                Politics
                            </div>
                            <h2 className="text-gray-700 text-base font-bold">
                                A classic and sturdy building with history.
                            </h2>
                            <div className="text-gray-500 mt-2 text-sm font-bold">
                                By Admin, January 11, 2022
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mt-12">
                <div className="sm:px-4 title-segment font-bold">
                    <h1 className="text-2xl">Technology</h1>
                </div>
                <div className="sm:px-4 sm:rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-4 lg:gap-4">
                    <div className="box-news max-h-[320px] overflow-hidden">
                        <div className="border max-h-[160px] overflow-y-hidden">
                            <img
                                src={`/storage/images/r1dVCF5iiwwze4b9EKPbGw4HIytkx4EpOn04TTjP.png`}
                            />
                        </div>

                        <div className="bg-white w-full p-4">
                            <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                Sport
                            </div>
                            <h2 className="text-gray-700 text-base font-bold">
                                Exercitation Ullamco Laboris Nisi Ut Aliquip
                            </h2>
                            <div className="text-gray-500 mt-2 text-sm font-bold">
                                By Admin, January 11, 2022
                            </div>
                        </div>
                    </div>

                    <div className="box-news max-h-[320px] overflow-hidden">
                        <div className="border max-h-[160px] overflow-y-hidden">
                            <img
                                src={`/storage/images/7eevAMjGV5GYqP5zs3e21XEpOHjOWpmoLSJ45TIU.jpg`}
                            />
                        </div>

                        <div className="bg-white w-full p-4">
                            <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                Cullinary
                            </div>
                            <h2 className="text-gray-700 text-base font-bold">
                                Exercitation Ullamco Laboris Nisi Ut Aliquip
                            </h2>
                            <div className="text-gray-500 mt-2 text-sm font-bold">
                                By Admin, January 11, 2022
                            </div>
                        </div>
                    </div>

                    <div className="box-news max-h-[320px] overflow-hidden">
                        <div className="border max-h-[160px] overflow-y-hidden">
                            <img
                                src={`/storage/images/wvBXOAe4n0DDUaE83gnleTFNJyYT1soF4tcFhTPu.jpg`}
                            />
                        </div>

                        <div className="bg-white w-full p-4">
                            <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                Sport
                            </div>
                            <h2 className="text-gray-700 text-base font-bold">
                                Maecenas accumsan tortor ut velit...
                            </h2>
                            <div className="text-gray-500 mt-2 text-sm font-bold">
                                By Admin, January 11, 2022
                            </div>
                        </div>
                    </div>

                    <div className="box-news max-h-[320px] overflow-hidden">
                        <div className="border max-h-[160px] overflow-y-hidden">
                            <img
                                src={`/storage/images/ziybasWr1tScGJPinSmwn7aVmw15y2RbitMPt4j0.png`}
                                className=""
                            />
                        </div>

                        <div className="bg-white w-full p-4">
                            <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                Politics
                            </div>
                            <h2 className="text-gray-700 text-base font-bold">
                                A classic and sturdy building with history.
                            </h2>
                            <div className="text-gray-500 mt-2 text-sm font-bold">
                                By Admin, January 11, 2022
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}
