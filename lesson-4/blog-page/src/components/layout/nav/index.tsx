import React, { Component } from 'react';

import { Icon, Menu } from 'antd';
import './index.scss';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class Nav extends Component {
  renderLeft() {
    return (
      <div className="nav-left">
        <div className="nav-logo">
          <a href="home">
            <img
              src="//sf1-ttcdn-tos.pstatp.com/obj/ttfe/pgcfe/bytefe.png"
              alt="bytefe-icon"
            />
          </a>
        </div>
      </div>
    );
  }
  renderMenu() {
    return (
      <Menu selectedKeys={['home']} mode="horizontal">
        <Item key="home">
          <Icon type="home" />
          首页
        </Item>
        <SubMenu
          title={
            <span>
              <Icon type="folder-open" />
              技术资讯
            </span>
          }
        >
          <Item key="content">
            <Icon type="file-text" />
            互联网行业资讯
          </Item>
        </SubMenu>
        <Item key="links">
          <Icon type="link" />
          前端相关平台
        </Item>
      </Menu>
    );
  }

  renderRight() {
    return <div className="nav-right">{this.renderMenu()}</div>;
  }

  render() {
    return (
      <div className="nav-container">
        <div className="nav-header">
          {this.renderLeft()}
          {this.renderRight()}
        </div>
      </div>
    );
  }
}

export default Nav;
