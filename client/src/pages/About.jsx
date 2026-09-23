import PageMeta from "../components/ui/PageMeta";

function About() {
  return (
    <section className="page-intro">
      <PageMeta
        title="About TravelBharat"
        description="Learn how TravelBharat organises Indian states, destinations and practical travel information into one connected experience."
      />
      <div className="container narrow-content">
        <span className="section-kicker">About the project</span>
        <h1>TravelBharat is built around one simple idea.</h1>
        <p>
          Make exploring India easier by organising state, city and destination
          information into one connected travel experience.
        </p>
        <div className="about-grid">
          <article>
            <h2>What we're building</h2>
            <p>
              A scalable tourism information platform that connects states,
              destinations, categories and practical travel details.
            </p>
          </article>
          <article>
            <h2>How it works</h2>
            <p>
              A React client consumes a REST API backed by Express and MongoDB,
              while an authenticated admin workspace keeps destination content
              maintainable.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default About;