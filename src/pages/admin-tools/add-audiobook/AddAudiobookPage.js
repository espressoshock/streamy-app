import React, { Component } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './AddAudiobookPage.css';

import AudiobookAddBuilder from '../../../components/audiobook-add-builder/AudiobookAddBuilder';

class AddAudiobookPage extends Component {
  static contextType = UserContext;
  state = {
    processStep: 1,
  };
  render() {
    const view = this.state.processStep === 1 ? <AudiobookAddBuilder /> : null;
    return (
      <div className="add-audiobook-page">
        <div className="wrapper">{view}</div>
      </div>
    );
  }
}

export default AddAudiobookPage;
