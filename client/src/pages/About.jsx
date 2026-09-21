function About() {
  return (
    <section className="page-intro">
      <div className="container narrow-content">
        <span className="section-kicker">About the project</span>
        <h1>TravelBharat is built around one simple idea.</h1>
        <p>Make exploring India easier by organising state, city and destination information into one connected travel experience.</p>
        <div className="about-grid">
          <article><h2>What we're building</h2><p>A scalable tourism information platform that connects states, destinations, categories and practical travel details.</p></article>
          <article><h2>How it will grow</h2><p>The frontend foundation will connect to an Express API, MongoDB database and an admin content-management system in later phases.</p></article>
        </div>
      </div>
    </section>
  );
}

export default About;