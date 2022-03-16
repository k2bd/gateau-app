import { Player } from "../types";
import { styled } from "baseui";
import { Avatar } from "baseui/avatar";
import Color from "color";

const TagStyling = styled("div", {
  display: "inline-block",
  width: "100%",
});

const PlayerTag = ({ player, index }: { player: Player; index: number }) => {
  const borderColor = Color(player.color).lighten(0.8).hex();
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
        <div style={{ width: "33%" }}>
          <Avatar
            name={player.name ?? `Player ${index}`}
            src={player.photo_url ?? undefined}
            size="scale1600"
          />
        </div>
        <div style={{ width: "67%", justifyContent: "center" }}>
          <span
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            <h4>{player.name}</h4>
          </span>
        </div>
      </div>
    </TagStyling>
  );
};

export default PlayerTag;
