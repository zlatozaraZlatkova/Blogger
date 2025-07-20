import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPagination } from 'src/app/interfaces/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() paginationData!: IPagination;
  @Output() pageChange = new EventEmitter<number>();

  getPageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.paginationData.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }


  onPageChange(page: number): void {
    if (page !== this.paginationData.currentPage && page >= 1 && page <= this.paginationData.totalPages) {
      this.pageChange.emit(page);
    }

  }

  onPrevious(): void {
    if (this.paginationData.hasPrevPage) {
      this.onPageChange(this.paginationData.currentPage - 1);
    }
  }

  onNext(): void {
    if (this.paginationData.hasNextPage) {
      this.onPageChange(this.paginationData.currentPage + 1);
    }
  }

}
