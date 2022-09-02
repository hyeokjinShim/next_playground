import CardVariants from '@/lib/contexts/animations/cardVariants';
import {Box, GridProps, styled} from '@mui/material';
import {useAnimation} from 'framer-motion';
import React, {FC, useCallback, useEffect, useState} from 'react';
import DoubleSidedCard, {
  DoubleSidedCardProps,
} from '../molecules/DoubleSidedCard';

interface GmaeCardProps extends GridProps {
  color: string;
  onClick: () => void;
  isFind: boolean;
  isOpen: boolean;
}

const Card = styled(Box)`
  width: 150px;
  height: 150px;
`;

const CardBack = styled(Card)`
  background-color: black;
`;

const CardFront = styled(Card)``;

const openAnimation: CardVariants = {
  open: {
    rotateY: [180, 0],
    transformStyle: 'preserve-3d',
    transition: {
      duration: 1,
    },
  },
  closed: {
    rotateY: [0, 180],
    transformStyle: 'preserve-3d',
    transition: {
      duration: 1,
    },
  },
};

const closeAnimation: CardVariants = {
  open: {
    rotateY: [0, 180],
    transformStyle: 'preserve-3d',
    transition: {
      duration: 1,
    },
  },
  closed: {
    rotateY: [180, 0],
    transformStyle: 'preserve-3d',
    transition: {
      duration: 1,
    },
  },
};

const GameCard: FC<GmaeCardProps> = ({
  color,
  onClick,
  isFind,
  isOpen,
  ...props
}) => {
  const controls = useAnimation();

  const onCardClick = useCallback(() => {
    onClick();
  }, [onClick]);

  useEffect(() => {
    isOpen ? controls.start('open') : controls.start('closed');
  }, [isOpen]);

  useEffect(() => {
    controls.start('open');
    const timeFunc = setTimeout(() => {
      controls.start('closed');
    }, 2000);

    return () => clearTimeout(timeFunc);
  }, []);

  return (
    <DoubleSidedCard
      cardBack={<CardBack />}
      cardFront={<CardFront sx={{backgroundColor: color}} />}
      onCardClick={onCardClick}
      controls={controls}
      openAnimation={openAnimation}
      closeAnimation={closeAnimation}
      sx={{
        visibility: isFind ? 'hidden' : 'visibility',
        transition: 'all 1000ms ease',
      }}
      {...props}
    />
  );
};

export default React.memo(GameCard);
