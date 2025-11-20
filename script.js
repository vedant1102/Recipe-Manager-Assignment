// Recipe Manager Application
class RecipeManager {
    constructor() {
        this.recipes = []
        this.currentRecipeId = null
        this.init()
    }

    init() {
        this.loadRecipes()
        this.setupEventListeners()
        this.showPage('home')
        this.renderRecipes()
    }

    // Local Storage Operations
    loadRecipes() {
        try {
            const storedRecipes = localStorage.getItem('recipes')
            if (storedRecipes) {
                this.recipes = JSON.parse(storedRecipes)
            } else {
                // Initialize with sample recipes if none exist
                this.initializeSampleRecipes()
            }
        } catch (error) {
            console.error('Error loading recipes from localStorage:', error)
            this.recipes = []
            this.initializeSampleRecipes()
        }
    }

    saveRecipes() {
        try {
            localStorage.setItem('recipes', JSON.stringify(this.recipes))
        } catch (error) {
            console.error('Error saving recipes to localStorage:', error)
            alert('Error saving recipes. Please try again.')
        }
    }

    initializeSampleRecipes() {
        // Add the candidate's pizza recipe
        const pizzaRecipe = {
            id: this.generateId(),
            title: "Vedant's Pizza",
            description: 'A delicious homemade pizza recipe for two people',
            ingredients: [
                '2 pizza base (1 for each)',
                '2 tomatoes',
                '2 capsicum',
                '1 onion',
                '2 cheese cubes (1 each for 2 bases)',
                '4 tablespoons pizza sauce',
                '2 tablespoons oregano/chilli flakes',
                '2 tablespoons salt',
            ],
            steps: [
                'Finely cut all the veggies: 2 tomatoes, 2 capsicum, 1 onion.',
                'Add all the veggies in the pan (veggies should be finely cut).',
                'Put the pan on gas stove and light the gas stove with lighter.',
                'Add two table spoon of salt to finely cut veggies in the pan.',
                'Cook the veggies in the pan for about 5 mins and then turn off the gas stove.',
                'Pre-heat the Microwave at 100°C to 120°C for 10-15 mins.',
                'Apply the Pizza Sauce on the pizza bases (both the bases). 2 tablespoons each (Apply it by spreading the sauce on the complete surface of the pizza base).',
                'Then take the pan of veggies and divide the veggies which are cooked in two halves. (The best halves should be equal).',
                'Put the veggies on the 1-2 pizza boxes (Both pizza boxes), and in half proportion which is mentioned in previous step.',
                'Spread the veggies to the surface of the pizza boxes. (Both the pizza boxes).',
                'Grate the cheese cube (one each) on each box evenly 1 cm, the surface of both pizza boxes on top of veggies.',
                'Take both the pizza boxes and put it in microwave oven and bake it for 1-2 mins. (set temperature at 100°C.)',
                'Sprinkle one table spoon of oregano or chilli flakes on pizza box evenly 1 cm, so that you can see a perfect fit.',
                'Your pizza is Ready to Serve for 2 people - one for each person.',
            ],
            prepTime: 15,
            cookTime: 10,
            difficulty: 'medium',
            imageUrl:
                'https://wallpaperbat.com/img/97392-food-pizza-cheese-hd-wallpaper-desktop-and-mobile-image-photo.jpg',
        }

        // Add additional sample recipes
        const sampleRecipes = [
            pizzaRecipe,
            {
                id: this.generateId(),
                title: 'Vegetable Pasta',
                description: 'Quick and easy vegetable pasta in white sauce',
                ingredients: [
                    '200g pasta',
                    '1 cup mixed vegetables (carrots, peas, corn)',
                    '1 onion, chopped',
                    '2 cloves garlic, minced',
                    '1 cup milk',
                    '2 tablespoons flour',
                    '2 tablespoons butter',
                    'Salt and pepper to taste',
                ],
                steps: [
                    'Boil pasta according to package instructions.',
                    'Heat butter in a pan, sauté onions and garlic until fragrant.',
                    'Add vegetables and cook until tender.',
                    'Add flour and cook for 1 minute.',
                    'Gradually add milk while stirring to avoid lumps.',
                    'Cook until sauce thickens, season with salt and pepper.',
                    'Add cooked pasta to the sauce and mix well.',
                    'Serve hot.',
                ],
                prepTime: 10,
                cookTime: 20,
                difficulty: 'easy',
                imageUrl: 'https://wallpapercave.com/wp/wp14904002.jpg',
            },
            {
                id: this.generateId(),
                title: 'Chocolate Chip Cookies',
                description: 'Classic homemade chocolate chip cookies',
                ingredients: [
                    '2 1/4 cups all-purpose flour',
                    '1 tsp baking soda',
                    '1 tsp salt',
                    '1 cup butter, softened',
                    '3/4 cup granulated sugar',
                    '3/4 cup packed brown sugar',
                    '2 large eggs',
                    '2 tsp vanilla extract',
                    '2 cups chocolate chips',
                ],
                steps: [
                    'Preheat oven to 375°F (190°C).',
                    'In a small bowl, mix flour, baking soda and salt.',
                    'In a large bowl, beat butter and sugars until creamy.',
                    'Add eggs and vanilla, beat well.',
                    'Gradually add flour mixture, mix well.',
                    'Stir in chocolate chips.',
                    'Drop by rounded tablespoons onto ungreased baking sheets.',
                    'Bake for 9-11 minutes or until golden brown.',
                    'Cool on baking sheets for 2 minutes before removing to wire racks.',
                ],
                prepTime: 15,
                cookTime: 10,
                difficulty: 'medium',
                imageUrl:
                    'https://t3.ftcdn.net/jpg/15/40/04/04/360_F_1540040464_3Sxvd4pEjISJ8wjszhE7rduXRhKYBqpv.jpg',
            },
            {
                id: this.generateId(),
                title: 'Classic Baked Cheesecake',
                description:
                    'Rich, creamy, smooth baked cheesecake with a buttery biscuit crust.',
                ingredients: [
                    // Crust
                    '1 1/2 cups (150g) crushed digestive biscuits or graham crackers',
                    '1/4 cup (60g) melted butter',
                    '2 tbsp sugar (optional)',

                    // Filling
                    '400g cream cheese (room temperature)',
                    '1/2 cup (100g) granulated sugar',
                    '1/2 cup (120g) fresh cream or sour cream',
                    '2 large eggs (room temperature)',
                    '1 tsp vanilla extract',
                    '1 tbsp lemon juice',
                    '1 tbsp cornflour (optional)',
                ],
                steps: [
                    'Preheat oven to 160°C (320°F). Line and prepare an 8-inch springform pan.',
                    'Mix crushed biscuits, melted butter, and sugar. Press mixture into the pan to form crust. Bake for 8 minutes and cool.',
                    'Beat cream cheese until smooth. Add sugar and mix until creamy.',
                    'Add fresh cream, vanilla, lemon juice, and cornflour. Mix gently.',
                    'Add eggs one at a time, mixing slowly. Do not over-mix.',
                    'Pour filling onto the cooled crust and smooth the top.',
                    'Bake for 45–55 minutes or until edges are set and center is slightly wobbly.',
                    'Turn off oven and let the cheesecake sit inside for 15 minutes.',
                    'Cool completely at room temperature, then refrigerate for at least 4 hours.',
                ],
                prepTime: 20,
                cookTime: 50,
                difficulty: 'hard',
                imageUrl:
                    'https://img.freepik.com/premium-photo/cheesecake-cherry-hd-8k-wallpaper-stock-photographic-image_890746-37390.jpg',
            },
            {
                id: this.generateId(),
                title: 'Chilli Cheese Toast',
                description: 'Crispy toast topped with spicy chilli-cheese mixture',
                ingredients: [
                    '4 bread slices',
                    '1 cup grated cheese (mozzarella or processed)',
                    '2 green chillies, finely chopped',
                    '1/4 cup capsicum, finely chopped',
                    '1/4 cup onions, finely chopped (optional)',
                    '1 tbsp butter',
                    '1/2 tsp chilli flakes',
                    '1/2 tsp oregano',
                    'Salt to taste',
                ],
                steps: [
                    'Preheat the oven or toaster to 180°C (350°F).',
                    'In a bowl, mix grated cheese, green chillies, capsicum, onions, chilli flakes, oregano, and a pinch of salt.',
                    'Spread a thin layer of butter on each bread slice.',
                    'Generously spread the chilli-cheese mixture on top of each slice.',
                    'Place the slices on a baking tray.',
                    'Bake or toast for 5-7 minutes, or until cheese melts and edges turn golden.',
                    'Remove and cut into halves. Serve hot.',
                ],
                prepTime: 10,
                cookTime: 7,
                difficulty: 'easy',
                imageUrl:
                    'https://www.chefkunalkapur.com/wp-content/uploads/2021/03/Chilli-Cheese-Toast-scaled.jpg?v=1620106898',
            },
        ]

        this.recipes = sampleRecipes
        this.saveRecipes()
    }

