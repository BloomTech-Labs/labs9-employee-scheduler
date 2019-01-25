import React from 'react'
import BreadCrumb from './BreadCrumb'
import styled from '@emotion/styled'
import system from '../design/theme'
import Button from './common/Button'
import LinkItem from './common/LinkItem'
import OuterContainer from './common/OuterContainer'
import headerImg from '../img/header.svg' // img by Pasquale Vitiello & David Pacilio (cruip.com)
import heroImg from '../img/hero.svg' // img by Pasquale Vitiello & David Pacilio (cruip.com)
import Fade from 'react-reveal/Fade'
import Footer from './Footer'

const Home = () => {
  return (
    <OuterContainer>
      <BreadCrumb location="Home" />
      <Container>
        <section id="hero">
          <img id="header-img" alt="header" src={headerImg} />
          <img id="hero-img" alt="hero" src={heroImg} />

          <Fade top>
            <div id="wrapper">
              <h1>Scheduling your employees is hard.</h1>
              <p>
                Cadence is an easy-to-use shift scheduling tool. You'll never
                have to waste time worrying about wasting time ever again.
              </p>
              <Button type="text" id="schedule">
                <LinkItem to="/login">Schedule Now</LinkItem>
              </Button>
              <Button type="text" id="login">
                <LinkItem to="/login">Log In</LinkItem>
              </Button>
            </div>
          </Fade>
          {/* nudge this over to the right a bit */}
          <div id="video">Video Placeholder</div>
        </section>

        <section id="features">
          <h1>Meet Cadence.</h1>
          <p>
            Cadence is here to make scheduling shifts for your business quick
            and painless. Here are some of the key features:
          </p>
          <div className="cards">
            <Fade top>
              <div className="card">
                <h2>Schedule Shifts Visually</h2>
                <p>
                  With Cadence, you don't have to rely on spreadsheets or legacy
                  software from the 90s. <br />
                  <br /> Our simple calendar interface lets you see who's
                  scheduled when and make updates right there. We'll even
                  summarize information about how many people are working and
                  for how long.
                </p>
              </div>
              <div className="card">
                <h2>See Employees at a Glance</h2>
                <p>
                  You'll never need to fret about knowing who's available when
                  ever again.
                  <br />
                  <br /> With our employee directory, you can easily see all of
                  your employees' info from availability to contact details. You
                  can even edit employee availability and add new employees.
                </p>
              </div>
              <div className="card">
                <h2>Manage Time Off</h2>
                <p>
                  Know exactly which employees are taking time off before it
                  catches you unaware. <br />
                  <br /> With our PTO management system, you'll be able to
                  approve or deny pending PTO requests. Better yet, your
                  employees will be able to see their upcoming shifts and PTO
                  instantly.
                </p>
              </div>
            </Fade>
          </div>
        </section>

        <section id="social-proof">
          <h1>Here's what our users have to say:</h1>
          <p>
            This is real feedback we've gotten on social media and during user
            tests. We hope you'll love Cadence as much as they do.
          </p>
          <div className="cards">
            <Fade top>
              <div className="card">
                <div className="stripe" />
                <p>
                  Cadence is very cool. Now, I always know which Robin is
                  helping me out on a given night.
                </p>
                <h2>—Batman</h2>
              </div>
              <div className="card">
                <div className="stripe" />
                <p>
                  Cadence changed my life. I can now better plan which Robin
                  should help Batman.
                </p>
                <h2>—Oracle</h2>
              </div>
              <div className="card">
                <div className="stripe" />
                <p>
                  I can attest that the guys who made Cadence are both gentlemen
                  and scholars.
                </p>
                <h2>—Robin</h2>
              </div>
            </Fade>
          </div>
        </section>

        <section id="pricing">
          <h1>Here are our pricing plans.</h1>
          <p>
            No matter the size of your business, we will always work hard to
            accommodate your needs.
          </p>
          <div className="cards">
            <Fade top>
              <div className="card">
                <h2>SMB Plan</h2>
                <h3>$20 / month</h3>
                <ul>
                  <li>Up to 20 users</li>
                  <li>Easy-to-use graphical interface</li>
                  <li>Owner, Supervisor, & Employee Views</li>
                </ul>
                <Button>
                  <LinkItem to="/register">Sign Up Now</LinkItem>
                </Button>
              </div>
              <div className="card">
                <h2>Enterprise Plan</h2>
                <h3>Contact Us</h3>
                <ul>
                  <li>Supports unlimited users</li>
                  <li>Data Exports & API Access</li>
                  <li>Audit Trails & Reporting</li>
                </ul>
                <Button id="coming-soon" disabled>
                  Coming Soon
                </Button>
              </div>
            </Fade>
          </div>
        </section>
      </Container>
      <Footer />
    </OuterContainer>
  )
}

export default Home

