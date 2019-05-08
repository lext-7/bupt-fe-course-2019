import { Icon } from 'antd';
import React from 'react';

import './banner.scss';

export default () => (
  <div className="banner-container">
    <div className="banner-background" />
    <div className="banner-content">
      <div className="banner-block file">
        <Icon type="file-text" theme="outlined" className="banner-block-icon" />
        <span className="banner-block-text">
          <strong className="banner-block-number">320+</strong>
          优质技术进展文章
        </span>
      </div>
      <div className="banner-block video">
        <Icon
          type="video-camera"
          theme="outlined"
          className="banner-block-icon"
        />
        <span className="banner-block-text">
          <strong className="banner-block-number">8+</strong>
          精选前端前沿视频
        </span>
      </div>
      <div className="banner-block technology">
        <Icon type="fork" theme="outlined" className="banner-block-icon" />
        <span className="banner-block-text">
          <strong className="banner-block-number">9+</strong>
          前端开源技术产出
        </span>
      </div>
    </div>
  </div>
);
