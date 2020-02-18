import React, { Component } from "react";

class Experience extends Component {
  render() {
    return (
      <main>
        <section id="experience" class="section scrollspy">
          <h3 class="page-title white-text teal">Experience</h3>
          <div class="container">
            <div class="card">
              <div class="card-content">
                <div class="row">
                  <div class="col s12 m2">
                    <a href="http://venturesolutionsltd.com" target="_blank">
                      <img
                        alt="WeSpire logo"
                        src="company.png"
                        class="responsive-img center-block"
                      />
                    </a>
                  </div>
                  <div class="col s12 m10">
                    <p>
                      <span class="card-title">
                        <a
                          href="http://venturesolutionsltd.com"
                          target="_blank"
                          class="teal-text hoverline"
                        >
                          Venture Solutions Ltd
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
                <div class="role brown-text">Jr. Software Engineer</div>
                <p>
                  <em class="grey-text">
                    A Banking software solution based company, provide
                    enterprise software solution and business product solutions
                  </em>
                </p>
                <h6>Develop Product</h6>
                <ul>
                  <li>
                    Building web application called{" "}
                    <a href="www.moiur.com" target="_blank">
                      MOIUR
                    </a>
                    , a service based application.
                  </li>
                  <li>
                    Back-end development, creating and customizing existing app.
                  </li>
                  <li>
                    Besides learning design and dynamic contents for existing
                    project.
                  </li>
                  <li>
                    <b>Tools</b>: Python, Django, PostgreSQL, MySQL, JS, jQuery,
                    ReactJS, VueJS, HTML, MomentJS, ChartJS
                  </li>
                </ul>

                <h6>Accomplishments</h6>
                <ul>
                  <li>
                    Server configuration and deployment of IFIC bank project.
                  </li>
                  <li>
                    Built scripts for SMS integration & Online Payment system.
                  </li>
                  <li>Facebook integration, Multiple user auth & many more.</li>
                  <li>EC2 Instance of AWS, Docker, Travis CI</li>
                </ul>
              </div>
              <div class="card-action">
                <span>
                  May 2019 - Present | Fakirapool Inner Circular Road, Motijheel
                </span>
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <div class="row">
                  <div class="col s12 m2">
                    <a href="http://http://tryonyx.com" target="_blank">
                      <img
                        alt="WeSpire logo"
                        src="company.png"
                        class="responsive-img center-block"
                      />
                    </a>
                  </div>
                  <div class="col s12 m10">
                    <p>
                      <span class="card-title">
                        <a
                          href="http://http://tryonyx.com"
                          target="_blank"
                          class="teal-text hoverline"
                        >
                          Tryonyx
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
                <div class="role brown-text">Software Engineer (Intern)</div>
                <p>
                  <em class="grey-text">
                    A software solution based company. Small web development and
                    design studio for business and individuals.
                  </em>
                </p>
                <h6>Develop Product</h6>
                <ul>
                  <li>
                    Product called NameContest, a contest based application.
                  </li>
                  <li>
                    Android application for the above application using Flutter.
                  </li>
                  <li>
                    <b>Tools</b>: Python, Django, Flutter, PostgreSQL, MySQL,
                    JS, HTML
                  </li>
                </ul>
              </div>
              <div class="card-action">
                <span>Feb 2019 - May 2019 | Banani 11, Dhaka</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Experience;
