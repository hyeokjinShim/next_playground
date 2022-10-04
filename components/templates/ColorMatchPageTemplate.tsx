import React, {FC, useCallback, useEffect, useState, useMemo} from 'react';
import PageTemplate from './PageTemplate';
import GameCardList from '../colormatch/GameCardList';
import GameScore from '../cardgame/GameScore';
import GameStartDialog from '../cardgame/GameStartDialog';
import {getBoardItemSize, getColor} from '../colormatch/boardStyle';
import {width} from '@mui/system';
import {Grid, styled} from '@mui/material';

interface ColorMatchPageTemplateProps {}

const getLengthOfBoardRow = (stage: number): number =>
  Math.round((stage + 0.01) / 2) + 1;

const getAnswerIndex = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

const getNumOfBoardItems = (lengthOfBoardRow: number): number =>
  lengthOfBoardRow ** 2;

const ColorMatchPageTemplate: FC<ColorMatchPageTemplateProps> = () => {
  const [score, setScore] = useState<number>(0);
  const [stage, setStage] = useState<number>(1);
  const [gameTime, setGameTime] = useState<number>(30);

  const [dialogState, setDialogState] = useState({
    open: false,
    gameStart: false,
    gameEnd: false,
  });

  const lengthOfBoardRow = getLengthOfBoardRow(stage);
  const numOfBoardItems = getNumOfBoardItems(lengthOfBoardRow);

  const onAnswerClick = useCallback(() => {
    setStage((prevStage) => {
      return prevStage + 1;
    });
  }, []);

  const onAddScore = useCallback(() => {
    setScore((point) => point + 10);
  }, []);

  const onGameStageClear = useCallback(() => {
    setStage((prevStage) => {
      setGameTime((time) => time - 2 * prevStage);
      return prevStage + 1;
    });
    setDialogState({
      open: true,
      gameStart: false,
      gameEnd: false,
    });
  }, []);

  const onClose = useCallback(() => {
    setDialogState({
      open: false,
      gameStart: false,
      gameEnd: false,
    });
  }, []);

  const onGameStart = useCallback(() => {
    setDialogState({
      open: false,
      gameStart: true,
      gameEnd: false,
    });
    //setGameCardList(() => cardList());
  }, []);

  const onGameEnd = useCallback(() => {
    setDialogState({
      open: true,
      gameStart: false,
      gameEnd: true,
    });
    setGameTime(0);
  }, []);

  const onReGame = useCallback(() => {
    setScore(0);
    setGameTime(30);
    setStage(1);
    onGameStart();
  }, [onGameStart]);

  useEffect(() => {
    setDialogState((prev) => ({...prev, open: true}));
  }, []);

  return (
    <PageTemplate>
      <GameScore
        score={score}
        gameTime={gameTime}
        onGameEnd={onGameEnd}
        disabled={!dialogState.gameStart}
      />
      <GameCardList
        onAddScore={onAddScore}
        disabled={!dialogState.gameStart}
        onGameStageClear={onGameStageClear}
        onAnswerClick={onAnswerClick}
        stage={stage}
        numOfBoardItems={numOfBoardItems}
        lengthOfBoardRow={lengthOfBoardRow}
        isGameEnd={dialogState.gameEnd}
      />
      <GameStartDialog
        open={dialogState.open}
        onClose={onClose}
        onStart={onGameStart}
        onReGame={onReGame}
        isGameEnd={dialogState.gameEnd}
        score={score}
        stage={stage}
      />
    </PageTemplate>
  );
};

export default ColorMatchPageTemplate;
