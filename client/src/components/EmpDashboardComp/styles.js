import system from '../../design/theme'
import styled from '@emotion/styled'

export const Message = styled('div')`
  margin-top: 30px;
  font-size: ${system.fontSizing.sm};
`

export const Container = styled('div')`
  width: 100%;
  padding: ${system.spacing.container};
  display: flex;
  flex-direction: column;
  justify-content: center;
  h6 {
    font-size: ${system.fontSizing.m};
    margin: 10px 0;
  }
  .employee-welcome {
    font-size: ${system.fontSizing.l};
    margin: 15px 0 58px 0;
  }
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    .title {
      width: 100%;
      min-width: 268px;
      max-width: 500px;
      h5 {
        font-size: ${system.fontSizing.ml};
      }
    }
  }
`
export const AssignedWrapper = styled('div')`
  background: ${system.color.white};
  padding: ${system.spacing.standardPadding};
  margin: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  width: 300px;
  box-shadow: ${system.shadows.other};
  text-align: center;
  .details {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin: 33px auto;
    .date {
      min-width: 128px;
    }
    .reason {
      width: 300px;
    }
    p {
      text-align: center;
      width: 100%;
      padding: 2.5px 7.5px;
      font-family: ${props => (props.main ? "'Lato', sans-serif" : 'inherit')};
      font-weight: ${props => (props.main ? 'bold' : null)};
      color: ${props =>
        props.main ? system.color.primary : system.color.captiontext};
      font-size: ${system.fontSizing.sm};
      line-height: ${system.spacing.lineHeight};
    }
  }
`

export const TofWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  background: ${system.color.white};
  padding: ${system.spacing.standardPadding};
  margin: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  width: 500px;
  box-shadow: ${system.shadows.other};
  text-align: center;

  .details {
    display: flex;
    flex-direction: row;
    margin: 33px auto;

    .box {
      display: flex;
      flex-direction: row;
      width: 90%;
      .date {
        min-width: 128px;
      }
      .reason {
        width: 300px;
      }

      p {
        text-align: center;
        width: 100%;
        padding: 2.5px 7.5px;
        font-family: ${props =>
          props.main ? "'Lato', sans-serif" : 'inherit'};
        font-weight: ${props => (props.main ? 'bold' : null)};
        color: ${props =>
          props.main ? system.color.primary : system.color.captiontext};
        font-size: ${system.fontSizing.sm};
        line-height: ${system.spacing.lineHeight};
      }
    }
  }
`
