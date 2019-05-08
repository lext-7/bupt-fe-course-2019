import React from 'react';
import Title from '../../components/title';
import BlogList from './blog-list';
import { IContentInfo } from '../../types/type';

const titleProps = {
  name: 'monthly',
  title: '技术双月刊',
  icon: 'robot',
};

type MonthlyProps = {
  topics: IContentInfo[];
};

const Monthly: React.SFC<MonthlyProps> = (props: MonthlyProps) => {
  return (
    <div>
      <Title {...titleProps} />
      <BlogList list={props.topics} />
    </div>
  );
};

export default Monthly;
