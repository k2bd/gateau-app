import { auth } from "../../firebaseApp";
import usePokemonInfo from "../../hooks/usePokemonInfo";
import useUser from "../../hooks/useUser";
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
import { useState } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";

const POKEMON_SPRITE_OPTIONS = [1, 4, 7, 25];

const PokemonSpriteOption = ({
  num,
  currentSelection,
  onSelect,
}: {
  num: number;
  currentSelection?: string | null;
  onSelect: (imageUrl: string) => void;
}) => {
  const [{ data }] = usePokemonInfo({ num });
  const [css] = useStyletron();

  const photoUrl = data?.sprites.front_default;

  return (
    <Button
      onClick={() => onSelect(photoUrl ?? "")}
      disabled={!photoUrl}
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

  const spritePicks = (
    <>
      {POKEMON_SPRITE_OPTIONS.map((option) => (
        <PokemonSpriteOption
          num={option}
          currentSelection={photoURL}
          onSelect={setPhotoURL}
        />
      ))}
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
        <FormControl
          label={() => "Avatar"}
          caption={() => "Select a Pokemon to use as your avatar"}
        >
          {spritePicks}
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          disabled={!user || !displayName}
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
