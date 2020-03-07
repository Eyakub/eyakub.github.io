import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navitem extends Component {
 
  render() {
    return (
      // <li id={this.props.item}>
      //   <Link
      //     onClick={this.props.activec.bind(this, this.props.item)}
      //     to={this.props.tolink}>
      //     {this.props.item}
      //   </Link>
      // </li>
      // <li class="bold">
      //   <a
      //     aria-label="Navigate to the About section"
      //     href="/about"
      //     class="waves-effect waves-dark teal-text"
      //   >
      //     <i class="mdi-social-person small"></i>
      //     <span>About</span>
      //   </a>
      // </li>
      <li className="bold">
        <Link onClick=""
          className={`${this.props.c_name}`}
          to={this.props.tolink}>
          <i className={`${this.props.icon_class}`}></i>
          <span>{this.props.item}</span>
        </Link>
      </li>
    );
  }
}

export default Navitem;
