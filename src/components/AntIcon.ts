import type { Component, VNode} from 'vue'
import { createVNode } from 'vue'
import { EditOutlined, PoweroffOutlined,SettingOutlined, SolutionOutlined,CompassOutlined,DownloadOutlined,UploadOutlined,SearchOutlined} from '@ant-design/icons-vue'

export const antIcon = (props: { icon:string | undefined }): (VNode | void) => {
  const { icon } = props
  if (icon) {
    const arr: Array<Component> = [EditOutlined, PoweroffOutlined,SettingOutlined,SolutionOutlined,CompassOutlined,DownloadOutlined,UploadOutlined,SearchOutlined]
    return createVNode(eval(icon))
  }
}

