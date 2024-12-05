import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  showAddModal = false; 
  showEditModal = false; 
  selectedCategory: any = null; 
  newCategory: any = { name: '', description: '' }; 

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  // Cargar categorías desde el servicio
  loadCategories() {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  // Abrir modal de agregar
  openAddModal() {
    this.newCategory = { name: '', description: '' }; // Resetear datos del formulario
    this.showAddModal = true;
  }

  // Abrir modal de editar
  openEditModal(category: any) {
    this.selectedCategory = { ...category }; // Copiar la categoría seleccionada
    this.showEditModal = true;
  }

  // Cerrar ambos modales
  closeModal() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.selectedCategory = null;
  }

  // Agregar categoría
  addCategory() {
    if (this.newCategory.name && this.newCategory.description) {
      this.categoryService.createCategory(this.newCategory).subscribe(
        (response) => {
          console.log('Categoria agregada:', response);
          this.loadCategories(); // Recargar categorías
          this.closeModal(); // Cerrar el modal
        },
        (error) => {
          console.error('Error al agregar categoria:', error);
        }
      );
    } else {
      alert('Por favor complete todos los campos requeridos.');
    }
  }

  // Actualizar categoría
  updateCategory() {
    if (this.selectedCategory && this.selectedCategory._id) {
      this.categoryService.updateCategory(this.selectedCategory._id, this.selectedCategory).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    }
  }

  // Eliminar categoría
  deleteCategory(id: string) {
    if (confirm('¿Estas seguro de que quieres eliminar esta categoria?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }
}
