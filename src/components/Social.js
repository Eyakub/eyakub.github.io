import React, { Component } from "react";

class Social extends Component {
  render() {
    return (
      <div className="social">
        <a href="https://github.com/eyakub" target="_blank">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://Instagram.com/md_eyakub" target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://www.facebook.com/mdes.mdes" target="_blank">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://Linkedin.com/in/eyakub-sorkar/" target="_blank">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="https://medium.com/@eyakubsorkar" target="_blank">
          <i class="fab fa-medium-m"></i>
        </a>
      </div>
    );
  }
}

export default Social