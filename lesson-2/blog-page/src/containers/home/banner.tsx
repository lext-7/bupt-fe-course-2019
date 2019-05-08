import { Icon } from 'antd';
import React from 'react';

import './banner.scss';

const IconText = ({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) => (
  <div className="banner-block">
    <Icon type={icon} theme="outlined" className="banner-block-icon" />
    <span className="banner-block-text">
      <strong className="banner-block-number">{title}</strong>
      {subtitle}
    </span>
  </div>
);

export default () => (
  <div className="banner-container">
    <div className="banner-background" />
    <div className="banner-content">
      <IconText icon="file-text" title="320+" subtitle="优质技术进展文章" />
      <IconText icon="video-camera" title="8+" subtitle="精选前端前沿视频" />
      <IconText icon="fork" title="9+" subtitle="前端开源技术产出" />
    </div>
  </div>
);
