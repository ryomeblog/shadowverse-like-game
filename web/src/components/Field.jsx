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
  fieldContainer: {
    display: "flex", // これにより子要素が横方向に並びます
    justifyContent: "left", // カードを中央寄せにする
    gap: "10px", // カード間のスペース
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
  cardSlot: {
    position: "relative",
    width: "100px",
    height: "100px",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
  costCircle: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "20px",
    height: "20px",
    borderRadius: "50%", // これにより円形になります
    backgroundColor: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "15px", // フォントサイズを小さくして円の中に収めます
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
  noCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: "15px",
    color: "gray",
  },
  modalFieldContainer: {
    justifyContent: "center", // カードを中央寄せにする
  },
  modalContent: {
    position: "absolute",
    top: "10%",
    left: "20%",
    right: "20%",
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // 任意の影を追加
    outline: "none",
  },
  modalCardImage: {
    width: "100px",
    height: "100px",
    whiteSpace: "nowrap", // 改行を防ぐ
    overflow: "hidden", // 要素の外部にはみ出さないようにする
    textOverflow: "ellipsis", // はみ出したテキストを省略記号で表示
  },
  modalCardInfoImage: {
    width: "200px",
    height: "200px",
    whiteSpace: "nowrap", // 改行を防ぐ
    overflow: "hidden", // 要素の外部にはみ出さないようにする
    textOverflow: "ellipsis", // はみ出したテキストを省略記号で表示
  },
};

const Field = ({
  cards,
  opponentCards,
  myField,
  isMyTurn,
  damageCalculation,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [showAttackModal, setShowAttackModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTargetIndex, setSelectedTargetIndex] = useState(-1);

  const handleClick = (event, card, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedCard(card);
    setSelectedCardIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCard(null);
    setSelectedCardIndex(-1);
  };

  const handleAttack = () => {
    setShowAttackModal(true);
  };

  const handleShowDetails = () => {
    setShowDetailModal(true);
  };

  const handleCloseAttackModal = () => {
    setShowAttackModal(false);
    handleClose();
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const handleNextTarget = () => {
    if (selectedTargetIndex < opponentCards.length - 1) {
      setSelectedTargetIndex(selectedTargetIndex + 1);
    }
  };

  const handlePrevTarget = () => {
    if (selectedTargetIndex > -1) {
      setSelectedTargetIndex(selectedTargetIndex - 1);
    }
  };

  const handleAttackTargetConfirm = () => {
    setSelectedTargetIndex(-1);
    handleCloseAttackModal();
    handleClose();
    if (selectedTargetIndex === -1) {
      damageCalculation(selectedCard, selectedCardIndex);
    } else {
      damageCalculation(
        selectedCard,
        selectedCardIndex,
        opponentCards[selectedTargetIndex],
        selectedTargetIndex
      );
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={styles.fieldWrapper}>
      <div style={styles.zoneTitle}>
        {myField ? "自分のフィールド" : "相手フィールド"}
      </div>
      <div style={styles.fieldContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            key={index}
            variant="outlined"
            style={styles.cardSlot}
            onClick={
              cards[index] ? (e) => handleClick(e, cards[index], index) : null
            }
          >
            {cards[index] ? (
              <div className="card-content">
                <img
                  src={cards[index].imageUrl}
                  alt="card"
                  style={styles.cardImage}
                />
                <div style={styles.cardOverlay}>
                  {cards[index].attack} / {cards[index].defense}
                </div>
                <div style={styles.costCircle}>{cards[index].cost}</div>
                <div style={styles.cardName}>{cards[index].cardname}</div>
              </div>
            ) : (
              <div style={styles.noCard}>No Card</div>
            )}
          </Card>
        ))}
      </div>

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
        {isMyTurn && myField && selectedCard?.attackStatus && (
          <Button onClick={handleAttack}>攻撃</Button>
        )}
        <Button onClick={handleShowDetails}>詳細</Button>
        <Button onClick={handleClose}>キャンセル</Button>
      </Popover>

      <Modal open={showAttackModal} onClose={handleCloseAttackModal}>
        <div style={styles.modalContent}>
          <h4>攻撃対象を選択:</h4>
          <div style={styles.modalFieldContainer}>
            {selectedTargetIndex === -1 ? (
              <>
                <h2>相手プレイヤー</h2>
                <img
                  src="/img/player.png"
                  alt="card"
                  style={styles.modalCardImage}
                />
              </>
            ) : (
              <>
                {opponentCards.length !== 0 && (
                  <>
                    <img
                      src={opponentCards[selectedTargetIndex].imageUrl}
                      alt="card"
                      style={styles.modalCardImage}
                    />

                    <div style={styles.fieldWrapper}>
                      <div style={styles.zoneTitle}>
                        {opponentCards[selectedTargetIndex].cardname}
                      </div>

                      <div style={styles.fieldWrapper}>
                        <div style={styles.zoneTitle}>ATK:</div>
                        {opponentCards[selectedTargetIndex].attack}
                      </div>

                      <div style={styles.fieldWrapper}>
                        <div style={styles.zoneTitle}>DEF:</div>
                        {opponentCards[selectedTargetIndex].defense}
                      </div>

                      <div style={styles.fieldWrapper}>
                        <div style={styles.zoneTitle}>Cost:</div>
                        {opponentCards[selectedTargetIndex].cost}
                      </div>

                      <div style={styles.fieldWrapper}>
                        <div style={styles.zoneTitle}>Effect:</div>
                        {opponentCards[selectedTargetIndex].description}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div>
            <Button
              onClick={handlePrevTarget}
              disabled={selectedTargetIndex <= -1}
            >
              ＜
            </Button>
            <Button
              onClick={handleNextTarget}
              disabled={opponentCards.length - 1 <= selectedTargetIndex}
            >
              ＞
            </Button>
          </div>
          <Button onClick={handleAttackTargetConfirm}>攻撃</Button>
          <Button onClick={handleCloseAttackModal}>キャンセル</Button>
        </div>
      </Modal>

      <Modal open={showDetailModal} onClose={handleCloseDetailModal}>
        <div style={styles.modalContent}>
          {/* Example card details */}
          {selectedCard && (
            <>
              <img
                style={styles.modalCardInfoImage}
                src={selectedCard.imageUrl}
                alt="card"
              />
              <h3>{selectedCard.cardname}</h3>
              <p>
                ATK: {selectedCard.attack} / DEF: {selectedCard.defense}
              </p>
              <p>Cost: {selectedCard.cost}</p>
              <Button onClick={handleCloseDetailModal}>キャンセル</Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Field;
