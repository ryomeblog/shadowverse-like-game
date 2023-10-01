/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCard = /* GraphQL */ `
  query GetCard($cardId: String!) {
    getCard(cardId: $cardId) {
      id
      type
      cardname
      cardType
      cost
      attack
      attackStatus
      defense
      description
      effectType
      imageUrl
      __typename
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer {
    getPlayer {
      id
      type
      username
      exp
      level
      ownedCards {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      ownedDecks {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      __typename
    }
  }
`;
export const getDeck = /* GraphQL */ `
  query GetDeck($deckId: String!) {
    getDeck(deckId: $deckId) {
      id
      type
      deckname
      playerId
      cards {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      __typename
    }
  }
`;
export const getMatchHistory = /* GraphQL */ `
  query GetMatchHistory($matchHistoryId: String!) {
    getMatchHistory(matchHistoryId: $matchHistoryId) {
      id
      type
      player1Id
      player1Deck {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player2Id
      player2Deck {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      turnCount
      firstPlayerId
      winnerId
      matchDate
      __typename
    }
  }
`;
export const getMatchStatus = /* GraphQL */ `
  query GetMatchStatus($matchStatusId: String!) {
    getMatchStatus(matchStatusId: $matchStatusId) {
      id
      type
      player1Id
      player1Lp
      player1Cost
      player1MaxLp
      player1MaxCost
      player1field {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player1Hand {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player1Deck {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player1Discard {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player2Id
      player2Lp
      player2Cost
      player2MaxLp
      player2MaxCost
      player2field {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player2Hand {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player2Deck {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player2Discard {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      turnCount
      firstPlayerId
      winnerId
      matchDate
      __typename
    }
  }
`;
export const getAllCard = /* GraphQL */ `
  query GetAllCard {
    getAllCard {
      id
      type
      cardname
      cardType
      cost
      attack
      attackStatus
      defense
      description
      effectType
      imageUrl
      __typename
    }
  }
`;
export const getAllPlayer = /* GraphQL */ `
  query GetAllPlayer {
    getAllPlayer {
      id
      type
      username
      exp
      level
      ownedCards {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      ownedDecks {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      __typename
    }
  }
`;
export const getAllDeck = /* GraphQL */ `
  query GetAllDeck {
    getAllDeck {
      id
      type
      deckname
      playerId
      cards {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      __typename
    }
  }
`;
export const getAllMatchHistory = /* GraphQL */ `
  query GetAllMatchHistory {
    getAllMatchHistory {
      id
      type
      player1Id
      player1Deck {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player2Id
      player2Deck {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      turnCount
      firstPlayerId
      winnerId
      matchDate
      __typename
    }
  }
`;
export const getAllMatchStatus = /* GraphQL */ `
  query GetAllMatchStatus {
    getAllMatchStatus {
      id
      type
      player1Id
      player1Lp
      player1Cost
      player1MaxLp
      player1MaxCost
      player1field {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player1Hand {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player1Deck {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player1Discard {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player2Id
      player2Lp
      player2Cost
      player2MaxLp
      player2MaxCost
      player2field {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player2Hand {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player2Deck {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      player2Discard {
        id
        type
        cardname
        cardType
        cost
        attack
        attackStatus
        defense
        description
        effectType
        imageUrl
        __typename
      }
      turnCount
      firstPlayerId
      winnerId
      matchDate
      __typename
    }
  }
`;
