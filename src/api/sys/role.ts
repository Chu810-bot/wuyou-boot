import {PageQO} from "@/types/common.ts";
import http from "@/utils/http.ts";

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
    if (!option) {
      option = {};
    }
    option.query = {...query, ...option.query};

    return await http.get(this.baseUrl, option);
  }

  /**
   * 删除
   * @param ids ID 数组
   * @param option 请求配置
   */
  static async remove(ids: number[] | number | string, option?: FetchOptions) {
    if (ids.length === 0) {
      throw new TypeError('ids is empty');
    }
    // 如果ids类型为number[]
    if (Array.isArray(ids)) {
      ids = ids.join(',')
    }
    return await http.delete(`${this.baseUrl}/${ids}`, option);
  }

  /**
   * 修改
   * @param query 编辑表单
   * @param option 请求配置
   */
  static async update(query: RoleEditForm, option?: FetchOptions) {
    if (!option) {
      option = {};
    }
    option.json = query;
    return await http.put(`${this.baseUrl}/${query.id}`, option);
  }

  /**
   * 修改状态
   * @param id ID
   * @param status 状态
   * @param option 请求配置
   */
  static async updateStatus(id: number, status: number, option?: FetchOptions) {
    if (!option) {
      option = {};
    }
    option.json = {id, status};
    const responseJson = await http.patch(`${this.baseUrl}/${id}/status`, option)
    return responseJson && responseJson.code === 200;
  }

  /**
   * 保存
   * @param query 编辑表单
   * @param option 请求配置
   */
  static async save(query: RoleEditForm, option?: FetchOptions) {
    if (!option) {
      option = {};
    }
    option.json = query;
    return await http.post(this.baseUrl, option);
  }
}

export default RoleApi;
export {RoleEditForm};