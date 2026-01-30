import { Repository, ObjectLiteral, FindOptionsWhere, FindOptionsOrder } from "typeorm";
import { PaginationDto } from "../dto/pagination.dto";
import { PaginationResult } from "../interfaces/pagination.interface";

export async function paginate<T extends ObjectLiteral>(
    repo: Repository<T>,
    options: PaginationDto,
    where: FindOptionsWhere<T> = {},
    order: FindOptionsOrder<T> = {},
    relations: string[] = []
): Promise<PaginationResult<T>> {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;

    const [data, total] = await repo.findAndCount({
        where,
        skip: (page - 1) * limit,
        take: limit,
        order,
        relations, // ✅ now handled properly
    });

    return {
        data,
        total,
        page,
        limit,
    };
}