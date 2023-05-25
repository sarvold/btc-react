import React, { PropsWithChildren } from 'react';
import classes from './UiCard.module.css';

interface CardProps {
  className: string;
}
const UiCard: React.FC<PropsWithChildren<CardProps>> = (
  props: PropsWithChildren<CardProps>
) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default UiCard;
