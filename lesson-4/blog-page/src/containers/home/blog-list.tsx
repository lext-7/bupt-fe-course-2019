import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { IContentInfo } from '../../types/type';

import './blog-list.scss';

type BlogListProps = {
  list: IContentInfo[];
};

const BlogList: React.SFC<BlogListProps> = ({ list }: BlogListProps) => (
  <div className="list-content">
    <ul className="list-list">
      {list.map((item, key) => (
        <li className="list-item" key={key}>
          <Link to={`/article/${item.content_id}`} className="list-link">
            <span
              className="list-item-title"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
            <span className="list-item-time">
              {moment(item.created_at).format('YYYY-MM-DD')}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default BlogList;
