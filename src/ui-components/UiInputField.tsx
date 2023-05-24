import React from 'react';
import styles from './UiInputField.module.css';

export interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UiInputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }: InputFieldProps) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} type={type} value={value} onChange={onChange} />
    </div>
  );
};