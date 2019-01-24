import styled from '@emotion/styled'
import system from '../../design/theme'

export const Container = styled('div')`
  margin: 0 7.5rem 5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    position: relative;
    flex-flow: column nowrap;
    background: ${system.color.white};
    padding: ${system.spacing.bigPadding};
    border-radius: ${system.borders.bigRadius};
    box-shadow: ${system.shadows.otherLight};
    width: 60%;

    #instructions {
      font-size: ${system.fontSizing.m};
      margin-bottom: 50px;
      color: ${system.color.bodytext};
    }

    label {
      font-size: ${system.fontSizing.s};
      padding: 0 5px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      color: ${system.color.captiontext};
    }

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset;
      box-shadow: 0 0 0px 1000px white inset;
    }

    button {
      width: 150px;
    }
  }
`

export const Input = styled.input`
  font-size: ${system.fontSizing.m};
  color: ${system.color.bodytext};
  padding: 2.5px 5px;
  margin: 0.5rem 0 ${system.spacing.hugePadding};
  border: none;
  border-bottom: 2px solid #d2d2d2;
  transition: ${system.transition};
  :focus {
    border-bottom: 2px solid ${system.color.primary};
  }
`
