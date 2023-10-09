const CardEffect = (status, card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
    if (status === 'endphase') {
        let afterEffect = {
            card,
            cardIndex,
            targetCard,
            targetIndex,
            player,
            opponent,
            turnCnt,
            gameWinnerId
        };
        for (const [index, fieldCard] of afterEffect.player.fieldCards.entries()) {
            console.log('fieldCard', fieldCard);
            afterEffect = effectPlay(status, fieldCard, index, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId);
        }
        return afterEffect;
    } else if (cardEffectPlay.hasOwnProperty(card.id)) {
        console.log('card', card);
        return cardEffectPlay[card.id][status](card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId);
    }
    return {
        card,
        cardIndex,
        targetCard,
        targetIndex,
        player,
        opponent,
        turnCnt,
        gameWinnerId
    };
};

const effectPlay = (status, card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
    if (cardEffectPlay.hasOwnProperty(card.id)) {
        return cardEffectPlay[card.id][status](card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId);
    }
    return {
        card,
        cardIndex,
        targetCard,
        targetIndex,
        player,
        opponent,
        turnCnt,
        gameWinnerId
    };
};

/** 
 * cardEffectPlay
 * 
 * 詳細：カード効果処理を管理するオブジェクト
 * 
 * オブジェクト詳細：
 * - カードID
 *   - summon: 召喚時に処理を行う関数
 *   - battle: 攻撃時に処理を行う関数
 *   - endphase: エンドフェイズ時に処理を行う関数
 * 
 * 各関数の引数詳細
 * - card: カードオブジェクトがリクエストとして送られてくる
 *   - id: カードID
 *   - attack: カードの攻撃力
 *   - attackStatus: 攻撃可能かどうか
 *   - cardType: カードのタイプ（follower, spell, amulet）
 *   - cardname: カード名称
 *   - cost: カードコスト
 *   - defense: カードの防御力
 *   - description: カードの効果説明
 *   - effectType: カード効果のタイプ（attack, heal, resource
 *   - imageUrl: カード画像パス
 *   - type: 「Card」固定
 * - cardIndex: 引数のcardがplayer.fieldCardsの何番目に存在するか（存在しない場合は-1）
 * - targetCard: 対象となる相手カード（中身はcardと同じ、存在しない場合はnull）
 * - targetIndex: 引数のtargetCardがopponent.fieldCardsの何番目に存在するか（存在しない場合は-1）
 * - player: プレイヤーの情報
 *   - playerId: プレイヤーのID
 *   - lp: プレイヤーの現在ライフポイント
 *   - cost: プレイヤーの現在コスト
 *   - maxLp: プレイヤーの最大ライフポイント
 *   - maxCost: プレイヤーの最大コスト
 *   - fieldCards: プレイヤーのフィールド上のカード（中身はcardと同じ）
 *   - handCards: プレイヤーの手札のカード（中身はcardと同じ）
 *   - deckCards: プレイヤーのデッキのカード（中身はcardと同じ）
 *   - discardCards: プレイヤーの捨て札のカード（中身はcardと同じ）
 * - opponent: 相手プレイヤー情報（中身はplayerと同じ）
 * - turnCnt: 現在のターン数
 * - gameWinnerId: ゲーム勝者のプレイヤーID（これにプレイヤーIDを入れて返却するとそのIDのプレイヤーがゲームの勝者となる）
*/
const cardEffectPlay = {
    '01HC5QW56JXQ8NXCNM1B26YN4W': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5QXN9YC6ZYSJD63J53AJ79': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newDecksAndHands = deckToHand(player.deckCards, player.handCards);
            const newPlayer = {
                ...player,
                deckCards: newDecksAndHands.decks,
                handCards: newDecksAndHands.hands
            }
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayer,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5R9GVZR464N6DRG8GWV4PH': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC7GYVDS363CF208BQ3Y2WPP': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newPlayerAndWinId = lpControl(player, -10, opponent.playerId, gameWinnerId);
            if (newPlayerAndWinId.gameWinnerId) {
                return {
                    card,
                    cardIndex,
                    targetCard,
                    targetIndex,
                    player: newPlayerAndWinId.player,
                    opponent,
                    turnCnt,
                    gameWinnerId: newPlayerAndWinId.gameWinnerId
                };
            }

            const newOpponentAndWinId = lpControl(opponent, -10, player.playerId, gameWinnerId);
            if (newPlayerAndWinId.gameWinnerId) {
                return {
                    card,
                    cardIndex,
                    targetCard,
                    targetIndex,
                    player: newPlayerAndWinId.player,
                    opponent: newOpponentAndWinId.player,
                    turnCnt,
                    gameWinnerId: newOpponentAndWinId.gameWinnerId
                };
            }
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayerAndWinId.player,
                opponent: newOpponentAndWinId.player,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5RVHNDHT9PD56JFN4QKSJV': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5RWVE2T1791VPXWH8N3ZR9': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5RY8XJT3YRDPH0FX23KJK7': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newPlayerAndWinId = lpControl(player, 1, opponent.playerId, gameWinnerId);
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayerAndWinId.player,
                opponent,
                turnCnt,
                gameWinnerId: newPlayerAndWinId.gameWinnerId
            };
        }
    },
    '01HC5S06VFRJ6D55TT62VGTW6S': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5S2PBWJTSME8HRHETFYC1X': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newDecksAndHands = deckToHand(player.deckCards, player.handCards);
            const newPlayer = {
                ...player,
                deckCards: newDecksAndHands.decks,
                handCards: newDecksAndHands.hands
            }
            console.log('newPlayer', newPlayer);
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayer,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5S41MK3SF1BA27NBFC3Z4J': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newDecksAndHands = deckToHand(player.deckCards, player.handCards);
            const newPlayer = {
                ...player,
                deckCards: newDecksAndHands.decks,
                handCards: newDecksAndHands.hands
            }
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayer,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5S4XVGS4VR01SMHN3PGG3T': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newDecksAndHands = deckToHand(player.deckCards, player.handCards);
            const newPlayer = {
                ...player,
                deckCards: newDecksAndHands.decks,
                handCards: newDecksAndHands.hands
            }
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayer,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5S6DD9BC7H6FT9K4ZHDQB8': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5S7TT5KSRX3V59EC3QN1PS': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newPlayerAndWinId = lpControl(player, -2, opponent.playerId, gameWinnerId);
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayerAndWinId.player,
                opponent,
                turnCnt,
                gameWinnerId: newPlayerAndWinId.gameWinnerId
            };
        }
    },
    '01HC5S95FNC6QWMQ8HP80GXN90': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newPlayerAndWinId = lpControl(player, -10, opponent.playerId, gameWinnerId);
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayerAndWinId.player,
                opponent,
                turnCnt,
                gameWinnerId: newPlayerAndWinId.gameWinnerId
            };
        }
    },
    '01HC5SBXF3NHT0H0M188PZB7WB': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newPlayerAndWinId = lpControl(player, 1, opponent.playerId, gameWinnerId);
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayerAndWinId.player,
                opponent,
                turnCnt,
                gameWinnerId: newPlayerAndWinId.gameWinnerId
            };
        }
    },
    '01HC5SEWGBHQZFRP3ZM4DQE57C': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const fieldsAndDiscards = followerAllDefenseControl(player.fieldCards, player.discardCards, -2);
            const newPlayer = {
                ...player,
                fieldCards: fieldsAndDiscards.fields,
                discardCards: fieldsAndDiscards.discards
            }
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayer,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5TD9JG6W3EDZQYK9CFN32D': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newPlayerAndWinId = lpControl(player, 2, opponent.playerId, gameWinnerId);
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayerAndWinId.player,
                opponent,
                turnCnt,
                gameWinnerId: newPlayerAndWinId.gameWinnerId
            };
        }
    },
    '01HC5TTSA6WK80RVRG8F0H3VTA': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newFields = followerAllAttackStatusControl(player.fieldCards, true);
            const newPlayer = {
                ...player,
                fieldCards: newFields.fields
            }
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayer,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5TZ8YF2N7EY27WP1V54TH3': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newPlayerAndWinId = lpControl(player, -5, opponent.playerId, gameWinnerId);
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayerAndWinId.player,
                opponent,
                turnCnt,
                gameWinnerId: newPlayerAndWinId.gameWinnerId
            };
        }
    },
    '01HC5V29M99MP9CT0MYKF5V5XF': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            player.cost += 1;
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5V5AXEVQF31Y1VFYVQGQMP': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const fieldsAndDiscards = followerAllDefenseControl(opponent.fieldCards, opponent.discardCards, -1);
            const newOpponent = {
                ...opponent,
                fieldCards: fieldsAndDiscards.fields,
                discardCards: fieldsAndDiscards.discards
            }
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent: newOpponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5VDATZX8NFPME5Q0C1PEQS': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const fieldsAndDiscards = followerAllDefenseControl(opponent.fieldCards, opponent.discardCards, -3);
            const newOpponent = {
                ...opponent,
                fieldCards: fieldsAndDiscards.fields,
                discardCards: fieldsAndDiscards.discards
            }
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent: newOpponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5VENNF0EH3VNBQ5FYSYK6T': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            let newOpponent = opponent;
            if (targetCard) {
                newOpponent = followerKill(opponent.fieldCards, opponent.discardCards, targetIndex);
            }
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent: newOpponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5VMHK65TRWWRC4B9MZAK18': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            card.attack += 1;
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5WB8EJXNMMZRSM77XP8RMG': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            player.fieldCards.forEach((card, index) => {
                card.attack += 1;
            });
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5WGEE52P1Z414XJPHFP3PM': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            card.defense += 1;
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5WPHNAJP84G3DP5JPME7EN': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            player.fieldCards.forEach((card, index) => {
                card.attack += 1;
                card.defense += 1;
            });
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5WRNWXHQEP88JAR5S9WZT9': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            let playerKillArr = [];
            let opponentKillArr = [];
            for (const [index, fieldCard] of player.fieldCards.entries()) {
                if (5 <= fieldCard.cost) {
                    playerKillArr.push(index);
                }
            }
            for (const [index, fieldCard] of opponent.fieldCards.entries()) {
                if (5 <= fieldCard.cost) {
                    opponentKillArr.push(index);
                }
            }
            const playerFieldsAndDiscards = followerAllKill(player.fieldCards, player.discards, playerKillArr);
            const newPlayer = {
                ...player,
                fieldCards: playerFieldsAndDiscards.fields,
                discardCards: playerFieldsAndDiscards.discards
            };
            const opponentFieldsAndDiscards = followerAllKill(opponent.fieldCards, opponent.discards, opponentKillArr);
            const newOpponent = {
                ...opponent,
                fieldCards: opponentFieldsAndDiscards.fields,
                discardCards: opponentFieldsAndDiscards.discards
            };

            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayer,
                opponent: newOpponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5WW1RW1TDEGK8ZFWTZPA1K': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newPlayerAndWinId = lpControl(opponent, -10, player.playerId, gameWinnerId);
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent: newPlayerAndWinId.player,
                turnCnt,
                gameWinnerId: newPlayerAndWinId.gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newPlayerAndWinId = lpControl(player, -5, opponent.playerId, gameWinnerId);
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayerAndWinId.player,
                opponent,
                turnCnt,
                gameWinnerId: newPlayerAndWinId.gameWinnerId
            };
        }
    },
    '01HC5WXQ5EMS5BAMRA2WDVY175': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const newPlayerAndWinId = lpControl(player, -5, opponent.playerId, gameWinnerId);
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayerAndWinId.player,
                opponent,
                turnCnt,
                gameWinnerId: newPlayerAndWinId.gameWinnerId
            };
        }
    },
    '01HC5WZJ5ARA0SGZNHHNG14610': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            player.maxLp += 10;
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5X12EC3QBKJ6ZJGWHAF30B': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            const discardCards = [...player.handCards, ...player.discardCards];
            const newPlayer = {
                ...player,
                handCards: [],
                discardCards: discardCards
            }
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player: newPlayer,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
    '01HC5X6G8YAXNZDHY35QZYXRXV': {
        summon: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            gameWinnerId = player.playerId;
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        battle: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        },
        endphase: (card, cardIndex, targetCard, targetIndex, player, opponent, turnCnt, gameWinnerId) => {
            return {
                card,
                cardIndex,
                targetCard,
                targetIndex,
                player,
                opponent,
                turnCnt,
                gameWinnerId
            };
        }
    },
};

