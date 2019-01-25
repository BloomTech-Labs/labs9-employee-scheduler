import React from 'react'
import system from '../design/theme'
import styled from '@emotion/styled'

class Modal extends React.Component {
  componentDidMount() {
    this.handleRoot()
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps.show, this.props.show)
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
      React.cloneElement(child, { toggleShow: this.props.toggleShow })
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
  top: 75px;
  width: 100vw;
  height: 100vh;
  z-index: 200;
  background: ${system.color.bodytext};
  opacity: 0.98;
  transition: opacity 0s, z-index 0s, opacity 0.5s linear;

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

  .delete {
    position: absolute;
    font-size: ${system.fontSizing.m};
    top: 2.5rem;
    right: 2.5rem;
    color: ${system.color.lightgrey};
    cursor: pointer;

    :hover {
      color: ${system.color.danger};
    }
  }
`
