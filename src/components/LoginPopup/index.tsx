import GoogleLogin from "./GoogleLogin";
import { Modal, ModalHeader, ModalBody } from "baseui/modal";
import { useStyletron } from "styletron-react";

const LoginPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [css] = useStyletron();
  return (
    <Modal onClose={onClose} isOpen={isOpen} closeable animate autoFocus>
      <ModalHeader>Log In</ModalHeader>
      <ModalBody>
        <div
          className={css({
            justifyItems: "center",
            alignItems: "center",
            display: "flex",
          })}
        >
          <GoogleLogin onClose={onClose} />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default LoginPopup;
