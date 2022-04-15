import usePlayerListTags from "../hooks/usePlayerListTags";
import { Player } from "../types";
import { styled } from "baseui";
import { Avatar } from "baseui/avatar";
import Color from "color";

const TagStyling = styled("div", {
  display: "inline-block",
  width: "100%",
});

const PlayerTag = ({
  player,
  gameId,
  index,
}: {
  player: Player;
  gameId: string;
  index: number;
}) => {
  const { getTag } = usePlayerListTags();
  const tagContent = getTag({ gameId, playerId: player.uid });
  const borderColor = Color(player.color).lighten(0.8).hex();
  const innerTagColor = Color(player.color).lighten(0.2).hex();

  return (
    <TagStyling>
      <div
        style={{
          borderRadius: "20px",
          background: player.color,
          display: "flex",
          padding: "3px",
          borderColor: borderColor,
          borderWidth: "3px",
          borderStyle: "outset",
          verticalAlign: "middle",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {tagContent !== undefined && (
          <div style={{ minWidth: "20%" }}>
            <div
              style={{
                borderRadius: "15px",
                background: innerTagColor,
                display: "flex",
                verticalAlign: "middle",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>{tagContent}</h3>
            </div>
          </div>
        )}
        <Avatar
          name={player.name ?? `Player ${index}`}
          src={player.photo_url ?? undefined}
          size="scale1200"
        />
        <h4>{player.name}</h4>
      </div>
    </TagStyling>
  );
};

export default PlayerTag;
