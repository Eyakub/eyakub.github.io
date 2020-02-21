import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './contents/Home';
import About from './contents/About';
import Education from './contents/Education';
import Skills from './contents/Skills';
import Contact from './contents/Contact';
import Experience from './contents/Experience';
import Projects from './contents/Projects';
import Certification from './contents/Certification';
import ExtraActivities from './contents/ExtraActivities';
import Blog from './contents/Blog';
import Resume from './contents/Resume';


function App(){
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/">
          <Home />
        </Route>

        {/* Route for about.js contents */}
        <Route path="/about">
          <About />
        </Route>

        {/* Route for experience.js contents */}
        <Route path="/experience">
          <Experience />
        </Route>

        {/* Route for Projects.js contents */}
        <Route path="/projects">
          <Projects />
        </Route>

        {/* Route for Skills.js content */}
        <Route path="/skills">
          <Skills />
        </Route>

        {/* Route for certification.js content */}
        <Route path="/certification">
          <Certification />
        </Route>

        {/* Route for Education.js content */}
        <Route path="/education">
          <Education />
        </Route>

        {/* Route for extraActivities.js content */}
        <Route path="/activities">
          <ExtraActivities />
        </Route>

        {/* Route for Contact.js content */}
        <Route path="/contact">
          <Contact />
        </Route>

        {/* Route for blog.js content */}
        <Route path="/blog">
          <Blog />
        </Route>
      </div>

      {/* Route for resume.js content */}
      <Route path="/resume">
          <Resume />
        </Route>
        
    </Router>
  )
}

export default App;