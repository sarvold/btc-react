import React from "react";

export interface DescriptionListProps {
  items: {
    term: string;
    description: string;
  }[];
}

export const UiDescriptionList: React.FC<DescriptionListProps> = ({ items }: DescriptionListProps) => {
  return (
    <dl>
      {items.map((item) => (
        <React.Fragment key={Math.random()}>
          <dt>{item.term}:</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
};