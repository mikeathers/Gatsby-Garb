import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import netlifyIdentity from 'netlify-identity-widget'

export const query = graphql`
  query {
    allContentfulProduct {
      edges {
        node {
          id
          slug
          name
          price
          private
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

class Products extends React.Component {
  state = {
    products: [],
  }
  componentDidMount() {
    this.getProducts()
    netlifyIdentity.on('login', user => this.getProducts(user))
    netlifyIdentity.on('logout', () => this.getProducts())
  }

  getProducts = user => {
    console.log(user)
    const allProducts = this.props.data.allContentfulProduct.edges
    const products =
      netlifyIdentity.currentUser() !== null
        ? allProducts
        : allProducts.filter(({ node: product }) => !product.private)
    this.setState({ products })
  }

  render() {
    const { products } = this.state
    return (
      <Layout>
        <div>
          <h2>Garb Products</h2>
          {/* Products List */}
          {products.map(({ node: product }) => (
            <div key={product.id}>
              <Link
                to={`/products/${product.slug}`}
                style={{ textDecoration: 'none', color: '#551a8b' }}
              >
                <h3>
                  {product.name} -{' '}
                  <span
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 300,
                      color: '#f60',
                    }}
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
  }
}

export default Products
