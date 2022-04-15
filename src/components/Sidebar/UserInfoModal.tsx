import { auth } from "../../firebaseApp";
import * as pokemon from "../../gameData/pokemon";
import useAvailableAvatars from "../../hooks/useAvailableAvatars";
import usePokemonInfo from "../../hooks/usePokemonInfo";
import useUser from "../../hooks/useUser";
import { PokemonAvatar } from "../../types";
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
import { StatefulTooltip } from "baseui/tooltip";
import { useEffect, useState } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";

const BASE_POKEMON_SPRITE_OPTIONS: PokemonAvatar[] = [
  pokemon.BULBASAUR,
  pokemon.CHARMANDER,
  pokemon.SQUIRTLE,
  pokemon.CATERPIE,
  pokemon.WEEDLE,
  pokemon.PIDGEY,
  pokemon.RATTATA,
  pokemon.SPEAROW,
  pokemon.EKANS,
  pokemon.PICHU,
  pokemon.PIKACHU,
  pokemon.SANDSHREW,
  pokemon.NIDORAN_F,
  pokemon.NIDORAN_M,
  pokemon.CLEFFA,
  pokemon.CLEFAIRY,
  pokemon.VULPIX,
  pokemon.IGGLYBUFF,
  pokemon.JIGGLYPUFF,
  pokemon.ZUBAT,
  pokemon.ODDISH,
  pokemon.PARAS,
  pokemon.VENONAT,
  pokemon.DIGLETT,
  pokemon.MEOWTH,
  pokemon.PSYDUCK,
  pokemon.MANKEY,
  pokemon.GROWLITHE,
  pokemon.POLIWAG,
  pokemon.ABRA,
  pokemon.MACHOP,
  pokemon.BELLSPROUT,
  pokemon.TENTACOOL,
  pokemon.GEODUDE,
  pokemon.PONYTA,
  pokemon.SLOWPOKE,
  pokemon.MAGNEMITE,
  pokemon.DODUO,
  pokemon.SEEL,
  pokemon.GRIMER,
  pokemon.SHELLDER,
  pokemon.GASTLY,
  pokemon.ONIX,
  pokemon.DROWZEE,
  pokemon.KRABBY,
  pokemon.VOLTORB,
  pokemon.EXEGGCUTE,
  pokemon.CUBONE,
  pokemon.TYROGUE,
  pokemon.HITMONLEE,
  pokemon.HITMONCHAN,
  pokemon.KOFFING,
  pokemon.RHYHORN,
  pokemon.CHANSEY,
  pokemon.HORSEA,
  pokemon.GOLDEEN,
  pokemon.STARYU,
  pokemon.SCYTHER,
  pokemon.SMOOCHUM,
  pokemon.ELEKID,
  pokemon.MAGBY,
  pokemon.MAGIKARP,
  pokemon.EEVEE,
  pokemon.PORYGON,
  pokemon.OMANYTE,
  pokemon.KABUTO,
  pokemon.DRATINI,
  pokemon.CHIKORITA,
  pokemon.CYNDAQUIL,
  pokemon.TOTODILE,
  pokemon.SENTRET,
  pokemon.HOOTHOOT,
  pokemon.LEDYBA,
  pokemon.SPINARAK,
  pokemon.CHINCHOU,
  pokemon.TOGEPI,
  pokemon.NATU,
  pokemon.MAREEP,
  pokemon.AZURILL,
  pokemon.HOPPIP,
  pokemon.SUNKERN,
  pokemon.WOOPER,
  pokemon.WYNAUT,
  pokemon.PINECO,
  pokemon.SNUBBULL,
  pokemon.TEDDIURSA,
  pokemon.SLUGMA,
  pokemon.SWINUB,
  pokemon.REMORAID,
  pokemon.HOUNDOUR,
  pokemon.PHANPY,
  pokemon.LARVITAR,
].map((option) => ({ ...option, allowShiny: false }));

const PokemonSpriteOption = ({
  option,
  currentSelection,
  onSelect,
  disabled,
}: {
  option: PokemonAvatar;
  currentSelection?: string | null;
  onSelect: (imageUrl: string) => void;
  disabled: boolean;
}) => {
  const [{ data }] = usePokemonInfo({ num: option.nationalDex });
  const [css] = useStyletron();

  const photoUrl = option.allowShiny
    ? data?.sprites.front_shiny
    : data?.sprites.front_default;

  const spriteButton = (
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

  return option.grantReason ? (
    <StatefulTooltip content={() => option.grantReason}>
      {spriteButton}
    </StatefulTooltip>
  ) : (
    spriteButton
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

  const { data: bonusAvatars } = useAvailableAvatars();

  const availableAvatars = BASE_POKEMON_SPRITE_OPTIONS.concat(
    ...(bonusAvatars ?? [])
  );

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
        {availableAvatars.map((option) => (
          <PokemonSpriteOption
            option={option}
            currentSelection={photoURL}
            onSelect={setPhotoURL}
            disabled={!user}
            key={option.nationalDex}
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
