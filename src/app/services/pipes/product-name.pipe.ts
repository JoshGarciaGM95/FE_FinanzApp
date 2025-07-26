import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Pipe({
  name: 'productName'
})
export class ProductNamePipe implements PipeTransform {
  constructor(private productService: ProductService) {}

  transform(value: number): Observable<string> {
    return new Observable<string>((observer: { next: (value: string) => void; complete: () => void; }) => {
      this.productService.getAll().subscribe(products => {
        if (products) {
          const product = products.find((prod: any) => prod.product_id === value);
          if (product) {
            observer.next(product.product_name);
          } else {
            observer.next('Unknown Product');
          }
        } else {
          observer.next('Loading Products...');
        }
        observer.complete();
      });
    });
  }
}