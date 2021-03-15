import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './ChapterAddBuilder.css';

class ChapterAddBuilder extends Component {
  static contextType = UserContext;
  state = {};
  render() {
    return (
      <div className="chapter-add-builder">
        <div className="builder header">
          <div className="stepper">
            Step <span className="current-step">2</span> of 2
          </div>
          <h1>Add Chapters</h1>
          <h2>Publish chapters to the public repository</h2>
        </div>
        <div className="tool-wrapper">
          <div className="chapter-list">
            <ol>
              <li>
                <div className="index">01</div>
                <div className="details">
                  <div className="title">Preface to the seventh edition</div>
                  <div className="reader">Xiaoyan Arrowsmith</div>
                </div>
                <div className="duration">00:02:47</div>
              </li>
              <li>
                <div className="index">01</div>
                <div className="details">
                  <div className="title">Preface to the seventh edition</div>
                  <div className="reader">Xiaoyan Arrowsmith</div>
                </div>
                <div className="duration">00:02:47</div>
              </li>
              <li>
                <div className="index">01</div>
                <div className="details">
                  <div className="title">Preface to the seventh edition</div>
                  <div className="reader">Xiaoyan Arrowsmith</div>
                </div>
                <div className="duration">00:02:47</div>
              </li>
              <li>
                <div className="index">01</div>
                <div className="details">
                  <div className="title">Preface to the seventh edition</div>
                  <div className="reader">Xiaoyan Arrowsmith</div>
                </div>
                <div className="duration">00:02:47</div>
              </li>
              <li>
                <div className="index">01</div>
                <div className="details">
                  <div className="title">Preface to the seventh edition</div>
                  <div className="reader">Xiaoyan Arrowsmith</div>
                </div>
                <div className="duration">00:02:47</div>
              </li>
            </ol>
          </div>
          <div className="custom-field fields">
            <label>Title</label>
            <input type="text" placeholder="Preface To The Seventh Edition" />
            <label>Reaer</label>
            <input type="text" placeholder="John William Smith" />
            <div className="f-unit">
              <label>Duration</label>
              <input type="text" placeholder="00" className="u-size" />
              <div className="separator">:</div>
              <input type="text" placeholder="00" className="u-size" />
              <div className="separator">:</div>
              <input type="text" placeholder="00" className="u-size" />
            </div>
            <div className="drag-wrapper">
              <label>Audiotrack</label>
              <div className="drag-target">
                <div className="text">Drag Audiotrack file here</div>
              </div>
            </div>
            <div className="action-button">Upload</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChapterAddBuilder;
