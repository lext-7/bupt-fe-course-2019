import React, { Component } from 'react';
import Footer from './footer';
import Nav from './nav';
import './layout.scss';

export default class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="layout-container">
        {/* 导航条 */}
        <Nav />
        {/* 内容 */}
        {children}
        {/* 页脚 */}
        <Footer />
      </div>
    );
  }
}
