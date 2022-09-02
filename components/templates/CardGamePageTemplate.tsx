import {Box, Grid, NoSsr, styled} from '@mui/material';
import React, {FC, useCallback, useEffect, useState} from 'react';
import DoubleSidedCard from '../molecules/DoubleSidedCard';
import GameCard from '../organisms/GameCard';
import PageTemplate from './PageTemplate';

interface CardGamePageTemplateProps {}

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

const colors = [
  '#B8F3B8',
  '#B8F3B8',
  '#FFDDA6',
  '#FFDDA6',
  '#A8C8F9',
  '#A8C8F9',
  '#CCD1FF',
  '#CCD1FF',
  '#FFCCCC',
  '#FFCCCC',
  '#FC9EBD',
  '#FC9EBD',
  '#EC2A23',
  '#EC2A23',
  '#033495',
  '#033495',
];

const mixedColors = [...colors].sort(() => 0.5 - Math.random());

const gameCardList = mixedColors.map((color, index) => ({
  id: `${index}_${color}`,
  color,
  isFind: false,
  isOpen: false,
}));

interface GameCardListItem {
  id: string;
  color: typeof colors[number];
  isFind: boolean;
  isOpen: boolean;
}

const CardGamePageTemplate: FC<CardGamePageTemplateProps> = () => {
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
    if (selectedCard.length !== 2) return;

    const sameCard = selectedCard[0].color === selectedCard[1].color;
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
  }, [selectedCard]);

  return (
    <PageTemplate>
      <NoSsr>
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
            />
          ))}
        </Wrap>
      </NoSsr>
    </PageTemplate>
  );
};

export default CardGamePageTemplate;
