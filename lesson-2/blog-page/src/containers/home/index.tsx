import React from 'react';
import Monthly from './monthly';
import NewTopic from './new-topic';

import { IContentInfo } from '../../types/type';
import Banner from './banner';
// import Banner from './banner-unopt';

import './index.scss';

export interface IIndexProps {
  topics: IContentInfo[];
  newTopics: IContentInfo[];
}

/**
 * 首页
 */
class Home extends React.Component<IIndexProps> {
  render() {
    const { newTopics, topics } = this.props;

    return (
      <div className="home-container">
        <Banner />
        <div className="home-wrapper">
          <Monthly topics={topics} />
          <NewTopic newTopics={newTopics} />
        </div>
      </div>
    );
  }
}

export default Home;
