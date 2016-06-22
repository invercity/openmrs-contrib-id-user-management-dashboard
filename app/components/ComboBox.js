import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'react-toolbox/lib/button';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import theme from './combo.scss';

class MultiComboBox extends React.Component {
  state = {
    multiple: []
  };

  handleMultipleChange = (value) => {
    this.setState({multiple: value});
  };

  render () {
    return (
      <div>
        <Autocomplete
          direction="down"
          label={this.props.dialogLabel}
          multiple={true}
          onChange={this.handleMultipleChange}
          source={this.props.source}
          theme={theme}
          value={this.state.multiple}/>
      </div>
    );
  }
}

class ComboBox extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };

  actions = [
    { label: "Cancel", onClick: this.handleToggle },
    { label: "Ok", onClick: this.handleToggle }
  ];

  render () {
    return (
      <div>
        <Button label={this.props.label} onClick={this.handleToggle} />
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title={this.props.dialogTitle}>

          <MultiComboBox source={this.props.source} dialogLabel={this.props.dialogLabel}/>
        </Dialog>
      </div>
    );
  }
}

export default ComboBox;

