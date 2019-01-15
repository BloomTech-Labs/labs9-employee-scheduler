import styled from '@emotion/styled'
import system from '../../design/theme'

export const Container = styled('div')`
  width: 100%;
  min-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .wrapper {
    margin: 30px auto 0 auto;
    width: 100%;
    max-width: 900px;
    min-width: 500px;
    padding: ${system.spacing.container};
    .headerText {
      font-size: ${system.fontSizing.l};
      margin-bottom: 30px;
    }
    form {
      width: 100%;
      .form-group {
        .form-label {
          text-transform: uppercase;
          font-weight: bold;
          font-size: ${system.fontSizing.s};
        }
      }
      .drop-down {
        display: flex;
        flex-direction: column;
        height: 200px;
        label {
          text-transform: uppercase;
          font-weight: bold;
          font-size: ${system.fontSizing.s};
          margin: 20px 0 20px 0;
        }
        select {
          font-size: ${system.fontSizing.m};
          border: ${system.borders.transparent};
          border-radius: ${system.borders.radius};
          outline: none;
          cursor: pointer;
        }
      }
      .register {
        justify-content: flex-end;
        padding: ${system.spacing.standardPadding};
        background-color: ${system.color.primary};
        color: ${system.color.neutral};
        box-shadow: ${system.shadows.button};
        border-radius: ${system.borders.radius};
        border: ${system.borders.transparent};
        font-size: ${system.fontSizing.m};
        letter-spacing: 1px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          box-shadow: ${system.shadows.buttonHoverLight};
          background-color: ${system.color.hoverPrimary};
        }
      }
    }
  }
`
