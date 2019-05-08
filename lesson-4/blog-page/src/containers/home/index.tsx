import React from 'react';
import Monthly from './monthly';
import NewTopic from './new-topic';

import { IContentInfo } from '../../types/type';
import Banner from './banner';
// import Banner from './banner-unopt';

import './index.scss';
import { connect, DispatchProp } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IFullState } from '../../redux/state';
import { createHomeLoadAction } from '../../redux/action';

export interface IIndexProps {
  topics: IContentInfo[];
  newTopics: IContentInfo[];
  dispatch: ThunkDispatch<{}, {}, any>;
}

/**
 * 首页
 */
class Home extends React.Component<IIndexProps> {
  componentDidMount() {
    this.props.dispatch(createHomeLoadAction());
  }

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

export default connect((store: IFullState) => store.home)(Home);
