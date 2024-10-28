import { Head, Link } from "@inertiajs/react";
import Header from "./Header";

export default function Single({ auth, news }) {
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
                <div className="sm:px-4 title-segment font-bold bg-white m-4 px-4 py-4">
                    <h1 className="text-lg">
                        Home{" "}
                        <i className="bi bi-chevron-right text-sm font-extrabold"></i>{" "}
                        Sport{" "}
                    </h1>
                </div>
                <div className="sm:px-4 sm:rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 lg:gap-8 md:gap-4 overflow-y-hidden">
                    <div className="col-span-4">
                        <div className="box-images relative">
                            <img
                                src={`/storage/images/r1dVCF5iiwwze4b9EKPbGw4HIytkx4EpOn04TTjP.png`}
                                className="w-full object-contain"
                            />
                            <div className="absolute inset-0 rounded-md bg-black opacity-20"></div>
                            <div className="absolute inset-0 flex items-end justify-start w-full">
                                <div className="shadow p-4 ms-2">
                                    <div className="text-white text-xl font-bold my-4 bg-indigo-500 w-fit py-2 px-4">
                                        Sport
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-gray-500 mt-4 text-sm font-bold">
                            <ul className="flex gap-4">
                                <li className="py-2 px-3 bg-white">By Admin</li>
                                <li className="py-2 px-3 bg-white">
                                    January 11, 2022
                                </li>
                            </ul>
                        </div>
                        <h2 className="text-gray-700 text-xl lg:text-3xl md:text-2xl font-bold mt-4">
                            Exercitation Ullamco Laboris Nisi Ut Aliquip
                        </h2>
                        <div className="main-article mt-6 text-lg">
                            <p>
                                Fuel your competitive spirit, chase victory, and
                                let sports be your legacy encapsulates the
                                essence of embracing sports as a means to
                                challenge oneself, strive for success, and leave
                                a lasting impact. This phrase urges individuals
                                to tap into their inner drive and motivation.
                            </p>
                            <br />
                            <p>
                                Igniting their competitive spirit. It encourages
                                them to set ambitious goals, not settling for
                                mediocrity but pushing themselves to excel in
                                their chosen sport or athletic endeavor. The
                                pursuit of victory becomes the driving force,
                                motivating athletes to give their all,
                            </p>
                            <br />
                            <p>
                                Igniting their competitive spirit. It encourages
                                them to set ambitious goals, not settling for
                                mediocrity but pushing themselves to excel in
                                their chosen sport or athletic endeavor. The
                                pursuit of victory becomes the driving force,
                                motivating athletes to give their all,
                            </p>
                            <br />
                            <p>
                                Igniting their competitive spirit. It encourages
                                them to set ambitious goals, not settling for
                                mediocrity but pushing themselves to excel in
                                their chosen sport or athletic endeavor. The
                                pursuit of victory becomes the driving force,
                                motivating athletes to give their all,
                            </p>
                            <br />
                            <p>
                                Igniting their competitive spirit. It encourages
                                them to set ambitious goals, not settling for
                                mediocrity but pushing themselves to excel in
                                their chosen sport or athletic endeavor. The
                                pursuit of victory becomes the driving force,
                                motivating athletes to give their all,
                            </p>
                            <br />
                            <p>
                                Igniting their competitive spirit. It encourages
                                them to set ambitious goals, not settling for
                                mediocrity but pushing themselves to excel in
                                their chosen sport or athletic endeavor. The
                                pursuit of victory becomes the driving force,
                                motivating athletes to give their all,
                            </p>
                            <br />
                            <p>
                                Igniting their competitive spirit. It encourages
                                them to set ambitious goals, not settling for
                                mediocrity but pushing themselves to excel in
                                their chosen sport or athletic endeavor. The
                                pursuit of victory becomes the driving force,
                                motivating athletes to give their all,
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-1 gap-y-4">
                        <div className="box-news relative">
                            <img
                                src={`/storage/images/ziybasWr1tScGJPinSmwn7aVmw15y2RbitMPt4j0.png`}
                            />

                            <div className="px-6 py-4 mb-6 bg-white">
                                <div className="text-white text-base lg:text-lg md:text-bae font-bold my-4 bg-indigo-500 w-fit py-2 px-4">
                                    Sport
                                </div>
                                <div className="text-gray-500 mt-1 text-sm font-bold">
                                    By Admin, January 11, 2022
                                </div>
                                <h2 className="text-gray-700 mt-1 text-lg lg:text-xl font-bold">
                                    Exercitation Ullamco Laboris Nisi Ut Aliquip
                                </h2>
                                <Link
                                    href="/"
                                    className="block mt-2 p-2 bg-blue-500 w-fit text-white"
                                >
                                    read more..
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}
