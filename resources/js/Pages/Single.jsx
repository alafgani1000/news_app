import { Head, Link } from "@inertiajs/react";
import Header from "./Header";
import moment from "moment";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

export default function Single({ auth, news, menus }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [latestNews, setLatestNews] = useState([]);
    const [newsId, setNewsId] = useState(news.id);
    const [content, setContent] = useState("");
    const [parentId, setParentId] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const toHtml = (data) => {
        const rawContentState = convertToRaw(data);
        const htmlContent = draftToHtml(rawContentState);
        return htmlContent;
    };

    const fromHtml = (data) => {
        const newState = JSON.parse(data);
        const newEditorState = EditorState.createWithContent(
            convertFromRaw(newState)
        );
        return newEditorState;
    };

    const getLatestNews = () => {
        axios.get("/news/latest-news").then((res) => {
            setLatestNews(res.data);
        });
    };

    const resetCommentForm = () => {
        setContent("");
    };

    const submitComment = (e) => {
        e.preventDefault();
        const data = {
            news_id: newsId,
            content: content,
            parent_id: parentId,
        };
        axios
            .post("/comment", data)
            .then((res) => {
                setMessage(res.data);
                resetCommentForm();
            })
            .catch((err) => {
                if (err.status == 401) {
                    alert("Login hela");
                }
            });
    };

    useEffect(() => {
        setEditorState(fromHtml(news.content));
        getLatestNews();
    }, []);

    return (
        <Header
            user={auth.user}
            menus={menus}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    {news.news_category.category.name}
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="sm:px-4 title-segment font-bold bg-white m-4 px-4 py-4 text-gray-600">
                    <h1 className="text-base">
                        Home{" "}
                        <i className="bi bi-chevron-right text-sm font-extrabold"></i>{" "}
                        {news.news_category.category.name}
                    </h1>
                </div>
                <div className="sm:px-4 sm:rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 lg:gap-8 md:gap-4 overflow-y-hidden">
                    <div className="col-span-4">
                        {/* image news  */}
                        <div className="box-images relative">
                            <img
                                src={news.image}
                                className="w-full object-contain"
                            />
                            <div className="absolute inset-0 rounded-md bg-black opacity-20"></div>
                            <div className="absolute inset-0 flex items-end justify-start w-full">
                                <div className="shadow p-4 ms-2">
                                    <div className="text-white text-xl font-bold my-4 bg-indigo-500 w-fit py-2 px-4">
                                        {news.news_category.category.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* content news */}
                        <div className="bg-white px-4 py-4">
                            <div className="text-white mt-4 text-sm font-bold ">
                                <ul className="flex gap-4">
                                    <li className="py-2 px-3 bg-slate-600">
                                        By {news.writer.name}
                                    </li>
                                    <li className="py-2 px-3 bg-slate-600">
                                        {moment(news.created_at).format(
                                            "DD MMM YYYY"
                                        )}
                                    </li>
                                </ul>
                            </div>
                            <h2 className="text-gray-700 text-xl lg:text-3xl md:text-2xl font-bold mt-8">
                                {news.title}
                            </h2>
                            <div className="main-article mt-6 text-lg">
                                <Editor
                                    toolbar={{
                                        options: [],
                                    }}
                                    editorState={editorState}
                                    toolbarHidden={true}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                        {/* comment news */}
                        <div className="news-comment bg-white px-4 py-2">
                            {/* menampilkan news */}
                            <div className="bg-gray-100 mb-2 max-w-full text-base px-4 py-2">
                                <div className="max-w-full sm:max-w-full md:max-w-96 lg:max-w-96 xl:max-w-96">
                                    {message != "" && message != undefined ? (
                                        <div className="py-2 px-2 bg-gray-200 my-2 text-sm">
                                            <p>{message}</p>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <form
                                        onSubmit={submitComment}
                                        className="mt-2"
                                    >
                                        <div className="bg-white py-2 px-3 rounded">
                                            <textarea
                                                className="w-full border-none rounded bg-white ring-transparent hover:border-none hover:ring-transparent focus:border-none focus:ring-transparent"
                                                onChange={(e) =>
                                                    setContent(e.target.value)
                                                }
                                                value={content}
                                                required
                                                placeholder="Add Comment..."
                                            ></textarea>
                                            <div className="flex justify-end">
                                                <button className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-full">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="border-b bg-gray-400"></div>
                        </div>
                    </div>
                    <div className="w-full col-span-2">
                        <div className="bg-white py-2 px-4 mb-2">
                            <h2 className="font-medium">New Articles</h2>
                        </div>
                        <div>
                            {latestNews?.map((newNews, index) => {
                                return (
                                    <div className="box-news" key={index}>
                                        <div className="px-6 py-4 mb-6 bg-white">
                                            <h2 className="text-gray-700 mt-1 text-lg lg:text-xl font-bold">
                                                {newNews.title}
                                            </h2>
                                            <div className="text-gray-500 mt-1 text-sm font-bold">
                                                {
                                                    newNews.news_category
                                                        .category.name
                                                }
                                                , By {newNews.writer.name},{" "}
                                                {moment(
                                                    newNews.created_at
                                                ).format("DD MMM YYYY")}
                                            </div>
                                            <Link
                                                href="/"
                                                className="block mt-2 p-2 bg-blue-500 w-fit text-white text-sm"
                                            >
                                                read more..
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}
