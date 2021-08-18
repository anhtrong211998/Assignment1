import type { CategoryDto, CreateUpdateCategoryDto, DeleteMutiCategoryDto, GetCategoryListDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiName = 'Default';

  create = (input: CreateUpdateCategoryDto) =>
    this.restService.request<any, CategoryDto>({
      method: 'POST',
      url: '/api/app/category',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/category/${id}`,
    },
    { apiName: this.apiName });

  deleteMany = (request: DeleteMutiCategoryDto) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/category/many',
      params: { id: request.id },
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, CategoryDto>({
      method: 'GET',
      url: `/api/app/category/${id}`,
    },
    { apiName: this.apiName });

  getCodeGenerate = () =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/app/category/code-generate',
    },
    { apiName: this.apiName });

  getList = (input: GetCategoryListDto) =>
    this.restService.request<any, PagedResultDto<CategoryDto>>({
      method: 'GET',
      url: '/api/app/category',
      params: { filter: input.filter, parentId: input.parentId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getListParent = () =>
    this.restService.request<any, CategoryDto[]>({
      method: 'GET',
      url: '/api/app/category/parent',
    },
    { apiName: this.apiName });

  update = (id: string, input: CreateUpdateCategoryDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/category/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