const Container = styled('div')`
  margin: 5rem 5rem 0;
  padding: 0 4rem;
  background: white;
  box-shadow: ${system.shadows.otherLight};
  position: relative;

  @media ${system.breakpoints[2]} {
    margin: 5rem 2rem 0;
    padding: 0 2rem;

    section {
      padding-bottom: 5rem;

      h1,
      p {
        padding-left: 0;
      }
    }
  }

  section {
    padding-bottom: 15rem;

    h1 {
      padding: 100px 0 0;
      font-size: ${system.fontSizing.xl};
      width: 45%;
    }

    p {
      padding: ${system.spacing.bigPadding};
      color: ${system.color.bodytext};
      font-size: ${system.fontSizing.ml};
      width: 45%;
      margin-bottom: 30px;
      line-height: ${system.spacing.lineHeight};
    }

    @media ${system.breakpoints[2]} {
      h1 {
        width: 65%;
      }
      p {
        width: 65%;
      }
    }

    @media ${system.breakpoints[0]} {
      h1 {
        font-size: ${system.fontSizing.ml};
      }
      p {
        width: 100%;
        font-size: ${system.fontSizing.m};
        padding: 1rem ${system.spacing.bigPadding};
      }
    }
  }

  #hero {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 18rem 0 10rem;

    /* @media ${system.breakpoints[2]} {
      padding-top: 5rem;
    } */

    #wrapper {
      h1 {
        padding: 0;
      }
    }

    #header-img {
      position: absolute;
      top: 2rem;
      right: 0rem;
      width: 100%;

      @media ${system.breakpoints[0]} {
        width: 125%;
      }
    }

    #hero-img {
      position: absolute;
      top: 15rem;
      right: 0rem;
      width: 53%;

      @media ${system.breakpoints[0]} {
        display: none;
      }
    }

    #video {
      position: absolute;
      color: white;
      text-align: center;
      top: 21rem;
      right: 6%;
      width: 480px;
      height: 270px;
      z-index: 50;
      background: black;
      box-shadow: ${system.shadows.buttonHover};
      border-radius: ${system.borders.bigRadius};

      @media ${system.breakpoints[2]} {
        display: none;
      }
    }

    #login, #schedule {
      margin-left: 2.5rem;

      a {
        color: ${system.color.neutral};
      }
    }

    #login {
      display: none;

      @media ${system.breakpoints[1]} {
        display: block;
      }
    }

    #schedule {
      @media ${system.breakpoints[1]} {
        display: none;
      }
    }
  }

  .cards {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;

    .card {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      width: 25%;
      background: ${system.color.white};
      padding: ${system.spacing.bigPadding};
      border-radius: ${system.borders.bigRadius};
      box-shadow: 0 16px 48px rgba(32, 41, 50, 0.12);

      h2 {
        font-size: ${system.fontSizing.m};
      }

      p {
        font-size: ${system.fontSizing.sm};
      }

      h2,
      p {
        width: 100%;
        margin: 0;
        padding: 20px;
        line-height: ${system.spacing.lineHeight};
      }
    }
    @media ${system.breakpoints[2]} {
      flex-flow: column nowrap;
      justify-content: center;

      .card {
        width: 80%;
        margin-bottom: 3rem;
        padding: 2rem 1rem;
      }
    }
  }

  #features, #social-proof, #pricing {
    @media ${system.breakpoints[2]} {
        padding-bottom: 5rem;
      }

      @media ${system.breakpoints[0]} {
        padding-bottom: 2rem;
      }
  }

  #features {
    .card {
      h2 {
        color: ${system.color.primary};
      }
    }
  }

  #social-proof {
    .card {
      background: #333;
      position: relative;
      .stripe {
        position: absolute;
        top: 0;
        border-radius: ${system.borders.radius} ${system.borders.radius} 0 0;
        height: 20px;
        width: 100%;
        background: linear-gradient(65deg, #535fd7 0, #69effd 100%);
      }

      h2,
      p {
        color: ${system.color.white};
      }
    }
  }

  #pricing {
    .card {
      background: ${system.color.neutral};

      @media ${system.breakpoints[2]} {
        background: #dedcee;
        width: 60%;
      }

      @media ${system.breakpoints[0]} {
        background: #dedcee;
        width: 90%;
      }
    }

    h2 {
      font-size: ${system.fontSizing.ml};
      text-align: center;
      padding-bottom: 0.5rem;
    }

    h3 {
      color: ${system.color.primary};
      font-size: ${system.fontSizing.m};
      margin-bottom: 2.5rem;
    }

    li {
      font-size: ${system.fontSizing.sm};
      margin-bottom: 1.5rem;
    }

    button, a {
      margin: 25px 0;
      color: ${system.color.white};
    }

    #coming-soon {
      background: ${system.color.captiontext};
      box-shadow: none;
      cursor: initial;
      :hover {
        box-shadow: none;
      }
    }

    @media ${system.breakpoints[0]} {
      ul {
        text-align: center;
      }
    }
  }
`
