import moment from 'moment';
import React from 'react';
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
          <a rel="noreferrer" className="list-link" target="_blank">
            <span
              className="list-item-title"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
            <span className="list-item-time">
              {moment(item.created_at).format('YYYY-MM-DD')}
            </span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default BlogList;
