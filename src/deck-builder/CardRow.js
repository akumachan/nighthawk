export default function CardRow(props) {
  return (
    <p onClick={() => props.onClick(props.card)}>
      <strong>{props.card[props.category + 'Quantity']}</strong>
      <span>{props.card.name}</span>
    </p>
  );
}