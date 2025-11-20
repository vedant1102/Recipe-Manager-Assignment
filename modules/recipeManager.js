import * as storage from './storage.js'
import * as ui from './ui.js'
import { generateId, debounce } from './utils.js'

export default class RecipeManager {
  constructor() {
    this.recipes = []
    this.currentRecipeId = null
    this.init()
  }

  init() {
    const stored = storage.loadRecipes()
    if (stored && Array.isArray(stored)) {
      this.recipes = stored
    } else {
      this.recipes = storage.initializeSampleRecipes()
      try {
        storage.saveRecipes(this.recipes)
      } catch (e) {
        // save failure handled elsewhere; keep recipes in memory
      }
    }

    this.setupEventListeners()
    this.showPage('home')
    this.renderRecipes()
  }

  // Navigation (unchanged behavior)
  showPage(pageId) {
    document.querySelectorAll('.page').forEach((page) => {
      page.classList.remove('active')
    })
    const target = document.getElementById(pageId)
    if (target) target.classList.add('active')
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.remove('active')
    })
    const navToActivate = document.querySelector(
      `.nav-link[data-page="${pageId}"]`
    )
    if (navToActivate) navToActivate.classList.add('active')
  }

  // CRUD (logic preserved)
  addRecipe(recipeData) {
    const newRecipe = { id: generateId(), ...recipeData }
    this.recipes.push(newRecipe)
    storage.saveRecipes(this.recipes)
    this.renderRecipes()
    this.showPage('home')
  }

  updateRecipe(recipeId, recipeData) {
    const index = this.recipes.findIndex((r) => r.id === recipeId)
    if (index !== -1) {
      this.recipes[index] = { ...this.recipes[index], ...recipeData }
      storage.saveRecipes(this.recipes)
      this.renderRecipes()
      this.showPage('home')
    }
  }

  deleteRecipe(recipeId) {
    this.recipes = this.recipes.filter((r) => r.id !== recipeId)
    storage.saveRecipes(this.recipes)
    this.renderRecipes()
    this.showPage('home')
  }

  getRecipeById(recipeId) {
    return this.recipes.find((r) => r.id === recipeId)
  }

  // Rendering uses ui helpers
  renderRecipes(filteredRecipes = null) {
    const recipesToRender = filteredRecipes || this.recipes
    const recipesGrid = document.getElementById('recipes-grid')
    if (!recipesGrid) return
    if (!recipesToRender || recipesToRender.length === 0) {
      recipesGrid.innerHTML = `
        <div class="empty-state">
          <h3>No recipes found</h3>
          <p>Try adjusting your search or add a new recipe.</p>
        </div>`
      return
    }
    recipesGrid.innerHTML = ui.renderRecipesHTML(recipesToRender)

    // attach handlers (same behavior)
    recipesGrid.querySelectorAll('.view-recipe').forEach((button) => {
      button.addEventListener('click', (e) => {
        const card = e.target.closest('.recipe-card')
        if (!card) return
        const id = card.dataset.id
        this.showRecipeDetail(id)
      })
    })
    recipesGrid.querySelectorAll('.edit-recipe').forEach((button) => {
      button.addEventListener('click', (e) => {
        const card = e.target.closest('.recipe-card')
        if (!card) return
        const id = card.dataset.id
        this.editRecipe(id)
      })
    })
  }

  showRecipeDetail(recipeId) {
    const recipe = this.getRecipeById(recipeId)
    if (!recipe) return
    const detailContent = document.getElementById('recipe-detail-content')
    if (!detailContent) return
    detailContent.innerHTML = ui.renderRecipeDetailHTML(recipe)
    const editBtn = document.getElementById('edit-recipe')
    if (editBtn) editBtn.onclick = () => this.editRecipe(recipeId)
    const deleteBtn = document.getElementById('delete-recipe')
    if (deleteBtn) deleteBtn.onclick = () => this.confirmDelete(recipeId)
    this.showPage('recipe-detail')
  }

  editRecipe(recipeId) {
    const recipe = this.getRecipeById(recipeId)
    if (!recipe) return
    this.currentRecipeId = recipeId
    const setIf = (id, value) => {
      const el = document.getElementById(id)
      if (el) el.value = value
    }
    setIf('recipe-id', recipe.id)
    setIf('title', recipe.title)
    setIf('description', recipe.description)
    setIf('prep-time', recipe.prepTime)
    setIf('cook-time', recipe.cookTime)
    setIf('difficulty', recipe.difficulty)
    setIf('image-url', recipe.imageUrl || '')
    const ingredientsContainer = document.getElementById(
      'ingredients-container'
    )
    if (ingredientsContainer) {
      ingredientsContainer.innerHTML = ''
      recipe.ingredients.forEach((i) => this.addIngredientField(i))
    }
    const stepsContainer = document.getElementById('steps-container')
    if (stepsContainer) {
      stepsContainer.innerHTML = ''
      recipe.steps.forEach((s) => this.addStepField(s))
    }
    const ft = document.getElementById('form-title')
    if (ft) ft.textContent = 'Edit Recipe'
    this.showPage('add-recipe')
  }

  // Form management (unchanged behavior)
  setupRecipeForm() {
    this.currentRecipeId = null
    const form = document.getElementById('recipe-form')
    if (form) form.reset()
    const ingredientsContainer = document.getElementById(
      'ingredients-container'
    )
    if (ingredientsContainer) ingredientsContainer.innerHTML = ''
    const stepsContainer = document.getElementById('steps-container')
    if (stepsContainer) stepsContainer.innerHTML = ''
    const ft = document.getElementById('form-title')
    if (ft) ft.textContent = 'Add New Recipe'
    this.addIngredientField()
    this.addStepField()
    document
      .querySelectorAll('.error-message')
      .forEach((el) => el.classList.remove('show'))
  }

  addIngredientField(value = '') {
    const container = document.getElementById('ingredients-container')
    if (!container) return
    const div = document.createElement('div')
    div.className = 'ingredient-item'
    div.innerHTML = `
      <input type="text" class="ingredient-input" value="${
        ui ? /* placeholder to satisfy linting */ '' : ''
      }${''}" placeholder="Enter ingredient">
    `
    // set value safely
    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'ingredient-input'
    input.placeholder = 'Enter ingredient'
    input.value = value
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'remove-item'
    btn.textContent = '×'
    div.innerHTML = ''
    div.appendChild(input)
    div.appendChild(btn)
    container.appendChild(div)
    btn.addEventListener('click', () => {
      if (container.children.length > 1) div.remove()
    })
  }

  addStepField(value = '') {
    const container = document.getElementById('steps-container')
    if (!container) return
    const div = document.createElement('div')
    div.className = 'step-item'
    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'step-input'
    input.placeholder = 'Enter step'
    input.value = value
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'remove-item'
    btn.textContent = '×'
    div.appendChild(input)
    div.appendChild(btn)
    container.appendChild(div)
    btn.addEventListener('click', () => {
      if (container.children.length > 1) div.remove()
    })
  }

  validateForm() {
    let isValid = true
    document
      .querySelectorAll('.error-message')
      .forEach((el) => el.classList.remove('show'))
    const titleEl = document.getElementById('title')
    const title = titleEl ? titleEl.value.trim() : ''
    if (!title) {
      const el = document.getElementById('title-error')
      if (el) {
        el.textContent = 'Title is required'
        el.classList.add('show')
      }
      isValid = false
    }
    const prepTimeEl = document.getElementById('prep-time')
    const prepTime = prepTimeEl ? parseInt(prepTimeEl.value, 10) : NaN
    if (!prepTime || prepTime < 1) {
      const el = document.getElementById('prep-time-error')
      if (el) {
        el.textContent = 'Valid prep time is required'
        el.classList.add('show')
      }
      isValid = false
    }
    const cookTimeEl = document.getElementById('cook-time')
    const cookTime = cookTimeEl ? parseInt(cookTimeEl.value, 10) : NaN
    if (!cookTime || cookTime < 1) {
      const el = document.getElementById('cook-time-error')
      if (el) {
        el.textContent = 'Valid cook time is required'
        el.classList.add('show')
      }
      isValid = false
    }
    const difficultyEl = document.getElementById('difficulty')
    const difficulty = difficultyEl ? difficultyEl.value : ''
    if (!difficulty) {
      const el = document.getElementById('difficulty-error')
      if (el) {
        el.textContent = 'Difficulty is required'
        el.classList.add('show')
      }
      isValid = false
    }
    const ingredients = Array.from(
      document.querySelectorAll('.ingredient-input')
    )
      .map((i) => (i ? i.value.trim() : ''))
      .filter(Boolean)
    if (ingredients.length === 0) {
      const el = document.getElementById('ingredients-error')
      if (el) {
        el.textContent = 'At least one ingredient is required'
        el.classList.add('show')
      }
      isValid = false
    }
    const steps = Array.from(document.querySelectorAll('.step-input'))
      .map((s) => (s ? s.value.trim() : ''))
      .filter(Boolean)
    if (steps.length === 0) {
      const el = document.getElementById('steps-error')
      if (el) {
        el.textContent = 'At least one step is required'
        el.classList.add('show')
      }
      isValid = false
    }
    return isValid
  }

  searchRecipes() {
    const searchInput = document.getElementById('search-input')
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : ''
    const difficultyFilterEl = document.getElementById('difficulty-filter')
    const difficultyFilter = difficultyFilterEl
      ? difficultyFilterEl.value
      : 'all'
    const timeFilterEl = document.getElementById('time-filter')
    const timeFilter = timeFilterEl ? parseInt(timeFilterEl.value || 0, 10) : 0
    let filtered = this.recipes.slice()
    if (searchTerm) {
      filtered = filtered.filter((recipe) => {
        const inTitle = (recipe.title || '').toLowerCase().includes(searchTerm)
        const inDesc = (recipe.description || '')
          .toLowerCase()
          .includes(searchTerm)
        const inIng = Array.isArray(recipe.ingredients)
          ? recipe.ingredients.some((ing) =>
              (ing || '').toLowerCase().includes(searchTerm)
            )
          : false
        return inTitle || inDesc || inIng
      })
    }
    if (difficultyFilter !== 'all')
      filtered = filtered.filter((r) => r.difficulty === difficultyFilter)
    if (timeFilter > 0)
      filtered = filtered.filter(
        (r) =>
          (Number(r.prepTime) || 0) + (Number(r.cookTime) || 0) <= timeFilter
      )
    this.renderRecipes(filtered)
  }

  confirmDelete(recipeId) {
    const modal = document.getElementById('confirm-modal')
    if (!modal) return
    modal.classList.add('active')
    const confirmBtn = document.getElementById('confirm-delete')
    const cancelBtn = document.getElementById('cancel-delete')
    if (confirmBtn)
      confirmBtn.onclick = () => {
        this.deleteRecipe(recipeId)
        modal.classList.remove('active')
      }
    if (cancelBtn)
      cancelBtn.onclick = () => {
        modal.classList.remove('active')
      }
  }

  setupEventListeners() {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const page = link.dataset.page
        if (page === 'add-recipe') this.setupRecipeForm()
        this.showPage(page)
      })
    })
    const backBtn = document.getElementById('back-btn')
    if (backBtn) backBtn.addEventListener('click', () => this.showPage('home'))
    const backFromDetail = document.getElementById('back-from-detail')
    if (backFromDetail)
      backFromDetail.addEventListener('click', () => this.showPage('home'))
    const cancelEdit = document.getElementById('cancel-edit')
    if (cancelEdit)
      cancelEdit.addEventListener('click', () => this.showPage('home'))
    const recipeForm = document.getElementById('recipe-form')
    if (recipeForm) {
      recipeForm.addEventListener('submit', (e) => {
        e.preventDefault()
        if (!this.validateForm()) return
        const formData = {
          title: (document.getElementById('title')?.value || '').trim(),
          description: (
            document.getElementById('description')?.value || ''
          ).trim(),
          prepTime: parseInt(
            document.getElementById('prep-time')?.value || '0',
            10
          ),
          cookTime: parseInt(
            document.getElementById('cook-time')?.value || '0',
            10
          ),
          difficulty: document.getElementById('difficulty')?.value || '',
          imageUrl: (document.getElementById('image-url')?.value || '').trim(),
          ingredients: Array.from(
            document.querySelectorAll('.ingredient-input')
          )
            .map((i) => (i ? i.value.trim() : ''))
            .filter(Boolean),
          steps: Array.from(document.querySelectorAll('.step-input'))
            .map((s) => (s ? s.value.trim() : ''))
            .filter(Boolean),
        }
        if (this.currentRecipeId)
          this.updateRecipe(this.currentRecipeId, formData)
        else this.addRecipe(formData)
      })
    }
    const addIngBtn = document.getElementById('add-ingredient')
    if (addIngBtn)
      addIngBtn.addEventListener('click', () => this.addIngredientField())
    const addStepBtn = document.getElementById('add-step')
    if (addStepBtn)
      addStepBtn.addEventListener('click', () => this.addStepField())
    const searchBtn = document.getElementById('search-btn')
    if (searchBtn)
      searchBtn.addEventListener('click', () => this.searchRecipes())
    const debouncedSearch = debounce(() => this.searchRecipes(), 180)
    const searchInput = document.getElementById('search-input')
    if (searchInput) {
      searchInput.addEventListener('input', debouncedSearch)
      searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') this.searchRecipes()
      })
    }
    const difficultyFilter = document.getElementById('difficulty-filter')
    if (difficultyFilter)
      difficultyFilter.addEventListener('change', () => this.searchRecipes())
    const timeFilter = document.getElementById('time-filter')
    if (timeFilter)
      timeFilter.addEventListener('change', () => this.searchRecipes())
    const confirmModal = document.getElementById('confirm-modal')
    if (confirmModal)
      confirmModal.addEventListener('click', (e) => {
        if (e.target.id === 'confirm-modal') e.target.classList.remove('active')
      })
  }

  getTimeIcon() {
    return ui.getTimeIcon()
  }
}
