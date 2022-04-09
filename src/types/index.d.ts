interface LoginInfo {
  email: string,
  password: string,
  captcha: string,
  key?: string
}

interface MenuItem {
  id: string | number,
  pid: string | number,
  name: string,
  route: string,
  icon: keyof typeof import('@ant-design/icons-vue'),
  children?: Array<MenuItem>,
}

