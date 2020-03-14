import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'

export const query = graphql`
  query {
    allContentfulProduct {
      edges {
        node {
          id
          slug
          name
          price
          image {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

const Products = ({ data: { allContentfulProduct } }) => (
  <Layout>
    <div>
      <h2>Garb Products</h2>
      {/* Products List */}
      {allContentfulProduct.edges.map(({ node: product }) => (
        <div key={product.id}>
          <Link
            to={`/products/${product.slug}`}
            style={{ textDecoration: 'none', color: '#551a8b' }}
          >
            <h3>
              {product.name} -{' '}
              <span
                style={{ fontSize: '1.2rem', fontWeight: 300, color: '#f60' }}
              >
                £{product.price}
              </span>
            </h3>
          </Link>
          <Img style={{ maxWidth: 600 }} fluid={product.image.fluid} />
        </div>
      ))}
    </div>
  </Layout>
)

export default Products
