import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";

function Edit({ drawingPromptAdded }) {
    const [formData, setFormData] = useState({
        animal: "",
        color: "",
        word: "",
    });

    const params = useParams();
    const navigate = useNavigate();
    const getDrawingPrompt = async () => {
        try {
            const response = await fetch(`http://145.24.237.142:8000/drawingprompts/${params.id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                }
            });
            const data = await response.json();
            setFormData({
                animal: data.animal,
                color: data.color,
                word: data.word,
            });
        } catch (e) {
            console.error("Fout bij het ophalen van prompts:", e);
        }
    }

    useEffect(() => {
        getDrawingPrompt();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://145.24.237.142:8000/drawingprompts/${params.id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                drawingPromptAdded();
                navigate("/drawingprompts");
            } else {
                const data = await response.json();
                console.log("Error data:", data.error);
            }
        } catch (error) {
            console.error("Fout bij het verzenden van het formulier:", error);
        }
    }

    return (
        <div>
            <h1 className="bg-pink-600 p-4 text-white text-2xl font-bold">Pas prompt aan</h1>
            <form className="bg-slate-200 rounded-2xl p-2 m-4 flex-col text-center" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="animal">Dier:</label>
                    <input className="bg-white m-4 p-2 rounded-2xl text-blue-900" type="text" id="animal" name="animal" value={formData.animal}
                           onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="color">Kleur:</label>
                    <input className="bg-white m-4 p-2 rounded-2xl text-blue-900" type="text" id="color" name="color" value={formData.color}
                           onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="word">Woord</label>
                    <input className="bg-white m-4 p-2 rounded-2xl text-blue-900" type="text" id="word" name="word" value={formData.word}
                           onChange={handleInputChange}/>
                </div>
                <button className="bg-slate-400 rounded-2xl p-2 m-2 transition hover:bg-white" type="submit">Pas prompt aan</button>
            </form>
        </div>
    );
}

export default Edit;