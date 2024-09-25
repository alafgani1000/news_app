import { Head, Link } from "@inertiajs/react";
import Header from "./Header";

export default function Single({ auth }) {
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
                <div className="sm:px-4 sm:rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-6 lg:gap-8 overflow-y-hidden">
                    <div className="col-span-4">
                        <div className="box-images relative">
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
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-700 mt-2 text-base font-medium">
                            By Admin, January 11, 2022
                        </div>
                        <h2 className="text-gray-700 text-3xl font-bold">
                            Exercitation Ullamco Laboris Nisi Ut Aliquip
                        </h2>
                    </div>
                    <div className="col-span-2 grid grid-cols-1 gap-y-4">
                        <div className="box-news relative">
                            <img
                                src={`/storage/images/ziybasWr1tScGJPinSmwn7aVmw15y2RbitMPt4j0.png`}
                            />

                            <div className="px-6 py-4 mb-6 bg-white">
                                <div className="text-white text-lg font-bold my-4 bg-indigo-500 w-fit py-2 px-4">
                                    Sport
                                </div>
                                <h2 className="text-gray-700 text-2xl font-bold">
                                    Exercitation Ullamco Laboris Nisi Ut Aliquip
                                </h2>
                                <Link
                                    href="/"
                                    className="block mt-2 p-2 bg-blue-500 w-fit text-white"
                                >
                                    read more..
                                </Link>
                                <div className="text-gray-500 mt-2 text-base font-medium">
                                    By Admin, January 11, 2022
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}
