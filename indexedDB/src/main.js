const DB_NAME = 'test'
const DB_VER = 4

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
 * @param {*} opts - 配置项
 * @returns {object} 对象仓库
 */
function createObjectStore (name, opts = {}) {
  // 如果没有指定主键，则自动创建主键
  if (!opts.keyPath) opts.autoIncrement = true
  // 判断是否存在同名的对象仓库
  if (!DB.objectStoreNames.contains(name)) return DB.createObjectStore(name, opts)
}

/**
 * 写入数据
 */
function add () {
  const request = DB.transaction('demo', 'readwrite')
    .objectStore('demo')
    .add({
      id: 1,
      name: 'abc'
    })

  request.onsuccess = function (event) {
    console.log('数据写入成功')
  }
  request.onerror = function (event) {
    console.log('数据写入失败')
  }
}

/**
 * 读取数据
 */
function read () {
  const objectStore = DB.transaction('demo')
    .objectStore('demo')
  const request = objectStore.get(1)

  request.onerror = function (event) {
    console.log('事务失败')
  }

  request.onsuccess = function (event) {
    if (request.result) {
      console.log(request.result)
    } else {
      console.log('未取到数据')
    }
  }
}

/**
 * 读取全部数据
 */
function readAll () {
  const objectStore = DB.transaction('demo')
    .objectStore('demo')
  objectStore.openCursor().onsuccess = function (event) {
    const cursor = event.target.result
    if (cursor) {
      console.log(cursor)
      cursor.continue()
    } else {
      console.log('读取数据完毕')
    }
  }
}

/**
 * 更新数据
 */
function update () {
  const objectStore = DB.transaction('demo', 'readwrite')
    .objectStore('demo')
  const put = objectStore.put({
    id: 1,
    name: 's'
  })

  put.onsuccess = function (event) {
    console.log('更新数据成功')
  }

  put.onerror = function (event) {
    console.log('更新数据失败')
  }
}

function remove () {
  const objectStore = DB.transaction('demo', 'readwrite')
    .objectStore('demo')

  const remove = objectStore.delete(1)

  remove.onsuccess = function (event) {
    console.log('删除数据成功')
  }
  remove.onerror = function (event) {
    console.log('删除数据失败')
  }
}

setTimeout(() => {
  // add()
  // read()
  // readAll()
  // update()
  remove()
}, 2000)
