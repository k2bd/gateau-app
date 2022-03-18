import useJoinGame from "../hooks/useJoinGame";
import useLeaveGame from "../hooks/useLeaveGame";
import usePlayersList from "../hooks/usePlayersList";
import useUser from "../hooks/useUser";
import { Cartridge } from "../types";
import PlayerTag from "./PlayerTag";
import { Button, SIZE } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "baseui/modal";
import { Select } from "baseui/select";
import { useState } from "react";
import { CirclePicker } from "react-color";

const GATEAU_PLAYER_COLORS = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];

const PlayersList = ({ gameId }: { gameId: string }) => {
  const { players } = usePlayersList({ gameId });
  const { user } = useUser();
  const { leaveGame } = useLeaveGame({ gameId });
  const { joinGame } = useJoinGame({ gameId });
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const [cartridge, setCartridge] = useState<Cartridge | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);

  const isJoined =
    user && players.map((player) => player.uid).includes(user.uid);

  const verb = isJoined ? "Leave" : "Join";
  const action = isJoined ? () => leaveGame() : () => setJoinModalOpen(true);

  const canJoin =
    !!user &&
    user?.uid !== undefined &&
    cartridge !== undefined &&
    color !== undefined;

  const availableColors = GATEAU_PLAYER_COLORS.filter(
    (color) => !players.map((player) => player.color).includes(color)
  );

  const cartOptions = Object.values(Cartridge).map((value) => ({
    id: value,
    label: value,
  }));

  return (
    <>
      <Modal
        onClose={() => setJoinModalOpen(false)}
        isOpen={joinModalOpen}
        animate
        autoFocus
        closeable
      >
        <ModalHeader>Join Game</ModalHeader>
        <ModalBody>
          <FormControl label="Cartridge">
            <Select
              options={cartOptions}
              value={cartridge ? [{ id: cartridge }] : undefined}
              onChange={(params) =>
                setCartridge(
                  (params.option?.id ?? undefined) as Cartridge | undefined
                )
              }
            />
          </FormControl>
          <CirclePicker
            colors={availableColors}
            color={color}
            onChange={(e) => setColor(e.hex)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={!canJoin}
            onClick={async () => {
              if (canJoin)
                await joinGame({
                  color,
                  uid: user.uid,
                  cartridge,
                  name: user.displayName,
                  photo_url: user.photoURL,
                });
              setJoinModalOpen(false);
            }}
          >
            Join
          </Button>
        </ModalFooter>
      </Modal>
      {players.map((player, index) => (
        <PlayerTag player={player} index={index} key={player.uid} />
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={action} size={SIZE.compact}>
          {verb}
        </Button>
      </div>
    </>
  );
};

export default PlayersList;
