import React, { useState, useEffect } from "react";
import { useMealStorage } from "../storage/useMealStorage";
import { addMeal, updateMeal, deleteMeal } from "../services/mealsService";
import {
  FiSearch,
  FiTrash2,
  FiEdit,
  FiPlus,
  FiRefreshCw,
} from "react-icons/fi";
import MealForm from "../components/Meals/MealForm";
import "./Meals.css";

const Meals = () => {
  const { meals, loading, refreshMeals, fetchMeals } = useMealStorage();
  const [showForm, setShowForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const handleAdd = async (mealData) => {
    try {
      await addMeal(mealData);
      await refreshMeals();
      setShowForm(false);
    } catch (error) {
      console.error("Failed to add meal:", error);
      alert("Error adding meal");
    }
  };

  const handleUpdate = async (mealData) => {
    try {
      await updateMeal(editingMeal.id, mealData);
      await refreshMeals();
      setEditingMeal(null);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to update meal:", error);
      alert("Error updating meal");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      try {
        await deleteMeal(id);
        await refreshMeals();
      } catch (error) {
        console.error("Failed to delete meal:", error);
        alert("Error deleting meal");
      }
    }
  };

  const openEdit = (meal) => {
    setEditingMeal(meal);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingMeal(null);
  };

  // Filtering
  const filteredMeals = meals.filter((meal) => {
    const matchesSearch =
      meal.name?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.name?.am?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || meal.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="loading">Loading meals...</div>;

  return (
    <div className="meals-page">
      <div className="page-header">
        <h1>Food Management</h1>
        <button className="refresh-meal" onClick={refreshMeals}>
          <FiRefreshCw size={24} />
        </button>
        <button
          className="btn-primary add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add New Meal
        </button>
      </div>

      <div className="filters">
        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name (EN/AM)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          <option value="meal">Meals</option>
          <option value="ingredient">Ingredients</option>
        </select>
      </div>

      <div className="meals-table-container">
        <table className="meals-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name (EN/AM)</th>
              <th>Category</th>
              <th>Portion</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Carbs</th>
              <th>Fat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeals.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  No meals found
                </td>
              </tr>
            ) : (
              filteredMeals.map((meal) => (
                <tr key={meal.id}>
                  <td>
                    {meal.imageUrl ? (
                      <img
                        src={meal.imageUrl}
                        alt={meal.name?.en}
                        className="meal-thumb"
                      />
                    ) : (
                      <span className="no-image">🍽️</span>
                    )}
                  </td>
                  <td>
                    <div>{meal.name?.en}</div>
                    {meal.name?.am && (
                      <div className="am-name">{meal.name.am}</div>
                    )}
                  </td>
                  <td>
                    <span className={`category-badge ${meal.category}`}>
                      {meal.category}
                    </span>
                  </td>
                  <td>{meal.portion}</td>
                  <td>{meal.calories} kcal</td>
                  <td>{meal.protein}g</td>
                  <td>{meal.carbs}g</td>
                  <td>{meal.fat}g</td>
                  <td>
                    <button
                      className="action-btn edit"
                      onClick={() => openEdit(meal)}
                    >
                      <FiEdit size={24} />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(meal.id)}
                    >
                      <FiTrash2 size={24} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <MealForm
          initialData={editingMeal}
          onSubmit={editingMeal ? handleUpdate : handleAdd}
          onCancel={closeForm}
        />
      )}
    </div>
  );
};

export default Meals;
