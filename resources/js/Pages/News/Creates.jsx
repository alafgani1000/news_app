import Confirm from "@/Components/Confirm";
import ErrorLabel from "@/Components/ErrorLabel";
import Toast from "@/Components/Toast";
// import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { convertFromHTML } from "draft-convert";
import { convertToRaw, EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Creates({ auth, code, news }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [dataCategories, setDataCategories] = useState([]);
    const [title, setTitle] = useState(news?.title || "");
    const [keyword, setKeyword] = useState("");
    const [tag, setTag] = useState("");
    const [category, setCategory] = useState("");
    const [imageCover, setImageCover] = useState("");
    const [publishConfirm, setPublishConfirm] = useState(false);
    const [toastData, setToastData] = useState({
        message: "",
        color: "",
    });
    const [errors, setErrors] = useState({
        title: "",
    });
    const [showToast, setShowToast] = useState(false);

    const onEditorStateChange = (newState) => {
        setEditorState(newState);
    };

    const toHtml = (data) => {
        const rawContentState = convertToRaw(data);
        // const htmlContent = draftToHtml(rawContentState);
        const htmlContent = JSON.stringify(rawContentState)
        return htmlContent;
    };

    const fromHtml = (data) => {
        // const newState = convertFromHTML(data);
        const newState = JSON.parse(data)
        const newEditorState = EditorState.createWithContent(newState);
        return newEditorState;
    };

    const store = () => {
        const content = toHtml(editorState.getCurrentContent());
        axios
            .put(`/admin/news/${code}/store`, {
                code: code,
                title: title,
                keywords: keyword,
                tag: tag,
                content: content,
                category: category,
                image: imageCover,
            })
            .then((res) => {
                setToastData({
                    message: res.data,
                    color: "success",
                });
                setShowToast(true);
            });
    };

    const publish = () => {
        const content = toHtml(editorState.getCurrentContent());
        axios
            .post("/admin/news/${code}/publish", {
                code: code,
                title: title,
                keywords: keyword,
                tag: tag,
                content: content,
                category: category,
                image: imageCover,
            })
            .then((res) => {
                resetForm();
                resetError();
                setToastData({
                    message: res.data,
                    color: "success",
                });
                closeConfirmPublish();
                setShowToast(true);
            });
    };

    const getDataCategory = () => {
        axios.get("/admin/category").then((res) => {
            setDataCategories(res.data);
        });
    };

    useEffect(() => {
        getDataCategory();
    }, []);

    const resetForm = () => {
        setEditorState(EditorState.createEmpty());
        setTitle("");
        setKeyword("");
        setTag("");
        setCategory("");
    };

    const resetError = () => {
        setErrors({
            title: "",
        });
    };

    const showPublishConfirm = () => {
        let errors = 0;
        resetError();
        if (title === undefined || title === "") {
            setErrors((prev) => ({
                ...prev,
                title: "This field is required",
            }));
        } else {
            setPublishConfirm(true);
        }
    };

    const closeConfirmPublish = () => {
        setPublishConfirm(false);
    };

    const closeToast = () => {
        setToastData({
            message: "",
            color: "",
        });
        setShowToast(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            permissions={auth.permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    News
                </h2>
            }
        >
            <Head title="News" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 overflow-x-scroll">
                    <div className="mb-4 flex justify-start">
                        <div className="bg-white rounded shadow">
                            <button className="group py-2 px-4 text-base text-gray-500 border-r hover:bg-indigo-700 hover:rounded hover:text-white">
                                <i className="bi bi-newspaper me-1 text-indigo-500 group-hover:text-white"></i>{" "}
                                Review
                            </button>
                            <button
                                onClick={() => store()}
                                className="group py-2 px-4 text-base text-gray-500 border-r hover:bg-indigo-700 hover:rounded hover:text-white"
                            >
                                <i className="bi bi-save text-xs me-1 text-indigo-500 group-hover:text-white"></i>{" "}
                                Save
                            </button>
                            {auth.permissions.publish_news === true ? (
                                <button
                                    onClick={() => showPublishConfirm()}
                                    className="group py-2 px-4 text-base text-gray-500 hover:bg-indigo-700 hover:rounded hover:text-white"
                                >
                                    <i className="bi bi-cloud-arrow-up me-1 text-indigo-500 group-hover:text-white"></i>{" "}
                                    Publish
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-5 lg:gap-4 xl:gap-4 2xl:gap-4 grid-cols-1">
                        <div className="col-span-4 mt-4">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="grid p-6 text-gray-600">
                                    <label className="mb-2">News Title:</label>
                                    <input
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        value={title}
                                        type="text"
                                        className="rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-400 ring-gray-400"
                                    />
                                    <ErrorLabel message={errors.title} />
                                </div>
                                <div className="grid grid-cols-2 px-6 pb-6 space-x-2">
                                    <div className="grid text-gray-600">
                                        <label className="mb-2">
                                            News Keywords:
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setKeyword(e.target.value)
                                            }
                                            value={keyword}
                                            type="text"
                                            className="rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-400 ring-gray-400"
                                        />
                                    </div>
                                    <div className="grid text-gray-600">
                                        <label className="mb-2">
                                            News Tags:
                                        </label>
                                        <input
                                            onChange={(e) => {
                                                setTag(e.target.value);
                                            }}
                                            value={tag}
                                            type="text"
                                            className="rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-400 ring-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4">
                                <div
                                    className="p-6 text-gray-600"
                                    style={{ height: "900px" }}
                                >
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={
                                            onEditorStateChange
                                        }
                                        toolbar={{
                                            options: [
                                                "inline",
                                                "blockType",
                                                "fontSize",
                                                "image",
                                                "fontFamily",
                                                "list",
                                                "textAlign",
                                                "colorPicker",
                                                "link",
                                                "embedded",
                                                "emoji",
                                                "remove",
                                                "history",
                                            ],
                                        }}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 overflow-auto mt-4">
                            <div className="grid text-gray-600 px-4 py-6 bg-white rounded-lg shadow-sm">
                                <label className="mb-2">Category:</label>
                                <select
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-400 ring-gray-400"
                                >
                                    <option value="">
                                        -- Select Category --
                                    </option>
                                    {dataCategories?.map((data, index) => {
                                        return (
                                            <option key={index} value={data.id}>
                                                {data.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="grid text-gray-600 px-4 py-6 bg-white rounded-lg shadow-sm mt-4">
                                <label className="mb-2">Image Cover:</label>
                                <input
                                    onChange={(e) =>
                                        setImageCover(e.target.value)
                                    }
                                    value={imageCover}
                                    type="text"
                                    className="rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-400 ring-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Confirm
                show={publishConfirm}
                question="Are you sure publish this news ?"
                yes={publish}
                no={closeConfirmPublish}
            />
            <Toast
                show={showToast}
                message={toastData.message}
                time={30000}
                falseShow={closeToast}
                color={toastData.color}
            />
        </AuthenticatedLayout>
    );
}
