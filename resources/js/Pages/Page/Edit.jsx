import Confirm from "@/Components/Confirm";
import ErrorLabel from "@/Components/ErrorLabel";
import Toast from "@/Components/Toast";
// import Toast from "@/Components/Toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { convertFromHTML } from "draft-convert";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Edit({ auth, page }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [name, setName] = useState(page.name || "")
    const [statusPage, setStatusPage] = useState("")
    const [publishConfirm, setPublishConfirm] = useState(false);
    const [unpublishConfirm, setUnpublishConfirm] = useState(false)
    const [toastData, setToastData] = useState({
        message: "",
        color: "",
    });
    const [errors, setErrors] = useState({
        name: "",
    });
    const [showToast, setShowToast] = useState(false);

    const handleRefresh = () => {
        // handle search
        router.get(
            route(route().current(), { code: page.code }),
            {},
            {
                replace: true,
                preserveState: true,
            }
        );
    };

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
        const newEditorState = EditorState.createWithContent(
            convertFromRaw(newState)
        );
        return newEditorState;
    };

    const store = () => {
        const content = toHtml(editorState.getCurrentContent());
        axios
            .put(`/admin/page/${page.code}/update`, {
                name: name,
                content: content,
                status: statusPage
            })
            .then((res) => {
                setToastData({
                    message: res.data,
                    color: "success",
                });
                setShowToast(true);
                handleRefresh()
            });
    };

    const publish = () => {
        const content = toHtml(editorState.getCurrentContent());
        axios
            .put(`/admin/page/${page.code}/publish`, {
                name: name,
                status: statusPage,
                content: content,
            })
            .then((res) => {
                resetError();
                setToastData({
                    message: res.data,
                    color: "success",
                });
                closeConfirmPublish()
                setShowToast(true)
                handleRefresh()
            });
    };

    const unPublish = () => {
        axios.put(`/admin/page/${page.code}/unpublish`, {
            code: page.code
        }).then((res) => {
            setToastData({
                message: res.data,
                color: "success"
            });
            setShowToast(true)
            closeUnPublishConfirm()
            handleRefresh()
        })
    }

    useEffect(() => {
        setEditorState(fromHtml(page.content))
    }, []);

    const resetForm = () => {
        setEditorState(EditorState.createEmpty());
        setName("")
    };

    const resetError = () => {
        setErrors({
            name: "",
        });
    };

    const showPublishConfirm = () => {
        let errors = 0;
        resetError();
        if (name === undefined || name === "") {
            setErrors((prev) => ({
                ...prev,
                name: "This field is required",
            }));
        } else {
            setPublishConfirm(true);
        }
    };

    const closeConfirmPublish = () => {
        setPublishConfirm(false);
    };

    const showUnPublishConfirm = () => {
        setUnpublishConfirm(true);
    }

    const closeUnPublishConfirm = () => {
        setUnpublishConfirm(false);
    }


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
                    Page
                </h2>
            }
        >
            <Head title="Create Page" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 overflow-x-scroll">
                    <div className="mb-4 flex justify-end">
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
                                Update
                            </button>
                            {auth.permissions.publish_news === true ?
                                page.status === 1 ?
                                    <button
                                        onClick={() => showUnPublishConfirm()}
                                        className="group py-2 px-4 text-base text-gray-500 hover:bg-indigo-700 hover:rounded hover:text-white"
                                    >
                                        <i className="bi bi-cloud-arrow-up me-1 text-indigo-500 group-hover:text-white"></i>{" "}
                                        Un Publish
                                    </button>
                                    : <button
                                        onClick={() => showPublishConfirm()}
                                        className="group py-2 px-4 text-base text-gray-500 hover:bg-indigo-700 hover:rounded hover:text-white"
                                    >
                                        <i className="bi bi-cloud-arrow-up me-1 text-indigo-500 group-hover:text-white"></i>{" "}
                                        Publish
                                    </button>
                                : (
                                    <></>
                                )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="col-span-4 mt-4">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="grid p-6 text-gray-600">
                                    <label className="mb-2">Name</label>
                                    <input
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        value={name}
                                        type="text"
                                        className="rounded-lg focus:ring-indigo-500 focus:border-indigo-500 border-gray-400 ring-gray-400"
                                    />
                                    <ErrorLabel message={errors.name} />
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-4">
                                <div
                                    className="p-6 text-gray-600"
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
                    </div>
                </div>
            </div>
            <Confirm
                show={publishConfirm}
                question="Are you sure publish this page ?"
                yes={publish}
                no={closeConfirmPublish}
            />
            <Confirm
                show={unpublishConfirm}
                question="Are you sure unpublish this page ?"
                yes={unPublish}
                no={closeUnPublishConfirm}
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
