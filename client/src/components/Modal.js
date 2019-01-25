import React from 'react'
import system from '../design/theme'
import styled from '@emotion/styled'

function makeCloseButton(close) {
  return props => (
    <Delete {...props} onClick={close}>
      {' '}
      ✕
    </Delete>
  )
}

class Modal extends React.Component {
  componentDidMount() {
    this.handleRoot()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.handleRoot()
    }
  }
  componentWillUnmount() {
    document.body.classList.remove('no-scroll')
  }

  handleRoot = () => {
    if (this.props.show) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        toggleShow: this.props.toggleShow,
        Close: makeCloseButton(this.props.toggleShow)
      })
    )

    return (
      <StyledModal
        className={!this.props.show ? 'hidden' : undefined}
        show={this.props.show}
      >
        <div>{this.props.show ? childrenWithProps : null}</div>
      </StyledModal>
    )
  }
}

export default Modal

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background: ${system.color.bodytext};
  opacity: 0.98;
  transition: opacity 0s, z-index 0s, opacity 0.5s linear;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    transition: transform 0.3s linear;
  }

  &.hidden {
    z-index: -1;
    opacity: 0;
    transition: z-index 0.9s, opacity 0.5s linear;

    & > div {
      transform: scaleY(0);
      transition: transform 0.5 linear;
    }
  }
`
const Delete = styled.p`
/* button resets */
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;
}

/* Remove excess padding and border in Firefox 4+ */
&::-moz-focus-inner {
    border: 0;
    padding: 0;button resets
}

/* actual styles */
    font-size: ${system.fontSizing.m};
    color: ${system.color.lightgrey};
    cursor: pointer;
    :hover {
      color: ${system.color.danger};
    }
  }
`

// Usage Example

// class Example extends React.Component {
//  state = {
//     show: false
//   }

//   toggleShow = () => {
//     this.setState({
//       show: !this.state.show
//     })
//   }

//   render() {
//     return (
//        <OuterContainer>
//           <Button onClick={this.toggleShow}>Initialize Modal</Button>
//           <Modal show={this.state.show} toggleShow={this.toggleShow}>
//             <WhatYouWantInTheModal/>
//           </Modal>
//       </OuterContainer>
//   }
// }

// then inside the component you pass to the modal you get two props, Close, which is a styled X button you can use in your component inside the modal to close it, and toggleShow, which is a method you can use to grammatically close the modal if desired

// function WhatYouWantInTheModal(props) {
//     const { Close, toggleShow } = this.props
//    return (
//       <Container>
//            <Close />
//           <p>My Smart Words</p>
//     </Container>
// )
// }
