export default function Layout({ children, formula, display }) {
    return (
        <div className="layout">
            <div className="layoutHeader">
                <p id="formula">{formula}</p>
                <p id="display">{display}</p>
            </div>
            <div className="layoutContent">{children}</div>
        </div>
    );
}