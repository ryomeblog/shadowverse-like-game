import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  Grid,
  Modal,
  Button,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import CardList from "../components/CardList";
import DeckList from "../components/DeckList";
import defaultDeck from '../config/default.json';
import { createDeck, updateDeck } from "../graphql/mutations";
import { getDeck, getAllCard, getAllDeck } from "../graphql/queries";
import { useNavigate } from "react-router-dom";

const styles = {
  modalCardImage: { 
    width: "150px", 
    height: "150px", 
    margin: "20px 0" 
  },
  modalContent: {
    position: "absolute",
    top: "10%",
    left: "20%", // 左から20%の位置に配置
    width: "60%", // 画面の60%の幅を使用
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", // 影の効果を追加
    outline: "none", // モーダルのアウトラインを削除
  },
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
};

const DeckEditingScreen = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [decks, setDecks] = useState([]);
  const [deckCards, setDeckCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [updateDeckname, setUpdateDeckname] = useState("");
  const [createDeckname, setCreateDeckname] = useState("");
  const [isCardList, setIsCardList] = useState(false);

  const handleCardClickDeck = (card) => {
    setSelectedCard(card);
    setIsCardList(false);
  };

  const handleCardClickList = (card) => {
    setSelectedCard(card);
    setIsCardList(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleAddCardToDeck = () => {
    const cardCountInDeck = deckCards.filter(
      (d) => d.id === selectedCard.id
    ).length;

    // デッキにカードが3枚未満の場合にのみ、カードを追加
    if (cardCountInDeck < 3) {
      setDeckCards((prevDeck) => [...prevDeck, selectedCard]);
      handleCloseModal();
    } else {
      alert("このカードはデッキに3枚追加されています。");
    }
  };

  const handleDeleteCardToDeck = () => {
    // IDがtargetIdの要素のインデックスを見つける
    const indexToDelete = deckCards.findIndex((item) => item.id === selectedCard.id);
    const newDeckCards = deckCards;
    newDeckCards.splice(indexToDelete, 1);
    // 要素が見つかった場合、それを削除する
    if (indexToDelete !== -1) {
      setDeckCards([...newDeckCards]);
    }
    handleCloseModal();
  };

  const handleDeckSelection = async (event) => {
    const deckId = event.target.value;
    setSelectedDeckId(deckId);

    try {
      const deckData = await API.graphql(
        graphqlOperation(getDeck, {
          deckId: deckId,
        })
      );
      const deckCardsList = deckData.data.getDeck;
      setDeckCards(deckCardsList.cards);
      setUpdateDeckname(deckCardsList.deckname);
    } catch (error) {
      console.error("Error fetching cards", error);
    }
  };

  const handleCreateDeck = async () => {
    await API.graphql(
      graphqlOperation(createDeck, {
        input: {
          deckname: createDeckname,
          cards: defaultDeck,
        },
      })
    );
    fetchDecks();
    alert("デッキを作成しました。");
  };

  const handleUpdateDeck = async () => {
    if (deckCards.length === 20) {
      try {
        const input = [];
        for (const deckCard of deckCards) {
          input.push({
            id: deckCard.id,
            type: deckCard.type,
            cardname: deckCard.cardname,
            cardType: deckCard.cardType,
            cost: deckCard.cost,
            attack: deckCard.attack,
            attackStatus: deckCard.attackStatus,
            defense: deckCard.defense,
            description: deckCard.description,
            effectType: deckCard.effectType,
            imageUrl: deckCard.imageUrl,
          });
        }
        await API.graphql(
          graphqlOperation(updateDeck, {
            deckId: selectedDeckId,
            input: {
              deckname: updateDeckname,
              cards: input,
            },
          })
        );
        fetchDecks();
        alert("デッキを更新しました。");
      } catch (error) {
        console.error("Error updating deck", error);
      }
    } else {
      alert("デッキ枚数は20枚でなければいけません。");
    }
  };
  const fetchCards = async () => {
    try {
      const cardData = await API.graphql(graphqlOperation(getAllCard));
      const cardList = cardData.data.getAllCard;
      setCards(cardList);
    } catch (error) {
      console.error("Error fetching cards", error);
    }
  };
  const fetchDecks = async () => {
    try {
      const deckData = await API.graphql(graphqlOperation(getAllDeck));
      const deckList = deckData.data.getAllDeck;
      setDecks(deckList);
    } catch (error) {
      console.error("Error fetching decks", error);
    }
  };

  // 初期化時にカード一覧を取得
  useEffect(() => {

    fetchCards();
    fetchDecks();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
          style={{ marginBottom: "20px" }}
        >
          戻る
        </Button>
      </Grid>
      <Grid item xs={6}>
          <TextField
            label="デッキ名"
            variant="outlined"
            value={createDeckname}
            onChange={(e) => setCreateDeckname(e.target.value)}
          />
        <Button
            variant="contained"
            color="primary"
            onClick={handleCreateDeck}
          >
            デッキ作成
          </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography variant="h5">カード一覧</Typography>
        <br />
        <CardList cards={cards} onCardClick={handleCardClickList} />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography variant="h5">
          デッキ
          <Select
            value={selectedDeckId}
            onChange={handleDeckSelection}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="0" disabled>
              デッキを選択
            </MenuItem>
            {decks.map((deck) => (
              <MenuItem key={deck.id} value={deck.id}>
                {deck.deckname}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="デッキ名"
            variant="outlined"
            value={updateDeckname}
            onChange={(e) => setUpdateDeckname(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateDeck}
          >
            デッキ更新
          </Button>
        </Typography>
        <br />

        <DeckList deck={deckCards} onCardClick={handleCardClickDeck} />
      </Grid>

      <Modal open={!!selectedCard} onClose={handleCloseModal}>
        <div style={styles.modalContent}>
          {selectedCard && (
            <>
              <img src={selectedCard.imageUrl} alt="card" style={styles.modalCardImage} />
              <div style={styles.fieldWrapper}>
                <div style={styles.zoneTitle}>{selectedCard.cardname}</div>
                <div style={styles.fieldWrapper}>
                  <div style={styles.zoneTitle}>ATK:</div>
                  {selectedCard.attack}
                </div>
                <div style={styles.fieldWrapper}>
                  <div style={styles.zoneTitle}>DEF:</div>
                  {selectedCard.defense}
                </div>
                <div style={styles.fieldWrapper}>
                  <div style={styles.zoneTitle}>Cost:</div>
                  {selectedCard.cost}
                </div>
                <div style={styles.fieldWrapper}>
                  <div style={styles.zoneTitle}>Effect:</div>
                  {selectedCard.description}
                </div>
              </div>
              <Button onClick={handleCloseModal}>キャンセル</Button>
              {isCardList && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddCardToDeck}
                >
                  デッキに追加
                </Button>
              )}
              {!isCardList && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteCardToDeck}
                >
                  デッキから削除
                </Button>
              )}
            </>
          )}
        </div>
      </Modal>
    </Grid>
  );
};

export default DeckEditingScreen;
