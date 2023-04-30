import styles from "@/components/game/generic_modal.module.css";

type ModalProps = {
  modalTitle: string;
  btnOneTitle: string;
  btnTwoTitle: string;
  btnOneHandler: () => void;
  btnTwoHandler: () => void;
};

export default function Modal({
  modalTitle,
  btnOneTitle,
  btnTwoTitle,
  btnOneHandler,
  btnTwoHandler,
}: ModalProps) {
  return (
    <>
      <div className="modal">
        <span className={`${styles.modalTitle}`}>{modalTitle}</span>
        <div className="modal-buttons">
          <button
            onClick={btnOneHandler}
            type="button"
            className="push-button gray"
          >
            {btnOneTitle}
          </button>
          <button
            onClick={btnTwoHandler}
            type="button"
            className="push-button gold"
          >
            {btnTwoTitle}
          </button>
        </div>
      </div>
    </>
  );
}
