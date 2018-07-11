const DB_NAME = 'test'
const DB_VER = 4

/**
 * 将 onsuccess、onerror 转为 Promise 对象
 * @param {object} request - IDBRequest 对象
 * @param {*} success - 处理成功时的回调函数，需要有返回值
 * @param {*} error - 处理失败时的回调函数，需要有返回值
 */
function promiseRequest (request, success, error) {
  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      if (success) return resolve(success(event))
      return resolve(event)
    }
    request.onerror = function (event) {
      if (error) return reject(error(event))
      return reject(event)
    }
  })
}

// 数据库实例
let DB

// 打开数据库
const request = window.indexedDB.open(DB_NAME, DB_VER)

// 数据库打开失败
request.onerror = function (event) {
  console.error('数据库打开失败')
  console.error(event)
}

// 数据库打开成功
request.onsuccess = function (event) {
  DB = request.result
  console.log('数据库打开成功')
}

// 数据库升级
request.onupgradeneeded = function (event) {
  DB = event.target.result
  const objectStore = createObjectStore('demo')
  if (!objectStore) return
  objectStore.createIndex('name', 'name', {unique: false})
}

/**
 * 新建对象仓库（新建表）
 * @param {string} name - 对象仓库名称
 * @param {object} opts - 配置项
 * @param {object} indexObj - 索引对象
 */
function createObjectStore (name, opts = {}, indexObj = {}) {
  // 如果没有指定主键，则自动创建主键
  if (!opts.keyPath) opts.autoIncrement = true
  // 判断是否存在同名的对象仓库
  if (!DB.objectStoreNames.contains(name)) {
    // 创建对象仓库
    const store = DB.createObjectStore(name, opts)
    // 创建索引
    for (let i in indexObj) {
      store.createIndex(i, i, indexObj[i])
    }
  }
}

/**
 * 写入数据
 */
function add (name, data) {
  if (!data) return
  const request = DB.transaction(name, 'readwrite')
    .objectStore(name)
    .add(data)

  return promiseRequest(request)
}

/**
 * 读取数据
 */
function read (name, index) {
  const request = DB.transaction(name)
    .objectStore(name)
    .get(index)

  return promiseRequest(request)
}

/**
 * 读取全部数据
 */
function readAll (name) {
  let data = []
  const request = DB.transaction(name)
    .objectStore(name)
    .openCursor()

  const handleSuccess = function (event) {
    const cursor = event.target.result
    if (cursor) {
      data.push(cursor.value)
      cursor.continue()
    } else {
      return data
    }
  }
  return promiseRequest(request, handleSuccess)
}

/**
 * 更新数据
 */
function update (name, data) {
  if (!data) return
  const request = DB.transaction(name, 'readwrite')
    .objectStore(name)
    .put(data)

  return promiseRequest(request)
}

function remove (name, index) {
  const request = DB.transaction(name, 'readwrite')
    .objectStore(name)
    .delete(index)

  return promiseRequest(request)
}

setTimeout(() => {
  // add('demo', {
  //   id: 1,
  //   name: '33344'
  // })
  read('demo', 20)
    .then(data => {
      console.log(data)
    })
  readAll('demo')
    .then(data => {
      console.log(data)
    })
  // update()
  // remove()
}, 2000)
