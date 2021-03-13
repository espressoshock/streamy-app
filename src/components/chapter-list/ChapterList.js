import React, { Component } from 'react';
import './ChapterList.css';

class ChapterList extends Component {
  state = {};
  render() {
    const { title, author, description, coverUrl, tags } = this.props;
    return (
      <div className="chapter-list">
        <div className="container">
          <ol>
            <li>
              <div className="index">01</div>
              <div className="details">
                <div className="title">Preface to the seventh edition</div>
                <div className="reader">Xiaoyan Arrowsmith</div>
              </div>
              <div className="duration">00:02:04</div>
            </li>
            <li className="active">
              <div className="index">01</div>
              <div className="details">
                <div className="title">Preface to the seventh edition</div>
                <div className="reader">Xiaoyan Arrowsmith</div>
              </div>
              <div className="duration">00:02:04</div>
            </li>
            <li>
              <div className="index">01</div>
              <div className="details">
                <div className="title">Preface to the seventh edition</div>
                <div className="reader">Xiaoyan Arrowsmith</div>
              </div>
              <div className="duration">00:02:04</div>
            </li>
            <li>
              <div className="index">01</div>
              <div className="details">
                <div className="title">Preface to the seventh edition</div>
                <div className="reader">Xiaoyan Arrowsmith</div>
              </div>
              <div className="duration">00:02:04</div>
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default ChapterList;
