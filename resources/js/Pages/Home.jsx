import { Head, Link } from "@inertiajs/react";
import Header from "./Header";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Welcome({ auth, latest1, latest2, menus }) {
    const [populars, setPopulars] = useState([]);
    const [categories, setCategories] = useState([]);

    const getPopularNews = () => {
        axios.get(`/news/popular-news`).then((res) => {
            setPopulars(res.data);
        });
    };

    const getCategoryNews = () => {
        axios.get(`/news/category-news`).then((res) => {
            setCategories(res.data);
        });
    };

    useEffect(() => {
        getPopularNews();
        getCategoryNews();
    }, []);

    return (
        <Header
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    Profile
                </h2>
            }
            menus={menus}
        >
            <Head title="Profile" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="sm:px-4 title-segment font-bold">
                    <h1 className="text-2xl">New Post</h1>
                </div>
                {latest1 !== null ?
                    <div className="sm:px-4 sm:rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-6 lg:gap-4 overflow-y-hidden">

                        <div className="col-span-4">
                            <Link
                                href={route("single", {
                                    id: latest1.id,
                                    title: latest1.title,
                                })}
                            >
                                <div className="box-news relative">
                                    <img
                                        src={`${latest1.image}`}
                                        className="w-full object-contain"
                                    />
                                    <div className="absolute inset-0 rounded-md bg-black opacity-20"></div>
                                    <div className="absolute inset-0 flex items-end justify-start w-full">
                                        <div className="shadow p-4 mb-6 ms-2">
                                            <div className="text-white text-xl font-bold my-4 bg-indigo-500 w-fit py-2 px-4">
                                                {
                                                    latest1.news_category?.category
                                                        ?.name
                                                }
                                            </div>
                                            <h2 className="text-white text-3xl font-bold">
                                                {latest1.title}
                                            </h2>
                                            <div className="text-white mt-2 text-base font-medium">
                                                By {latest1?.writer.name},{" "}
                                                {moment(latest1.created_at).format(
                                                    "DD MMM YYYY"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-span-2 space-y-2">
                            {latest2?.map((data, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="box-news relative w-fit h-1/2"
                                    >
                                        <Link
                                            href={route("single", {
                                                id: data.id,
                                                title: data.title,
                                            })}
                                        >
                                            <img
                                                src={`${data.image}`}
                                                className="h-full"
                                            />
                                            <div className="absolute inset-0 rounded-md bg-black opacity-20"></div>
                                            <div className="absolute inset-0 flex items-end justify-start w-full">
                                                <div className="shadow p-4 mb-6 ms-2">
                                                    <div className="text-white text-lg font-bold my-4 bg-indigo-500 w-fit py-2 px-4">
                                                        {
                                                            data.news_category
                                                                ?.category?.name
                                                        }
                                                    </div>
                                                    <h2 className="text-white text-2xl font-bold">
                                                        {data.title}
                                                    </h2>
                                                    <div className="text-white mt-2 text-base font-medium">
                                                        By {data?.writer.name},{" "}
                                                        {moment(
                                                            data.created_at
                                                        ).format("DD MMM YYYY")}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                    : <></>}
            </div>

            {/* popular post */}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mt-12">
                <div className="sm:px-4 title-segment font-bold">
                    <h1 className="text-2xl">Popular Post</h1>
                </div>
                <div className="sm:px-4 sm:rounded grid">
                    <div className="box-news-category bg-white p-4 grid grid-cols-3">
                        {populars?.map((popular, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={route("single", {
                                        id: popular.id,
                                        title: popular.title,
                                    })}
                                >
                                    <div className="grid grid-cols-4 my-2">
                                        <div className="col-span-2 h-32 border overflow-y-hidden ">
                                            <img
                                                src={`${popular.image}`}
                                                className="h-full w-full"
                                            />
                                        </div>
                                        <div className="col-span-2 bg-white w-full p-4">
                                            <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                                {
                                                    popular.news_category
                                                        .category.name
                                                }
                                            </div>
                                            <h2 className="text-gray-700 text-sm font-bold">
                                                {popular.title}
                                            </h2>
                                            <div className="text-gray-500 mt-2 text-xs font-bold">
                                                By {popular?.writer.name},{" "}
                                                {moment(
                                                    popular.created_at
                                                ).format("DD MMM YYYY")}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* news by category */}
            {categories.map((category, index) => {
                return (
                    <div
                        key={index}
                        className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mt-12"
                    >
                        <div className="sm:px-4 title-segment font-bold">
                            <h1 className="text-2xl">{category.name}</h1>
                        </div>
                        <div className="sm:px-4 sm:rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-4 lg:gap-4">
                            {category.news_categories?.map(
                                (news_category, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={route("single", {
                                                id: news_category.news.id,
                                                title: news_category.news.title,
                                            })}
                                        >
                                            <div className="box-news max-h-[320px] overflow-hidden">
                                                <div className="border max-h-[160px] overflow-y-hidden">
                                                    <img
                                                        src={
                                                            news_category.news
                                                                .image
                                                        }
                                                    />
                                                </div>

                                                <div className="bg-white w-full p-4">
                                                    <div className="text-white text-sm font-bold  bg-indigo-500 w-fit py-1 px-3 mb-2">
                                                        {category.name}
                                                    </div>
                                                    <h2 className="text-gray-700 text-base font-bold">
                                                        {
                                                            news_category.news
                                                                ?.title
                                                        }
                                                    </h2>
                                                    <div className="text-gray-500 mt-2 text-sm font-bold">
                                                        By{" "}
                                                        {
                                                            news_category?.news
                                                                ?.writer.name
                                                        }
                                                        ,{" "}
                                                        {moment(
                                                            news_category?.news
                                                                ?.created_at
                                                        ).format("DD MMM YYYY")}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                }
                            )}
                        </div>
                    </div>
                );
            })}
        </Header>
    );
}
