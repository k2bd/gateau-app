import useLockoutInfo from "../../hooks/useLockoutInfo";
import usePlayersList from "../../hooks/usePlayersList";
import playerListTagsContext from "../../playerListTagsContext";
import { GameEvent, Generation, Player } from "../../types";
import pokemonForGen from "../../util/pokemonForGen";
import LockoutCell from "./LockoutCell";
import { styled, useStyletron } from "baseui";
import { Button } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import { Input } from "baseui/input";
import { ListItem, ListItemLabel } from "baseui/list";
import { StatefulTooltip } from "baseui/tooltip";
import { chunk } from "lodash";
import { useContext, useEffect, useState } from "react";
import { TiMinus, TiPlus } from "react-icons/ti";

const Outer = styled("div", {
  display: "flex",
  flexFlow: "column",
  height: "100%",
});

const PokeGrid = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});

const EventListBox = styled("div", {
  overflowY: "scroll",
  flexGrow: 1,
});

const CELL_SIZES = [32, 48, 64];

const isValidNumber = (value: string) => !isNaN(parseInt(value));

const EventsList = ({
  players,
  events,
}: {
  players: Player[];
  events: (GameEvent & { dex: number })[];
}) => {
  return (
    <EventListBox>
      <ul>
        {events.map((event) => {
          const player = players.find(
            (player) => player.uid === event.player_id
          );
          return (
            <ListItem>
              <ListItemLabel>{`${player?.name} - ${event.meaning}`}</ListItemLabel>
            </ListItem>
          );
        })}
      </ul>
    </EventListBox>
  );
};

const LockoutTracker = ({
  gameId,
  gen,
}: {
  gameId: string;
  gen: Generation;
}) => {
  const [css] = useStyletron();

  const { setTag } = useContext(playerListTagsContext);

  const [cellSizeIndex, setCellSizeIndex] = useState(1);
  const [gridRowSize, setGridRowSize] = useState<number | null>(20);

  const pokemon = pokemonForGen(gen);
  const pokemonGroups = chunk(pokemon, gridRowSize ?? pokemon.length);

  const { players } = usePlayersList({ gameId });
  const { firstOwnedEvents, playerSeenPokemon } = useLockoutInfo({
    gameId,
    gen,
  });

  const scores = players.map((player) => {
    const score = firstOwnedEvents.filter(
      (owner) => owner?.player_id === player.uid
    ).length;

    return {
      ...player,
      score: score,
    };
  });

  useEffect(() => {
    scores.map((playerScore) => {
      setTag({
        gameId,
        playerId: playerScore.uid,
        content: `${playerScore.score}`,
      });
    });
  }, [gameId, JSON.stringify(scores)]);

  return (
    <Outer>
      <ButtonGroup>
        <StatefulTooltip content="Decrease cell size" placement="bottom">
          <Button
            size="mini"
            onClick={() => setCellSizeIndex(Math.max(cellSizeIndex - 1, 0))}
            disabled={cellSizeIndex === 0}
          >
            <TiMinus />
          </Button>
        </StatefulTooltip>
        <StatefulTooltip content="Increase cell size" placement="bottom">
          <Button
            size="mini"
            onClick={() =>
              setCellSizeIndex(
                Math.min(cellSizeIndex + 1, CELL_SIZES.length - 1)
              )
            }
            disabled={cellSizeIndex === CELL_SIZES.length - 1}
          >
            <TiPlus />
          </Button>
        </StatefulTooltip>
        <StatefulTooltip content="Change Row Size" placement="bottom">
          <div>
            <Input
              size="mini"
              value={gridRowSize ?? ""}
              onChange={(e) => {
                const newValue = e.currentTarget.value;
                if (isValidNumber(newValue)) {
                  setGridRowSize(parseInt(newValue));
                } else if (newValue === "") {
                  setGridRowSize(null);
                }
              }}
            />
          </div>
        </StatefulTooltip>
      </ButtonGroup>
      <PokeGrid>
        {pokemonGroups.map((group) => (
          <div
            className={css({ flexDirection: "row" })}
            key={group[0].name ?? "emptyRow"}
          >
            {group.map(({ name, nationalDex }) => (
              <LockoutCell
                num={nationalDex}
                name={name}
                gameId={gameId}
                ownEvent={firstOwnedEvents.find(
                  (event) => event.dex === nationalDex
                )}
                seen={playerSeenPokemon.includes(nationalDex)}
                cellSize={CELL_SIZES[cellSizeIndex] ?? 48}
                key={name}
              />
            ))}
          </div>
        ))}
      </PokeGrid>
      <EventsList events={firstOwnedEvents} players={players} />
    </Outer>
  );
};

export default LockoutTracker;
