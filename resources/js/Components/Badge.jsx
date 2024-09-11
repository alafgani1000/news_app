export default function Badge({ color, message, ...props }) {
    return (
        <span
            className={
                "text-xs px-2 py-1 text-white rounded-full font-semibold " +
                (color === "danger"
                    ? "bg-rose-500"
                    : color === "warning"
                    ? "bg-yellow-500"
                    : "bg-blue-500")
            }
        >
            {message}
        </span>
    );
}
