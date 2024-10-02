import React from 'react'
import CardContainer from '../components/CardContainer'
import { Helmet } from 'react-helmet'

const HomePage = () => {
  return (
    <>
    <Helmet>
        <title>E-commerce-Buy from your own place</title>
    </Helmet>

    <CardContainer/>
    </>
  )
}

export default HomePage