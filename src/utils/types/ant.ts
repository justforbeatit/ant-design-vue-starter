export type FormItemSize = 'small' | 'default' | 'large'
export type FormItemButtonType = 'primary' | 'dashed' | 'danger' | 'link'
export type FormItemValue = Json<string | number | undefined | Array<string | number | undefined>>
export type FormItemRule = Array<Json<string | number | boolean | RegExp | CallableFunction | undefined>>
export type FormItemSelectOption = {
  value: string
  label: string
}

export interface FormItem {
  type: AntComponent | 'Custom'
  name: string,
  label?: string,
  placeholder?: string,
  size?: FormItemSize,
  prefixIcon?: AntIcon
  required?: boolean,
  autocomplete? : boolean,
  rules?: FormItemRule,
  options?: () => Promise<Array<FormItemSelectOption>>,
}

export interface FormItemButton {
  text?: string,
  type?: FormItemButtonType,
  size?: FormItemSize,
  disabled?: boolean,
  block?: boolean,
}
