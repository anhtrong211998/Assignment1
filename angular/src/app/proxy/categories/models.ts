import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CategoryDto extends AuditedEntityDto<string> {
  code?: string;
  name?: string;
}

export interface CreateUpdateCategoryDto {
  code: string;
  name: string;
}

export interface GetCategoryListDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}
