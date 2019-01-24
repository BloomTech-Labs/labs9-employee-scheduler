import React from 'react'
import styled from '@emotion/styled'
import system from '../../design/theme'

class DeleteButton extends React.Component {
  state = {
    active: 'centerMe',
    span: 'Delete',
    done: false
  }

  toggleClass = () => {
    const { active } = this.state
    if (active === 'centerMe') {
      return this.setState({
        active: 'centerMe confirm',
        span: 'Are you sure?'
      })
    }

    if (active === 'centerMe confirm') {
      this.setState({ active: 'centerMe confirm done', span: 'Deleted' })
      setTimeout(() => {
        return this.setState({ done: true })
      }, 2000)
    }
  }

  render() {
    const { active, span, done } = this.state
    return (
      <DeleteConatainer>
        {done === false ? (
          <button className={active} onClick={this.toggleClass}>
            <div className="icon">
              <i className="fas fa-trash-alt" />
              <i className="fas fa-question" />
              <i className="fas fa-check" />
            </div>
            <div className="text">
              <span>{span}</span>
            </div>
          </button>
        ) : (
          <button className={active} onClick={this.props.deleteExpiredRequest}>
            <div className="icon">
              <i className="fas fa-trash-alt" />
              <i className="fas fa-question" />
              <i className="fas fa-check" />
            </div>
            <div className="text">
              <span>{span}</span>
            </div>
          </button>
        )}
      </DeleteConatainer>
    )
  }
}

export default DeleteButton

const DeleteConatainer = styled('div')`
  button {
    margin-left: 20px;
    display: flex;
    margin-top: 36px;
    align-items: center;
    cursor: pointer;
    border: 0;
    background: transparent;
    padding: 0;
    outline: 0;
    overflow: hidden;
    .icon {
      position: relative;
      background: #1d242b;
      line-height: 30px;
      width: 30px;
      height: 30px;
      text-align: center;
      color: #fff;
      font-size: 18px;
      transition: 0.2s color;
      border-radius: 2px;
      .fas {
        width: 30px;
        transition: 0.2s all;
      }
      .fa-check {
        color: #38bb7c;
      }
      .fa-question {
        color: #2492ff;
      }
      &:after {
        content: ' ';
        display: block;
        position: absolute;
        width: 5px;
        height: 5px;
        transform: rotate(45deg);
        background: #1d242b;
        top: 12.5px;
        right: 1px;
        transition: 0.2s right;
        z-index: 1;
      }
    }
    .text {
      position: relative;
      width: 0;
      height: 30px;
      overflow: hidden;
      background: ${system.color.primary};
      text-align: center;
      line-height: 30px;
      color: #fff;
      font-weight: 300;
      transition: 0.2s all;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      span {
        width: 100%;
        opacity: 0;
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        transition: 0.3s all;
      }
    }
    &:hover {
      .icon {
        color: #f34541;
        border-radius: 0;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        &:after {
          right: -2px;
        }
      }
      .text {
        width: 120px;
        span {
          opacity: 1;
          top: 0;
        }
      }
    }
    &.confirm {
      .icon {
        border-radius: 0;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        .fas {
          transform: translateY(-30px);
          &:after {
            right: -2px;
          }
        }
      }
      .text {
        background: ${system.color.danger};
        width: 120px;
        span {
          opacity: 1;
          top: 0;
        }
      }
    }
    &.done {
      .icon {
        border-radius: 0;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        .fas {
          transform: translateY(-60px);
        }
        &:after {
          right: -2px;
        }
      }
      .text {
        background: ${system.color.success};
        width: 120px;
        span {
          opacity: 1;
          top: 0;
        }
      }
    }
  }

  @keyframes fadeInZoom {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`
