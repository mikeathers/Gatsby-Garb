import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Layout from '../components/layout'

const getImageData = graphql`
  {
    allFile {
      totalCount
      edges {
        node {
          id
          relativePath
          size
          extension
          birthTime
        }
      }
    }
  }
`

export default () => {
  return (
    <Layout>
      <h1>HELLO FROM PAGE 3</h1>
      <h3>Image File Data</h3>
      <StaticQuery
        query={getImageData}
        render={data => (
          <table>
            <thead>
              <tr>
                <th>Relative Path</th>
                <th>Size of Image</th>
                <th>Extension</th>
                <th>Birthtime</th>
              </tr>
            </thead>
            <tbody>
              {data.allFile.edges.map(({ node }, index) => (
                <tr key={index}>
                  <td>{node.relativePath}</td>
                  <td>{node.size}</td>
                  <td>{node.extension}</td>
                  <td>{node.birthTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      />
      <Link to="/page-2">Go to page 2</Link>
    </Layout>
  )
}
