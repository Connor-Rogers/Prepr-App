import React, { useState } from 'react';
import axios from 'axios';
import { useAuthState } from './firebase';
import { useHistory } from 'react-router-dom';
import { useForm, useFieldArray } from "react-hook-form";
import { useDropzone } from 'react-dropzone';
import './CreateRecipe.css';

const CreateRecipeForm = () => {
  const { user } = useAuthState();
  const history = useHistory();
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients"
  });

  const [photos, setPhotos] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setPhotos(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const onSubmit = async (data) => {
    try {
      const idToken = await user.getIdToken();
      const formData = new FormData();
      data.ingredients = watch('ingredients');
      Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
          data[key].forEach((val, index) => {
            if (typeof val === 'object' && val !== null) {
              Object.keys(val).forEach(subKey => {
                formData.append(`${key}[${index}][${subKey}]`, val[subKey]);
              });
            } else {
              formData.append(`${key}[]`, val);
            }
          });
        } else {
          formData.append(key, data[key]);
        }
      });

      photos.forEach((photo, index) => {
        formData.append(`photos[]`, photo);
      });

      const response = await axios.post('http://127.0.0.1:5000/recipe/create', formData, {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      const data = await response.json();
      if (data.message === "Recipe created successfully") {
        history.push(`/recipe/${data.recipe_id}`);
        // Handle the success case if needed
      }
    } catch (error) {
      console.error("Error submitting recipe data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="recipe-form">
      <label>
        Recipe Title:
        <input {...register("title", { required: true })} />
      </label>
      {errors.title && <p>This field is required</p>}
      {fields.map((item, index) => (
        <div key={item.id} className="ingredient-row">
          <label>
            Ingredient:
            <input
              {...register(`ingredients[${index}].ingredient`, { required: true })}
              defaultValue={item.ingredient}
            />
          </label>
          <label>
            Quantity:
            <input
              {...register(`ingredients[${index}].quantity`, { required: true })}
              defaultValue={item.quantity}
            />
          </label>
          <button type="button" className="remove-ingredient-button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" className="add-ingredient-button" onClick={() => append({ ingredient: "", quantity: "" })}>
        Add Ingredient
      </button>

      {errors.ingredients && <p>This field is required</p>}

      <label>
        Instructions:
        <textarea {...register("instructions", { required: true })} />
      </label>
      {errors.instructions && <p>This field is required</p>}

      <label>
        Total Calories:
        <input {...register("calories", { required: true })} />
      </label>
      {errors.calories && <p>This field is required</p>}

      <label>
        Total Fats:
        <input {...register("fats", { required: true })} />
      </label>
      {errors.fats && <p>This field is required</p>}

      <label>
        Total Carbs:
        <input {...register("carbs", { required: true })} />
      </label>
      {errors.carbs && <p>This field is required</p>}

      <label>
        Total Proteins:
        <input {...register("proteins", { required: true })} />
      </label>
      {errors.proteins && <p>This field is required</p>}

      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some photos here, or click to select photos</p>
      </div>
      <aside>
        <h4>Photos</h4>
        <ul>
          {photos.map((photo, index) => (
            <li key={index}>
              <img src={photo.preview} alt="preview" />
            </li>
          ))}
        </ul>
      </aside>

      <input type="submit" value="Save Recipe" />
    </form>
  );
};

export default CreateRecipeForm;
