interface MenuItem {
  id: string | number,
  pid: string | number,
  name: string,
  route: string,
  icon: string,
  children?: Array<MenuItem>,
}
