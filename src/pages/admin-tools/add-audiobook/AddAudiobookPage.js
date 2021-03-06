import React, { Component } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './AddAudiobookPage.css';

import { Link } from '@reach/router';

import AudiobookAddBuilder from '../../../components/audiobook-add-builder/AudiobookAddBuilder';
import ChapterAddBuilder from '../../../components/chapter-add-builder/ChapterAddBuilder';

class AddAudiobookPage extends Component {
  static contextType = UserContext;
  state = {
    processStep: 1,
    audiobookID: null,
  };
  nextStep = (res) => {
    console.log('res', res);
    this.setState({ audiobookID: res.data._id });
    this.setState({ processStep: 2 });
  };
  render() {
    const view =
      this.state.processStep === 1 ? (
        <AudiobookAddBuilder onSuccess={(e) => this.nextStep(e)} />
      ) : (
        <ChapterAddBuilder audiobookID={this.state.audiobookID} />
      );
    return (
      <div className="add-audiobook-page">
        <Link to="/player" className="link">
          <div className="close-button" />
        </Link>
        <div className="wrapper">{view}</div>
      </div>
    );
  }
}

export default AddAudiobookPage;
