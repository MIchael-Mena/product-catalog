import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../enviroments/environment";
import {IImage, IProduct} from "../models/IProduct";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly apiUrl = environment.baseURL + '/test/productos.json';
  readonly apiUrlImg = environment.baseURLImgProducts;

  constructor(private http: HttpClient) {
  }

  get getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl).pipe(
      map((products: IProduct[]) => {
        this.assembleImagesUrl(products);
        return products;
      })
    );
  }

  private assembleImagesUrl(products: IProduct[]): void {
    products.forEach((product: IProduct) => {
      product.imagenes.forEach((image: IImage) => {
        image.url = this.apiUrlImg + image.nombre + '-med.jpg';
      });
    });
  }

}