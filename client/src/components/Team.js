import React from 'react'
import OuterContainer from './common/OuterContainer'
import TopBar from './common/TopBar'
import Footer from './common/Footer'
import styled from '@emotion/styled'
import system from '../design/theme'
import Kam from '../img/Kam.jpg'
import Rahul from '../img/Rahul.jpg'
import Carlos from '../img/Carlos.jpg'
import Samuel from '../img/Samuel.jpg'
import Adam from '../img/Adam.jpg'

const Team = () => {
  return (
    <OuterContainer>
      <TopBar location="Team" />
      <Container>
        <h1>Meet the Team</h1>

        <div className="teammate">
          <img src={Kam} alt="Kamry headshot" />
          <div className="details">
            <h2>Kamry Bowman</h2>
            <p className="location">Denver, CO</p>
            <p className="bio">
              Kam is a full-stack web developer with a love for all things
              JavaScript: React and Node.js especially! He was previously a loan
              officer and underwriter for SBA loans to small businesses. Today,
              he strives to bring simplicity to the process of building complex
              web applications. Solving problems by thinking them through
              clearly is what makes him happiest, and he strives to help people
              get the information they need and experiences they want. He loves
              working on teams that feel the same way.
            </p>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/kamry-bowman"
                alt="Kam's GitHub"
              >
                GitHub
              </a>{' '}
              |{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/kamry-bowman/"
                alt="Kam's LinkedIn"
              >
                LinkedIn
              </a>{' '}
              |{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/MispelledToyota"
                alt="Kam's Twitter"
              >
                Twitter
              </a>
            </p>
          </div>
        </div>

        <div className="teammate">
          <img src={Rahul} alt="Rahul headshot" />
          <div className="details">
            <h2>Rahul Desai</h2>
            <p className="location">New York, NY</p>
            <p className="bio">
              Rahul is a full-stack web developer with a background in corporate
              strategy. In his past life as consultant, he helped numerous
              household brands dream up and launch new products, services, and
              experiences. He's looking to combine his business and technical
              skills to go from advising makers to being a maker himself. For
              fun, he reads every book he can get his hands on and cheers on the
              Georgetown Hoyas (no matter how disappointing they are).
            </p>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/rd825"
                alt="Rahul's GitHub"
              >
                GitHub
              </a>{' '}
              |{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/rdesai01/"
                alt="Rahul's LinkedIn"
              >
                LinkedIn
              </a>{' '}
              |{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/RDesai01"
                alt="Rahul's Twitter"
              >
                Twitter
              </a>
            </p>
          </div>
        </div>

        <div className="teammate">
          <img src={Adam} alt="Adam headshot" />
          <div className="details">
            <h2>Adam Hinckley</h2>
            <p className="location">Boise, ID</p>
            <p className="bio">
              Adam is a full-stack web developer and a family man with an
              amazing wife and four kids. He has a background in the life
              insurance business where he found a love for programming when he
              created software solutions that solved underwriting problems for
              over 2,000 agents. When he's not busy coding, Adam loves to enjoy
              the great outdoors with his family.
            </p>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/adamhinckley"
                alt="Adam's GitHub"
              >
                GitHub
              </a>{' '}
              |{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/adamhinckley/"
                alt="Adam's LinkedIn"
              >
                LinkedIn
              </a>{' '}
              |{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/HinckleyAdam"
                alt="Adam's Twitter"
              >
                Twitter
              </a>
            </p>
          </div>
        </div>

        <div className="teammate">
          <img src={Carlos} alt="Carlos headshot" />
          <div className="details">
            <h2>Carlos Lantigua</h2>
            <p className="location">Greenville, NC</p>
            <p className="bio">
              Carlos is a full-stack web developer and veteran of the Marine
              Corps who enjoys wearing different hats to extend his technical
              knowledge across the stack. He never wants to be the smartest guy
              in the room because that leaves no room for curiosity or growth.
              Balancing his roles as a full-time student and Project Manager at
              Lambda School, he is constantly surrounded by fascinating new
              technologies and amazing people with whom he can continue to
              learn. His wife and daughter provide him with inspiration and
              support.
            </p>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/CLantigua2"
                alt="Carlos' GitHub"
              >
                GitHub
              </a>{' '}
              |{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/carlos-lantigua/"
                alt="Carlos' LinkedIn"
              >
                LinkedIn
              </a>{' '}
              |{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/CodeLantigua"
                alt="Carlos' Twitter"
              >
                Twitter
              </a>
            </p>
          </div>
        </div>

        <div className="teammate">
          <img src={Samuel} alt="Samuel headshot" />
          <div className="details">
            <h2>Samuel Machat</h2>
            <p className="location">Charlottesville, VA</p>
            <p className="bio">
              Samuel is a full-stack web developer with a passion for solving
              complex problems with clean, simple code. Previously he worked in
              the specialty coffee world, where he cultivated an interest in
              product excellence and clear, friendly customer relations. He
              enjoys working on teams that value communication, quality, and
              continual learning. In his life away from the computer, he enjoys
              time with family, good books, and yoga.
            </p>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/axolotl"
                alt="Samuel's GitHub"
              >
                GitHub
              </a>{' '}
              |{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/samuel-machat/"
                alt="Samuel's LinkedIn"
              >
                LinkedIn
              </a>{' '}
              |{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/samuelmachat"
                alt="Samuel's Twitter"
              >
                Twitter
              </a>
            </p>
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
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }

  .teammate {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 8rem 4rem;

    @media ${system.breakpoints[1]} {
      margin: 6rem 2rem;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }

    img {
      width: 220px;
      height: 220px;
      border-radius: 5px;
      box-shadow: ${system.shadows.button};
      margin-right: 4rem;

      @media ${system.breakpoints[1]} {
        margin-right: 0;
        margin-bottom: 4rem;
      }
    }

    .details {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      width: 60%;

      @media ${system.breakpoints[1]} {
        justify-content: center;
        align-items: center;
        width: 80%;
      }

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

        a {
          color: ${system.color.primary};
        }
      }

      .location {
        font-weight: bold;
        margin: 0.5rem 0 1rem;
      }
    }
  }
`
