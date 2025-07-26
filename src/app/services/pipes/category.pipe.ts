import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  transform(value: number): Observable<string> {
    return new Observable<string>((observer: { next: (value: string) => void; complete: () => void; }) => {
      this.categoryService.getAllCategories().subscribe(categories => {
        if (categories) {
          const category = categories.find((cat: any) => cat.category_id === value);
          if (category) {
            observer.next(category.category_name);
          } else {
            observer.next('Unknown Category');
          }
        } else {
          observer.next('Loading Categories...');
        }
        observer.complete();
      });
    });
  }
}