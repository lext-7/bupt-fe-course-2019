import React from 'react';

import './index.scss';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IFullState, IArticleState } from '../../redux/state';
import {
  createArticleLoadAction,
  createArticleClearAction,
} from '../../redux/action';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

export interface IIndexProps extends IArticleState {
  dispatch: ThunkDispatch<{}, {}, any>;
}

/**
 * 首页
 */
class Article extends React.Component<
  IIndexProps & RouteComponentProps<{ id: string }>
> {
  componentDidMount() {
    this.props.dispatch(createArticleLoadAction(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(createArticleClearAction());
  }

  render() {
    const { id, author, content, title } = this.props;

    return (
      <div className="article-container">
        <h2>{title}</h2>
        <p>
          id: {id} author: {author}
        </p>
        <p>{content}</p>

        <Link to="/">回到首页</Link>
      </div>
    );
  }
}

export default withRouter(
  connect((store: IFullState) => store.article)(Article),
);
