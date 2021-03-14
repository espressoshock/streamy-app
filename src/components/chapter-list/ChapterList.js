import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './ChapterList.css';

class ChapterList extends Component {
  static contextType = UserContext;
  state = {};

  handleTrackClick = (chapterID) => {
    this.props.onTrackChange(chapterID);
  };

  render() {
    return (
      <div className="chapter-list">
        <div className="container">
          <ol>
            {this.context.selectedAudiobook.chapters.map((chapter, key) => {
              return (
                <li
                  key={key}
                  onClick={() => this.handleTrackClick(chapter._id)}
                >
                  <div className="index">{('0' + chapter.index).slice(-2)}</div>
                  <div className="details">
                    <div className="title">{chapter.title}</div>
                    <div className="reader">{chapter.reader}</div>
                  </div>
                  <div className="duration">{chapter.duration}</div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default ChapterList;
