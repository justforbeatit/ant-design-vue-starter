export type FormItemSize = 'small' | 'default' | 'large'
export type FormItemButtonType = 'primary' | 'dashed' | 'danger' | 'link'
export type FormItemValue = Json<string | number | undefined | Array<string | number | undefined>>
export type FormItemRule = Array<Json<string | number | boolean | RegExp | CallableFunction | undefined>>
export type FormItemSelectOption = Json<{
  value: string | number | undefined
  label: string
}>

export interface FormItem {
  component: AntComponent,
  name: string,
  label?: string,
  placeholder?: string,
  size?: FormItemSize,
  prefixIcon?: AntIcon
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
