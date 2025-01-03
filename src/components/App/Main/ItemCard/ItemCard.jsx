import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  // const handleCardClick = () => {
  //   // onCardClick(item);
  //   console.log("Card clicked:", item);
  //   setSelectedCard(item);
  //   setActiveModal("preview");
  // };
  console.log(item);
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={() => handleCardClick(item)}
        className="card__image"
        src={item.imageUrl}
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
