import {PageQO} from "@/types/common.ts";
import http, {FetchOptions} from "@/utils/http.ts";

// 角色编辑表单
interface RoleEditForm {
  id: number
  name: string
  code: string
  sort: number,
  status: number,
  description: string
}

class RoleApi {
  static baseUrl = '/sys/roles';

  /**
   * 分页列表
   * @param query 查询条件
   * @param option 请求配置
   */
  static async page(query?: PageQO & {}, option?: FetchOptions) {
    return await http.get(this.baseUrl, query, option);
  }

  /**
   * 删除
   * @param ids ID 数组
   * @param option 请求配置
   */
  static async remove(ids: number[] | number | string, option?: FetchOptions) {
    return await http.deleteByIds(`${this.baseUrl}/{}`, ids, option);
  }

  /**
   * 修改
   * @param query 编辑表单
   * @param option 请求配置
   */
  static async update(query: RoleEditForm, option?: FetchOptions) {
    return await http.putByJson(`${this.baseUrl}/${query.id}`, query, option);
  }

  /**
   * 修改状态
   * @param id ID
   * @param status 状态
   * @param option 请求配置
   */
  static async updateStatus(id: number, status: number, option?: FetchOptions) {
    const responseJson = await http.patchByJson(`${this.baseUrl}/${id}/status`, {id, status}, option)
    return responseJson && responseJson.code === 200;
  }

  /**
   * 更新菜单
   * @param id ID
   * @param menuIds 菜单 ID 数组
   * @param option 请求配置
   */
  static async updateMenus(id: number, menuIds: number[], option?: FetchOptions) {
    const responseJson = await http.patchByJson(`${this.baseUrl}/${id}/menus`, {id, menuIds}, option);
    return responseJson && responseJson.code === 200;
  }

  /**
   * 保存
   * @param query 编辑表单
   * @param option 请求配置
   */
  static async save(query: RoleEditForm, option?: FetchOptions) {
    return await http.postByJson(this.baseUrl, query, option);
  }
}

export default RoleApi;
export {RoleEditForm};