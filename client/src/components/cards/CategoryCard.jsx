function CategoryCard({ category }) {
  return (
    <article className="category-card">
      <span className="category-card__icon" aria-hidden="true">{category.icon}</span>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
    </article>
  );
}

export default CategoryCard;
