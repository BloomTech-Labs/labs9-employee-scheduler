import styled from '@emotion/styled'
import system from '../../design/theme'

export const Container = styled('div')`
  margin: 0 7.5rem 5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  fieldset {
    width: 60%;
  }

  form {
    display: flex;
    position: relative;
    flex-flow: column nowrap;
    background: ${system.color.white};
    padding: ${system.spacing.bigPadding};
    border-radius: ${system.borders.bigRadius};
    box-shadow: ${system.shadows.otherLight};
    width: ${props => (props.settings ? '100%' : '60%')};
    margin-bottom: 20px;

    #instructions {
      font-size: ${system.fontSizing.m};
      margin-bottom: ${props => (props.billing ? '0px' : 'inherit')};
      color: ${system.color.bodytext};
    }

    .edit {
      position: absolute;
      top: 25px;
      right: 25px;
      font-size: ${system.fontSizing.s};
      color: ${system.color.primary};
      padding: 5px;
      border-radius: ${system.borders.radius};
      border: 1px solid ${system.color.primary};
      cursor: pointer;
      transition: ${system.transition};
      :hover {
        color: ${system.color.white};
        background: ${system.color.primary};
      }
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

    input[type='checkbox'] {
      margin-top: 10px;
      :first-of-type {
        margin-left: 5px;
      }
      :nth-of-type(2) {
        margin-left: 40px;
      }
    }

    ul {
      list-style-type: disc;
      margin: 2rem;
      li {
        font-size: ${system.fontSizing.sm};
        margin-bottom: 1rem;
      }
    }

    .StripeElement {
      padding: 10px;
      border-bottom: 2px solid #d2d2d2;
      transition: ${system.transition};
      font-size: 20px !important;

      input {
        font-family: 'Nunito' !important;
      }
    }

    .StripeElement--focus {
      border-bottom: 2px solid ${system.color.primary};
    }

    .StripeElement--invalid {
      border-bottom: 2px solid crimson !important;

      input {
        color: ${system.color.danger};
      }
    }

    button {
      width: 150px;
      margin-top: ${props => (props.billing ? '40px' : 'inherit')};
      background: ${props => (props.danger ? system.color.danger : null)};
    }
  }
`

export const Input = styled.input`
  font-size: ${system.fontSizing.m};
  color: ${system.color.bodytext};
  padding: 2.5px 5px;
  margin: 0.5rem 0 ${system.spacing.hugePadding};
  border: none;
  border-bottom: 2px solid
    ${props => (props.disabled ? 'none !important' : '#d2d2d2')};
  transition: ${system.transition};
  :disabled {
    background: ${system.color.white};
    color: ${system.color.bodytext};
  }
  :focus {
    border-bottom: 2px solid ${system.color.primary};
  }
`
