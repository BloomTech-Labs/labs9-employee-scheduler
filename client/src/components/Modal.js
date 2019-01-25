import React from 'react'
import system from '../design/theme'
import styled from '@emotion/styled'

class Modal extends React.Component {
  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { toggleShow: this.props.toggleShow })
    )

    return (
      <StyledModal show={this.props.show}>
        {this.props.show ? childrenWithProps : null}
      </StyledModal>
    )
  }
}

export default Modal

const StyledModal = styled.div`
  display: ${props => (props.show ? null : 'none')};
  position: fixed;
  top: 75px;
  width: 100vw;
  height: 100vh;
  z-index: 200;
  background: ${system.color.bodytext};
  opacity: 0.98;

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
