import React, { Component } from "react";
import ReactTypingEffect from "react-typing-effect";
import Social from "../components/Social";

class Home extends Component {
  render() {
    return (
      <main>
        <section id="intro" class="section scrollspy full-height">
          <div class="overlay"></div>
          <div class="container">
            <h2>
              Sooner or later, <span class="teal">those who win </span>
              <br />
              are those <span> </span>
              <span class="underline">who think they can</span>.
            </h2>
          </div>
        </section>
        {/* <Social /> */}
      </main>
    );
  }
}

export default Home;
