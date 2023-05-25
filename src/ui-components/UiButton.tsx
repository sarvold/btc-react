import React, { PropsWithChildren } from 'react';
import styles from './UiButton.module.css';

type ButtonProps = {
  onClick?: () => void;
};

const UiButton: React.FC<PropsWithChildren<ButtonProps>> = (
  props: PropsWithChildren<ButtonProps>
) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
export default UiButton;
