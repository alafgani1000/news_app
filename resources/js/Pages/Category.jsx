import { Head, Link, router } from "@inertiajs/react";
import Header from "./Header";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

export default function Category({
    auth,
    menuCategories,
    news,
    category,
    pgSearch,
    pgPerPage,
    pgSort,
}) {
    const [search, setSearch] = useState(pgSearch || "");
    const [sort, setSort] = useState(pgSort || "");
    const [perPage, setPerPage] = useState(pgPerPage || 10);
    const [wasSearch, setWasSearch] = useState(false);

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

    return (
        <Header
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    Profile
                </h2>
            }
            categories={menuCategories}
        >
            <Head title="Profile" />

            {/* news by category */}

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mt-12">
                <div className="sm:px-4 title-segment font-bold">
                    <h1 className="text-2xl">{category}</h1>
                </div>
                <div className="sm:px-4 sm:rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-4">
                    {news.data?.map((value, index) => {
                        return (
                            <div
                                key={index}
                                className="box-news h-[420px] overflow-hidden"
                            >
                                <div className="border h-[230px] overflow-y-hidden">
                                    <img
                                        src={value.image}
                                        className="h-full w-full"
                                    />
                                </div>

                                <div className="bg-white h-full w-full p-4">
                                    <div className="text-white text-xs font-medium bg-indigo-500 w-fit py-1 px-3 mb-2">
                                        {value.news_category?.category?.name}
                                    </div>
                                    <h2 className="text-gray-700 text-lg font-bold">
                                        {value.title}
                                    </h2>
                                    <div className="text-gray-500 mt-2 mb-4 text-sm font-bold">
                                        By {value.writer?.name},{" "}
                                        {moment(value.created_at).format(
                                            "DD MMM YYYY"
                                        )}
                                    </div>

                                    <Link
                                        href={route("single", {
                                            id: value.id,
                                            title: value.title,
                                        })}
                                        className="bg-gray-800 py-2 px-2 text-white font-medium text-sm"
                                    >
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* pagination */}
                <div className="hidden mt-4 mb-4 w-full md:block md:w-auto">
                    <ul className="flex justify-center items-center space-x-px text-base h-10">
                        {news.links.map((link, index) => {
                            return (
                                <li
                                    key={index}
                                    className="first:rounded-l-md border last:rounded-e-md bg-white"
                                >
                                    {link.active === false ? (
                                        link.url === null ? (
                                            <Link
                                                href={null}
                                                className="flex items-center justify-center px-2 py-1 text-sm lg:text-base md:px-3 md:py-2"
                                                disabled
                                            >
                                                {parse(link.label)}
                                            </Link>
                                        ) : (
                                            <Link
                                                href={`${link.url}&search=${search}&perPage=${perPage}`}
                                                className="flex items-center justify-center px-2 py-1 text-sm lg:text-base md:px-3 md:py-2"
                                                disabled
                                            >
                                                {parse(link.label)}
                                            </Link>
                                        )
                                    ) : (
                                        <Link
                                            href={null}
                                            className="flex items-center justify-center px-2 py-1 lg:text-base bg-slate-100 text-sm md:px-3 md:py-2"
                                        >
                                            {`${parse(link.label)}`}
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
                                Page {news.current_page}
                                &nbsp; from {news.last_page}{" "}
                            </span>{" "}
                        </div>
                        <div className="flex justify-start space-x-4">
                            <Link
                                href={`${news.prev_page_url}&search=${search}&perPage=${perPage}`}
                                className="border py-2 px-4 rounded-md hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                            >
                                Prev
                            </Link>
                            <Link
                                href={`${news.next_page_url}&search=${search}&perPage=${perPage}`}
                                className="border py-2 px-4 rounded-md hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                            >
                                Next
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}
