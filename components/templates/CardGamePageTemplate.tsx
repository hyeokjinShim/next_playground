import React, {FC, useCallback, useEffect, useState} from 'react';
import PageTemplate from './PageTemplate';
import GameCardList from '../cardgame/GameCardList';
import GameScore from '../cardgame/GameScore';
import GameStartDialog from '../cardgame/GameStartDialog';

interface CardGamePageTemplateProps {}

export interface GameCardListItem {
  id: string;
  color: string;
  isFind: boolean;
  isOpen: boolean;
}

const getCardList = (): GameCardListItem[] => {
  const colors = [
    '#B8F3B8',
    '#FFDDA6',
    '#A8C8F9',
    '#CCD1FF',
    '#FFCCCC',
    '#FC9EBD',
    '#EC2A23',
    '#033495',
  ];

  const mixedColors = [...colors, ...colors].sort(() => 0.5 - Math.random());
  const gameCardList = mixedColors.map((color, index) => ({
    id: `${index}_${color}`,
    color,
    isFind: false,
    isOpen: false,
  }));
  return gameCardList;
};

const CardGamePageTemplate: FC<CardGamePageTemplateProps> = () => {
  const [score, setScore] = useState<number>(0);
  const [stage, setStage] = useState<number>(1);
  const [gameTime, setGameTime] = useState<number>(30);

  const [dialogState, setDialogState] = useState({
    open: false,
    gameStart: false,
    gameEnd: false,
  });

  const [gameCardList, setGameCardList] = useState<GameCardListItem[]>([]);

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
    setGameCardList(() => getCardList());
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
        gameCardList={gameCardList}
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

export default CardGamePageTemplate;
