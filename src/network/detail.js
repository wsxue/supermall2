import {request} from './request'
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title

    this.desc = itemInfo.desc
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor

    this.oldPrice = itemInfo.oldPrice
    this.newPrice = itemInfo.price
    this.realPrice = itemInfo.lowNowPrice
    this.lowNowPrice = itemInfo.lowNowPrice

    this.columns = columns

    this.services = services
  }
}

export class Shop {
  constructor(shopInfo) {
    this.name = shopInfo.name
    this.shopLogo = shopInfo.shopLogo

    this.cFans = shopInfo.cFans
    this.cGoods = shopInfo.cGoods
    this.cSells = shopInfo.cSells

    this.score = shopInfo.score
  }
}