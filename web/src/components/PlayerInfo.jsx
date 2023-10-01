import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";

const styles = {
  fieldWrapper: {
    border: "2px solid gray", // 枠線を追加
    borderRadius: "5px", // 角を少し丸くする
    padding: "10px",
    margin: "10px 0",
    position: "relative",
  },
  zoneTitle: {
    position: "absolute",
    top: "-10px", // 枠の上に表示
    left: "10px",
    background: "white", // 背景を白にして、下の枠線を隠す
    padding: "0 5px",
    color: "gray",
    fontSize: "16px",
  },
  endBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const PlayerInfo = ({ player, opponent, turnCnt, isMyTurn, turnEnd }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <div style={styles.fieldWrapper}>
          <div style={styles.zoneTitle}>ターン</div>
          <Typography variant="body1">
            ターンプレイヤー: {isMyTurn ? "あなた" : "相手"}
          </Typography>
          <Typography variant="body1">
            ターン数: {turnCnt}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={2} style={styles.endBtn}>
        <Button
          variant="contained"
          color="error"
          style={{ fontSize: "12px", height: "100%" }}
          onClick={turnEnd}
          disabled={!isMyTurn}
        >
          ターン終了
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Card variant="outlined">
          <div style={styles.fieldWrapper}>
            <div style={styles.zoneTitle}>自分</div>
            <CardContent>
              {/* <Avatar src={icon} /> */}
              <Typography variant="body1">ID: {player.playerId}</Typography>
              <Typography variant="body1">
                手札数: {player.handCards.length}
              </Typography>
              <Typography variant="body1">
                山札数: {player.deckCards.length}
              </Typography>
              <Typography variant="body1">
                捨札数: {player.discardCards.length}
              </Typography>
              <Typography variant="body1">
                LP: {player.lp}/{player.maxLp}
              </Typography>
              <Typography variant="body1">
                Cost: {player.cost}/{player.maxCost}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card variant="outlined">
          <div style={styles.fieldWrapper}>
            <div style={styles.zoneTitle}>相手</div>
            <CardContent>
              {/* <Avatar src={icon} /> */}
              <Typography variant="body1">ID: {opponent.playerId}</Typography>
              <Typography variant="body1">
                手札数: {opponent.handCards.length}
              </Typography>
              <Typography variant="body1">
                山札数: {opponent.deckCards.length}
              </Typography>
              <Typography variant="body1">
                捨札数: {opponent.discardCards.length}
              </Typography>
              <Typography variant="body1">
                LP: {opponent.lp}/{opponent.maxLp}
              </Typography>
              <Typography variant="body1">
                Cost: {opponent.cost}/{opponent.maxCost}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PlayerInfo;
