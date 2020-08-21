import React from 'react';
import { Button } from 'antd';
import Layout from '../../components/Layout/index';
import Title, { TitleProps } from '../../components/Title/index';

import ArticleList from '../../../../mock/article';
import Links, { LinkProps } from '../../../../mock/links';

import './index.less';

const App: React.FC = () => {

  return (
    <Layout>
      <div styleName="container">
        <div styleName="left">
          <div styleName="left-top-tabs">
            <div styleName="left-top-tab">
              <a href="">推荐</a>
            </div>
            <div styleName="divider"></div>
            <div styleName="left-top-tab">
              <a href="">最新</a>
            </div>
            <div styleName="divider"></div>
            <div styleName="left-top-tab">
              <a href="">热榜</a>
            </div>
          </div>
          <div styleName="articles">
            {
              ArticleList.map((item: TitleProps, index):React.ReactNode => (
                <Title key={index} {...item} />
              ))
            }
          </div>
        </div>
        <div styleName="right">
          <div styleName="right-item">
            <Button type="primary">立即登录</Button>
          </div>
          <div styleName="right-item ad">
            <div style={{ height: '100%', width: '100%', overflow: 'hidden'}}>
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598009150584&di=a8ba6d1d1844df1b3d9a32545c63e782&imgtype=0&src=http%3A%2F%2Fimage.9game.cn%2F2020%2F8%2F21%2F170739262.jpg" alt=""/>
            </div>
          </div>
          <div styleName="right-item link">
            {
              Links.map((item: LinkProps): React.ReactNode => (
              <a target="_blank" href={item.href}>{item.text}</a>
              ))
            }
          </div>
          <div styleName="right-item" style={{
            backgroundColor: 'transparent',
            color: '#9e9e9e',
            display: 'block'
          }}>
            划水 · 摸鱼 · 捕鲸时作品<br />
            耗时长达3小时<br />
            就摸<br />
            疯狂的摸<br />
          </div>
        </div>
      </div>  
      <div styleName="footer">这是一个没有意义的React + Typescript + 我的版权所有</div>
    </Layout>
  )
}

export default App; 