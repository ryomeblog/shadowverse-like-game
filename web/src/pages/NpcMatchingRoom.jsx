import React, { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import {
  Modal,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import DeckList from "../components/DeckList";
import defaultDeck from '../config/default.json';
import { useNavigate } from "react-router-dom";
import { createMatchStatus, updateMatchStatus } from "../graphql/mutations";
import { getDeck, getAllDeck } from "../graphql/queries";

const styles = {
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

const MatchingRoom = () => {
  const [isMatched, setIsMatched] = useState(false);
  const [matchStatusId, setMatchStatusId] = useState("");
  const [userSub, setUserSub] = useState("");
  const [isMatchingStarted, setIsMatchingStarted] = useState(false);
  const [decks, setDecks] = useState([]);
  const [deckCards, setDeckCards] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const fetchMatchStatus = async () => {
    try {      
      const myHand = deckCards.slice(0, 5);
      const myDeck = deckCards.slice(5);
      const p2Hand = inputDeck(defaultDeck).slice(0, 5);
      const p2Deck = inputDeck(defaultDeck).slice(5);
      const newMatchStatusData = await API.graphql(
        graphqlOperation(createMatchStatus, {
          input: {
            player1Lp: 20,
            player1Cost: 1,
            player1MaxLp: 20,
            player1MaxCost: 1,
            player1field: [],
            player1Hand: myHand,
            player1Deck: myDeck,
            player1Discard: [],
            player2Lp: 20,
            player2Cost: 1,
            player2MaxLp: 20,
            player2MaxCost: 1,
            player2field: [],
            player2Hand: p2Hand,
            player2Deck: p2Deck,
            player2Discard: [],
            turnCount: 1,
            winnerId: "",
          },
        })
      );
      const updateMatchStatusData = await API.graphql(
        graphqlOperation(updateMatchStatus, {
          matchStatusId: newMatchStatusData.data.createMatchStatus.id,
          input: {
            player1Id: userSub,
            player1Lp: 20,
            player1Cost: 1,
            player1MaxLp: 20,
            player1MaxCost: 1,
            player1field: [],
            player1Hand: myHand,
            player1Deck: myDeck,
            player1Discard: [],
            player2Id: 'Npc001',
            player2Lp: 20,
            player2Cost: 1,
            player2MaxLp: 20,
            player2MaxCost: 1,
            player2field: [],
            player2Hand: myHand,
            player2Deck: myDeck,
            player2Discard: [],
            turnCount: 1,
            firstPlayerId: userSub,
            winnerId: "",
          },
        })
      );
      setMatchStatusId(updateMatchStatusData.data.updateMatchStatus.id);
      setIsMatched(true);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  const startMatching = () => {
    if (deckCards) {
      setIsMatchingStarted(true); // マッチングを開始
      fetchMatchStatus();
    } else {
      console.error("Please select a deck before starting matching");
    }
  };

  const inputDeck = (deckCardsList) => {
    const inputDeckCards = [];
    for (const deckCard of deckCardsList) {
      inputDeckCards.push({
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
    return inputDeckCards;
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
      setDeckCards(inputDeck(deckData.data.getDeck.cards));
    } catch (error) {
      console.error("Error fetching cards", error);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  useEffect(() => {
    const getCurrentUserId = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUserSub(user.signInUserSession.idToken.payload.sub);
      } catch (error) {
        console.error("Error fetching user ID:", error);
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

    getCurrentUserId();
    fetchDecks();
  }, []);

  useEffect(() => {
    if (isMatched) {
      navigate(`/npcbattle/${matchStatusId}`);
    }
  }, [isMatched, navigate]);

  return (
    <>
      {!isMatchingStarted ? ( // マッチングが開始されていない場合、デッキ選択UIを表示
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
            style={{ marginBottom: "20px" }}
          >
            戻る
          </Button>
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
            <Button
              variant="contained"
              color="primary"
              onClick={startMatching}
              style={{ marginTop: "20px" }}
              disabled={!selectedDeckId}
            >
              デッキ選択
            </Button>
          </Typography>
          <br />
          <DeckList deck={deckCards} onCardClick={handleCardClick} />

          <Modal open={!!selectedCard} onClose={handleCloseModal}>
            <div style={styles.modalContent}>
              {selectedCard && (
                <>
                  <img src={selectedCard.imageUrl} alt="card" />
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
                </>
              )}
            </div>
          </Modal>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          マッチング中...
        </div>
      )}
    </>
  );
};

export default MatchingRoom;