const deckToHand = (decks, hands) => {
    if (1 <= decks.length) {
        const card = decks.shift(); // decksの0番目の要素を取り出して削除
        hands.push(card);          // handsにその要素を追加
    }
    return {
        decks: decks,
        hands: hands
    };
};

const lpControl = (player, point, opponentPlayerId, gameWinnerId) => {
    player.lp += point;
    if (player.lp <= 0) {
        return {
            player: player,
            gameWinnerId: opponentPlayerId
        };
    }
    return {
        player: player,
        gameWinnerId: gameWinnerId
    };
};

const followerKill = (fields, discards, index) => {
    fields[index].defense = 0;
    const discardedCard = fields.splice(index, 1)[0]; // fieldsから指定されたインデックスのカードを削除し、そのカードを取得
    discards.push(discardedCard);                     // discardsにそのカードを追加
    return {
        fields,
        discards
    }
};

const followerAllKill = (fields, discards, indices) => {
    if (!Array.isArray(indices)) {
        indices = [indices]; // indexが配列でない場合、配列に変換
    }

    // 高いインデックスから低いインデックスの順にソート
    indices.sort((a, b) => b - a);

    indices.forEach(index => {
        fields[index].defense = 0;
        const discardedCard = fields.splice(index, 1)[0];
        discards.push(discardedCard);
    });

    return {
        fields,
        discards
    }
};


const followerDefenseControl = (fields, discards, point, index) => {
    fields[index].defense += point;

    if (fields[index].defense <= 0) {
        const discardedCard = fields.splice(index, 1)[0]; // fieldsから指定されたインデックスのカードを削除し、そのカードを取得
        discards.push(discardedCard);                     // discardsにそのカードを追加
    }
    return {
        fields,
        discards
    }
};

const followerAllDefenseControl = (fields, discards, point) => {
    const indicesToRemove = []; // 削除する要素のインデックスを保存するための配列

    fields.forEach((card, index) => {
        card.defense += point;
        if (card.defense <= 0) {
            indicesToRemove.push(index);
            discards.push(card);
        }
    });

    // 高いインデックスから低いインデックスの順に要素を削除
    for (let i = indicesToRemove.length - 1; i >= 0; i--) {
        fields.splice(indicesToRemove[i], 1);
    }
    return {
        fields,
        discards
    }
};

const followerAllAttackStatusControl = (fields, attackStatus) => {
    fields.forEach((card, index) => {
        card.attackStatus = attackStatus;
    });
    return {
        fields
    }
};


export default CardEffect;