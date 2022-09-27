import {Grid, Typography} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';

interface GameScoreProps {
  score: number;
  onGameEnd: () => void;
  disabled: boolean;
  gameTime: number;
}

const GameScore: FC<GameScoreProps> = ({
  score,
  gameTime,
  disabled,
  onGameEnd,
}) => {
  const [time, setTime] = useState<number>(gameTime);

  useEffect(() => {
    if (disabled) return;

    const timeFunc = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          return time;
        }

        return time - 1;
      });
    }, 1000);
    return () => clearInterval(timeFunc);
  }, [disabled]);

  useEffect(() => {
    if (time === 0) {
      onGameEnd();
    }
  }, [time]);

  useEffect(() => {
    setTime(gameTime);
  }, [gameTime]);

  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '50px',
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0 20px',
        }}
      >
        <Typography variant="h4">TIME</Typography>
        <Typography variant="h4">{time}</Typography>
      </Grid>
      <Grid
        sx={{
          width: '200px',
          height: '50px',
          borderRadius: '50px',
          backgroundColor: '#353535',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          gap: '0 10px',
          padding: '0 10px',
        }}
      >
        <Typography>SCORE</Typography>
        <Typography variant="h6">{score}</Typography>
      </Grid>
    </Grid>
  );
};

export default React.memo(GameScore);
