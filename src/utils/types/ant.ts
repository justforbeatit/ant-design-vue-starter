export type FormItemType = 'input' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'password' | 'custom'
export type FormItemSize = 'small' | 'default' | 'large'
export type FormItemButtonType = 'primary' | 'dashed' | 'danger' | 'link'
export type FormItemValue = Json<string | number | undefined | Array<string | number | undefined>>
export type FormItemRule = Array<Json<string | number | boolean | RegExp | CallableFunction | undefined>>
export type FormItemSelectOption = Json<{
  value: string | number | undefined
  label: string
}>

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
  required?: boolean,
  rules?: FormItemRule,
  options?: () => Array<FormItemSelectOption> | Array<FormItemSelectOption>,
}

export interface FormItemButton {
  text?: string,
  type?: FormItemButtonType,
  size?: FormItemSize,
  disabled?: boolean,
  block?: boolean,
}
