/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onMatchStatusUpdated = /* GraphQL */ `
  subscription OnMatchStatusUpdated($id: String!) {
    onMatchStatusUpdated(id: $id) {
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
