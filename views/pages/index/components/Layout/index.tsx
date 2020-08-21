import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout, Input } from 'antd';
import {
  SearchOutlined
} from '@ant-design/icons';

import LOGO from '../../../../static/rocket.svg';
import './index.less';

interface IProps extends RouteComponentProps {
  children: React.ReactNode,
}

const { Header, Footer, Content } = Layout;

const MyLayout:React.FC<IProps> = (props: IProps) => {

  const link = (url: string) => {
    props.history.push(url);
  }

  return (
    <Layout styleName="layout-container">
      <Header styleName="header-container">
        <div styleName="header">
          <div styleName="links">
            <a onClick={() => { link('/') }}>
              <img src={LOGO}/>
            </a>
            <a onClick={() => { link('/') }}>
              主页
            </a>
            <a onClick={() => { link('/') }}>
              文章
            </a>
            <a onClick={() => { link('/') }}>
              关于
            </a>
          </div>
          <div styleName="search">
          <Input
            placeholder="请输入要搜索的内容"
            prefix={<SearchOutlined />}
            style={{
              width: '220px',
              backgroundColor: '#f8f8f8'
            }}
          />
          </div>
        </div>
      </Header>
      <Content styleName="content-container">
        <div styleName="content">
        {
          props.children
        }
        </div>
      </Content>
      {/* <Footer styleName="footer-container">
        <div styleName="footer">
          Footer
        </div>
      </Footer> */}
    </Layout>
  )
}

export default withRouter(MyLayout);