import http from 'src/utils/http'
import PATH_API from 'src/constants/pathApi'
import { SuccessResponse } from 'src/types/utils.type'
import { Category } from 'src/types/category.tye'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(PATH_API.categories)
  }
}

export default categoryApi
