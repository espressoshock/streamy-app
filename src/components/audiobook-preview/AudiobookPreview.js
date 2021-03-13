import React, { Component } from 'react';
import './AudiobookPreview.css';

class AudiobookPreview extends Component {
  state = {};
  render() {
    const { coverUrl, title, author } = this.props;
    return (
      <div className="audiobook-preview">
        <div className="container">
          <img src={coverUrl} alt="" className="cover" />
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
