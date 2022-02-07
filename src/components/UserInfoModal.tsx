import { auth } from "../firebaseApp";
import useUser from "../hooks/useUser";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
} from "baseui/modal";
import { useState } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";

const UserInfoModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user } = useUser();
  const [updateProfile, updating] = useUpdateProfile(auth);

  const [displayName, setDisplayName] = useState(user?.displayName);

  const update = () => {
    updateProfile({ displayName });
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Set user info</ModalHeader>
      <ModalBody>
        <FormControl
          label={() => "Display Name"}
          caption={() => "Name visible to other players"}
        >
          <Input
            value={displayName ?? ""}
            onChange={(e) => setDisplayName(e.currentTarget.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          disabled={!displayName}
          isLoading={updating}
          onClick={update}
        >
          Submit
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default UserInfoModal;
