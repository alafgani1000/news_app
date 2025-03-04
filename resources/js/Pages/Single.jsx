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
import { dateReadable } from "@/function/helper";

export default function Single({ auth, news, menus }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [latestNews, setLatestNews] = useState([]);
    const [newsId, setNewsId] = useState(news.id);
    const [content, setContent] = useState("");
    const [parentId, setParentId] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(5);
    const [totalComment, setTotalComment] = useState(0);
    const [countComment, setCountComment] = useState(0);
    const [totalParentComment, setTotalParentComment] = useState(0);
    const [comments, setComments] = useState([]);

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
                getComments();
            })
            .catch((err) => {
                if (err.status == 401) {
                    window.open("/login", "_blank");
                }
            });
    };

    const getComments = () => {
        axios
            .put(`/comment/${news.id}`, {
                skip: skip,
                take: take,
            })
            .then((res) => {
                setComments(res.data.comments);
                let comment = res.data.comments;
                if (comments.length == 0) {
                    setCountComment(res.data.comments.length);
                } else {
                    setCountComment(comments.length);
                }
                setCountComment(comments.length);
                setTotalParentComment(res.data.total_parent_comment);
            });
    };

    const getMoreComments = () => {
        axios
            .put(`/comment/${news.id}`, {
                skip: skip,
                take: take,
            })
            .then((res) => {
                let skip_new = parseInt(skip) + parseInt(take);
                setSkip(skip_new);
                let comment = res.data.comments;
                setComments((prev) => [...prev, ...comment]);
                if (comments.length == 0) {
                    setCountComment(res.data.comments.length);
                } else {
                    setCountComment(comments.length);
                }
                setTotalComment(res.data.total_comment);
                setTotalParentComment(res.data.total_parent_comment);
                // console.log(countComment + "===" + totalParentComment)
            });
    };

    const FormComment = ({ id, replies = 0 }) => {
        const [formStatus, setFormStatus] = useState(false);
        const [commentContent, setCommentContent] = useState("");
        const [commentMessage, setCommentMessage] = useState("");
        const [showReplies, setShowReplies] = useState(false);

        function replyComment(event) {
            event.preventDefault();
            axios
                .put(`/comment/${id}/reply`, {
                    content: commentContent,
                })
                .then(function (res) {
                    setCommentMessage(res.data);
                });
        }

        if (formStatus == false) {
            return (
                <div>
                    <div className="flex ">
                        <div className="me-4 hover:bg-gray-200 py-2 px-2 hover:rounded-full cursor-pointer">
                            <span>
                                <i className="bi bi-chevron-down me-2"></i>
                                {replies} Replies
                            </span>
                        </div>
                        <button
                            onClick={() => setFormStatus(true)}
                            className="shadow rounded-full px-2 text-black"
                        >
                            Reply
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <>
                    <div>
                        <div className="flex">
                            <div className="me-4 hover:bg-gray-200 py-2 px-2 hover:rounded-full cursor-pointer">
                                <span>
                                    <i className="bi bi-chevron-down me-2"></i>
                                    {replies} Replies
                                </span>
                            </div>
                            <button
                                onClick={() => setFormStatus(false)}
                                className="shadow rounded-full px-2 text-black"
                            >
                                Reply
                            </button>
                        </div>
                    </div>
                    <form
                        onSubmit={replyComment}
                        className="bg-gray-300 py-2 px-2 rounded-md my-4"
                    >
                        <div className="mb-4 mt-2">
                            <p className="font-medium text-sm">
                                {commentMessage}
                            </p>
                        </div>
                        <div className="bg-white py-2 px-3 rounded-lg">
                            <textarea
                                onChange={(e) =>
                                    setCommentContent(e.target.value)
                                }
                                value={commentContent}
                                className="w-full border-none bg-white ring-transparent hover:border-none hover:ring-transparent focus:border-none focus:ring-transparent"
                                required
                                placeholder="Add Comment..."
                            ></textarea>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-full"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </>
            );
        }
    };

    useEffect(() => {
        setEditorState(fromHtml(news.content));
        getLatestNews();
        getComments();
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
                                    <div className="text-white text-xl font-bold my-4 bg-indigo-500 w-fit py-2 px-4 rounded-sm">
                                        {news.news_category.category.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* content news */}
                        <div className="bg-white px-4 py-4">
                            <div className="text-white mt-4 text-sm font-bold ">
                                <ul className="flex gap-4">
                                    <li className="py-2 px-3 bg-slate-600 rounded-sm">
                                        By {news.writer.name}
                                    </li>
                                    <li className="py-2 px-3 bg-slate-600 rounded-sm">
                                        {moment(news.created_at).format(
                                            "DD MMM YYYY"
                                        )}
                                    </li>
                                </ul>
                            </div>
                            <h2 className="text-gray-700 text-xl lg:text-3xl md:text-2xl font-bold mt-8">
                                {news.title}
                            </h2>
                            <div className="main-article text-lg">
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
                            <div className="bg-gray-100 mb-2 max-w-full text-base px-2 py-2 rounded-lg">
                                <div className="max-w-full sm:max-w-full">
                                    {message != "" && message != undefined ? (
                                        <div className="py-2 px-2 bg-gray-100 my-2 text-sm rounded-sm">
                                            <p>{message}</p>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <form onSubmit={submitComment}>
                                        <div className="bg-white py-2 px-3 rounded-lg">
                                            <textarea
                                                className="w-full border-none bg-white ring-transparent hover:border-none hover:ring-transparent focus:border-none focus:ring-transparent"
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

                            <div className="border-b bg-gray-400 mt-4 mb-6"></div>

                            <div className="comment-view">
                                <div className="title flex justify-items-center">
                                    <h2 className="font-bold text-lg">
                                        Comments
                                    </h2>{" "}
                                    <span className="bg-indigo-500 rounded-full px-2.5 py-1 text-sm text-white ms-4">
                                        {totalComment}
                                    </span>
                                </div>
                                <div className="my-8">
                                    {comments.map((comment, index) => {
                                        return (
                                            <div
                                                className="view-comment my-4"
                                                key={index}
                                            >
                                                <div className="flex items-center">
                                                    <div className="bg-gray-100 text-2xl py-1 px-3 font-bold rounded-full me-2">
                                                        {comment.user?.name
                                                            .substring(1, 0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div className="">
                                                        <div className="font-medium text-base">
                                                            {comment.user?.name}
                                                        </div>
                                                        <div className="text-xs">
                                                            {dateReadable(
                                                                comment.created_at
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ps-12 text-sm mt-2">
                                                    {comment.content}
                                                </div>
                                                <div className="ps-12 text-xs mt-2">
                                                    {/* reply */}
                                                    <FormComment
                                                        id={comment.id}
                                                        replies={
                                                            comment.replies
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="flex items-center justify-center">
                                        {totalParentComment > countComment && (
                                            <button
                                                onClick={() =>
                                                    getMoreComments()
                                                }
                                                className="bg-slate-500 px-8 py-2 rounded-full text-white"
                                            >
                                                Load More
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full col-span-2">
                        <div className="bg-white py-3 px-4 mb-2">
                            <h2 className="font-bold text-lg">New Articles</h2>
                        </div>
                        <div>
                            <ul className="box-news">
                                {latestNews?.map((newNews, index) => {
                                    return (
                                        <li
                                            className="px-6 py-4 bg-white border-b border-slate-200 last:border-b-0"
                                            key={index}
                                        >
                                            <h2 className="text-gray-700 mt-1 text-lg lg:text-lg font-bold">
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
                                                href={route("single", {
                                                    id: newNews.id,
                                                    title: newNews.title,
                                                })}
                                                className="block mt-2 p-2 bg-indigo-500 w-fit text-white text-sm rounded-sm"
                                            >
                                                read more..
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Header>
    );
}
