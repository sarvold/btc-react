import React from 'react';
import UiButton from './UiButton';
import UiCard from './UiCard';
import classes from './UiErrorModal.module.css';

export interface ErrorModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
};

const UiErrorModal: React.FC<ErrorModalProps> = (props) => {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onConfirm}/>
      <UiCard className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <UiButton onClick={props.onConfirm}>Close</UiButton>
        </footer>
      </UiCard>
    </>
  );
};

export default UiErrorModal;
