import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './AudiobookAddBuilder.css';

class AudiobookAddBuilder extends Component {
  static contextType = UserContext;
  state = {};
  render() {
    return (
      <div className="audiobook-add-builder">
        <div className="builder header">
          <div className="stepper">
            Step <span className="current-step">1</span> of 2
          </div>
          <h1>Add audiobook</h1>
          <h2>Publish an audiobook to the public repository</h2>
        </div>
        <div className="tool-wrapper">
          <div className="drag-wrapper">
            <div className="drag-target">
              <div className="text">Drag cover image here</div>
            </div>
          </div>
          <div className="custom-field fields">
            <label>Title</label>
            <input type="text" placeholder="The Life of John Ruskin" />
            <label>Author</label>
            <input type="text" placeholder="William Gershom Collingwood" />
            <div className="f-unit">
              <label>Genre</label>
              <input type="text" placeholder="Memoirs" className="half-size" />
            </div>
            <div className="f-unit">
              <label>Language</label>
              <input type="text" placeholder="Language" className="half-size" />
            </div>
            <label>Description</label>
            <textarea
              className="description"
              placeholder="W. G. Collingwood became a student of John Ruskin in 1872 when he started his study in University College, Oxford. "
            ></textarea>
          </div>
          <div className="action-button">Continue</div>
        </div>
      </div>
    );
  }
}

export default AudiobookAddBuilder;
