import randomRoomCode from "../util/randomRoomCode";
import { styled, useStyletron } from "baseui";
import { Button } from "baseui/button";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FullyCentered = styled("div", {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

const GameSelect = () => {
  const [roomCode, setRoomCode] = useState(randomRoomCode());
  const navigate = useNavigate();
  const [css] = useStyletron();

  const joinRoom = () => navigate(`/games/${roomCode}`);

  const roomCodeValid = roomCode.length > 5;

  return (
    <FullyCentered>
      <Card>
        <StyledBody>
          <FormControl label="Room Code">
            <Input
              value={roomCode}
              onChange={(e) =>
                setRoomCode(e.currentTarget.value.replace(/[^a-zA-Z-]/g, ""))
              }
            />
          </FormControl>
        </StyledBody>
        <StyledAction>
          <div className={css({ width: "100%" })}>
            <Button
              onClick={joinRoom}
              overrides={{ BaseButton: { style: { width: "100%" } } }}
              disabled={!roomCodeValid}
            >
              Create or Join
            </Button>
          </div>
        </StyledAction>
      </Card>
    </FullyCentered>
  );
};

export default GameSelect;
