import React from 'react';
import './index.less';

export interface TitleProps {
  title: string,
  content: string,
  author: string,
  time: string,
  category: string,
  imageUrl: string,
}

const Title:React.FC<TitleProps> = (props: TitleProps) => {

  return (
    <div styleName="title-container">
      <div styleName="title">
        {props.title}
      </div>
      <div styleName="content">
        <div styleName="cover">
          <img src={props.imageUrl} />
        </div>
        <div styleName="text" className="text-overflow">
          {props.content}
        </div>
      </div>
      <div styleName="info">
        <span>
          {props.author}
        </span>
        <span styleName="dot">
          ·
        </span>
        <span>
          {props.time}
        </span>
        <span styleName="dot">
          ·
        </span>
        <span>
          {props.category}
        </span>
      </div>
    </div>
  )
}

export default Title;