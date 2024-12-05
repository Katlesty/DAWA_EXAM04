import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  categories: any[] = [];  
  products: any[] = [];  
  newProduct = {
    name: '',
    description: '',
    price: null,
    category: '',  
    quantity: null
  };
  selectedProduct = {  
    _id: '',
    name: '',
    description: '',
    price: null,
    category: '',
    quantity: null
  };
  showAddModal = false;  
  showEditModal = false; 

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    // Cargar categorías desde el backend
    this.categoryService.getCategories().subscribe(
      (categories: any) => {
        this.categories = categories; 
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );

    // Cargar productos desde el backend
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products: any) => {
        this.products = products; 
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  addProduct() {
    // Asegurarse de que la categoría y la cantidad están seleccionadas
    if (this.newProduct.category && this.newProduct.quantity) {
      this.productService.createProduct(this.newProduct).subscribe(
        (response) => {
          console.log('Producto creado exitosamente:', response);
          this.loadProducts();  // Recargar la lista de productos
          this.closeModal();  // Cerrar el modal de agregar
        },
        (error) => {
          console.error('Error al crear el producto:', error);
        }
      );
    } else {
      alert('Por favor, selecciona una categoría y una cantidad.');
    }
  }

  openEditModal(product: any) {
    this.selectedProduct = { ...product };  
    this.showEditModal = true;
  }

  updateProduct() {
    // Asegurarse de que la categoría y la cantidad están seleccionadas
    if (this.selectedProduct.category && this.selectedProduct.quantity) {
      this.productService.updateProduct(this.selectedProduct).subscribe(
        (response) => {
          console.log('Producto actualizado exitosamente:', response);
          this.loadProducts();  // Recargar la lista de productos
          this.closeModal();  // Cerrar el modal de edición
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      alert('Por favor, selecciona una categoría y una cantidad.');
    }
  }

  deleteProduct(productId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(productId).subscribe(
        (response) => {
          console.log('Producto eliminado exitosamente:', response);
          this.loadProducts();  // Recargar la lista de productos
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }

  closeModal() {
    this.showAddModal = false;
    this.showEditModal = false;
  }

  openAddModal() {
    this.showAddModal = true;
  }
}
