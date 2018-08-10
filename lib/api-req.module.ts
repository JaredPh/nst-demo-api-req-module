import { Module } from '@nestjs/common';
import { ApiReqService } from './api-req.service';

@Module({
    components: [
        ApiReqService,
    ],
    exports: [
        ApiReqService,
    ],
})
export class ApiReqModule {}
