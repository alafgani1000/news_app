export default function ErrorLabel({ className = "", message, ...props }) {
    return (
        <div {...props} className={"text-rose-500 " + className}>
            <span>{message}</span>
        </div>
    );
}
