import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <main>
        <section id="about" class="section scrollspy">
          <h3 class="page-title white-text teal">About</h3>
          <div class="container flow-text">
            <blockquote>
              <h2>
                Self motivated and driven Software Engineer with passion for
                thoughtful problem solving, reading & writing article.
              </h2>
            </blockquote>
            <p>
              Professional experience of building web application, proficient in
              back-end development. particularly the LAMP/LEMP stack. To work in
              a challenging atmosphere, which will provide me opportunities for
              learning and move forward in my career, where knowledge and hard
              work will make the positive contribution to the growth of the
              company.
            </p>
            <p>
              <strong>Current Focus</strong>:&nbsp;
              <a
                aria-label="Navigate to the Inclusive Design Patterns homepage"
                href="/"
              >
                Django
              </a>
              &nbsp;//&nbsp;
              <a
                aria-label="Navigate to the Full Stack React homepage"
                href="/"
              >
                React
              </a>
              &nbsp;//&nbsp;
              <a aria-label='Navigate to the article "Scalable CSS"' href="/">
                VueJS
              </a>
              &nbsp;//&nbsp;
              <a aria-label='Navigate to the article "Scalable CSS"' href="/">
                DevOps Tools
              </a>
              
            </p>
          </div>
        </section>
      </main>
    );
  }
}

export default About;
