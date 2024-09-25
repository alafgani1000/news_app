export default function Toast({
    time = 0,
    show = false,
    className = "",
    message = "",
    falseShow,
    color = "",
    ...props
}) {
    setTimeout(() => {
        falseShow();
    }, time);
    if (show) {
        return (
            <div
                {...props}
                className={
                    "fixed flex flex-row justify-end top-2 left-0 right-2 z-50 overflow-x-hidden overflow-y-auto p-2" +
                    (color === "success"
                        ? "border-l-4 border-l-green-600 "
                        : "border-l-4 border-l-rose-600 ") +
                    className
                }
            >
                <div className="bg-slate-100 flex rounded shadow">
                    <div className="flex py-4 px-5">
                        <span
                            className={
                                "mr-3 p-1 rounded-full " +
                                (color === "success"
                                    ? "bg-green-600 text-white"
                                    : "bg-rose-500 text-white ") +
                                className
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 "
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                />
                            </svg>
                        </span>

                        <span className="text-lg text-gray-800">{message}</span>
                    </div>
                    <div className="px-2">
                        <span
                            className="cursor-pointer text-base"
                            onClick={() => falseShow()}
                        >
                            X
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
