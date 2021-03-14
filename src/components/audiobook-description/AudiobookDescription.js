import React, { Component } from 'react';
import './AudiobookDescription.css';

class AudiobookDescription extends Component {
  state = {};
  render() {
    const {
      title,
      author,
      description,
      coverUrl,
      genre,
      language,
    } = this.props;
    return (
      <div className="audiobook-description">
        <div className="container">
          <img src={coverUrl} alt="" className="cover" />
          <div className="text">
            <div className="title">{title}</div>
            <div className="author">{author}</div>
            <div className="description">{description}</div>
            <div className="tag-list">
              <div className="tag">{genre}</div>
              <div className="tag lang">{language}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AudiobookDescription;
