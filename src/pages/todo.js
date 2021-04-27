import React from "react"
import { Link } from "gatsby"

import "./hello.css"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Todo from "../components/Todo"
const todo = () => (
    <Layout>
      <SEO title="Page two" />

      <div>
        <Todo />
      </div>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
)

export default todo
