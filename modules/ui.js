import { escapeHtml, escapeHtmlAttr } from './utils.js'

export function getTimeIcon() {
  return `<svg class="time-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`
}

export function renderRecipesHTML(recipes = []) {
  return recipes
    .map((recipe) => {
      const rawDiff = recipe.difficulty || ''
      const diffEscaped = escapeHtml(rawDiff)
      const diffLabel =
        diffEscaped && diffEscaped.length
          ? diffEscaped.charAt(0).toUpperCase() + diffEscaped.slice(1)
          : ''
      return `
    <div class="recipe-card" data-id="${escapeHtmlAttr(recipe.id)}">
      <div class="recipe-image" style="background-image: url('${escapeHtmlAttr(
        recipe.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'
      )}')"></div>
      <div class="recipe-content">
        <h3 class="recipe-title">${escapeHtml(recipe.title)}</h3>
        <p class="recipe-description">${escapeHtml(recipe.description)}</p>
        <div class="recipe-meta">
          <span class="meta-item">${getTimeIcon()} Prep: ${
        Number(recipe.prepTime) || 0
      } min</span>
          <span class="meta-item">${getTimeIcon()} Cook: ${
        Number(recipe.cookTime) || 0
      } min</span>
          <span class="meta-item">${getTimeIcon()} Total: ${
        (Number(recipe.prepTime) || 0) + (Number(recipe.cookTime) || 0)
      } min</span>
        </div>
        <div class="recipe-actions">
          <div class="action-buttons">
            <button class="btn-primary view-recipe">View</button>
            <button class="btn-secondary edit-recipe">Edit</button>
          </div>
          <span class="card-difficulty-pill difficulty-${escapeHtmlAttr(
            rawDiff
          )}">${diffLabel}</span>
        </div>
      </div>
    </div>`
    })
    .join('')
}

export function renderRecipeDetailHTML(recipe) {
  if (!recipe) return ''
  return `
    <div class="recipe-detail-header">
      <div class="recipe-detail-image" style="background-image: url('${escapeHtmlAttr(
        recipe.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'
      )}')"></div>
      <div class="recipe-detail-info">
        <h1 class="recipe-detail-title">${escapeHtml(recipe.title)}</h1>
        <p class="recipe-detail-description">${escapeHtml(
          recipe.description
        )}</p>
        <div class="recipe-detail-meta">
          <div class="meta-item">
            <span class="meta-label">${getTimeIcon()} Prep Time</span>
            <span class="meta-value">${
              Number(recipe.prepTime) || 0
            } minutes</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${getTimeIcon()} Cook Time</span>
            <span class="meta-value">${
              Number(recipe.cookTime) || 0
            } minutes</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${getTimeIcon()} Total Time</span>
            <span class="meta-value">${
              (Number(recipe.prepTime) || 0) + (Number(recipe.cookTime) || 0)
            } minutes</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Difficulty</span>
            <span class="meta-value recipe-difficulty difficulty-${escapeHtmlAttr(
              recipe.difficulty || ''
            )}">${escapeHtml(recipe.difficulty || '')}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="ingredients-list">
      <h3>Ingredients</h3>
      <ul>
        ${
          Array.isArray(recipe.ingredients)
            ? recipe.ingredients
                .map((i) => `<li>${escapeHtml(i)}</li>`)
                .join('')
            : ''
        }
      </ul>
    </div>
    <div class="steps-list">
      <h3>Instructions</h3>
      <ol>
        ${
          Array.isArray(recipe.steps)
            ? recipe.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')
            : ''
        }
      </ol>
    </div>`
}
