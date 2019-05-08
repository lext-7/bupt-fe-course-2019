import React, { Component } from 'react';

import { Divider, Icon } from 'antd';

import './index.scss';
export interface ITitleProps {
  title: string;
  icon: string;
}

class Title extends Component<ITitleProps> {
  render() {
    const { title, icon } = this.props;

    return (
      <div className="title-container">
        <Divider className="title-divider">
          <div className="title-content">
            <Icon type={icon} className="title-icon" />
            <div className="title-text">{title}</div>
            <Icon type={icon} className="title-icon" />
          </div>
        </Divider>
      </div>
    );
  }
}

export default Title;
