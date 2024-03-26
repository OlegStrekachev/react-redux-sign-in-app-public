import ReactDOM from "react-dom";

export const ModalWindowPortal = ({ children }) => {
    const root = document.getElementById("modal-root");
    return ReactDOM.createPortal(children, root);
}
