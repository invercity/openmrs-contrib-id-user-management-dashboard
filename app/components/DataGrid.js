import Table from 'react-toolbox/lib/table';
import {Grid, Col, Row} from 'react-flexbox-grid';
import {Link} from 'react-router';
import Dropdown from 'react-toolbox/lib/dropdown';
import React from 'react';
import _ from 'lodash';

import AppStore from '../stores/AppStore';
import AppActions from '../actions/AppActions';

import EditUser from './EditUser';

class DataGrid extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = { 
      all: props.all,
      model: props.model,
      current: props.currentPage,
      last: props.lastPage,
      size: props.size,
      pages: props.pages,
      selected: [],
      source: props.source,
      prevSelected: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      source: newProps.source,
      model: newProps.model,
      pages: newProps.pages,
      size: newProps.size,
      current: newProps.currentPage,
      last: newProps.lastPage,
      all: newProps.all
    });
  }

  handleSelect = (selected) => {
    const prevSelected = this.state.selected;
    if (prevSelected.length && selected.length && selected[0] === prevSelected[0]) {
      selected = [];
    }
    this.setState({prevSelected});
    this.setState({selected});
  };

  render () {
    let editUser;
    if (this.state.selected && this.state.selected.length) {
      let user = this.state.source[this.state.selected[0]];
      let allItems = AppStore.getState().allItems;
      let userGlobal = _.find(allItems, (item) => {
        return item.id === user.id;
      });
      editUser = <EditUser mini user={userGlobal}/>;
    }
    else {
      editUser = <div></div>;
    }
    let pages = this.state.pages;
    let current = this.state.current;
    let last = this.state.last;
    let len = this.state.source.length;
    let offset = this.state.size * (current-1);
    let infoText;
    if (len < 2) {
      infoText = offset + len;
    }
    else {
      infoText = (offset + 1) + '-' + (offset + len);
    }
    let info = <div style={{marginTop: '25px'}}>{infoText + ' of ' + this.state.all.length + ' shown'}</div>;
    return (
      <Grid>
        <Row>
          <Table
            model={this.state.model}
            onSelect={this.handleSelect}
            selectable
            multiSelectable
            selected={this.state.selected}
            source={this.state.source}
          />
        </Row>
        <Row>
          <Col md={2}>
            {editUser}
          </Col>
          <Col md={3} mdOffset={2}>
            {info}
          </Col>
          <Col md={2} mdOffset={1}>
            <Row>
              <Dropdown
                auto
                onChange={AppActions.setSize}
                source={AppStore.getState().sizes}
                value={AppStore.getState().size}
              />
            </Row>
          </Col>
          <Col md={2}>
            <Row style={{marginTop: '25px'}}>
              <Link to={{pathname: 'user-dashboard', query: {page: 1}}} style={{margin: '5px', marginLeft: '15px'}}>
                &#171;
              </Link>
              {pages.map(function(page, index) {
                if (current == page) {
                  return <Link key={index} style={{margin: '5px', fontWeight: 'bolder'}} to={{pathname: 'user-dashboard', query: {page: page}}}>
                    {page}
                  </Link>
                }
                else {
                  return <Link key={index} style={{margin: '5px'}} to={{pathname: 'user-dashboard', query: {page: page}}}>
                    {page}
                  </Link>
                }
              })}
              <Link to={{pathname: 'user-dashboard', query: {page: last}}} style={{margin: '5px'}}>
                &#187;
              </Link>  
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DataGrid;