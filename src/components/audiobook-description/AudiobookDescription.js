import React, { Component } from 'react';
import './AudiobookDescription.css';

import { UserContext } from '../../contexts/UserContext';

class AudiobookDescription extends Component {
  static contextType = UserContext;

  state = {
    title: '',
    author: '',
    description: '',
  };
  componentDidMount() {
    console.log('log:', this.context);
  }
  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };
  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value });
  };
  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };
  updateAudiobook = (e) => {
    const title = this.state.title,
      author = this.state.author,
      description = this.state.description;

    const audiobook = Object.assign(
      {},
      this.state.title.length === 0 ? null : { title },
      this.state.author.length === 0 ? null : { author },
      this.state.description.length === 0 ? null : { description }
    );
    console.log('check', audiobook, this.context.selectedAudiobook._id);
    this.context
      .updateAudiobook(this.context.selectedAudiobook._id, audiobook)
      .then((res) => {
        console.log('udpated: ', res);
        this.context.refreshContext();
        this.setState({
          title: '',
          author: '',
          description: '',
        });
      });
  };
  render() {
    const {
      title,
      author,
      description,
      coverImage,
      genre,
      language,
    } = this.props;
    return (
      <div className="audiobook-description">
        <div className="container">
          <img src={coverImage} alt="" className="cover" />
          <div className="text">
            <div className="title">
              <input
                type="text"
                placeholder={title}
                onChange={(e) => this.handleTitleChange(e)}
                readOnly={!this.context?.user?.isAdmin}
                className={`${this.context?.user?.isAdmin ? 'editable' : ''}`}
              />
            </div>
            <div className="author">
              <input
                type="text"
                placeholder={author}
                onChange={(e) => this.handleAuthorChange(e)}
                readOnly={!this.context?.user?.isAdmin}
                className={`${this.context?.user?.isAdmin ? 'editable' : ''}`}
              />
            </div>
            <div className="description">
              <textarea
                type="text"
                placeholder={description}
                onChange={(e) => this.handleDescriptionChange(e)}
                readOnly={!this.context?.user?.isAdmin}
                className={`${this.context?.user?.isAdmin ? 'editable' : ''}`}
              ></textarea>
            </div>
            <div className="tag-list">
              <div className="tag">{genre}</div>
              <div className="tag lang">{language}</div>
              <div
                onClick={(e) => this.updateAudiobook(e)}
                className={`update-button ${
                  this.state?.title.length > 0 ||
                  this.state?.author.length > 0 ||
                  this.state?.description.length > 0
                    ? 'visible'
                    : ''
                }`}
              >
                Update
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AudiobookDescription;
