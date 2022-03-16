import Centered from "../style/Centered";
import FlexCol from "../style/FlexCol";
import HorizontalRule from "../style/HorizontalRule";
import EmailLogin from "./EmailLogin";
import GoogleLogin from "./GoogleLogin";
import { useStyletron } from "baseui";
import { Modal, ModalHeader, ModalBody } from "baseui/modal";

const LoginPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) => {
  const [, theme] = useStyletron();

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      closeable={onClose !== undefined}
      animate
      autoFocus
    >
      <ModalHeader>Log In</ModalHeader>
      <ModalBody>
        <Centered>
          <FlexCol>
            <EmailLogin onClose={onClose} />
            {false && <HorizontalRule color={theme.colors.accent500} />}
            {false && <GoogleLogin onClose={onClose} />}
          </FlexCol>
        </Centered>
      </ModalBody>
    </Modal>
  );
};

export default LoginPopup;
