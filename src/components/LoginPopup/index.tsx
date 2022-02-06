import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
import { useStyletron } from "styletron-react";
import GoogleLogin from "./GoogleLogin";

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
          <GoogleLogin />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default LoginPopup;
