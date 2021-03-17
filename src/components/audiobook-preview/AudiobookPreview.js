import React, { Component } from 'react';
import './AudiobookPreview.css';

import { UserContext } from '../../contexts/UserContext';

class AudiobookPreview extends Component {
  static contextType = UserContext;
  state = {
    holdTimer: null,
    deleteEnabled: false,
    justToggled: false,
  };
  componentDidMount() {
    console.log(this.props.selected);
  }
  handleMouseDown = (e) => {
    this.setState({
      holdTimer: setTimeout(() => {
        if (!this.props.selected && this.context?.user?.isAdmin) {
          this.setState({ deleteEnabled: !this.state.deleteEnabled });
          this.setState({ justToggled: true });
        }
      }, 1000),
    });
  };
  handleMouseUp = (e) => {
    clearTimeout(this.state.holdTimer);
    this.setState({ justToggled: false });
    if (!this.state.deleteEnabled && !this.state.justToggled) {
      this.props.onClicked();
    }
  };
  render() {
    const { coverImage, title, author, selected } = this.props;
    return (
      <div
        className={`audiobook-preview ${selected ? 'selected' : ''} ${
          this.state.deleteEnabled ? 'edit-enabled' : ''
        }`}
        onMouseDown={(e) => this.handleMouseDown(e)}
        onMouseUp={(e) => this.handleMouseUp(e)}
      >
        <div className="container">
          <img src={coverImage} alt="" className="cover" draggable="false" />
          <div
            className={`remove-button ${
              this.state.deleteEnabled ? 'visible' : ''
            }`}
            onClick={(e) =>
              this.props.onAudiobookRemove(this.props.audiobookID)
            }
          />
          <div className="text">
            <div className="title">{title}</div>
            <div className="author">{author}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AudiobookPreview;
