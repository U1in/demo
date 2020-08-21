import loadable, { LoadableComponent } from '@loadable/component'

export interface MyRouter {
  path: string,
  exact: boolean,
  component: LoadableComponent<any>,
  name: string,
  title?: string,
}

const serverRouter: Array<MyRouter> = [
  {
    path: '/index',
    exact: true,
    component: loadable(() => import('../index/pages/index/index')),
    name: 'Index',
    title: '主页'
  }
];

export default serverRouter;
