import useLockoutInfo from "../../hooks/useLockoutInfo";
import usePlayersList from "../../hooks/usePlayersList";
import { Generation } from "../../types";
import pokemonForGen from "../../util/pokemonForGen";
import LockoutCell from "./LockoutCell";
import { styled, useStyletron } from "baseui";
import { StatefulTooltip } from "baseui/tooltip";
import Color from "color";
import { chunk } from "lodash";

const PokeGrid = styled("div", {
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
});

const ScoresLayout = styled("div", {
  display: "flex",
  width: "100%",
  alignContent: "space-evenly",
});

const LockoutTracker = ({
  gameId,
  gen,
}: {
  gameId: string;
  gen: Generation;
}) => {
  const [css] = useStyletron();

  const pokemon = pokemonForGen(gen);
  const pokemonGroups = chunk(pokemon, 20);

  const { players } = usePlayersList({ gameId });
  const { firstOwnedEvents } = useLockoutInfo({ gameId, gen });

  const scores = players.map((player) => {
    const score = firstOwnedEvents.filter(
      (owner) => owner?.player_id === player.uid
    ).length;

    return {
      ...player,
      score: score,
    };
  });
  const scoresRender = scores.map((p) => {
    const backgroundColor = Color(p.color).lighten(0.8).string();
    const textColor = Color(p.color).string();
    return (
      <StatefulTooltip content={p.name} placement="bottom" key={p.uid}>
        <div
          style={{
            display: "flex",
            padding: "3px",
            background: backgroundColor,
            width: "40px",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: textColor }}>{p.score}</h1>
        </div>
      </StatefulTooltip>
    );
  });

  return (
    <>
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
                key={name}
              />
            ))}
          </div>
        ))}
      </PokeGrid>
      <ScoresLayout>{scoresRender}</ScoresLayout>
    </>
  );
};

export default LockoutTracker;
