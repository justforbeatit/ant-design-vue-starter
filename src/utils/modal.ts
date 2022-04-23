import { Modal } from "ant-design-vue"
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import 'ant-design-vue/es/modal/style/index.css'

export function sure(title: string): Promise<void> {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: title,
      icon: h(ExclamationCircleOutlined),
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        resolve()
      },
      onCancel: () => {
        reject()
      }
    })
  })
}
