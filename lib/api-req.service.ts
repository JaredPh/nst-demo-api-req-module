import { Component } from '@nestjs/common';
import * as request from 'superagent';

@Component()
export class ApiReqService {

    constructor() {}

    public get(url: string, query: { [key: string]: string } = {}) {
        return new Promise((resolve, reject) => {
            request
                .get(url)
                .query(query)
                .end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res.body);
                    }
                });
            });
    }
}
