import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CategoryDto extends AuditedEntityDto<string> {
  code?: string;
  name?: string;
  parentId?: string;
}

export interface CreateUpdateCategoryDto {
  code: string;
  name: string;
  parentId?: string;
}

export interface DeleteMutiCategoryDto {
  id: string[];
}

export interface GetCategoryListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  parentId?: string;
}
