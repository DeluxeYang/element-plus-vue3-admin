import { ElMessageBox, ElNotification } from 'element-plus'

const notice = (callback: any, idList: Array<number>, list: string | any[], operationName: any, refreshCallback: () => void): void => {
  callback({ idList: idList }).then((response: { data: number; }) => {
    if (list.length === response.data) {
      ElNotification({ type: 'success', title: '成功', message: `${operationName}成功` })
    } else {
      ElNotification({ type: 'warning', title: '失败', message: `${operationName}未全部成功` })
    }
    refreshCallback()
  }).catch((error: { message: any; }) => {
    ElNotification({ type: 'error', title: `${operationName}失败`, message: error.message })
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function batchOperationWithConfirm(selectedList: Array<any>, row: any, callback: any, refreshCallback: any, key = 'id', name = 'name', operationName = ''): void {
  const list = row ? [row] : selectedList
  const idList: Array<number> = []
  const itemNames = []
  for (let i = 0; i < list.length; i++) {
    idList.push(list[i][key])
    itemNames.push(list[i][name])
  }
  ElMessageBox.confirm(`是否确认${operationName}【${itemNames.join(', ')}】？`, '提示', {
    confirmButtonText: operationName,
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(() => {
    notice(callback, idList, list, operationName, refreshCallback)
  }).catch(() => null)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function batchOperation(selectedList: Array<any>, row: any, callback: any, refreshCallback: any, key = 'id', operationName = ''): void {
  const list = row ? [row] : selectedList
  const idList = []
  for (let i = 0; i < list.length; i++) {
    idList.push(list[i][key])
  }
  notice(callback, idList, list, operationName, refreshCallback)
}
