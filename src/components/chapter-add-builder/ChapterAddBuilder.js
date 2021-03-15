import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './ChapterAddBuilder.css';

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
    this.setState({ audiotrackData: e.dataTransfer.files });

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
    /* this.postAudiobook(qs.stringify(data)).then((res) => {
      this.props.onSuccess(res);
    }); */
  };
  getNameViewer = () => {
    return (
      <div className="a-name-viewer">{this.state.audiotrackData[0].name}</div>
    );
  };
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
            <form action="" onSubmit={(e) => this.handleSubmit(e)}>
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
