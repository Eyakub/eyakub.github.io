import React, { Component } from "react";
import python_logo from '../img/python.png';
import js_logo from '../img/javascript.png';
import php_logo from '../img/php.png';
import cpp_logo from '../img/cpp.png';
import django_logo from '../img/django.png';
import vuejs_logo from '../img/vuejs.png';
import flutter_logo from '../img/flutter.png';
import laravel_logo from '../img/laravel.png';
import bootstrap_logo from '../img/bootstrap.png';
import momentjs_logo from '../img/momentjs.png';
import chartjs_logo from '../img/charjs.svg';
import mysql_logo from '../img/mysql.png';
import postgresql_logo from '../img/postgresql.png';
import mongodb_logo from '../img/mongodb.png';
import git_logo from '../img/git.png';
import postman_logo from '../img/postman.png';
import docker_logo from '../img/docker.png';
import heroku_logo from '../img/heroku.png';
import netlify_logo from '../img/netlify.png';
import aws_logo from '../img/aws.png';
import axios_logo from '../img/axios.png';
import restapi_logo from '../img/restapi.png';
import celery_logo from '../img/celery.png';
import payment_logo from '../img/payment.png';
import sms_logo from '../img/sms.png';

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
                    <img alt="" src={python_logo} class="responsive-img" />
                    Python
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={js_logo} class="responsive-img" />
                    JavaScript
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={php_logo} class="responsive-img" />
                    PHP
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={cpp_logo} class="responsive-img" />
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
                    <img alt="" src={django_logo} class="responsive-img" />
                    Django
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={vuejs_logo} class="responsive-img" />
                    VueJS
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={laravel_logo} class="responsive-img" />
                    Laravel
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={flutter_logo} class="responsive-img" />
                    Flutter
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={bootstrap_logo} class="responsive-img" />
                    Bootstrap
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={momentjs_logo} class="responsive-img" />
                    MomentJS
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={chartjs_logo} class="responsive-img" />
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
                    <img alt="" src={mysql_logo} class="responsive-img" />
                    MySQL
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={postgresql_logo} class="responsive-img" />
                    PostgreSQL
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={mongodb_logo} class="responsive-img" />
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
                    <img alt="" src={git_logo} class="responsive-img" />
                    Git
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={postman_logo} class="responsive-img" />
                    Postman
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={docker_logo} class="responsive-img" />
                    Docker
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={heroku_logo} class="responsive-img" />
                    Heroku
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={netlify_logo} class="responsive-img" />
                    Netlify
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={aws_logo} class="responsive-img" />
                    AWS
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={axios_logo} class="responsive-img" />
                    Axios
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={restapi_logo} class="responsive-img" />
                    REST API
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={celery_logo} class="responsive-img" />
                    Celery
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={payment_logo} class="responsive-img" />
                    Payment Gateway
                  </div>
                  <div class="col s4 m2">
                    <img alt="" src={sms_logo} class="responsive-img" />
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
