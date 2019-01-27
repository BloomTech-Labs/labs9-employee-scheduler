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
  ref = React.createRef()

  componentDidMount() {
    this.handleUpdate()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.handleUpdate()
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('no-scroll')
    document.removeEventListener('click', this.handlePageClick)
  }

  handlePageClick = e => {
    const display = this.ref.current
    if (!display.contains(e.target)) {
      this.props.toggleShow()
    }
  }

  handleUpdate = () => {
    if (this.props.show) {
      document.body.classList.add('no-scroll')
      document.addEventListener('click', this.handlePageClick)
    } else {
      document.body.classList.remove('no-scroll')
      document.removeEventListener('click', this.handlePageClick)
    }
  }

  render() {
    const Close = makeCloseButton(this.props.toggleShow)
    const { children, toggleShow, ...rest } = this.props

    const childrenWithProps =
      typeof children === 'function'
        ? children({ toggleShow, Close, ...rest })
        : React.Children.map(children, child =>
            React.cloneElement(child, {
              toggleShow,
              Close
            })
          )

    return (
      <StyledModal
        className={!this.props.show ? 'hidden' : undefined}
        show={this.props.show}
      >
        <div ref={this.ref}>{this.props.show ? childrenWithProps : null}</div>
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
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background: ${system.color.bodytext};
  opacity: 0.98;
  transition: opacity 0s, z-index 0s, opacity 0.5s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  padding-top: ${system.spacing.breadCrumb};
  @media ${system.breakpoints[0]} {
    align-items: stretch;
  }

  & > div {
    transition: transform 0.3s linear;
    padding: ${system.spacing.bigPadding};

    @media ${system.breakpoints[0]} {
      padding: 0;
      width: 100%;
      min-height: 100%;
    }
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
