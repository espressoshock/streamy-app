import React, { Component } from 'react';
import './AudiobookDescription.css';

class AudiobookDescription extends Component {
  state = {};
  render() {
    const { title, author, description, coverUrl, tags } = this.props;
    return (
      <div className="audiobook-description">
        <div className="container">
          <img src={coverUrl} alt="" className="cover" />
          <div className="text">
            <div className="title">{title}</div>
            <div className="author">{author}</div>
            <div className="description">{description}</div>
            <div className="tag-list">
              <div className="tag">Memories</div>
              <div className="tag lang">English</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AudiobookDescription;
