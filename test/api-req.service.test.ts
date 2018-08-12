import { Test } from '@nestjs/testing';

import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { SinonStub } from 'sinon';

import * as superagent from 'superagent';
import { ApiReqService } from '../lib/api-req.service';

chai.use(sinonChai);

const expect = chai.expect;

describe('ApiReqService', () => {
    let service: ApiReqService;

    before(async () => {

        const module = await Test.createTestingModule({
            components: [
                ApiReqService,
            ],
        }).compile();

        service = module.get<ApiReqService>(ApiReqService);
    });

    describe('get method', () => {

        let result: any;
        let params;
        let superagentStub: SinonStub;

        const mockUrl = 'http://mockUrl.com/';
        const mockResult = {
            result: 'OK',
        };

        describe('successful call', () => {

            describe('without a query obj', () => {
                before(async () => {
                    superagentStub = sinon.stub(superagent, 'get').returns({
                        query: (p) => {
                            params = p;
                            return {
                                end: (callback) => callback(null, {
                                    body: mockResult,
                                }),
                            };
                        },
                    });

                    result = await service.get(mockUrl);
                });

                after(() => {
                    superagentStub.restore();
                    result = undefined;
                });

                it('should call superagent get method', () => {
                    expect(superagentStub).to.have.been.called;
                });

                it('should return a response', () => {
                    expect(result).to.deep.equal(mockResult);
                });
            });

            describe('with a query obj', () => {
                const mockQueryObj = {
                    key1: 'value1',
                    key2: 'value2',
                };

                describe('without a query obj', () => {
                    before(async () => {
                        superagentStub = sinon.stub(superagent, 'get').returns({
                            query: (p) => {
                                params = p;
                                return {
                                    end: (callback) => callback(null, {
                                        body: mockResult,
                                    }),
                                };
                            },
                        });

                        result = await service.get(mockUrl, mockQueryObj);
                    });

                    after(() => {
                        superagentStub.restore();
                        result = undefined;
                    });

                    it('should call superagent get method', () => {
                        expect(superagentStub).to.have.been.called;
                    });

                    it('should return a response', () => {
                        expect(result).to.deep.equal(mockResult);
                    });
                });
            });
        });

        describe('unsuccessful call', () => {

            const mockError = new Error('mock error');
            let error: Error;

            before(async () => {
                superagentStub = sinon.stub(superagent, 'get').returns({
                    query: (p) => {
                        params = p;
                        return {
                            end: (callback) => callback(mockError),
                        };
                    },
                });

                try {
                    result = await service.get(mockUrl);
                } catch (err) {
                    error = err;
                }
            });

            after(() => {
                superagentStub.restore();
                result = undefined;
            });

            it('should call superagent get method', () => {
                expect(superagentStub).to.have.been.called;
            });

            it('should not return a result', () => {
                expect(result).to.be.undefined;
            });

            it('should return an error', () => {
                expect(result).to.be.undefined;
                expect(error).to.deep.equal(mockError);
            });
        });
    });
});
