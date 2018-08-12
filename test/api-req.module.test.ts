import { Test } from '@nestjs/testing';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { SinonStub } from 'sinon';

import * as superagent from 'superagent';
import { ApiReqModule } from '../lib/api-req.module';
import { ApiReqService } from '../lib/api-req.service';
import { Controller } from '@nestjs/common';

chai.use(sinonChai);

const expect = chai.expect;

@Controller()
class MockController {

    constructor(
        private apiReqService: ApiReqService,
    ) {}
}

describe('ApiReqModule', () => {

    it('should export ApiReqService', async () => {
        const module = await Test.createTestingModule({
            controllers: [
                MockController,
            ],
            imports: [
                ApiReqModule,
            ],
        }).compile();

        const mockController = await module.get<MockController>(MockController);

        expect(mockController).to.have.key('apiReqService');
        expect(mockController.apiReqService).to.be.instanceof(ApiReqService);
    });
});
