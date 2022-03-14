import useLeaveGame from "../../hooks/useLeaveGame";
import usePlayersList from "../../hooks/usePlayersList";
import useSetPlayer from "../../hooks/useSetPlayer";
import useUser from "../../hooks/useUser";
import { Cartridge } from "../../types";
import { Button } from "baseui/button";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "baseui/modal";
import { Tag } from "baseui/tag";
import { useState } from "react";

const PlayersList = ({ gameId }: { gameId: string }) => {
  const { players } = usePlayersList({ gameId });
  const { user } = useUser();
  const { leaveGame } = useLeaveGame({ gameId });
  const { setPlayer } = useSetPlayer({ gameId });
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const [cartridge, setCartridge] = useState<Cartridge | null>(null);

  const isJoined =
    user && players.map((player) => player.uid).includes(user.uid);

  const verb = isJoined ? "Leave" : "Join";
  const action = isJoined ? () => setJoinModalOpen(true) : () => leaveGame();

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
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button disabled={true}>Join</Button>
        </ModalFooter>
      </Modal>
      {players.map(({ uid, name }, index) => (
        <Tag closeable={uid === user?.uid}>{name ?? `Player ${index}`}</Tag>
      ))}
      <Button onClick={action}>{verb}</Button>
    </>
  );
};

export default PlayersList;
