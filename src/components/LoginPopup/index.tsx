import Centered from "../style/Centered";
import GoogleLogin from "./GoogleLogin";
import { Modal, ModalHeader, ModalBody } from "baseui/modal";

const LoginPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} closeable animate autoFocus>
      <ModalHeader>Log In</ModalHeader>
      <ModalBody>
        <Centered>
          <GoogleLogin onClose={onClose} />
        </Centered>
      </ModalBody>
    </Modal>
  );
};

export default LoginPopup;
