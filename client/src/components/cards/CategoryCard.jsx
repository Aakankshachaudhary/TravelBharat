import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  return (
    <Link
      className="category-card"
      to={`/search?category=${encodeURIComponent(category.name)}`}
    >
      <span className="category-card__icon" aria-hidden="true">
        {category.icon}
      </span>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <span className="category-card__link">Explore {category.name} →</span>
    </Link>
  );
}

export default CategoryCard;
