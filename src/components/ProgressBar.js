import React from 'react';

class ProgressBar extends React.Component {
  static defaultProps = {
    progress: 0, 
    color: '#282c34',
  };

  render() {
    const progressBarStyle = {
      width: '100%',
      height: '2px',
      border: '1px solid #999999'
    }
    const ProgressBarFillStyle = {
      width: this.props.progress+'%',
      height: '100%',
      backgroundColor: this.props.color
    }
    return (
      <div className="progress-bar" style={progressBarStyle}>
        <div className="progress-bar-fill" style={ProgressBarFillStyle}></div>
      </div>
    )
  }
}

export default ProgressBar;