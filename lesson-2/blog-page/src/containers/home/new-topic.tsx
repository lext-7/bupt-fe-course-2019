import React from 'react';
import Title from '../../components/title';

import { IContentInfo } from '../../types/type';
import './new-topic.scss';

type NewTopicProps = {
  newTopics: IContentInfo[];
};

const NEW_TOPIC_TITLE_MAP = {
  name: 'newTopic',
  title: '最新评论',
  icon: 'edit',
};

function getAbstract(richText: string): string {
  if (typeof richText !== 'string') {
    return '';
  }

  return richText
    .replace(/<.+?>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const Topic: React.SFC<NewTopicProps> = ({ newTopics = [] }: NewTopicProps) => (
  <div>
    <Title {...NEW_TOPIC_TITLE_MAP} />
    <ul className="new-topic-list">
      {newTopics.map(item => (
        <li className="new-topic-item" key={item.content_id}>
          <h4
            className="new-topic-title"
            dangerouslySetInnerHTML={{ __html: `# ${item.title}` }}
          />
          <div className="new-topic-content">
            {getAbstract(item.body).slice(0, 200)}
          </div>
          <div className="new-topic-readmore">
            <a href="javascript:">阅读全文-></a>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Topic;
