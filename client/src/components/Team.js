import React from 'react'
import OuterContainer from './common/OuterContainer'
import BreadCrumb from './BreadCrumb'
import Footer from './Footer'
import styled from '@emotion/styled'
import system from '../design/theme'
import Kam from '../img/Kam.jpg'
import Rahul from '../img/Rahul.jpg'
import Carlos from '../img/Carlos.jpg'
import Samuel from '../img/Samuel.jpg'

const Team = () => {
  return (
    <OuterContainer>
      <BreadCrumb location="Team" />
      <Container>
        <h1>Meet the Team</h1>

        <div className="teammate">
          <img src={Kam} alt="Kamry picture" />
          <div className="details">
            <h2>Kamry Bowman</h2>
            <p className="location">Denver, CO</p>
            <p className="bio">A Bio</p>
          </div>
        </div>

        <div className="teammate">
          <img src={Rahul} alt="Rahul picture" />
          <div className="details">
            <h2>Rahul Desai</h2>
            <p className="location">New York, NY</p>
            <p className="bio">
              Rahul is a Full Stack Web Engineer with a background in corporate
              strategy. In his past life as consultant, he helped numerous
              household brands dream up and launch new products, services, and
              experiences. He's looking to combine his business and technical
              skills to go from advising makers to being a maker himself. For
              fun, he reads every book he can get his hands on and cheers on the
              Georgetown Hoyas (no matter how disappointing they are).
            </p>
          </div>
        </div>

        <div className="teammate">
          <img src="" alt="Adam picture" />
          <div className="details">
            <h2>Adam Hinckley</h2>
            <p className="location">Boise, ID</p>
            <p className="bio">A Bio</p>
          </div>
        </div>

        <div className="teammate">
          <img src={Carlos} alt="Carlos picture" />
          <div className="details">
            <h2>Carlos Lantigua</h2>
            <p className="location">Greenville, NC</p>
            <p className="bio">
              Carlos is a Full Stack Developer and veteran of the Marine Corps
              who enjoys wearing different hats to extend his technical
              knowledge across the stack. He never wants to be the smartest guy
              in the room because that leaves no room for curiosity or growth.
              Balancing his roles as a full-time student and Project Manager at
              Lambda School, he is constantly surrounded by fascinating new
              technologies and amazing people with whom he can continue to
              learn. His wife and daughter provide him with inspiration and
              support.
            </p>
          </div>
        </div>

        <div className="teammate">
          <img src={Samuel} alt="Samuel picture" />
          <div className="details">
            <h2>Samuel Machat</h2>
            <p className="location">Charlottesville, VA</p>
            <p className="bio">A Bio</p>
          </div>
        </div>
      </Container>
      <Footer />
    </OuterContainer>
  )
}

export default Team

const Container = styled('div')`
  margin: 0 5rem;
  padding: 8rem 4rem;
  background: white;
  box-shadow: ${system.shadows.otherLight};
  position: relative;

  @media ${system.breakpoints[1]} {
    padding: 8rem 2rem;
  }

  .teammate {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 8rem 4rem;

    img {
      width: 220px;
      height: 220px;
      border-radius: 5px;
      box-shadow: ${system.shadows.button};
      margin-right: 4rem;
    }

    .details {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      width: 60%;

      h2 {
        margin: 1rem 0 0;

        color: ${system.color.primary};
        font-size: ${system.fontSizing.ml};

        @media ${system.breakpoints[1]} {
          font-size: ${system.fontSizing.m};
        }
      }

      p {
        margin-top: 10px;
        color: ${system.color.bodytext};
        font-size: ${system.fontSizing.sm};
        line-height: ${system.spacing.lineHeight};
      }

      .location {
        font-weight: bold;
        margin-bottom: 1rem;
      }
    }
  }
`
