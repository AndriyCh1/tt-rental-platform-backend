import { PartialType } from '@nestjs/swagger';

import { CreateItemDto } from '#modules/items/dtos/requests/create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {}
