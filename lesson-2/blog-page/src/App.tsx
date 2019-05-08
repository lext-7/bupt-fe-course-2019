import React, { Component } from 'react';
// 站点公共布局
import Layout from './components/layout';
// 首页
import Home from './containers/home';
// 假数据
import mockData from './mock-data';

// #region 样式

// 引入 antd 的样式
import 'antd/dist/antd.css';
// 重置浏览器默认样式
import './styles/reset.scss';

// #endregion

class App extends Component {
  render() {
    return (
      <Layout>
        <Home {...mockData} />
      </Layout>
    );
  }
}

export default App;
