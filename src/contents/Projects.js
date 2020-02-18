import React, { Component } from "react";

class Projects extends Component {
  render() {
    return (
      <main>
       <section id="projects" class="section scrollspy">
        <h3 class="page-title white-text teal">Projects</h3>
        <div class="container">
          <div class="row">
            {/* <!-- Moiur --> */}
            <div class="col s12 m6 l4">
              <div class="card medium">
                <div class="card-image waves-effect waves-block waves-light">
                  <img
                    alt="Screenshot of MOIUR web app"
                    src="moiur.png"
                    class="activator"
                  />
                </div>
                <div class="card-content">
                  <span class="card-title activator teal-text hoverline"
                    >Moiur<i class="mdi-navigation-more-vert right"></i
                  ></span>
                  <p>
                    A service based web application that can help you to book your venue, party center, catering
                    online.
                  </p>
                </div>
                <div class="card-reveal">
                  <span class="card-title brown-text"
                    >Accomplishments<i class="mdi-navigation-close right"></i
                  ></span>
                  <ul>
                    <li><strong>Python (Django)</strong> backend</li>
                    <li><strong>VueJS, jQuery, HTML, CSS, MomentJS, ChartJS</strong> frontend</li>
                  </ul>
                  <div class="card-action">
                    <a
                      aria-label="Visit Moiur web app"
                      href="https://moiur.com/"
                      target="_blank"
                      data-position="top"
                      data-tooltip="View Online"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-external-link"></i></a
                    ><a
                      aria-label="Visit the GitHub repo for Moiur project"
                      href="#"
                      data-position="top"
                      data-tooltip="View Source"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-github"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- TourBookBD --> */}
            <div class="col s12 m6 l4">
              <div class="card medium">
                <div class="card-image waves-effect waves-block waves-light">
                  <img
                    alt="Screenshot of TourBookBD web app"
                    src="tourbookbd.png"
                    class="activator"
                  />
                </div>
                <div class="card-content">
                  <span class="card-title activator teal-text hoverline"
                    >TourBookBD<i class="mdi-navigation-more-vert right"></i
                  ></span>
                  <p>
                    A service based web application that can help you to book your packages
                    for traveling, social platform for sharing status, photos.
                  </p>
                </div>
                <div class="card-reveal">
                  <span class="card-title brown-text"
                    >Accomplishments<i class="mdi-navigation-close right"></i
                  ></span>
                  <ul>
                    <li><strong>PHP (Laravel)</strong> backend</li>
                    <li><strong>JS, jQuery, HTML, CSS, Bootstrap</strong> frontend</li>
                  </ul>
                  <div class="card-action">
                    <a
                      aria-label="Visit TourBookBD demo"
                      href="https://www.youtube.com/watch?v=hCyeVlUbtO4&feature=youtu.be"
                      target="_blank"
                      data-position="top"
                      data-tooltip="View Online"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-external-link"></i></a
                    ><a
                      aria-label="Private Repo"
                      href="#"
                      data-position="top"
                      data-tooltip="View Source"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-github"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Recipe App --> */}
            <div class="col s12 m6 l4">
              <div class="card medium">
                <div class="card-image waves-effect waves-block waves-light">
                  <img
                    alt="Screenshot of RecipeApp web app"
                    src="recipeapp.png"
                    class="activator"
                  />
                </div>
                <div class="card-content">
                  <span class="card-title activator teal-text hoverline"
                    >Recipe API<i class="mdi-navigation-more-vert right"></i
                  ></span>
                  <p>
                    A total DRF based application about Recipe.
                  </p>
                </div>
                <div class="card-reveal">
                  <span class="card-title brown-text"
                    >Accomplishments<i class="mdi-navigation-close right"></i
                  ></span>
                  <ul>
                    <li><strong>Python (Django Rest Framework)</strong> backend</li>
                  </ul>
                  <div class="card-action">
                    <a
                      aria-label="Visit Recipe API demo"
                      href="https://github.com/Eyakub/recipe-app-api"
                      target="_blank"
                      data-position="top"
                      data-tooltip="View Online"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-external-link"></i></a
                    ><a
                      aria-label="github Repo"
                      href="https://github.com/Eyakub/recipe-app-api"
                      data-position="top"
                      data-tooltip="View Source"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-github"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <div class="row">
            {/* <!-- Name Contest --> */}
            <div class="col s12 m6 l4">
              <div class="card medium">
                <div class="card-image waves-effect waves-block waves-light">
                  <img
                    alt="Screenshot"
                    src="namecontest.jpg"
                    class="activator"
                  />
                </div>
                <div class="card-content">
                  <span class="card-title activator teal-text hoverline"
                    >Name Contest<i class="mdi-navigation-more-vert right"></i
                  ></span>
                  <p>
                    Contest base android application that actually something like choose better name with this contest
                    for your business.
                  </p>
                </div>
                <div class="card-reveal">
                  <span class="card-title brown-text"
                    >Accomplishments<i class="mdi-navigation-close right"></i
                  ></span>
                  <ul>
                    <li><strong>Dart (Flutter)</strong></li>
                  </ul>
                  <div class="card-action">
                    <a
                      aria-label="Visit demo"
                      href="https://github.com/Eyakub/Name-Contest"
                      target="_blank"
                      data-position="top"
                      data-tooltip="View Online"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-external-link"></i></a
                    ><a
                      aria-label="View github Repo"
                      href="https://github.com/Eyakub/Name-Contest"
                      data-position="top"
                      data-tooltip="View Source"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-github"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Research Hub --> */}
            <div class="col s12 m6 l4">
              <div class="card medium">
                <div class="card-image waves-effect waves-block waves-light">
                  <img
                    alt="Screenshot"
                    src="researchhub.png"
                    class="activator"
                  />
                </div>
                <div class="card-content">
                  <span class="card-title activator teal-text hoverline"
                    >Research Hub<i class="mdi-navigation-more-vert right"></i
                  ></span>
                  <p>
                    Research base app to spread the useful information for thesis and research enthusiast.
                  </p>
                </div>
                <div class="card-reveal">
                  <span class="card-title brown-text"
                    >Accomplishments<i class="mdi-navigation-close right"></i
                  ></span>
                  <ul>
                    <li><strong>Java, Android Studio</strong></li>
                  </ul>
                  <div class="card-action">
                    <a
                      aria-label="Visit demo"
                      href="https://www.youtube.com/watch?v=4jkBmTcLFBc&feature=youtu.be"
                      target="_blank"
                      data-position="top"
                      data-tooltip="View Online"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-external-link"></i></a
                    ><a
                      aria-label="View github Repo"
                      href="https://github.com/Eyakub/Research-Hub"
                      data-position="top"
                      data-tooltip="View Source"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-github"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Food order System --> */}
            <div class="col s12 m6 l4">
              <div class="card medium">
                <div class="card-image waves-effect waves-block waves-light">
                  <img
                    alt="Screenshot"
                    src="foodorder.png"
                    class="activator"
                  />
                </div>
                <div class="card-content">
                  <span class="card-title activator teal-text hoverline"
                    >Food Order System of a Cafe<i class="mdi-navigation-more-vert right"></i
                  ></span>
                  <p>
                    A simple Food order system of a Cafe I built when I was learning C.
                  </p>
                </div>
                <div class="card-reveal">
                  <span class="card-title brown-text"
                    >Accomplishments<i class="mdi-navigation-close right"></i
                  ></span>
                  <ul>
                    <li><strong>C language</strong> backend</li>
                  </ul>
                  <div class="card-action">
                    <a
                      aria-label="Visit demo"
                      href="https://github.com/Eyakub/Food-Order-System-of-a-Cafe"
                      target="_blank"
                      data-position="top"
                      data-tooltip="View Online"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-external-link"></i></a
                    ><a
                      aria-label="View github Repo"
                      href="https://github.com/Eyakub/Food-Order-System-of-a-Cafe"
                      data-position="top"
                      data-tooltip="View Source"
                      class="btn-floating btn-large waves-effect waves-light brown tooltipped"
                      ><i class="fa fa-github"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    );
  }
}

export default Projects;
