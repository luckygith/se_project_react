import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>

    // <section className="item-card">
    //   <p className="item-card__title"></p>
    //   <img src="" alt="" className="item-card__image" />
    // </section>
  );
}

export default ItemCard;
