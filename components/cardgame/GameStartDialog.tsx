import {
  Box,
  Button,
  Dialog,
  DialogProps,
  Grid,
  Typography,
} from '@mui/material';
import React, {FC} from 'react';

interface GameStartDialogProps extends DialogProps {
  onStart: () => void;
  onReGame: () => void;
  onClose: () => void;
  isGameEnd: boolean;
  score: number;
  stage: number;
}

const GameStartDialog: FC<GameStartDialogProps> = ({
  open,
  onClose,
  onStart,
  onReGame,
  isGameEnd,
  score,
  stage,
  ...props
}) => {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === 'backdropClick') return;
        onClose();
      }}
      {...props}
    >
      <Grid
        sx={{
          padding: '30px',
          width: '300px',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Box sx={{display: 'flex', alignItems: 'center', gap: '0 20px'}}>
            <Typography variant="subtitle1">STAGE</Typography>
            <Typography variant="subtitle1">{stage}</Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', gap: '0 20px'}}>
            <Typography variant="h6">
              {isGameEnd ? 'Score' : 'Current Score'}
            </Typography>
            <Typography variant="h6">{score}</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px 0',
          }}
        >
          {isGameEnd ? (
            <Button
              onClick={onReGame}
              variant="contained"
              size="large"
              color="primary"
              fullWidth
            >
              ReStart
            </Button>
          ) : (
            <Button
              onClick={onStart}
              variant="contained"
              size="large"
              color="primary"
              fullWidth
            >
              Start
            </Button>
          )}
          <Button
            onClick={onClose}
            variant="contained"
            size="large"
            color="error"
            fullWidth
          >
            FINISH
          </Button>
        </Box>
      </Grid>
    </Dialog>
  );
};

export default React.memo(GameStartDialog);
