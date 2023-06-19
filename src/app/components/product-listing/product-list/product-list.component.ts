import {Component, OnInit} from '@angular/core';
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
export class ProductListComponent implements OnInit {

  public products: IProduct[] = [];
  public filteredProducts: IProduct[] = [];
  public subcategories: ISubcategory[] = [];
  public isLoading: boolean = true;

  constructor(private productService: ProductService,
              private subcategoryService: SubcategoryService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  public filterProducts(filter: any): void {
    this.filteredProducts = filter(this.products);
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
      products: this.productService.getProducts,
      subcategories: this.subcategoryService.getSubcategories
    }).subscribe({
      next: (data: { products: IProduct[], subcategories: ISubcategory[] }) => {
        this.subcategories = data.subcategories;
        this.assignSubcategories(data.products);
        this.products = data.products;
        this.filteredProducts = data.products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
