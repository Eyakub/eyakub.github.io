import React, { Component } from "react";

class Certification extends Component {
  render() {
    return (
      <main>
        <section id="certification" class="section scrollspy">
          <h3 class="page-title white-text teal">Certification</h3>
          <div class="container">
            <div class="row">
              {/* <!-- 1st item for this row--> */}
              <div class="col s12 m6">
                <div class="card">
                  <div class="card-content">
                    <p>
                      <span class="card-title">
                        <a
                          href="https://algo.codemarshal.org/contests/ncpc-uap-2016/standings"
                          target="_blank"
                          class="teal-text hoverline"
                        >
                          National Collegiate Programming Contest
                          (NCPC-UAP-2016)
                        </a>
                      </span>
                    </p>
                    <p class="brown-text">Mar 11/2016 - Mar 12/2016</p>
                    <ul>
                      <li>
                        NCPC 2016 Preliminary
                        <b>(Position - 209/777)</b>
                      </li>
                      <li>
                        NCPC 2016 Final Round hosted by UAP{" "}
                        <b>(Position - 109/119)</b>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- 2nd item for this row--> */}
              <div class="col s12 m6">
                <div class="card">
                  <div class="card-content">
                    <p>
                      <span class="card-title">
                        <a
                          href="https://www.sololearn.com/Profile/5822876/Python"
                          target="_blank"
                          class="teal-text hoverline"
                        >
                          Courses
                        </a>
                      </span>
                    </p>
                    <p class="brown-text"></p>
                    <ul>
                      <li>
                        <a
                          target="_blank"
                          href="https://www.sololearn.com/Certificate/1073-5822876/pdf/"
                        >
                          Python 3 (sololearn)
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href="https://www.sololearn.com/Certificate/1060-5822876/pdf/"
                        >
                          SQL Fundamental (Sololearn)
                        </a>
                      </li>
                      <li>Android Beginner Course (EMK Center)</li>
                      <li>Android Application Development (Under LICT)</li>
                      <li>
                        <a
                          target="_blank"
                          href="https://www.sololearn.com/Certificate/1059-5822876/pdf/"
                        >
                          PHP Course (Sololearn)
                        </a>
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

export default Certification;
