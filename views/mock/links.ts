export interface LinkProps {
  text: string,
  href: string
}

const Links: Array<LinkProps> = [{
  text: '哔哩哔哩',
  href: 'https://www.bilibili.com'
}, {
  text: '掘金',
  href: 'https://juejin.im'
}, {
  text: '知乎',
  href: 'https://www.zhihu.com'
}, {
  text: '即刻',
  href: 'https://www.okjike.com'
}, {
  text: 'V2EX',
  href: 'https://www.v2ex.com'
}, {
  text: 'Google',
  href: 'https://www.google.com'
}];

export default Links;