import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { Container, Typography, Modal, Button } from "@mui/material";
import CardCreationForm from "../components/CardCreationForm";
import CardList from "../components/CardList";
import { createCard, deleteCard } from "../graphql/mutations";
import { getAllCard } from "../graphql/queries";
import { useNavigate } from "react-router-dom";

const styles = {
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  modalCardImage: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
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

const CardCreationScreen = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardCreate = async (card) => {
    setCards([...cards, card]);
    await API.graphql(
      graphqlOperation(createCard, {
        input: card,
      })
    );
  };

  const handleCardDelete = async () => {
    await API.graphql(
      graphqlOperation(deleteCard, {
        cardId: selectedCard.id,
      })
    );
    const cardData = await API.graphql(graphqlOperation(getAllCard));
    const cardList = cardData.data.getAllCard;
    setCards(cardList);
    setShowModal(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 初期化時にカード一覧を取得
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardData = await API.graphql(graphqlOperation(getAllCard));
        const cardList = cardData.data.getAllCard;
        setCards(cardList);
      } catch (error) {
        console.error("Error fetching cards", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <Container>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
        style={{ marginBottom: "20px" }}
      >
        戻る
      </Button>

      <Typography variant="h4">カード作成</Typography>
      <CardCreationForm onCardCreate={handleCardCreate} />

      <Typography variant="h5">カード一覧</Typography>
      <CardList cards={cards} onCardClick={handleCardClick} />

      <Modal open={showModal} onClose={handleCloseModal}>
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
              <Button
                variant="contained"
                color="error"
                onClick={handleCardDelete}
              >
                削除
              </Button>
            </>
          )}
        </div>
      </Modal>
    </Container>
  );
};

export default CardCreationScreen;
