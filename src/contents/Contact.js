import React, { Component } from "react";
import Social from "../components/Social";

class Contact extends Component {
  render() {
    return (
      <main>
        <section id="contact" class="section scrollspy full-height">
          <h3 class="page-title white-text teal">Contact</h3>
          <div class="container">
            <p>
              <a
                aria-label="Email Eyakub"
                href="mailto:eyakubsorkar@gmail.com"
                data-position="top"
                data-tooltip="Email Eyakub"
                class="btn-floating btn-large waves-effect waves-light brown tooltipped"
              >
                <i class="fa fa-envelope"></i>
                <a
                  aria-label="Email Eyakub"
                  href="mailto:eyakubsorkar@gmail.com"
                  class="hoverline"
                >
                  eyakubsorkar@gmail.com
                </a>
              </a>
            </p>
            <p>
              <a
                aria-label="View Eyakub on GitHub"
                href="http://github.com/eyakub"
                target="_blank"
                data-position="top"
                data-tooltip="View Eyakub on GitHub"
                class="btn-floating btn-large waves-effect waves-light brown tooltipped"
              >
                <i class="fa fa-github"></i>
                <a
                  aria-label="Eyakub on Github"
                  href="http://github.com/eyakub"
                  class="hoverline"
                >
                  github.com/eyakub
                </a>
              </a>
            </p>
            <p>
              <a
                aria-label="View Eyakub on LinkedIn"
                href="https://www.linkedin.com/in/eyakub-sorkar/"
                target="_blank"
                data-position="top"
                data-tooltip="View Eyakub on LinkedIn"
                class="btn-floating btn-large waves-effect waves-light brown tooltipped"
              >
                <i class="fa fa-linkedin"></i>
                <a
                  aria-label="Eyakub on LinkedIn"
                  href="https://www.linkedin.com/in/eyakub-sorkar/"
                  class="hoverline"
                >
                  linkedin.com/in/eyakub-sorkar/
                </a>
              </a>
            </p>
          </div>
        </section>
      </main>
    );
  }
}
export default Contact;
