import React, { Component } from "react";

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myskills: ["Python", "JavaScript", "PHP", "React", "VueJS"]
    };
  }
  render() {
    return (
      <main>
        <section id="skills" class="section scrollspy">
          <h3 class="page-title white-text teal">Skills</h3>
          <div class="container">
            <div class="card">
              <div class="card-content">
                <h4 class="brown-text light">Languages</h4>
                <div class="row text-center">
                  <div class="col s4 m2">
                    <img alt="" src="python.png" class="responsive-img" />
                    Python
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="javascript.png" class="responsive-img" />
                    JavaScript
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="php.png" class="responsive-img" />
                    PHP
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="cpp.png" class="responsive-img" />
                    C/C++
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <h4 class="brown-text light">Framework & Libraries</h4>
                <div class="row text-center">
                  <div class="col s4 m2">
                    <img alt="" src="django.png" class="responsive-img" />
                    Django
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="vuejs.png" class="responsive-img" />
                    VueJS
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="laravel.png" class="responsive-img" />
                    Laravel
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="flutter.png" class="responsive-img" />
                    Flutter
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="bootstrap.png" class="responsive-img" />
                    Bootstrap
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="momentjs.png" class="responsive-img" />
                    MomentJS
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="charjs.svg" class="responsive-img" />
                    ChartJS
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <h4 class="brown-text light">Database</h4>
                <div class="row text-center">
                  <div class="col s4 m2">
                    <img alt="" src="mysql.png" class="responsive-img" />
                    MySQL
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="postgresql.png" class="responsive-img" />
                    PostgreSQL
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="mongodb.png" class="responsive-img" />
                    MongoDB
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <h4 class="brown-text light">Tools & Technology</h4>
                <div class="row text-center">
                  <div class="col s4 m2">
                    <img alt="" src="git.png" class="responsive-img" />
                    Git
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="postman.png" class="responsive-img" />
                    Postman
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="docker.png" class="responsive-img" />
                    Docker
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="heroku.png" class="responsive-img" />
                    Heroku
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="netlify.png" class="responsive-img" />
                    Netlify
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="aws.png" class="responsive-img" />
                    AWS
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="axios.png" class="responsive-img" />
                    Axios
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="restapi.png" class="responsive-img" />
                    REST API
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="celery.png" class="responsive-img" />
                    Celery
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="payment.png" class="responsive-img" />
                    Payment Gateway
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src="sms.png" class="responsive-img" />
                    SMS Integration
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

export default Skills;
