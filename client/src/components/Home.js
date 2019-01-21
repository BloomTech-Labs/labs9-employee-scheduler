import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import styled from '@emotion/styled'
import system from '../design/theme'
// import bgImg from '../img/fff.jpg'
import bg from '../img/bg.png' // https://unsplash.com/photos/PypjzKTUqLo img by Roman Bozhko
import bgSmall from '../img/bg-small.jpg' //https://unsplash.com/photos/zv5QSKaP8G8 img by STIL
import Button from './common/Button'
import LinkItem from './common/LinkItem'
import OuterContainer from './common/OuterContainer'
import stripe from '../img/stripe.png'

// this is the main landing page, it will house the payment options and main site branding styles. The nav here will display as Sign Up || Sign In.
// if a user is logged in already, it will display the Schedule now button and the navbar will change to logout.
const Home = () => {
  return (
    <OuterContainer>
      <BreadCrumb location="Home" />
      <Container>
        <h1>Scheduling your employees is hard.</h1>
        <p>
          Cadence is an easy-to-use shift scheduling tool. You'll never have to
          waste time worrying about wasting time ever again.
        </p>
        <Button type="text">
          <LinkItem to="/employees">Schedule Now</LinkItem>
        </Button>
      </Container>
      <Features>
        <div className="card-container">
          <h1>Features</h1>
          <p>
            Cadence has the features that your business needs to keep organized.
            We are interactive and easy to use. Join today to get your business
            started on these amazing features.
          </p>
          <ul>
            <li>
              <i className="fas fa-check" /> Interactive Drag and Drop Calander
            </li>
            <li>
              <i className="fas fa-check" /> Schedule Employee Shifts Weekly
            </li>
            <li>
              <i className="fas fa-check" /> Approve and Deny Time off Requests
            </li>
            <li>
              <i className="fas fa-check" /> Added Security of oAuth and Stripe
            </li>
          </ul>
        </div>
        <div className="card-container">
          <h1>Easy to get started</h1>
          <p>
            Scheduling can be hard. Let Cadence do the work for you and help you
            keep track so that you can focus on your business.
          </p>
          <ul>
            <li>
              <i className="far fa-thumbs-up" />
              Sign in through oAuth
            </li>
            <li>
              <i className="far fa-thumbs-up" />
              Create your Cadence Account
            </li>
            <li>
              <i className="far fa-thumbs-up" />
              Create your organization
            </li>
            <li>
              <i className="far fa-thumbs-up" />
              Add your employees to it
            </li>
            <li>
              <i className="far fa-thumbs-up" />
              Begin filling the spaces
            </li>
          </ul>
        </div>
        <div className="card-container">
          <h1>Secure Payment</h1>
          <p>
            Cadence offers it's users some of the best security features. We
            want your information to remain your information. Stripe helps us
            accomplish this by manageming billing details so you never have to
            worry about anything happening to financial data.
          </p>
          <img src={stripe} alt="stripe logo" />
        </div>
      </Features>
    </OuterContainer>
  )
}

export default Home

Home.propTypes = {
  // add propTypes here
}

const Container = styled('div')`
  margin: 7.5rem 0 0;
  height: 118rem;
  background-image: url(${bg});
  background-position: center;
  background-size: cover;

  h1 {
    padding: 75px 0 0;
    font-size: ${system.fontSizing.xl};
    width: 65rem;
  }
  p {
    padding: ${system.spacing.bigPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.ml};
    width: 60rem;
    margin-bottom: 25px;
  }
  button {
    margin-left: 2.5rem;
    a {
      color: ${system.color.neutral};
    }
  }

  @media (max-width: 500px) {
    background-image: url(${bgSmall});
    width: 675px;
    height: 50rem;
    h1 {
      margin: 50px auto 50px auto;
      height: 30px;
      padding: 42px;
      font-size: ${system.fontSizing.xl};
      color: ${system.color.bodytext};
    }
  }
`
const Features = styled('div')`
  margin: 0 auto;
  margin: 100px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${system.color.neutral};
  max-width: 1614px;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    width: 670px;
    padding: ${system.spacing.hugePadding};
  }
  .card-container {
    display: flex;
    width: 500px;
    height: 537px;
    position: relative;
    flex-flow: column nowrap;
    background: ${system.color.white};
    padding: ${system.spacing.bigPadding};
    border-radius: ${system.borders.bigRadius};
    box-shadow: ${system.shadows.otherLight};
    @media (max-width: 500px) {
      margin: 30px auto;
      justify-content: space-around;
      width: 100%;
    }
    p {
      margin-bottom: 38px;
      font-size: ${system.fontSizing.m};
    }
    ul {
      i.fa-check {
        margin-right: 10px;
        font-size: ${system.fontSizing.l};
        color: ${system.color.success};
      }
      i.fa-thumbs-up {
        margin-right: 20px;
        font-size: ${system.fontSizing.l};
        color: ${system.color.primary};
      }
      li {
        margin-bottom: 38px;
        font-size: ${system.fontSizing.m};
      }
    }
  }
`
