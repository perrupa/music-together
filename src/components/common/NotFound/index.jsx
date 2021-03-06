import React from "react"
import SEO from "components/common/SEO"
import Layout from "components/common/Layout"
import { Link } from "gatsby"
import styled from "styled-components"

export default () => (
  <Layout>
    <SEO title="404: Not found" />
    <Wrapper>
      <Center>
        <h4>404 - Page Not Found</h4>
        <Link to="/">Go Back Home</Link>
      </Center>
    </Wrapper>
  </Layout>
)

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`

const Center = styled.div`
  align-self: center;
  text-align: center;
`
