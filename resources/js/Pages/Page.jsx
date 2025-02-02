import { Head, Link } from "@inertiajs/react";
import Header from "./Header";
import moment from "moment";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Page({ auth, page, menus, path }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

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

    useEffect(() => {
        setEditorState(fromHtml(page.content));
    }, []);

    return (
        <Header
            user={auth.user}
            menus={menus}
            path={path}
            header={
                <h2 className="font-semibold text-xl text-gray-600 leading-tight">
                    {page.name}
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="sm:px-4 title-segment font-bold bg-white m-4 px-4 py-4 text-gray-600">
                    <h1 className="text-base">
                        Home{" "}
                        <i className="bi bi-chevron-right text-sm font-extrabold"></i>{" "}
                        {page.name}
                    </h1>
                </div>
                <div className="sm:px-4 sm:rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 lg:gap-8 md:gap-4 overflow-y-hidden">
                    <div className="col-span-4">
                        <h2 className="text-gray-700 text-xl lg:text-3xl md:text-2xl font-bold mt-4">
                            {page.name}
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
                </div>
            </div>
        </Header>
    );
}
