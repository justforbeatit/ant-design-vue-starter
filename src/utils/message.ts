import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/index.css'

const createMessage = (): typeof message => {
  message.config({
    top: '3rem',
    duration: 3,
    maxCount: 1,
  })
  return message
}

export function success(text: string): void {
  createMessage().success(text);
}

export function error(text: string): void {
  createMessage().error(text);
}

export function warning(text: string): void {
  createMessage().warning(text);
}

export function info(text: string): void {
  createMessage().info(text);
}

export function loading(text: string): void {
  createMessage().loading(text);
}
