import styled from '@emotion/styled'
import system from '../../design/theme'

export const Container = styled('div')`
  margin: 0 7.5rem 5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  @media ${system.breakpoints[1]} {
    margin: 0 0 5rem;
  }

  fieldset {
    width: 60%;

    @media ${system.breakpoints[1]} {
      width: 80%;
    }
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
    margin: 20px 0;

    @media ${system.breakpoints[1]} {
      width: ${props => (props.settings ? '100%' : '80%')};
    }

    #instructions {
      font-size: ${system.fontSizing.ml};
      margin-bottom: 40px;
      color: ${system.color.bodytext};
      width: 80%;

      @media ${system.breakpoints[0]} {
        font-size: ${system.fontSizing.sm};
      }
    }

    .edit {
      position: absolute;
      top: 25px;
      right: 25px;
      font-size: ${system.fontSizing.sm};
      color: ${system.color.white};
      background: ${system.color.primary};
      padding: 7.5px 10px;
      border-radius: ${system.borders.radius};
      border: 1px solid ${system.color.primary};
      cursor: pointer;
      transition: ${system.transition};
      :hover {
        color: ${system.color.primary};
        background: ${system.color.white};
      }

      @media ${system.breakpoints[1]} {
        font-size: 1.1rem;
      }
    }

    label {
      font-size: ${system.fontSizing.s};
      padding: 0 5px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      color: ${system.color.captiontext};

      @media ${system.breakpoints[0]} {
        font-size: 1.1rem;
      }
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
      @media ${system.breakpoints[0]} {
        margin: 1.5rem;
      }

      li {
        font-size: ${system.fontSizing.sm};
        margin-bottom: 1.5rem;
        @media ${system.breakpoints[0]} {
          font-size: 1.5rem;
        }
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
      margin-top: ${props => (props.billing ? '4rem' : 'inherit')};
      background: ${props => (props.danger ? system.color.danger : null)};
    }
  }
`

export const Input = styled.input`
  font-size: ${system.fontSizing.m};
  color: ${system.color.bodytext};
  padding: 2.5px 5px;
  margin: 0.5rem 0 ${system.spacing.hugePadding};
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${props =>
      props.disabled
        ? 'none !important'
        : props.search
        ? system.color.lightgrey
        : '#d2d2d2'};
  transition: ${system.transition};
  :disabled {
    background: ${system.color.white};
    color: ${system.color.bodytext};
  }
  :focus {
    border-bottom: 2px solid ${system.color.primary};
  }

  @media ${system.breakpoints[0]} {
    font-size: ${system.fontSizing.sm};
  }
`

export const Form = styled.form`
  display: flex;
  position: relative;
  flex-flow: column nowrap;

  #instructions {
    font-size: ${system.fontSizing.m};
    margin-bottom: 20px;
    color: ${system.color.bodytext};
    width: 80%;

    @media ${system.breakpoints[0]} {
      font-size: ${system.fontSizing.sm};
    }
  }

  label {
    font-size: ${system.fontSizing.s};
    padding: 0 5px;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    color: ${system.color.captiontext};

    @media ${system.breakpoints[0]} {
      font-size: 1.1rem;
    }
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    box-shadow: 0 0 0px 1000px white inset;
  }

  button {
    width: 150px;
    margin-top: ${props => (props.billing ? '4rem' : 'inherit')};
    background: ${props => (props.danger ? system.color.danger : null)};
  }
`
