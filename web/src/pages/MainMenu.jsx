import React from "react";
import { Auth } from "aws-amplify";
import { Container, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa", // インスタグラム風の背景色
  },
  button: {
    width: "200px",
    marginBottom: "10px",
    backgroundColor: "#3897f0", // インスタグラム風のボタン色
    color: "white",
    "&:hover": {
      backgroundColor: "#357ab6", // ホバー時の色変更
    },
  },
  title: {
    marginBottom: "20px",
    fontWeight: "bold",
    textAlign: "center",
  },
};

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <Container style={styles.container}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h4" style={styles.title}>
            Shadowverse Like Game
          </Typography>
        </Grid>
        <Grid item>
          <Button
            style={styles.button}
            variant="contained"
            onClick={() => navigate("/match")}
          >
          対戦
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={styles.button}
            variant="contained"
            onClick={() => navigate("/npcmatch")}
          >
            NPC対戦
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={styles.button}
            variant="contained"
            onClick={() => navigate("/deck")}
          >
            デッキ編集
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={styles.button}
            variant="contained"
            onClick={() => navigate("/create")}
          >
            カード作成
          </Button>
        </Grid>
        <Grid item>
          <Button style={styles.button} variant="contained">
            設定
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={styles.button}
            variant="contained"
            color="primary"
            onClick={() => Auth.signOut()}
          >
            サインアウト
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainMenu;
