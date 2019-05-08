import { Icon } from 'antd';
import React from 'react';
import './index.scss';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-content">
        <Icon type="copyright" />
        2019 toutiao.com All Rights Reserved
      </div>
    );
  }
}

export default Footer;
