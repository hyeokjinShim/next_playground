import {Grid, GridProps} from '@mui/material';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {AnimationControls, motion, useAnimation} from 'framer-motion';
import CardVariants from '@/lib/contexts/animations/cardVariants';

export interface DoubleSidedCardProps extends GridProps {
  cardFront: React.ReactNode;
  cardBack: React.ReactNode;
  controls?: AnimationControls;
  onCardClick?: () => void;
  openAnimation?: CardVariants;
  closeAnimation?: CardVariants;
  disabled?: boolean;
  initial?: 'open' | 'closed';
}

const openDefaultAnimation: CardVariants = {
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

const closeDefaultAnimation: CardVariants = {
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

const DoubleSidedCard: FC<DoubleSidedCardProps> = ({
  cardFront,
  cardBack,
  controls,
  onCardClick,
  className = 'doubleSidedCard',
  sx,
  openAnimation = openDefaultAnimation,
  closeAnimation = closeDefaultAnimation,
  disabled = false,
  initial = 'open',
  ...props
}) => {
  const defaultControls = !controls ? useAnimation() : controls;

  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const handleClick = useCallback(() => {
    !onCardClick ? setIsCardOpen((prev) => !prev) : onCardClick();
  }, [onCardClick]);

  //? 상위 컴포넌트에 정의된 controls가 없다면 해당 함수 실행
  useEffect(() => {
    if (controls !== undefined) return;
    isCardOpen
      ? defaultControls.start('open')
      : defaultControls.start('closed');
  }, [controls, isCardOpen]);

  return (
    <Grid
      onClick={handleClick}
      className={className}
      component={motion.div}
      animate={controls}
      initial={initial}
      sx={{
        position: 'relative',
        cursor: disabled ? 'initial' : 'pointer',
        ...sx,
      }}
    >
      <Grid
        component={motion.div}
        variants={openAnimation}
        className="cardFront"
        sx={{
          backfaceVisibility: 'hidden',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
      >
        {cardFront}
      </Grid>

      <Grid
        component={motion.div}
        variants={closeAnimation}
        className="cardBack"
        sx={{
          backfaceVisibility: 'hidden',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
      >
        {cardBack}
      </Grid>
    </Grid>
  );
};

export default DoubleSidedCard;
