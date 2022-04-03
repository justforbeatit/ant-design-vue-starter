export type FormItemType = 'input' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'password' | 'custom'
export type FormItemSize = 'small' | 'default' | 'large'
export type FormItemButtonType = 'primary' | 'dashed' | 'danger' | 'link'
export type FormItemRule = Json<Array<Json<string | number | boolean | RegExp | CallableFunction | undefined>>>
export type FormItemValue = Json<string | number | undefined | Array<string | number | undefined>>

export interface FormItem {
  type: FormItemType,
  name: string,
  label?: string,
  placeholder?: string,
  size?: FormItemSize,
  prefix?: {
    type: 'string' | 'icon',
    value: string
  },
}

export interface FormItemButton {
  text?: string,
  type?: FormItemButtonType,
  size?: FormItemSize,
  disabled?: boolean,
  block?: boolean,
  enterable?: boolean,
}

export interface MenuItem {
  id: string | number,
  name: string,
  route?: string,
  icon?: string,
  children?: Array<MenuItem>,
}
