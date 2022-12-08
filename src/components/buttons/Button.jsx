export default function Button({ label, value, onClick, classNames, id }) {
    return (
        <button value={value} id={id} className={classNames} onClick={onClick}>
            {label}
        </button>
    );
}