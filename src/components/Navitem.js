import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navitem extends Component {
  constructor(props){
    console.log(props.item);
  }
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
          className="waves-effect waves-dark teal-text"
          to={this.props.toLink}>
        </Link>
      </li>
    );
  }
}

export default Navitem;
