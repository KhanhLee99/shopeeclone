import PATH_API from 'src/constants/pathApi'
import { ProductListConfig, ProductList, Product } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(PATH_API.products, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${PATH_API.products}/${id}`)
  }
}

export default productApi
