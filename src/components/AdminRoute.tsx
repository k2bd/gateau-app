import useAdminGrantAvatar from "../hooks/useAdminGrantAvatar";
import useAdminRevokeAvatar from "../hooks/useAdminRevokeAvatar";
import useAdminUsersList from "../hooks/useAdminUsersList";
import usePokemonInfo from "../hooks/usePokemonInfo";
import { FirebaseUser, PokemonAvatar } from "../types";
import pokemonSprite from "../util/pokemonSprite";
import { styled } from "baseui";
import { Avatar } from "baseui/avatar";
import { Button } from "baseui/button";
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { Delete, Plus } from "baseui/icon";
import { Input } from "baseui/input";
import { ListHeading, ListItem, ListItemLabel } from "baseui/list";
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
} from "baseui/modal";
import { Select, TYPE } from "baseui/select";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useStyletron } from "styletron-react";

const UserSectionBox = styled("div", {
  borderWidth: "1px",
  borderColor: "black",
  borderStyle: "solid",
});

const AvatarItem = ({
  avatar,
  onRevoke,
}: {
  avatar: PokemonAvatar;
  onRevoke: () => Promise<void>;
}) => {
  const [css] = useStyletron();
  const [{ data: pokemon }] = usePokemonInfo({ num: avatar.nationalDex });
  const sprite = pokemonSprite({ pokemon, shiny: avatar.allowShiny });
  return (
    <ListItem
      artwork={() => (
        <img
          className={css({ width: "48px", height: "48px" })}
          src={sprite}
          alt={pokemon?.name}
        />
      )}
      endEnhancer={() => (
        <Button onClick={onRevoke}>
          <Delete />
        </Button>
      )}
    >
      <ListItemLabel>{avatar.grantReason}</ListItemLabel>
    </ListItem>
  );
};

const NewAvatarModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (avatar: PokemonAvatar) => Promise<void>;
}) => {
  const [nationalDex, setNationalDex] = useState(1);
  const [allowShiny, setAllowShiny] = useState(false);
  const [grantReason, setGrantReason] = useState<string | null>(null);

  return (
    <Modal
      isOpen={isOpen}
      closeable
      onClose={onClose}
      unstable_ModalBackdropScroll
    >
      <ModalHeader>Grant a new avatar</ModalHeader>
      <ModalBody>
        <Select
          options={Array.from({ length: 251 }, (_, i) => ({
            id: i + 1,
            label: i + 1,
          }))}
          placeholder="Pokedex number"
          type={TYPE.search}
          value={[{ id: nationalDex }]}
          onChange={(params) => setNationalDex(+(params.option?.id ?? 1))}
        />
        <Checkbox
          checked={allowShiny}
          onChange={() => setAllowShiny(!allowShiny)}
          labelPlacement={LABEL_PLACEMENT.right}
        >
          Shiny?
        </Checkbox>
        <Input
          value={grantReason ?? ""}
          onChange={(e) => setGrantReason(e.currentTarget?.value || null)}
          clearOnEscape
          placeholder="Grant reason (optional)"
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton
          onClick={async () => {
            onSubmit({
              nationalDex,
              allowShiny,
              grantReason,
            });
            onClose();
          }}
        >
          Grant Avatar
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

const UserSection = ({
  user,
  refetchAll,
}: {
  user: FirebaseUser;
  refetchAll: () => Promise<void>;
}) => {
  const { grantAvatar } = useAdminGrantAvatar();
  const { revokeAvatar } = useAdminRevokeAvatar();

  const [newAvatarModalOpen, setNewAvatarModalOpen] = useState(false);

  const onGrant = async (avatar: PokemonAvatar) => {
    await grantAvatar({ userId: user.uid, avatar });
    await refetchAll();
  };

  const onRevoke = async (avatar: PokemonAvatar) => {
    await revokeAvatar({ userId: user.uid, avatar });
    await refetchAll();
  };

  return (
    <UserSectionBox>
      <ListHeading
        heading={user.displayName}
        subHeading={user.uid}
        endEnhancer={() => (
          <Avatar
            name={user.displayName ?? ""}
            src={user.photoUrl ?? undefined}
            size="scale1600"
          />
        )}
      />
      <ul>
        {user.avatars.map((avatar) => (
          <AvatarItem
            avatar={avatar}
            onRevoke={() => onRevoke(avatar)}
            key={`${avatar}`}
          />
        ))}
      </ul>
      <Button onClick={() => setNewAvatarModalOpen(true)}>
        <Plus />
      </Button>
      <NewAvatarModal
        isOpen={newAvatarModalOpen}
        onClose={() => setNewAvatarModalOpen(false)}
        onSubmit={onGrant}
      />
    </UserSectionBox>
  );
};

const OverflowY = styled("div", {
  overflowY: "scroll",
});

const AdminRoute = () => {
  const { data: users, refetch } = useAdminUsersList();
  return (
    <OverflowY>
      <>
        {users?.map((user) => (
          <UserSection
            user={user}
            refetchAll={async () => {
              await refetch();
            }}
            key={user.uid}
          />
        ))}
      </>
      <Outlet />
    </OverflowY>
  );
};

export default AdminRoute;
