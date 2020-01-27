import React from 'react'
import CardRow from './CardRow';
export default function SubcategoryCards(props) {
  return (
    <div className="categorized-cards">
      {props.cardList.map((card) =>
        <CardRow
          card={card}
          category={props.category}
          onClick={props.onClick}
        />)}
    </div>
  );
}
