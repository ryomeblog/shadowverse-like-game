import React, { useState, useEffect } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import {
  Modal,
  Button,
  Typography,
} from "@mui/material";
import PlayerInfo from "../components/PlayerInfo";
import Field from "../components/Field";
import Hand from "../components/Hand";
import { useParams } from "react-router-dom";
import { updateMatchStatus } from "../graphql/mutations";
import { getMatchStatus } from "../graphql/queries";
import { onMatchStatusUpdated } from "../graphql/subscriptions";
import { useNavigate } from "react-router-dom";

const styles = {
  moduleStyle: {
    padding: "20px",
    background: "white",
    borderRadius: "5px",
    width: "60%", // モーダルの幅を60%に設定
    position: "absolute", // 絶対位置を指定
    top: "50%", // 上から50%の位置に配置
    left: "50%", // 左から50%の位置に配置
    transform: "translate(-50%, -50%)", // 中央に配置するための調整
  }
}

const GameScreen = () => {
  const navigate = useNavigate();
  const { matchStatusId } = useParams();
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [p1orp2, setp1orp2] = useState("");
  const [recordFirstPlayerId, setRecordFirstPlayerId] = useState("");
  const [gameWinnerId, setGameWinnerId] = useState("");
  const [turnCnt, setTurnCnt] = useState(0);
  const [player, setPlayer] = useState({
    playerId: "",
    lp: 20,
    cost: 1,
    maxLp: 20,
    maxCost: 1,
    fieldCards: [],
    handCards: [],
    deckCards: [],
    discardCards: [],
  });
  const [opponent, setOpponent] = useState({
    playerId: "",
    lp: 20,
    cost: 1,
    maxLp: 20,
    maxCost: 1,
    fieldCards: [],
    handCards: [],
    deckCards: [],
    discardCards: [],
  });
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  const handToField = (index) => {
    // fieldCardsとhandCardsのコピーを作成
    const fieldCardsCopy = [...player.fieldCards];
    const handCardsCopy = [...player.handCards];
    const summonCost = handCardsCopy[index].cost;

    fieldCardsCopy.push(handCardsCopy[index]);
    handCardsCopy.splice(index, 1);

    const newPlayer = {
      ...player,
      cost: player.cost - summonCost,
      fieldCards: fieldCardsCopy,
      handCards: handCardsCopy,
    };

    setPlayer(newPlayer);

    API.graphql(
      graphqlOperation(updateMatchStatus, {
        matchStatusId: matchStatusId,
        input: changeFormatPlayerInfoToDb(
          newPlayer,
          opponent,
          turnCnt,
          gameWinnerId
        ),
      })
    );
  };

  const turnEnd = () => {
    if (opponent.deckCards.length === 0) {
      setGameWinnerId(player.playerId);
      API.graphql(
        graphqlOperation(updateMatchStatus, {
          matchStatusId: matchStatusId,
          input: changeFormatPlayerInfoToDb(
            player,
            opponent,
            turnCnt,
            player.playerId
          ),
        })
      );
      return;
    }

    const updatedFieldCards = opponent.fieldCards.map((card) => {
      return { ...card, attackStatus: true };
    });
    const updatedDeckCards = [...opponent.deckCards];
    const topDeckCard = updatedDeckCards.shift();
    const updatedHandCards = [...opponent.handCards, topDeckCard];
    const updatedTurnCnt = turnCnt + 1;
    const updatedMaxCost = opponent.maxCost + 1;
    const updatedCost = updatedMaxCost;

    const newOpponent = {
      ...opponent,
      fieldCards: updatedFieldCards,
      deckCards: updatedDeckCards,
      handCards: updatedHandCards,
      maxCost: updatedMaxCost,
      cost: updatedCost,
    };

    setOpponent(newOpponent);
    setTurnCnt(updatedTurnCnt);

    API.graphql(
      graphqlOperation(updateMatchStatus, {
        matchStatusId: matchStatusId,
        input: changeFormatPlayerInfoToDb(
          player,
          newOpponent,
          updatedTurnCnt,
          gameWinnerId
        ),
      })
    );
  };

  const damageCalculation = (attacker, defender = null) => {
    // プレイヤーへの攻撃
    if (!defender) {
      const opponentLp = opponent.lp - attacker.attack;
      const newOpponent = {
        ...opponent,
        lp: opponent.lp - attacker.attack,
      };
      setOpponent(newOpponent);
      setGameWinnerId(opponentLp <= 0 ? player.playerId : gameWinnerId);

      API.graphql(
        graphqlOperation(updateMatchStatus, {
          matchStatusId: matchStatusId,
          input: changeFormatPlayerInfoToDb(
            player,
            newOpponent,
            turnCnt,
            opponentLp <= 0 ? player.playerId : gameWinnerId
          ),
        })
      );
    } else {
      // フォロワーへの攻撃
      const newAttacker = { ...attacker };
      const newDefender = { ...defender };

      newDefender.attackStatus = false;
      newDefender.defense -= newAttacker.attack;
      newAttacker.defense -= newDefender.attack;

      let newPlayer = player;
      let newOpponent = opponent;

      // 攻撃者の処理
      if (newAttacker.defense <= 0) {
        newAttacker.defense = 0;
        newPlayer = {
          ...player,
          fieldCards: player.fieldCards.filter(
            (card) => card.id !== newAttacker.id
          ),
          discardCards: [...player.discardCards, newAttacker],
        };
        setPlayer(newPlayer);
      } else {
        newPlayer = {
          ...player,
          fieldCards: player.fieldCards.map((card) =>
            card.id === newAttacker.id ? newAttacker : card
          ),
        };
        setPlayer(newPlayer);
      }

      // 防御者の処理
      if (newDefender.defense <= 0) {
        newDefender.defense = 0;
        newOpponent = {
          ...opponent,
          fieldCards: opponent.fieldCards.filter(
            (card) => card.id !== newDefender.id
          ),
          discardCards: [...opponent.discardCards, newDefender],
        };
        setOpponent(newOpponent);
      } else {
        newOpponent = {
          ...opponent,
          fieldCards: opponent.fieldCards.map((card) =>
            card.id === newDefender.id ? newDefender : card
          ),
        };
        setOpponent(newOpponent);
      }

      API.graphql(
        graphqlOperation(updateMatchStatus, {
          matchStatusId: matchStatusId,
          input: changeFormatPlayerInfoToDb(
            newPlayer,
            newOpponent,
            turnCnt,
            gameWinnerId
          ),
        })
      );
    }
  };

  const inputDeckFormat = (deckCardsList) => {
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

  const formatPlayerInfo = (
    playerId,
    playerLp,
    playerCost,
    playerMaxLp,
    playerMaxCost,
    playerDeck,
    playerHand,
    playerDiscard,
    playerfield
  ) => {
    return {
      playerId: playerId,
      lp: playerLp,
      cost: playerCost,
      maxLp: playerMaxLp,
      maxCost: playerMaxCost,
      fieldCards: playerfield,
      handCards: playerHand,
      deckCards: playerDeck,
      discardCards: playerDiscard,
    };
  };

  const changeFormatPlayerInfoToDb = (
    newPlayer,
    newOpponent,
    newTurnCnt,
    newWinnerId
  ) => {
    let inputPlayerData = {};
    console.log("newPlayer.cost", newPlayer.cost);
    if (p1orp2 === "p1") {
      inputPlayerData = {
        player1Id: newPlayer.playerId,
        player1Lp: newPlayer.lp,
        player1Cost: newPlayer.cost,
        player1MaxLp: newPlayer.maxLp,
        player1MaxCost: newPlayer.maxCost,
        player1field: inputDeckFormat(newPlayer.fieldCards),
        player1Hand: inputDeckFormat(newPlayer.handCards),
        player1Deck: inputDeckFormat(newPlayer.deckCards),
        player1Discard: inputDeckFormat(newPlayer.discardCards),
        player2Id: newOpponent.playerId,
        player2Lp: newOpponent.lp,
        player2Cost: newOpponent.cost,
        player2MaxLp: newOpponent.maxLp,
        player2MaxCost: newOpponent.maxCost,
        player2field: inputDeckFormat(newOpponent.fieldCards),
        player2Hand: inputDeckFormat(newOpponent.handCards),
        player2Deck: inputDeckFormat(newOpponent.deckCards),
        player2Discard: inputDeckFormat(newOpponent.discardCards),
        turnCount: newTurnCnt,
        firstPlayerId: recordFirstPlayerId,
        winnerId: newWinnerId,
      };
    } else if (p1orp2 === "p2") {
      inputPlayerData = {
        player1Id: newOpponent.playerId,
        player1Lp: newOpponent.lp,
        player1Cost: newOpponent.cost,
        player1MaxLp: newOpponent.maxLp,
        player1MaxCost: newOpponent.maxCost,
        player1field: inputDeckFormat(newOpponent.fieldCards),
        player1Hand: inputDeckFormat(newOpponent.handCards),
        player1Deck: inputDeckFormat(newOpponent.deckCards),
        player1Discard: inputDeckFormat(newOpponent.discardCards),
        player2Id: newPlayer.playerId,
        player2Lp: newPlayer.lp,
        player2Cost: newPlayer.cost,
        player2MaxLp: newPlayer.maxLp,
        player2MaxCost: newPlayer.maxCost,
        player2field: inputDeckFormat(newPlayer.fieldCards),
        player2Hand: inputDeckFormat(newPlayer.handCards),
        player2Deck: inputDeckFormat(newPlayer.deckCards),
        player2Discard: inputDeckFormat(newPlayer.discardCards),
        turnCount: newTurnCnt,
        firstPlayerId: recordFirstPlayerId,
        winnerId: newWinnerId,
      };
    }
    return inputPlayerData;
  };

  const reflectionMatchStatusData = async (matchStatusData, usersub) => {
    try {
      console.log("matchStatusData", matchStatusData);
      const {
        player1Id,
        player1Lp,
        player1Cost,
        player1MaxLp,
        player1MaxCost,
        player1Deck,
        player1Hand,
        player1Discard,
        player1field,
        player2Id,
        player2Lp,
        player2Cost,
        player2MaxLp,
        player2MaxCost,
        player2Deck,
        player2Hand,
        player2Discard,
        player2field,
        turnCount,
        firstPlayerId,
        winnerId,
      } = matchStatusData;
      if (player1Id === usersub) {
        setPlayer({
          ...formatPlayerInfo(
            player1Id,
            player1Lp,
            player1Cost,
            player1MaxLp,
            player1MaxCost,
            player1Deck,
            player1Hand,
            player1Discard,
            player1field
          ),
        });
        setOpponent({
          ...formatPlayerInfo(
            player2Id,
            player2Lp,
            player2Cost,
            player2MaxLp,
            player2MaxCost,
            player2Deck,
            player2Hand,
            player2Discard,
            player2field
          ),
        });
        setp1orp2("p1");
      } else if (player2Id === usersub) {
        setPlayer({
          ...formatPlayerInfo(
            player2Id,
            player2Lp,
            player2Cost,
            player2MaxLp,
            player2MaxCost,
            player2Deck,
            player2Hand,
            player2Discard,
            player2field
          ),
        });
        setOpponent({
          ...formatPlayerInfo(
            player1Id,
            player1Lp,
            player1Cost,
            player1MaxLp,
            player1MaxCost,
            player1Deck,
            player1Hand,
            player1Discard,
            player1field
          ),
        });
        setp1orp2("p2");
      }
      setIsMyTurn(
        firstPlayerId === usersub ? turnCount % 2 === 1 : turnCount % 2 === 0
      );
      setTurnCnt(turnCount);
      setRecordFirstPlayerId(firstPlayerId);
      setGameWinnerId(winnerId);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  useEffect(() => {
    const getMatchStatusData = async (usersub) => {
      try {
        const matchStatusData = await API.graphql(
          graphqlOperation(getMatchStatus, {
            matchStatusId: matchStatusId,
          })
        );
        console.log("matchStatusData", matchStatusData);
        const {
          player1Id,
          player1Lp,
          player1Cost,
          player1MaxLp,
          player1MaxCost,
          player1Deck,
          player1Hand,
          player1Discard,
          player1field,
          player2Id,
          player2Lp,
          player2Cost,
          player2MaxLp,
          player2MaxCost,
          player2Deck,
          player2Hand,
          player2Discard,
          player2field,
          turnCount,
          firstPlayerId,
          winnerId,
        } = matchStatusData.data.getMatchStatus;
        if (player1Id === usersub) {
          setPlayer(
            formatPlayerInfo(
              player1Id,
              player1Lp,
              player1Cost,
              player1MaxLp,
              player1MaxCost,
              player1Deck,
              player1Hand,
              player1Discard,
              player1field
            )
          );
          setOpponent(
            formatPlayerInfo(
              player2Id,
              player2Lp,
              player2Cost,
              player2MaxLp,
              player2MaxCost,
              player2Deck,
              player2Hand,
              player2Discard,
              player2field
            )
          );
          setp1orp2("p1");
        } else if (player2Id === usersub) {
          setPlayer(
            formatPlayerInfo(
              player2Id,
              player2Lp,
              player2Cost,
              player2MaxLp,
              player2MaxCost,
              player2Deck,
              player2Hand,
              player2Discard,
              player2field
            )
          );
          setOpponent(
            formatPlayerInfo(
              player1Id,
              player1Lp,
              player1Cost,
              player1MaxLp,
              player1MaxCost,
              player1Deck,
              player1Hand,
              player1Discard,
              player1field
            )
          );
          setp1orp2("p2");
        }
        setIsMyTurn(
          firstPlayerId === usersub ? turnCount % 2 === 1 : turnCount % 2 === 0
        );
        setTurnCnt(turnCount);
        setRecordFirstPlayerId(firstPlayerId);
        setGameWinnerId(winnerId);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };

    const getCurrentUserId = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        return user.signInUserSession.idToken.payload.sub;
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    getCurrentUserId().then((usersub) => {
      getMatchStatusData(usersub);
    });

    const subscription = API.graphql(
      graphqlOperation(onMatchStatusUpdated, {
        id: matchStatusId,
      })
    ).subscribe({
      next: ({ provider, value }) => {
        getCurrentUserId().then((usersub) => {
          reflectionMatchStatusData(value.data.onMatchStatusUpdated, usersub);
        });
      },
      error: (error) => {
        console.error("Subscription error:", error);
      },
    });

    // useEffectのクリーンアップ関数
    // コンポーネントがアンマウントされたときに呼び出される
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (
      gameWinnerId &&
      (gameWinnerId === player.playerId || gameWinnerId === opponent.playerId)
    ) {
      setShowWinnerModal(true);
    }
  }, [gameWinnerId]);

  return (
    <div className="game-screen">
      <PlayerInfo
        player={player}
        opponent={opponent}
        turnCnt={turnCnt}
        isMyTurn={isMyTurn}
        turnEnd={turnEnd}
      />
      <Field
        cards={opponent.fieldCards}
        opponentCards={opponent.fieldCards}
        myField={false}
        isMyTurn={isMyTurn}
        damageCalculation={damageCalculation}
      />
      <Field
        cards={player.fieldCards}
        opponentCards={opponent.fieldCards}
        myField={true}
        isMyTurn={isMyTurn}
        damageCalculation={damageCalculation}
      />
      <Hand player={player} isMyTurn={isMyTurn} handToField={handToField} />

      {/* 勝敗モーダル */}
      <Modal open={showWinnerModal} onClose={() => {}}>
        <div
          style={styles.moduleStyle}
        >
          {gameWinnerId === player.playerId ? (
            <Typography variant="h5">You Win!</Typography>
          ) : (
            <Typography variant="h5">You Lose...</Typography>
          )}
          <Button onClick={() => navigate("/")}>Close</Button>
        </div>
      </Modal>
    </div>
  );
};

export default GameScreen;
