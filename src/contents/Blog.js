import React, { Component } from "react";

class Blog extends Component {
  render() {
    return (
      <main>
        <section id="blog" class="section scrollspy full-height">
          <h3 class="page-title white-text teal">Blog</h3>
          <div class="container">
            <h4 id="posts-2019">2019</h4>
            <ul aria-labelledby="posts-2019">
              <li>
                <a
                  class="hoverline"
                  href="/blog/hello-world-and-why-im-blogging.html"
                >
                  Hello, world. And why I'm blogging.
                </a>
                <dl>
                  <dd>Published:</dd>
                  <dt>
                    <time datetime="2019-09-02T00:00:00+00:00">
                      September 2, 2019
                    </time>
                  </dt>
                </dl>
              </li>
            </ul>
          </div>
        </section>
      </main>
    );
  }
}

export default Blog;
