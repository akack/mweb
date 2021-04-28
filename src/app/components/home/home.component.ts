import { Component, OnInit } from '@angular/core';
import { DataPullService } from '../../../shared/data-pull.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DataPullService],
})
export class HomeComponent implements OnInit {
  providers = [{
    id: 1,
    name: 'akha'
  }];

  images = [{
    "code": "centurycity",
    "name": "Century City Connect",
    "url": "https://www.mweb.co.za/media/images/providers/provider-century.png"
  }, {
    "code": "evotel",
    "name": "Evotel",
    "url": "https://www.mweb.co.za/media/images/providers/provider-evotel.png"
  }, {
    "code": "octotel",
    "name": "Octotel",
    "url": "https://www.mweb.co.za/media/images/providers/provider-octotel.png"
  }, {
    "code": "vumatel",
    "name": "Vumatel",
    "url": "https://www.mweb.co.za/media/images/providers/provider-vuma.png"
  }, {
    "code": "openserve",
    "name": "Openserve",
    "url": "https://www.mweb.co.za/media/images/providers/provider-openserve.png"
  }, {
    "code": "frogfoot",
    "name": "Frogfoot",
    "url": "https://www.mweb.co.za/media/images/providers/provider-frogfoot.png"
  }, {
    "code": "mfn",
    "name": "MFN",
    "url": "https://www.mweb.co.za/media/images/providers/provider-metrofibre.png"
  }, {
    "code": "vodacom",
    "name": "Vodacom",
    "url": "https://www.mweb.co.za/media/images/providers/provider-vodacom.png"
  }, {
    "code": "linkafrica",
    "name": "Link Africa",
    "url": "https://www.mweb.co.za/media/images/providers/provider-linkafrica.png"
  }, {
    "code": "linklayer",
    "name": "Link Layer",
    "url": "https://www.mweb.co.za/media/images/providers/provider-link-layer.png"
  }, {
    "code": "lightstruck",
    "name": "Lightstruck",
    "url": "https://www.mweb.co.za/media/images/providers/provider-lightstruck.png"
  }, {
    "code": "mitchells",
    "name": "Mitchells Fibre",
    "url": "https://www.mweb.co.za/media/images/providers/provider-mitchells.png"
  }, {
    "code": "vumareach",
    "name": "Vuma Reach",
    "url": "https://www.mweb.co.za/media/images/providers/provider-vuma.png"
  }]
  

  loading = false
  constructor(private _dataService: DataPullService) {}

  promoCodes: any = [];
  allProducts: any = [];

  async ngOnInit() {
    this.loading;
    await this.getData();
    console.log('All Products: ', this.allProducts);
  }

  async getData() {
    await this._dataService.getFibreCampaigns().subscribe(
      (res: any) => {
        const campaigns = res.campaigns as any;
        campaigns.forEach((campaign: any) => {
          const promoC = campaign.promocodes as any;
          promoC.forEach(async (promoCode: any) => {
            this.promoCodes.push(promoCode);
            await this._dataService.getAllProducts(promoCode).subscribe(
              (res: any) => {
                const products = res[0].products as any;
                products.forEach((product: any) => {
                  this.images.forEach(element => {
                    if(product.subcategory.toLowerCase().includes(element.code)){
                      this.allProducts.push({
                        product: product,
                        image: element.url
                      });
                    }
                  });
                });
              },
              (err) => {
                console.log(err);
              }
            );
          });
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
    this.loading = false
  }

  checkM(_id: number) {
    console.log('check: ' + _id);
  }
}
