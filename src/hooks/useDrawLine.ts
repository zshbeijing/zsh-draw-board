import { getId } from '@/until/index'
import { Canvas } from '@/type/index'
export const useDrawLine = () => {
  function InitLineJson() {
    const json: Canvas.LineItem = {
      id: getId(12),
      fromId: '',
      formDirection: 'left',
      toDirection: 'left',
      label: '',
      toId: '',
      lineType: 'Straight'
    }
    return json
  }
  function filterLine(obj: Canvas.LineItem, line: Canvas.LineItem) {
    if (
      obj.formDirection === line.formDirection &&
      obj.toDirection === line.formDirection &&
      obj.fromId === line.fromId &&
      obj.toId === line.toId
    ) {
      return true
    }
    if (
      obj.formDirection === line.formDirection &&
      obj.toDirection === line.formDirection &&
      obj.fromId === line.toId &&
      obj.toId === line.fromId
    ) {
      return true
    }
    return false
  }
  return {
    InitLineJson,
    filterLine
  }
}
