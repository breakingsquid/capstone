import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useDataLayerValue } from "../../context/DataLayer";
import RecipeCard from "../RecipeCard/RecipeCard";

export default function Profile({ user, handleClickOnSave }) {
    const [saved, setSaved] = useState([]);
    const [errors, setErrors] = useState("");
    // Fetch  all of the user's saved recipes

    // const [{ saved }, dispatch] = useDataLayerValue();

    useEffect(() => {
        const fetchRecipes = async () => {
            const { data, error } = await apiClient.fetchSavedRecipes();
            if (data) {
                setSaved(data.savedRecipes);
                // dispatch({ type: "SET_SAVED", saved: data.savedRecipes });
            }

            if (error) {
                setErrors(error);
            }
        };
        fetchRecipes();
    }, []);

    const handleDelete = async (cur_saved_recipe) => {
        const { data, error } = await apiClient.deleteSavedRecipe(
            cur_saved_recipe
        );

        if (data) {
            // Filter saved
            setSaved(saved.filter((item) => item.id !== cur_saved_recipe.id));
        }

        if (error) {
            console.log(error);
        }
    };

    console.log(saved);
    console.log(handleClickOnSave);
    return (
        <div>
            {errors}
            <h2> Profile page </h2>
            <h3> Your stats </h3>
            <div> username: {user.username}</div>
            <div> first_name: {user.first_name}</div>
            <div> last_name: {user.last_name}</div>
            <div> email: {user.email}</div>

            <h3> Your saved recipes </h3>
            {/*.sort((a, b) => a.date - b.date)*/}
            {saved.map((s) => (
                <>
                    <RecipeCard
                        user={user}
                        recipeInfo={s}
                        handleClick={handleClickOnSave}
                    />
                    <button onClick={() => handleDelete(s)}> delete </button>
                </>
            ))}
        </div>
    );
}
