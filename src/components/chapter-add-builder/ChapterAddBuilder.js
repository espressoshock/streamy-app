import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './ChapterAddBuilder.css';

import qs from 'qs';

class ChapterAddBuilder extends Component {
  static contextType = UserContext;
  state = {
    uploaderActive: false,
    title: '',
    reader: '',
    durationHH: '',
    durationMM: '',
    durationSS: '',
    chapters: [],
    audiotrackData: null,
    index: 1,
    audiotrackID: null,
    chapterID: null,
  };
  constructor(props) {
    super(props);
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
    this.setState({ audiotrackData: e.dataTransfer.files[0] });

    console.log('file: ', e.dataTransfer.files);
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const chapterData = {
      index: this.state.index,
      title: this.state.title,
      reader: this.state.reader,
      duration: this.getCurrentDuration(),
      audiobookID: this.props.audiobookID,
    };

    let cTmp = this.state.chapters;
    cTmp.push(chapterData);

    this.setState({ chapters: cTmp });
    this.setState({ index: this.state.index + 1 });

    let formData = new FormData();
    formData.append('name', this.state.title);
    formData.append('audiotrack', this.state.audiotrackData);

    //post audiotrack
    this.postAudiotrack(formData)
      .then((audiotrack_data) => {
        console.log('audiotrack_data:', audiotrack_data);

        chapterData.audiotrackID = audiotrack_data.audiotrackID;

        this.setState({ audiotrackID: audiotrack_data.audiotrackID });
        this.setState({ audiotrackData: null });

        this.postChapter(
          this.props.audiobookID,
          qs.stringify(chapterData)
        ).then((chapter_response) => {
          console.log('chapter response', chapter_response);
          console.log('chapter id: ', chapter_response.data._id);
          const chapter_id = chapter_response.data._id;
          const putRequest = {
            chapterID: chapter_id,
          };
          this.putChapterRef(
            this.props.audiobookID,
            qs.stringify(putRequest)
          ).then((audiobook_response) => {
            console.log('audiobook response: ', audiobook_response);
          });
        });
      })
      .catch((err) => console.log('erro', err));

    e.target.reset();
  };

  getNameViewer = () => {
    return (
      <div className="a-name-viewer">{this.state.audiotrackData.name}</div>
    );
  };
  buildChapterListItem = (index, title, reader, duration, key) => {
    return (
      <li key={key}>
        <div className="index">{this.formatIndex(index)}</div>
        <div className="details">
          <div className="title">{title}</div>
          <div className="reader">{reader}</div>
        </div>
        <div className="duration">{duration}</div>
      </li>
    );
  };
  getCurrentDuration = (h, m, s) => {
    return (
      this.state.durationHH +
      ':' +
      this.state.durationMM +
      ':' +
      this.state.durationSS
    );
  };
  formatIndex = (index) => {
    return ('0' + index).slice(-2);
  };
  async postAudiotrack(audiotrack) {
    const response = await fetch('http://localhost:3001/audiotracks', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: audiotrack,
    });
    return response.json();
  }
  async putChapterRef(audiobookID, chapterIDUpdate) {
    const response = await fetch(
      'http://localhost:3001/audiobooks/' + audiobookID,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: chapterIDUpdate,
      }
    );
    return response.json();
  }
  async postChapter(audiobookID, chapter) {
    const response = await fetch(
      'http://localhost:3001/audiobooks/' + audiobookID + '/chapters',
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: chapter,
      }
    );
    return response.json();
  }
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
              {this.state.chapters.map((chapter, key) => {
                return this.buildChapterListItem(
                  chapter.index,
                  chapter.title,
                  chapter.reader,
                  chapter.duration,
                  key
                );
              })}
            </ol>
          </div>
          <div className="custom-field fields">
            <form
              action="http://localhost:3001/audiotracks"
              method="POST"
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <label>Title</label>
              <input
                type="text"
                placeholder="Preface To The Seventh Edition"
                onChange={(e) => this.setState({ title: e.target.value })}
                required
              />
              <label>Reader</label>
              <input
                type="text"
                placeholder="John William Smith"
                required
                onChange={(e) => this.setState({ reader: e.target.value })}
              />
              <div className="f-unit">
                <label>Duration</label>
                <input
                  type="text"
                  placeholder="00"
                  onChange={(e) =>
                    this.setState({ durationHH: e.target.value })
                  }
                  className="u-size"
                  maxLength="2"
                  required
                />
                <div className="separator">:</div>
                <input
                  type="text"
                  placeholder="00"
                  onChange={(e) =>
                    this.setState({ durationMM: e.target.value })
                  }
                  className="u-size"
                  maxLength="2"
                  required
                />
                <div className="separator">:</div>
                <input
                  type="text"
                  placeholder="00"
                  onChange={(e) =>
                    this.setState({ durationSS: e.target.value })
                  }
                  className="u-size"
                  maxLength="2"
                  required
                />
              </div>
              <div className="drag-wrapper">
                <label>Audiotrack</label>
                <div
                  className={`drag-target ${
                    this.state.uploaderActive ? 'interact' : ''
                  }`}
                  onDragOver={(e) => this.handleDragOver(e)}
                  onDragEnter={(e) => this.handleDragEnter(e)}
                  onDragLeave={(e) => this.handleDragLeave(e)}
                  onDrop={(e) => this.handleDrop(e)}
                >
                  <div className="text">
                    {this.state.uploaderActive
                      ? 'Release to upload'
                      : this.state.audiotrackData !== null
                      ? this.getNameViewer()
                      : 'Drag Audiotrack here'}
                  </div>
                </div>
              </div>
              <input
                type="file"
                name="audiotrack"
                ref={this.fileInput}
                accept="audio/mp3,audio/*;capture=microphone"
                required
              ></input>
              <input type="submit" value="Upload" className="action-button" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ChapterAddBuilder;
