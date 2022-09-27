import {Grid, styled} from '@mui/material';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {GameCardListItem} from '../templates/CardGamePageTemplate';
import GameCard from './GameCard';

interface GameCardListProps {
  onAddScore: () => void;
  onGameStageClear: () => void;
  disabled?: boolean;
  gameCardList: GameCardListItem[];
}

const Wrap = styled(Grid)`
  width: 100%;
  height: 100vh;

  display: Grid;
  grid-template-columns: repeat(4, 150px);
  grid-template-rows: repeat(4, 150px);
  gap: 20px 20px;
  justify-content: center;
  align-items: center;
`;

const GameCardList: FC<GameCardListProps> = ({
  gameCardList,
  onAddScore,
  onGameStageClear,
  disabled = false,
}) => {
  const [cardList, setCardList] = useState<GameCardListItem[]>(gameCardList);
  const [selectedCard, setSelectedCard] = useState<GameCardListItem[]>([]);

  const onClick = useCallback(
    (card: GameCardListItem) => {
      if (selectedCard.length > 0) {
        if (selectedCard[0].id === card.id) return;
      }

      setCardList((cardList) =>
        cardList.map((cardItem) => {
          if (cardItem.id === card.id) {
            return {...cardItem, isOpen: true};
          }
          return cardItem;
        }),
      );
      setSelectedCard((prev) => {
        return [...prev, card];
      });
    },
    [selectedCard],
  );

  useEffect(() => {
    setCardList(gameCardList);
  }, [gameCardList]);

  useEffect(() => {
    if (selectedCard.length !== 2) return;

    const sameCard = selectedCard[0].color === selectedCard[1].color;
    if (sameCard) {
      onAddScore();
    }
    setCardList((prev) =>
      prev.map((cardItem) => {
        if (
          cardItem.id === selectedCard[0].id ||
          cardItem.id === selectedCard[1].id
        ) {
          return {...cardItem, isFind: sameCard, isOpen: sameCard};
        }
        return cardItem;
      }),
    );
    setSelectedCard([]);
  }, [selectedCard, onAddScore]);

  useEffect(() => {
    if (cardList.length === 0) return;
    if (cardList.filter((cardItem) => !cardItem.isFind).length === 0) {
      onGameStageClear();
      return;
    }
  }, [cardList, onGameStageClear]);

  return (
    <Wrap>
      {cardList.map((cardItem, index) => (
        <GameCard
          key={`${cardItem.color}_${index}`}
          color={cardItem.color}
          onClick={() => {
            onClick(cardItem);
          }}
          isFind={cardItem.isFind}
          isOpen={cardItem.isOpen}
          disabled={disabled}
        />
      ))}
    </Wrap>
  );
};

export default React.memo(GameCardList);
