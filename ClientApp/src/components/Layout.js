import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div className="full-screen d-flex align-items-center bd-highlight mb-3 text-center justify-content-center">
            <Container className="d-flex flex-column justify-content-center alig-items-center Reset-W">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
