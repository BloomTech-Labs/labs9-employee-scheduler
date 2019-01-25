import system from '../../design/theme'
import styled from '@emotion/styled'

export const Message = styled('div')`
  margin-top: 30px;
  font-size: ${system.fontSizing.sm};
`

export const Card = styled.div`
  background: ${system.color.white};
  padding: ${system.spacing.bigPadding};
  margin: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  box-shadow: ${system.shadows.otherLight};
  display: flex;
  flex-flow: column nowrap;
  min-width: 30rem;
  width: 28%;

  @media ${system.breakpoints[2]} {
    width: 80%;
  }
`

export const Container = styled('div')`
  width: 100%;
  padding: ${system.spacing.container};
  display: flex;
  flex-direction: column;
  justify-content: center;

  h6 {
    font-size: ${system.fontSizing.m};
    margin: 1rem 0;
  }

  .employee-welcome {
    font-size: ${system.fontSizing.l};
    margin: 15px 0 58px 0;
    text-align: center;
  }

  .wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    width: 100%;

    @media ${system.breakpoints[2]} {
      flex-flow: column nowrap;
      align-items: center;
    }

    .title {
      width: 100%;
      min-width: 26.8rem;
      max-width: 50rem;
      margin-bottom: 3rem;

      h5 {
        font-size: ${system.fontSizing.ml};
        text-align: center;
      }
    }
  }
`
