import { auth } from "../../firebaseApp";
import usePokemonInfo from "../../hooks/usePokemonInfo";
import useUser from "../../hooks/useUser";
import Centered from "../style/Centered";
import { useStyletron } from "baseui";
import { Button, SIZE } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
} from "baseui/modal";
import { useEffect, useState } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";

const POKEMON_SPRITE_OPTIONS = [
  1, 4, 7, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43, 46, 48,
  50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 84, 86, 88, 90, 92,
  96, 98, 100, 102, 104, 109, 111, 113, 114, 116, 118, 120, 126, 133, 138, 140,
  147,
];

const PokemonSpriteOption = ({
  num,
  currentSelection,
  onSelect,
  disabled,
}: {
  num: number;
  currentSelection?: string | null;
  onSelect: (imageUrl: string) => void;
  disabled: boolean;
}) => {
  const [{ data }] = usePokemonInfo({ num });
  const [css] = useStyletron();

  const photoUrl = data?.sprites.front_default;

  return (
    <Button
      onClick={() => onSelect(photoUrl ?? "")}
      disabled={!photoUrl || disabled}
      size={SIZE.mini}
      isSelected={currentSelection === photoUrl}
      kind="tertiary"
    >
      <img
        className={css({ width: "48px", height: "48px" })}
        src={photoUrl}
        alt={data?.name}
      />
    </Button>
  );
};

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
  const [photoURL, setPhotoURL] = useState(user?.photoURL);

  const update = () => {
    updateProfile({ displayName, photoURL });
    onClose();
  };

  useEffect(() => {
    if (user) {
      if (!displayName) setDisplayName(user.displayName);
      if (!photoURL) setPhotoURL(user.photoURL);
    }
  }, [user]);

  const spritePicks = (
    <Centered>
      <div style={{ height: "150px", overflowY: "scroll", width: "90%" }}>
        {POKEMON_SPRITE_OPTIONS.map((option) => (
          <PokemonSpriteOption
            num={option}
            currentSelection={photoURL}
            onSelect={setPhotoURL}
            disabled={!user}
          />
        ))}
      </div>
    </Centered>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeable={!!user?.displayName && !!user.photoURL}
    >
      <ModalHeader>Profile Info</ModalHeader>
      <ModalBody>
        <FormControl
          label={() => "Display Name"}
          caption={() => "Name visible to other players"}
        >
          <Input
            value={displayName ?? ""}
            onChange={(e) => setDisplayName(e.currentTarget.value)}
            disabled={!user}
          />
        </FormControl>
        <FormControl
          label={() => "Avatar"}
          caption={() => "Select a Pokemon to use as your avatar"}
        >
          {spritePicks}
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          disabled={!user || !displayName || !photoURL}
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
