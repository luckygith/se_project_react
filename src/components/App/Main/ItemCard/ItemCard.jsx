import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  // const handleCardClick = () => {
  //   // onCardClick(item);
  //   console.log("Card clicked:", item);
  //   setSelectedCard(item);
  //   setActiveModal("preview");
  // };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        handleCardClick={handleCardClick}
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
