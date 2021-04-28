import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataPullService {
    baseURL ='https://apigw.mweb.co.za/prod/baas/proxy';
    constructor(private http: HttpClient) {}

    getFibreCampaigns() {
        return this.http.get(
            `${this.baseURL}/marketing/campaigns/fibre`
        );
    }

    getAllProducts(promoCodes: string) {
        return this.http.get(
            `${this.baseURL}/marketing/products/promos/${promoCodes}?sellable_online=true`
        );
    }
}