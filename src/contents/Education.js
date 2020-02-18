import React, { Component } from "react";
import Widecard from "../components/Widecard";

class Education extends Component {
  render() {
    return (
      <main>
        <section id="education" class="section scrollspy">
          <h3 class="page-title white-text teal">Education</h3>
          <div class="container">
            <div class="row">
              <div class="col s12 m6">
                <div class="card">
                  <div class="card-content">
                    <p>
                      <span class="card-title">
                        <a
                          href="http://daffodilvarsity.edu.bd/"
                          class="teal-text hoverline"
                        >
                          Daffodil International University
                        </a>
                      </span>
                    </p>
                    <p class="brown-text">2015 - 2018 | Dhanmondi, Dhaka</p>
                    <ul>
                      <li>B.Sc in Computer Science & Engineering</li>
                      <li>
                        <strong>CGPA: </strong>3.30
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col s12 m6">
                <div class="card">
                  <div class="card-content">
                    <p>
                      <span class="card-title">
                        <a href="/" class="teal-text hoverline">
                          Govt. Science College (HSC)
                        </a>
                      </span>
                    </p>
                    <p class="brown-text">2012 - 2014 | Tejgaon, Dhaka.</p>
                    <ul>
                      <li>
                        <strong>Group: </strong>Science
                      </li>
                      <li>
                        <strong>GPA: </strong>5.00
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col s12 m6">
                <div class="card">
                  <div class="card-content">
                    <p>
                      <span class="card-title">
                        <a
                          href="http://daffodilvarsity.edu.bd/"
                          class="teal-text hoverline"
                        >
                          A.K High School & College (SSC)
                        </a>
                      </span>
                    </p>
                    <p class="brown-text">2012 | Dania, Dhaka</p>
                    <ul>
                      <li>
                        <strong>Group: </strong>Science
                      </li>
                      <li>
                        <strong>GPA: </strong>5.00
                      </li>
                    </ul>
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

export default Education;
