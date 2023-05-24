import React from 'react';
import styles from './UiButton.module.css';

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const UiButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};
export default UiButton;