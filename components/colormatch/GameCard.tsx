import {Box, GridProps, styled} from '@mui/material';
import {useAnimation} from 'framer-motion';
import React, {FC, useCallback, useEffect} from 'react';

interface colorGameCard {
  index: number;
  size: string;
  answerIndex: number;
  answerBoardColor: string;
  boardColor: string;
  onAnswerClick: () => void;
  isGameEnd: boolean;
}

const Card = styled(Box)`
  margin: 2px;
`;

const GameCard: FC<colorGameCard> = ({
  onAnswerClick,
  index,
  answerIndex,
  size,
  answerBoardColor,
  boardColor,
  isGameEnd,
}) => {
  const onClick = useCallback((answer: boolean) => {
    console.log(isGameEnd);
    if (answer) {
      onAnswerClick();
    }
  }, []);

  return (
    <Card
      onClick={() => {
        onClick(index === answerIndex);
      }}
      role="button"
      style={{
        width: size,
        height: size,
        margin: '2px',
        backgroundColor: index === answerIndex ? answerBoardColor : boardColor,
      }}
    ></Card>
  );
};

export default React.memo(GameCard);
