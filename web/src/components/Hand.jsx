import React, { useState } from "react";
import { Card, Popover, Button, Modal } from "@mui/material";

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
  handContainer: {
    display: "flex",
    justifyContent: "left",
    overflowX: "scroll", // 横スクロールを可能にする
    gap: "10px", // カード間のスペース
    flexWrap: "nowrap", // 追加: カードが横に並び続けるようにする
    minHeight: "110px", // 追加: カードの高さ + 余白
  },
  card: {
    width: "100px",
    height: "100px",
    position: "relative",
    flexShrink: 0,
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
  cancelButton: {
    marginTop: "20px", // 上部からのマージンを追加
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

const Hand = ({ player, isMyTurn, handToField }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (event, card, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedCard(card);
    setSelectedCardIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCard(null);
  };

  const handleSummon = () => {
    handToField(selectedCardIndex);
    handleClose();
  };

  const handleShowDetails = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={styles.fieldWrapper}>
      <div style={styles.zoneTitle}>手札</div>
      <div style={styles.handContainer}>
        {player.handCards.map((card, index) => (
          <Card
            key={index}
            variant="outlined"
            style={styles.card}
            onClick={(e) => handleClick(e, card, index)}
          >
            <img src={card.imageUrl} alt="card" style={styles.cardImage} />
            <div style={styles.costCircle}>{card.cost}</div>
            <div style={styles.cardName}>{card.cardname}</div>
            <div style={styles.cardOverlay}>
              {card.attack} / {card.defense}
            </div>
          </Card>
        ))}

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {isMyTurn && selectedCard && selectedCard.cost <= player.cost && (
            <Button onClick={handleSummon}>召喚</Button>
          )}
          <Button onClick={handleShowDetails}>詳細</Button>
          <Button onClick={handleClose}>キャンセル</Button>
        </Popover>

        <Modal open={showModal} onClose={handleCloseModal}>
          <div style={styles.modalContent}>
            {/* Example card details */}
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
                <Button style={styles.cancelButton} onClick={handleCloseModal}>
                  キャンセル
                </Button>
              </>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Hand;
