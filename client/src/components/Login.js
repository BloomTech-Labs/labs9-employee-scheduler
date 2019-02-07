import React, { Component } from 'react'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'
import EmptyScreen from './EmptyScreen'
import Loader from './Loader'
import { authenticate } from '../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from '@emotion/styled'
import system from '../design/theme'

const StyledFirebaseAuth = React.lazy(() =>
  import('react-firebaseui/StyledFirebaseAuth')
)

class Login extends Component {
  uiConfig = {
    // Configure FirebaseUI.
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // We will display Google and Facebook as auth providers.
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    credentialHelper: 'none',
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  }
  render() {
    if (this.props.user) {
      // redirect to home once/if user is in the store
      return <Redirect to="/" />
    } else if (this.props.isNewUser) {
      return <Redirect to="/register" />
    } else {
      return (
        <EmptyScreen auth background>
          <Container>
            <React.Suspense fallback={<Loader />}>
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </React.Suspense>
          </Container>
        </EmptyScreen>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isNewUser: state.auth.isNewUser
  }
}

export default connect(
  mapStateToProps,
  { authenticate }
)(Login)

const Container = styled('div')`
  /* my custom styles applied to Container */
  height: 60vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    width: 100%;
    font-size: ${system.fontSizing.l};
  }
  form {
    display: flex;
    position: relative;
    flex-flow: column nowrap;
    background: ${system.color.white};
    padding: ${system.spacing.bigPadding};
    border-radius: ${system.borders.bigRadius};
    /* box-shadow: ${system.shadows.otherLight}; */
    width: 100%;
    margin: 20px 0;

    label {
      font-size: ${system.fontSizing.s};
      padding: 0 5px;
      text-transform: uppercase;
      /* margin-bottom: 0.5rem; */
      color: ${system.color.captiontext};

      @media ${system.breakpoints[0]} {
        font-size: 1.1rem;
      }
    }

    input {
      font-size: ${system.fontSizing.m};
      color: ${system.color.bodytext};
      padding: 2.5px 5px;
      /* margin: 0.5rem 0 ${system.spacing.hugePadding}; */
      border: none;
      border-bottom: 2px solid #d2d2d2;
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
    }

    /* -----sign in with email section */
    /* main container */
    .firebaseui-title {
      width: 100%;
      margin: 0;
      margin-bottom: 30px;
      padding: 0;
    }

    .mdl-card.mdl-shadow--2dp.firebaseui-container.firebaseui-id-page-sign-in {
      /* subContainer for sign in with Email */
      /* entire container for both buttons */
      .firebaseui-card-actions {
        /* spacing for the 2 buttons */
        display: flex;
        flex-direction: row;
        width: 279px;
        justify-content: space-around;
        .firebase-card-content {
          /* Cancel button */
          .firebaseui-id-secondary-link
            .firebaseui-button
            .mdl-button
            .mdl-js-button
            .mdl-button--primary {
            cursor: pointer;
            border-radius: ${system.borders.radius};
            border: ${system.borders.transparent};
            color: ${system.color.neutral};
            background: ${system.color.primary};
            box-shadow: ${system.shadows.button};
            font-size: ${system.fontSizing.sm};
            padding: ${system.spacing.standardPadding};
            transition: ${system.transition};
            outline: none;
            :hover {
              box-shadow: ${system.shadows.other};
            }
          }
          /* Next button */
          .firebaseui-id-submit.firebaseui-button.mdl-button.mdl-js-button.mdl-button--raised.mdl-button--colored {
            cursor: pointer;
            border-radius: ${system.borders.radius};
            border: ${system.borders.transparent};
            color: ${system.color.neutral};
            background: ${system.color.primary};
            box-shadow: ${system.shadows.button};
            font-size: ${system.fontSizing.sm};
            padding: 1.5px 15px;
            transition: ${system.transition};
            outline: none;
            :hover {
              box-shadow: ${system.shadows.other};
            }
          }
        }
      }
    }
  }
`