    // UI Navigation
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach((page) => {
            page.classList.remove('active')
        })

        // Show the requested page
        document.getElementById(pageId).classList.add('active')

        // Update navigation
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.classList.remove('active')
        })

        if (pageId === 'home') {
            document.querySelector('[data-page="home"]').classList.add('active')
        } else if (pageId === 'add-recipe') {
            document.querySelector('[data-page="add-recipe"]').classList.add('active')
        }
    }

    // Recipe CRUD Operations
    addRecipe(recipeData) {
        const newRecipe = {
            id: this.generateId(),
            ...recipeData,
        }
        this.recipes.push(newRecipe)
        this.saveRecipes()
        this.renderRecipes()
        this.showPage('home')
    }

    updateRecipe(recipeId, recipeData) {
        const index = this.recipes.findIndex((recipe) => recipe.id === recipeId)
        if (index !== -1) {
            this.recipes[index] = { ...this.recipes[index], ...recipeData }
            this.saveRecipes()
            this.renderRecipes()
            this.showPage('home')
        }
    }

    deleteRecipe(recipeId) {
        this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId)
        this.saveRecipes()
        this.renderRecipes()
        this.showPage('home')
    }

    getRecipeById(recipeId) {
        return this.recipes.find((recipe) => recipe.id === recipeId)
    }

    // UI Rendering
    renderRecipes(filteredRecipes = null) {
        const recipesToRender = filteredRecipes || this.recipes
        const recipesGrid = document.getElementById('recipes-grid')

        if (recipesToRender.length === 0) {
            recipesGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No recipes found</h3>
                    <p>Try adjusting your search or add a new recipe.</p>
                </div>
            `
            return
        }

        recipesGrid.innerHTML = recipesToRender
            .map(
                (recipe) => `
            <div class="recipe-card" data-id="${recipe.id}">
                <div class="recipe-image" style="background-image: url('${recipe.imageUrl ||
                    'https://via.placeholder.com/300x200?text=No+Image'
                    }')"></div>
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span>Prep: ${recipe.prepTime} min</span>
                        <span>Cook: ${recipe.cookTime} min</span>
                        <span class="recipe-difficulty difficulty-${recipe.difficulty
                    }">${recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)
                    }</span>
                    </div>
                    <div class="recipe-actions">
                        <button class="btn-primary view-recipe">View</button>
                        <button class="btn-secondary edit-recipe">Edit</button>
                    </div>
                </div>
            </div>
        `
            )
            .join('')

        // Add event listeners to recipe cards
        recipesGrid.querySelectorAll('.view-recipe').forEach((button) => {
            button.addEventListener('click', (e) => {
                const recipeId = e.target.closest('.recipe-card').dataset.id
                this.showRecipeDetail(recipeId)
            })
        })

        recipesGrid.querySelectorAll('.edit-recipe').forEach((button) => {
            button.addEventListener('click', (e) => {
                const recipeId = e.target.closest('.recipe-card').dataset.id
                this.editRecipe(recipeId)
            })
        })
    }

    showRecipeDetail(recipeId) {
        const recipe = this.getRecipeById(recipeId)
        if (!recipe) return

        const detailContent = document.getElementById('recipe-detail-content')
        detailContent.innerHTML = `
            <div class="recipe-detail-header">
                <div class="recipe-detail-image" style="background-image: url('${recipe.imageUrl ||
            'https://via.placeholder.com/300x200?text=No+Image'
            }')"></div>
                <div class="recipe-detail-info">
                    <h1 class="recipe-detail-title">${recipe.title}</h1>
                    <p class="recipe-detail-description">${recipe.description
            }</p>
                    <div class="recipe-detail-meta">
                        <div class="meta-item">
                            <span class="meta-label">Prep Time</span>
                            <span class="meta-value">${recipe.prepTime
            } minutes</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Cook Time</span>
                            <span class="meta-value">${recipe.cookTime
            } minutes</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Difficulty</span>
                            <span class="meta-value recipe-difficulty difficulty-${recipe.difficulty
            }">${recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)
            }</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ingredients-list">
                <h3>Ingredients</h3>
                <ul>
                    ${recipe.ingredients
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join('')}
                </ul>
            </div>
            <div class="steps-list">
                <h3>Instructions</h3>
                <ol>
                    ${recipe.steps.map((step) => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        `

        // Set up event listeners for detail page buttons
        document.getElementById('edit-recipe').onclick = () =>
            this.editRecipe(recipeId)
        document.getElementById('delete-recipe').onclick = () =>
            this.confirmDelete(recipeId)

        this.showPage('recipe-detail')
    }

    editRecipe(recipeId) {
        const recipe = this.getRecipeById(recipeId)
        if (!recipe) return

        this.currentRecipeId = recipeId

        // Populate form with recipe data
        document.getElementById('recipe-id').value = recipe.id
        document.getElementById('title').value = recipe.title
        document.getElementById('description').value = recipe.description
        document.getElementById('prep-time').value = recipe.prepTime
        document.getElementById('cook-time').value = recipe.cookTime
        document.getElementById('difficulty').value = recipe.difficulty
        document.getElementById('image-url').value = recipe.imageUrl || ''

        // Populate ingredients
        const ingredientsContainer = document.getElementById(
            'ingredients-container'
        )
        ingredientsContainer.innerHTML = ''
        recipe.ingredients.forEach((ingredient) => {
            this.addIngredientField(ingredient)
        })

        // Populate steps
        const stepsContainer = document.getElementById('steps-container')
        stepsContainer.innerHTML = ''
        recipe.steps.forEach((step) => {
            this.addStepField(step)
        })

        // Update form title
        document.getElementById('form-title').textContent = 'Edit Recipe'

        this.showPage('add-recipe')
    }

    // Form Management
    setupRecipeForm() {
        // Clear form for new recipe
        this.currentRecipeId = null
        document.getElementById('recipe-form').reset()
        document.getElementById('ingredients-container').innerHTML = ''
        document.getElementById('steps-container').innerHTML = ''
        document.getElementById('form-title').textContent = 'Add New Recipe'

        // Add at least one ingredient and step field
        this.addIngredientField()
        this.addStepField()

        // Hide error messages
        document.querySelectorAll('.error-message').forEach((el) => {
            el.classList.remove('show')
        })
    }

    addIngredientField(value = '') {
        const container = document.getElementById('ingredients-container')
        const div = document.createElement('div')
        div.className = 'ingredient-item'
        div.innerHTML = `
            <input type="text" class="ingredient-input" value="${value}" placeholder="Enter ingredient">
            <button type="button" class="remove-item">×</button>
        `
        container.appendChild(div)

        // Add event listener to remove button
        div.querySelector('.remove-item').addEventListener('click', () => {
            if (container.children.length > 1) {
                div.remove()
            }
        })
    }

    addStepField(value = '') {
        const container = document.getElementById('steps-container')
        const div = document.createElement('div')
        div.className = 'step-item'
        div.innerHTML = `
            <input type="text" class="step-input" value="${value}" placeholder="Enter step">
            <button type="button" class="remove-item">×</button>
        `
        container.appendChild(div)

        // Add event listener to remove button
        div.querySelector('.remove-item').addEventListener('click', () => {
            if (container.children.length > 1) {
                div.remove()
            }
        })
    }

    // Form Validation
    validateForm() {
        let isValid = true

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach((el) => {
            el.classList.remove('show')
        })

        // Validate title
        const title = document.getElementById('title').value.trim()
        if (!title) {
            document.getElementById('title-error').textContent = 'Title is required'
            document.getElementById('title-error').classList.add('show')
            isValid = false
        }

        // Validate prep time
        const prepTime = document.getElementById('prep-time').value
        if (!prepTime || prepTime < 1) {
            document.getElementById('prep-time-error').textContent =
                'Valid prep time is required'
            document.getElementById('prep-time-error').classList.add('show')
            isValid = false
        }

        // Validate cook time
        const cookTime = document.getElementById('cook-time').value
        if (!cookTime || cookTime < 1) {
            document.getElementById('cook-time-error').textContent =
                'Valid cook time is required'
            document.getElementById('cook-time-error').classList.add('show')
            isValid = false
        }

        // Validate difficulty
        const difficulty = document.getElementById('difficulty').value
        if (!difficulty) {
            document.getElementById('difficulty-error').textContent =
                'Difficulty is required'
            document.getElementById('difficulty-error').classList.add('show')
            isValid = false
        }

        // Validate ingredients
        const ingredients = Array.from(
            document.querySelectorAll('.ingredient-input')
        )
            .map((input) => input.value.trim())
            .filter((value) => value)

        if (ingredients.length === 0) {
            document.getElementById('ingredients-error').textContent =
                'At least one ingredient is required'
            document.getElementById('ingredients-error').classList.add('show')
            isValid = false
        }

        // Validate steps
        const steps = Array.from(document.querySelectorAll('.step-input'))
            .map((input) => input.value.trim())
            .filter((value) => value)

        if (steps.length === 0) {
            document.getElementById('steps-error').textContent =
                'At least one step is required'
            document.getElementById('steps-error').classList.add('show')
            isValid = false
        }

        return isValid
    }

    // Search and Filter
    searchRecipes() {
        const searchTerm = document
            .getElementById('search-input')
            .value.toLowerCase()
        const difficultyFilter = document.getElementById('difficulty-filter').value
        const timeFilter = parseInt(document.getElementById('time-filter').value)

        let filteredRecipes = this.recipes

        // Apply search filter
        if (searchTerm) {
            filteredRecipes = filteredRecipes.filter(
                (recipe) =>
                    recipe.title.toLowerCase().includes(searchTerm) ||
                    recipe.description.toLowerCase().includes(searchTerm) ||
                    recipe.ingredients.some((ingredient) =>
                        ingredient.toLowerCase().includes(searchTerm)
                    )
            )
        }

        // Apply difficulty filter
        if (difficultyFilter !== 'all') {
            filteredRecipes = filteredRecipes.filter(
                (recipe) => recipe.difficulty === difficultyFilter
            )
        }

        // Apply time filter
        if (timeFilter > 0) {
            filteredRecipes = filteredRecipes.filter(
                (recipe) => recipe.prepTime + recipe.cookTime <= timeFilter
            )
        }

        this.renderRecipes(filteredRecipes)
    }

    // Utility Functions
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2)
    }

    confirmDelete(recipeId) {
        const modal = document.getElementById('confirm-modal')
        modal.classList.add('active')

        document.getElementById('confirm-delete').onclick = () => {
            this.deleteRecipe(recipeId)
            modal.classList.remove('active')
        }

        document.getElementById('cancel-delete').onclick = () => {
            modal.classList.remove('active')
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                const page = e.target.dataset.page
                if (page === 'add-recipe') {
                    this.setupRecipeForm()
                }
                this.showPage(page)
            })
        })

        // Back buttons
        document.getElementById('back-btn').addEventListener('click', () => {
            this.showPage('home')
        })

        document
            .getElementById('back-from-detail')
            .addEventListener('click', () => {
                this.showPage('home')
            })

        document.getElementById('cancel-edit').addEventListener('click', () => {
            this.showPage('home')
        })

        // Form submission
        document.getElementById('recipe-form').addEventListener('submit', (e) => {
            e.preventDefault()

            if (!this.validateForm()) return

            // Collect form data
            const formData = {
                title: document.getElementById('title').value.trim(),
                description: document.getElementById('description').value.trim(),
                prepTime: parseInt(document.getElementById('prep-time').value),
                cookTime: parseInt(document.getElementById('cook-time').value),
                difficulty: document.getElementById('difficulty').value,
                imageUrl: document.getElementById('image-url').value.trim(),
                ingredients: Array.from(document.querySelectorAll('.ingredient-input'))
                    .map((input) => input.value.trim())
                    .filter((value) => value),
                steps: Array.from(document.querySelectorAll('.step-input'))
                    .map((input) => input.value.trim())
                    .filter((value) => value),
            }

            // Add or update recipe
            if (this.currentRecipeId) {
                this.updateRecipe(this.currentRecipeId, formData)
            } else {
                this.addRecipe(formData)
            }
        })

        // Add ingredient and step buttons
        document.getElementById('add-ingredient').addEventListener('click', () => {
            this.addIngredientField()
        })

        document.getElementById('add-step').addEventListener('click', () => {
            this.addStepField()
        })

        // Search and filter
        document.getElementById('search-btn').addEventListener('click', () => {
            this.searchRecipes()
        })

        document.getElementById('search-input').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.searchRecipes()
            }
        })

        document
            .getElementById('difficulty-filter')
            .addEventListener('change', () => {
                this.searchRecipes()
            })

        document.getElementById('time-filter').addEventListener('change', () => {
            this.searchRecipes()
        })

        // Close modal when clicking outside
        document.getElementById('confirm-modal').addEventListener('click', (e) => {
            if (e.target.id === 'confirm-modal') {
                e.target.classList.remove('active')
            }
        })
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RecipeManager()
})
