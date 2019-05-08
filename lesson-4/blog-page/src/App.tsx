import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// 站点公共布局
import Layout from './components/layout';
// 首页
import Home from './containers/home';
import Article from './containers/article';
import store from './redux/store';

// #region 样式

// 引入 antd 的样式
import 'antd/dist/antd.css';
// 重置浏览器默认样式
import './styles/reset.scss';

// #endregion

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/article/:id" component={Article} />
              <Redirect to="/home" />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
