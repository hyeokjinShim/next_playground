import {Grid, styled} from '@mui/material';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {GameCardListItem} from '../templates/CardGamePageTemplate';
import GameCard from './GameCard';
import {getBoardItemSize, getColor} from '../colormatch/boardStyle';

interface GameCardListProps {
  onAddScore: () => void;
  onGameStageClear: () => void;
  onAnswerClick: () => void;
  disabled?: boolean;
  stage: number;
  numOfBoardItems: number;
  lengthOfBoardRow: number;
  isGameEnd: boolean;
}

const Wrap = styled(Grid)`
  width: 100%;
  height: 100vh;

  margin: auto;
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: center;
  //justify-content: space-around;
  max-width: 576px;
  max-height: 576px;
`;

const getAnswerIndex = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

const GameCardList: FC<GameCardListProps> = ({
  lengthOfBoardRow,
  numOfBoardItems,
  onAddScore,
  onGameStageClear,
  disabled = false,
  stage,
  onAnswerClick,
  isGameEnd,
}) => {
  const size = getBoardItemSize(lengthOfBoardRow);
  const answerIndex = getAnswerIndex(0, numOfBoardItems);
  const {boardColor, answerBoardColor} = getColor(stage);

  // const onClick = useCallback(
  //   (card: GameCardListItem) => {
  //     if (selectedCard.length > 0) {
  //       if (selectedCard[0].id === card.id) return;
  //     }

  //     setCardList((cardList) =>
  //       cardList.map((cardItem) => {
  //         if (cardItem.id === card.id) {
  //           return {...cardItem, isOpen: true};
  //         }
  //         return cardItem;
  //       }),
  //     );
  //     setSelectedCard((prev) => {
  //       return [...prev, card];
  //     });
  //   },
  //   [selectedCard],
  // );

  return (
    <Wrap>
      {isGameEnd}
      {Array.from({length: numOfBoardItems}, (_, i) => (
        <GameCard
          key={i}
          index={i}
          answerIndex={answerIndex}
          size={size}
          boardColor={boardColor}
          answerBoardColor={answerBoardColor}
          onAnswerClick={onAnswerClick}
          isGameEnd={isGameEnd}
        />
      ))}
    </Wrap>
  );
};

export default React.memo(GameCardList);
