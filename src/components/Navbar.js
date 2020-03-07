import React, { Component } from "react";
import Navitem from "./Navitem";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NavItemActive: ""
    };
  }

  activeitem = x => {
    if (this.state.NavItemActive.length > 0) {
      document
        .getElementById(this.state.NavItemActive)
        .classList.remove("active");
    }
    this.setState({ NavItemActive: x }, () => {
      document.getElementById(this.state.NavItemActive).classList.add("active");
    });
  };

  render() {
    return (
      // <nav>
      //   <ul>
      //       <Navitem item='Home' tolink="/" activec={this.activeitem}></Navitem>
      //       <Navitem item='Experience' tolink="/experience" activec={this.activeitem}></Navitem>
      //       <Navitem item='Projects' tolink="/projects" activec={this.activeitem}></Navitem>
      //       <Navitem item='Skills' tolink="/skills" activec={this.activeitem}></Navitem>
      //       <Navitem item='Certification' tolink="/certification" activec={this.activeitem}></Navitem>
      //       <Navitem item='Education' tolink="/education" activec={this.activeitem}></Navitem>
      //       <Navitem item='Extra Activities' tolink="/extra-activities" activec={this.activeitem}></Navitem>
      //       <Navitem item='Contact' tolink="/contact" activec={this.activeitem}></Navitem>
      //       <Navitem item='Blog' tolink="/blog" activec={this.activeitem}></Navitem>
      //       <Navitem item='Resume' tolink="/resume" activec={this.activeitem}></Navitem>
      //   </ul>
      // </nav>
      <body>
        {/* Navigation Menu */}
        <nav class="hide-on-small-only">
          <ul class="side-nav fixed section table-of-contents">
            <li class="logo">
              <a
                id="logo-container"
                aria-label="Navigate to the beginning of the page"
                href="/"
                class="brand-logo teal-text"
              >
                <h1>
                  Eyakub Sorkar
                  <span class="brown-text light">Software Engineer</span>
                </h1>
              </a>
            </li>
            <Navitem item="About" c_name="waves-effect waves-dark teal-text" 
              icon_class="mdi-social-person small" 
              tolink="/about">
            </Navitem>
            
            <Navitem item="Experience" c_name="waves-effect waves-dark cyan-text" 
              icon_class="mdi-action-trending-up small" 
              tolink="/experience">
            </Navitem>

            <Navitem item="Projects" c_name="waves-effect waves-dark indigo-text" 
              icon_class="mdi-av-web small" 
              tolink="/projects">
            </Navitem>
            
            <Navitem item="Skills" c_name="waves-effect waves-dark purple-text" 
              icon_class="mdi-av-equalizer small" 
              tolink="/skills">
            </Navitem>

            <Navitem item="Certification" c_name="waves-effect waves-dark red-text" 
              icon_class="mdi-action-grade small" 
              tolink="/certification">
            </Navitem>

            <Navitem item="Education" c_name="waves-effect waves-dark orange-text" 
              icon_class="mdi-social-school small" 
              tolink="/education">
            </Navitem>

            <Navitem item="Extra Activities" c_name="waves-effect waves-dark purple-text" 
              icon_class="mdi-av-equalizer small" 
              tolink="/activities">
            </Navitem>

            <Navitem item="Contact" c_name="waves-effect waves-dark brown-text" 
              icon_class="mdi-content-mail small" 
              tolink="/contact">
            </Navitem>

            <Navitem item="Blog" c_name="waves-effect waves-dark yellow-text text-darken-2" 
              icon_class="mdi-content-create small" 
              tolink="/blog">
            </Navitem>

            <Navitem item="Resume" c_name="waves-effect waves-dark grey-text text-darken-3" 
              icon_class="mdi-action-description small" 
              tolink="/Eyakub_Sorkar.pdf">
            </Navitem>

          </ul>
        </nav>
        <nav class="hide-on-large only trigger z-depth-1">
          <a
            aria-label="Toggle visibility of the mobile navbar"
            href="/"
            data-activates="slide-out"
            class="button-collapse"
          >
            <i class="mdi-navigation-menu"></i>
          </a>
          <div class="name-title">
            <a
              id="name"
              aria-label="Navigate to the beginning of the page"
              href="#main"
              class="teal-text"
            >
              MD Eyakub Sorkar
            </a>
            <span class="brown-text light">Software Engineer</span>
          </div>
        </nav>
        <nav class="hide-on-large only">
          <ul id="slide-out" class="side-nav">
            <li class="bold">
              <a
                aria-label="Navigate to the About section"
                href="#about"
                class="waves-effect waves-dark teal-text"
              >
                <i class="mdi-social-person small"></i>
                <span>About</span>
              </a>
            </li>
            <li class="bold">
              <a
                aria-label="Navigate to the Experience section"
                href="#experience"
                class="waves-effect waves-dark cyan-text"
              >
                <i class="mdi-action-trending-up small"></i>
                <span>Experience</span>
              </a>
            </li>
            <li class="bold">
              <a
                aria-label="Navigate to the Projects section"
                href="#projects"
                class="waves-effect waves-dark indigo-text"
              >
                <i class="mdi-av-web small"></i>
                <span>Projects</span>
              </a>
            </li>
            <li class="bold">
              <a
                aria-label="Navigate to the Skills section"
                href="#skills"
                class="waves-effect waves-dark purple-text"
              >
                <i class="mdi-av-equalizer small"></i>
                <span>Skills</span>
              </a>
            </li>
            <li class="bold">
              <a
                aria-label="Navigate to the certification section"
                href="#certification"
                class="waves-effect waves-dark red-text"
              >
                <i class="mdi-action-grade small"></i>
                <span>Certification</span>
              </a>
            </li>
            <li class="bold">
              <a
                aria-label="Navigate to the Education section"
                href="#education"
                class="waves-effect waves-dark orange-text"
              >
                <i class="mdi-social-school small"></i>
                <span>Education</span>
              </a>
            </li>
            <li class="bold">
              <a
                arial-label="Navigate to the Activities section"
                href="#activities"
                class="waves-effect waves-dark orange-text"
              >
                <i class="mdi-av-equalizer small"></i>
                <span>Extra Activities</span>
              </a>
            </li>
            <li class="bold">
              <a
                aria-label="Navigate to the Contact section"
                href="#contact"
                class="waves-effect waves-dark brown-text"
              >
                <i class="mdi-content-mail small"></i>
                <span>Contact</span>
              </a>
            </li>
            <li class="bold">
              <a
                aria-label="Navigate to the Contact section"
                href="#blog"
                class="waves-effect waves-dark yellow-text text-dark-3"
              >
                <i class="mdi-content-mail small"></i>
                <span>Blog</span>
              </a>
            </li>
            <li class="bold">
              <a
                aria-label="Open Eyakub's Resume in a new tab"
                href="Eyakub_Sorkar.pdf"
                target="_blank"
                class="waves-effect waves-dark grey-text text-darken-3"
              >
                <i class="mdi-action-description small"></i>
                <span>Resume</span>
              </a>
            </li>
          </ul>
        </nav>
      </body>
    );
  }
}

export default Navbar;
