import React, { Component } from 'react';
import './AudiobookPreview.css';

class AudiobookPreview extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props.selected);
  }
  render() {
    const { coverImage, title, author, audiobookID, selected } = this.props;
    return (
      <div
        className={`audiobook-preview ${selected ? 'selected' : ''}`}
        onClick={this.props.onClicked}
      >
        <div className="container">
          <img src={coverImage} alt="" className="cover" />
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
