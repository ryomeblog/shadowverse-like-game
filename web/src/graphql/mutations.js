/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCard = /* GraphQL */ `
  mutation CreateCard($input: CardInput!) {
    createCard(input: $input) {
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
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer($input: PlayerInput!) {
    createPlayer(input: $input) {
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
export const createDeck = /* GraphQL */ `
  mutation CreateDeck($input: DeckInput!) {
    createDeck(input: $input) {
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
export const createMatchHistory = /* GraphQL */ `
  mutation CreateMatchHistory($input: MatchHistoryInput!) {
    createMatchHistory(input: $input) {
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
export const createMatchStatus = /* GraphQL */ `
  mutation CreateMatchStatus($input: MatchStatusInput!) {
    createMatchStatus(input: $input) {
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
export const updateCard = /* GraphQL */ `
  mutation UpdateCard($cardId: String!, $input: CardInput!) {
    updateCard(cardId: $cardId, input: $input) {
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
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer($input: PlayerInput!) {
    updatePlayer(input: $input) {
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
export const updateDeck = /* GraphQL */ `
  mutation UpdateDeck($deckId: String!, $input: DeckInput!) {
    updateDeck(deckId: $deckId, input: $input) {
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
export const updateMatchStatus = /* GraphQL */ `
  mutation UpdateMatchStatus(
    $matchStatusId: String!
    $input: UpdateMatchStatusInput!
  ) {
    updateMatchStatus(matchStatusId: $matchStatusId, input: $input) {
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
export const deleteCard = /* GraphQL */ `
  mutation DeleteCard($cardId: String!) {
    deleteCard(cardId: $cardId) {
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
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer {
    deletePlayer {
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
export const deleteDeck = /* GraphQL */ `
  mutation DeleteDeck($deckId: String!) {
    deleteDeck(deckId: $deckId) {
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
