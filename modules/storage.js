import { generateId } from './utils.js'

export function loadRecipes() {
  try {
    const stored = localStorage.getItem('recipes')
    return stored ? JSON.parse(stored) : null
  } catch (e) {
    console.error('Error loading recipes from localStorage:', e)
    return null
  }
}

export function saveRecipes(recipes) {
  try {
    localStorage.setItem('recipes', JSON.stringify(recipes))
  } catch (e) {
    console.error('Error saving recipes to localStorage:', e)
    throw e
  }
}

export function initializeSampleRecipes() {
  // same sample data as before
  const pizzaRecipe = {
    id: generateId(),
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

  const sampleRecipes = [
    pizzaRecipe,
    {
      id: generateId(),
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
      id: generateId(),
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
      id: generateId(),
      title: 'Classic Baked Cheesecake',
      description:
        'Rich, creamy, smooth baked cheesecake with a buttery biscuit crust.',
      ingredients: [
        '1 1/2 cups (150g) crushed digestive biscuits or graham crackers',
        '1/4 cup (60g) melted butter',
        '2 tbsp sugar (optional)',
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
      id: generateId(),
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

  return sampleRecipes
}
