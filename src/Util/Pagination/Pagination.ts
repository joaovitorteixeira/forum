import { BaseEntity, SelectQueryBuilder } from 'typeorm';
import PaginationDto from './dto/pagination.dto';
import ResponsePaginationDto from './dto/response-pagination.dto';

export default class Pagination<EType extends typeof BaseEntity> {
  constructor(private orderBy: string) {}

  /**
   * Paginate the results of a query
   * @param param The pagination parameters
   * @returns Object with paginated data
   */
  async paginate<TParam extends PaginationDto>(
    Class: EType,
    param: TParam,
    relations?: string[],
  ): Promise<ResponsePaginationDto> {
    const { page, limit } = param;

    const [data, total] = await Class.findAndCount({
      skip: this.calculateOffset(page, limit),
      take: limit,
      relations,
      order: { [this.orderBy]: 'DESC' },
    });

    return {
      page,
      limit,
      total,
      data,
    };
  }

  /**
   * Add pagination to a query
   * @param query The query to paginate
   * @param param The pagination parameters
   * @returns The query with pagination
   */
  pageBuilder<T extends BaseEntity>(
    query: SelectQueryBuilder<T>,
    param: PaginationDto,
  ) {
    return query
      .take(param.limit)
      .skip(this.calculateOffset(param.page, param.limit))
      .getManyAndCount();
  }

  /**
   * Calculate offset
   * @param page The page number
   * @param limit The number of items per page
   * @returns Offset and limit for the query
   */
  private calculateOffset(page: number, limit: number): number {
    return (page - 1) * limit;
  }
}
