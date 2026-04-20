import React, { useState, useEffect } from "react";
import "./MealForm.css";

const MealForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nameEn: "",
    nameAm: "",
    category: "meal",
    portion: "1 cup",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nameEn: initialData.name?.en || "",
        nameAm: initialData.name?.am || "",
        category: initialData.category || "meal",
        portion: initialData.portion || "1 cup",
        calories: initialData.calories || "",
        protein: initialData.protein || "",
        carbs: initialData.carbs || "",
        fat: initialData.fat || "",
        imageUrl: initialData.imageUrl || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Transform to match Firestore structure
    const mealData = {
      name: {
        en: formData.nameEn,
        am: formData.nameAm,
      },
      category: formData.category,
      portion: formData.portion,
      calories: Number(formData.calories),
      protein: Number(formData.protein),
      carbs: Number(formData.carbs),
      fat: Number(formData.fat),
      imageUrl: formData.imageUrl || null,
    };
    onSubmit(mealData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{initialData ? "Edit Meal" : "Add New Meal"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name (English) *</label>
              <input
                type="text"
                name="nameEn"
                value={formData.nameEn}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Name (Amharic)</label>
              <input
                type="text"
                name="nameAm"
                value={formData.nameAm}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="meal">Meal</option>
                <option value="ingredient">Ingredient</option>
              </select>
            </div>
            <div className="form-group">
              <label>Portion</label>
              <input
                type="text"
                name="portion"
                value={formData.portion}
                onChange={handleChange}
                placeholder="e.g., 1 cup, 100g"
              />
            </div>
          </div>

          <div className="nutrition-grid">
            <div className="form-group">
              <label>Calories (kcal)</label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                min="0"
                step="0.1"
                required
              />
            </div>
            <div className="form-group">
              <label>Protein (g)</label>
              <input
                type="number"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                min="0"
                step="0.1"
                required
              />
            </div>
            <div className="form-group">
              <label>Carbs (g)</label>
              <input
                type="number"
                name="carbs"
                value={formData.carbs}
                onChange={handleChange}
                min="0"
                step="0.1"
                required
              />
            </div>
            <div className="form-group">
              <label>Fat (g)</label>
              <input
                type="number"
                name="fat"
                value={formData.fat}
                onChange={handleChange}
                min="0"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL (optional)</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {initialData ? "Update" : "Add"} Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MealForm;
