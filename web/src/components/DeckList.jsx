import React, { useState } from "react";
import {
  Grid,
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const styles = {
  card: {
    width: "100px",
    height: "100px",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  costCircle: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "15px",
  },
  cardName: {
    position: "absolute",
    top: "0px",
    left: "21px", // コストの右側から始める
    right: "0px",
    whiteSpace: "nowrap", // 改行を防ぐ
    overflow: "hidden", // 要素の外部にはみ出さないようにする
    textOverflow: "ellipsis", // はみ出したテキストを省略記号で表示
    color: "white",
    backgroundColor: "gray",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 255, 0.5)", // 青の背景色
    color: "white", // 文字色
    fontSize: "15px",
  },
  centerGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sortFormControl: {
    marginBottom: "15px",
  },
};

const sortdeck = (deck, sortBy) => {
  const sorter = {
    cost: (a, b) => a.cost - b.cost,
    cardname: (a, b) => a.cardname.localeCompare(b.cardname),
    attack: (a, b) => a.attack - b.attack,
    defense: (a, b) => a.defense - b.defense,
    none: () => 0
  };

  if (!sorter[sortBy]) {
    console.warn('Invalid sortBy parameter provided. Returning original deck.');
    return deck;
  }

  return [...deck].sort(sorter[sortBy]);
};

const CardList = ({ deck, onCardClick }) => {
  const [sortBy, setSortBy] = useState("none");
  const sorteddeck = sortdeck(deck, sortBy);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <FormControl variant="outlined" style={styles.sortFormControl}>
          <InputLabel>並び替え</InputLabel>
          <Select value={sortBy} onChange={handleSortChange} label="並び替え">
            <MenuItem value="none">引き順</MenuItem>
            <MenuItem value="cost">コスト</MenuItem>
            <MenuItem value="cardname">カード名</MenuItem>
            <MenuItem value="attack">攻撃力</MenuItem>
            <MenuItem value="defense">防御力</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid container spacing={2}>
        {sorteddeck.map((card, index) => (
          <Grid
            item
            xs={3}
            key={index}
            onClick={() => onCardClick(card)}
            style={styles.centerGrid}
          >
            <Card style={styles.card}>
              <img src={card.imageUrl} alt="card" style={styles.card} />
              <div style={styles.costCircle}>{card.cost}</div>
              <div style={styles.cardName}>{card.cardname}</div>
              <div style={styles.cardOverlay}>
                {card.attack} / {card.defense}
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CardList;
