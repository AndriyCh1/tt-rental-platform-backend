import { PartialType } from '@nestjs/mapped-types';

import { CreateItemDto } from '#modules/items/dtos/requests/create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {}
