import { ModalType } from "@/lib/abc";
import Modal from "./generic_modal";
import WinnerModal from "./winner_modal";

type ModalViewProps = {
  type: ModalType;
  value?: string;
  playerOneMark: string;
  modalStateUpdater: (value: any) => void;
  resetGameFunc: ({ resetMark = false }: { resetMark?: boolean }) => void;
  gameEndCallback: () => void;
};

export default function ModalView({
  type,
  value,
  playerOneMark,
  modalStateUpdater,
  resetGameFunc,
  gameEndCallback,
}: ModalViewProps) {
  return (
    <>
      <div id="overlay"></div>
      {type == ModalType.RestartModal && (
        <Modal
          modalTitle="RESTART GAME?"
          btnOneTitle="CANCEL"
          btnTwoTitle="RESTART"
          btnOneHandler={() => {
            modalStateUpdater({});
          }}
          btnTwoHandler={() => {
            modalStateUpdater({});
            resetGameFunc({ resetMark: true });
          }}
        />
      )}

      {type == ModalType.WinnerModal && (
        <WinnerModal
          title={playerOneMark == value ? "PLAYER 1 WINS" : "PLAYER 2 WINS"}
          winner={value as "x" | "o"}
          onNextBtnClicked={() => {
            modalStateUpdater({});
            resetGameFunc({});
          }}
          onQuitBtnClicked={gameEndCallback}
        />
      )}

      {type == ModalType.TiedModal && (
        <Modal
          modalTitle="ROUND TIED!"
          btnOneTitle="QUIT"
          btnTwoTitle="NEXT ROUND"
          btnOneHandler={gameEndCallback}
          btnTwoHandler={() => {
            modalStateUpdater({});
            resetGameFunc({});
          }}
        />
      )}
    </>
  );
}
