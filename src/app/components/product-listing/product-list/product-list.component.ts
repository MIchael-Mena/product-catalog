import {Component} from '@angular/core';
import {ProductService} from "../service/product.service";
import {IProduct} from "../model/IProduct";
import {SubcategoryService} from "../service/subcategory.service";
import {ISubcategory} from "../model/ISubcategory";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: []
})
export class ProductListComponent {

  public products: IProduct[] = [];
  public subcategories: ISubcategory[] = [];
  public isLoading: boolean = true;

  constructor(private productService: ProductService,
              private subcategoryService: SubcategoryService) {
    this.getData();
  }

  private assignSubcategories(products: IProduct[]): void {
    products.forEach((product: IProduct) => {
      product.subcategoria = this.subcategories.find((subcategory: ISubcategory) => {
        return subcategory.id === product.id_subcategoria;
      })?.nombre.trim() || '';
    });
  }

  private getData(): void {
    forkJoin({
      products: this.productService.products,
      subcategories: this.subcategoryService.subcategories
    }).subscribe({
      next: (data: { products: IProduct[], subcategories: ISubcategory[] }) => {
        this.subcategories = data.subcategories;
        this.assignSubcategories(data.products);
        this.products = data.products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
