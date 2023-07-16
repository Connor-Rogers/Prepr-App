import React, { useState } from 'react';
import axios from 'axios';
import { useAuthState } from './firebase';  // adjust this import as necessary
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDropzone } from 'react-dropzone';
import './CreateRecipe.css';

const CreateRecipeForm = () => {
  const { user } = useAuthState();  // get the currently logged in user
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();

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

      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      photos.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo);
      });
      
      const response = await axios.post('http://127.0.0.1:5000/recipe/insert', formData, {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log(response.data);
      history.push('/new-recipes');
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

      <label>
        Ingredients and Quantities:
        <textarea {...register("ingredients", { required: true })} />
      </label>
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

      <div {...getRootProps({className: 'dropzone'})}>
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