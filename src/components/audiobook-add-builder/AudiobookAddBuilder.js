import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './AudiobookAddBuilder.css';

import qs from 'qs';

class AudiobookAddBuilder extends Component {
  static contextType = UserContext;
  state = {
    uploaderActive: false,
    coverImagePreview: null,
    coverImageData: null,
    title: '',
    author: '',
    genre: '',
    language: '',
    description: '',
  };
  constructor(props) {
    super(props);
    this.audiobookForm = React.createRef();
    this.fileInput = React.createRef();
  }
  handleContinue = (e) => {
    console.log('continue', this.audiobookForm.current);
    this.audiobookForm.current.submit();
  };
  handleDragOver = (e) => {
    console.log('drag over');
    e.preventDefault();
    this.setState({ uploaderActive: true });
  };
  handleDragEnter = (e) => {
    console.log('drag enter');
    e.preventDefault();
    this.setState({ uploaderActive: true });
  };
  handleDragLeave = (e) => {
    console.log('drag leave');
    e.preventDefault();
    this.setState({ uploaderActive: false });
  };
  handleDrop = (e) => {
    console.log('drop');
    e.preventDefault();
    this.setState({ uploaderActive: false });
    this.fileInput.current.files = e.dataTransfer.files;
    this.setState({ coverImageData: e.dataTransfer.files });

    const reader = new FileReader();
    let ref = this;
    reader.onload = function (event) {
      ref.setState({ coverImagePreview: event.target.result });
    };

    reader.readAsDataURL(this.fileInput.current.files[0]);

    console.log('file: ', e.dataTransfer.files);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      author: this.state.author,
      genre: this.state.genre,
      language: this.state.language,
      description: this.state.description,
      coverImage: this.state.coverImagePreview,
    };
    this.postAudiobook(qs.stringify(data)).then((res) => {
      this.props.onSuccess(res);
    });
  };
  async postAudiobook(audiobook) {
    const response = await fetch('http://localhost:3001/audiobooks', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: audiobook,
    });
    return response.json();
  }
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
            <div
              className={`drag-target ${
                this.state.uploaderActive ? 'interact' : ''
              }`}
              onDragOver={(e) => this.handleDragOver(e)}
              onDragEnter={(e) => this.handleDragEnter(e)}
              onDragLeave={(e) => this.handleDragLeave(e)}
              onDrop={(e) => this.handleDrop(e)}
            >
              <img
                src={this.state.coverImagePreview}
                alt=""
                className={`cover-preview-loader ${
                  this.state.coverImagePreview === null ? 'hidden' : ''
                }`}
              />
              <div className="text">
                {this.state.uploaderActive
                  ? 'Release to upload'
                  : 'Drag cover image here'}
              </div>
            </div>
          </div>
          <div className="custom-field fields">
            <form
              action=""
              ref={this.audiobookForm}
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <label>Title</label>
              <input
                type="text"
                placeholder="The Life of John Ruskin"
                onChange={(e) => this.setState({ title: e.target.value })}
                required
              />
              <label>Author</label>
              <input
                type="text"
                placeholder="William Gershom Collingwood"
                onChange={(e) => this.setState({ author: e.target.value })}
                required
              />
              <div className="f-unit">
                <label>Genre</label>
                <input
                  type="text"
                  placeholder="Memoirs"
                  onChange={(e) => this.setState({ genre: e.target.value })}
                  className="half-size"
                  required
                />
              </div>
              <div className="f-unit">
                <label>Language</label>
                <input
                  type="text"
                  placeholder="Language"
                  onChange={(e) => this.setState({ language: e.target.value })}
                  className="half-size"
                  required
                />
              </div>
              <label>Description</label>
              <textarea
                className="description"
                placeholder="W. G. Collingwood became a student of John Ruskin in 1872 when he started his study in University College, Oxford. "
                onChange={(e) => this.setState({ description: e.target.value })}
                required
              ></textarea>
              <input
                type="file"
                ref={this.fileInput}
                accept="image/png, image/jpeg"
                required
              ></input>
              <input type="submit" value="Continue" className="action-button" />
            </form>
          </div>
          {/* <div
            className="action-button"
            onClick={(e) => this.handleContinue(e)}
          >
            Continue
          </div> */}
        </div>
      </div>
    );
  }
}

export default AudiobookAddBuilder;
