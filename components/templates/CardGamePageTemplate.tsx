import React, {FC} from 'react';
import PageTemplate from './PageTemplate';
import GameCardList from '../cardgame/GameCardList';

interface CardGamePageTemplateProps {}

const CardGamePageTemplate: FC<CardGamePageTemplateProps> = () => {
  return (
    <PageTemplate>
      <GameCardList />
    </PageTemplate>
  );
};

export default CardGamePageTemplate;
