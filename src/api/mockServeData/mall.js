import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  // console.log('get参数分离前1：');
  // console.log(search);
  // console.log('get参数分离前2：');
  // console.log(decodeURIComponent(search)
  //   .replace(/"/g, '\\"')
  //   .replace(/&/g, '","')
  //   .replace(/=/g, '":"'));
  // console.log('get分离的参数：');
  // console.log(JSON.parse(
  //   '{"' +
  //   decodeURIComponent(search)
  //     .replace(/"/g, '\\"')
  //     .replace(/&/g, '","')
  //     .replace(/=/g, '":"') +
  //   '"}'
  // ));

  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      'price|1-50.1-2': 1,
      'quantity|1-5': 1,
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getProductList: config => {
    // console.log(config, 'config')
    const { name, page = 1, limit = 20 } = param2Obj(config.url)
    // console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(product => {
      if (name && product.name.indexOf(name) === -1 && product.price.indexOf(name) === -1) return false
      return true
    })
    // console.log(mockList,'mockList')
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    // console.log(pageList,'pageList')
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  /**
   * 增加商品
   * @param name, price, quantity
   * @return {{code: number, data: {message: string}}}
   */
  createProduct: config => {
    const { name, price, quantity } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      price: price,
      quantity: quantity,
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除商品
   * @param id
   * @return {*}
   */
  deleteProduct: config => {
    const { id } = JSON.parse(config.body)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改商品
   * @param id, name, price, quantity
   * @return {{code: number, data: {message: string}}}
   */
  updateProduct: config => {
    const { id, name, price, quantity} = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.price = price
        u.quantity = quantity
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}