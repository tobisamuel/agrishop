import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot?.appendChild(el.current);

    return () => {
      modalRoot?.removeChild(el.current);
    };
  }, []);

  return createPortal(children, el.current);
};

export default Modal;
