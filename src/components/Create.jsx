import { useState } from "react";
import { useNavigate } from "react-router";

function Create({ drawingPromptAdded }) {
    const [formData, setFormData] = useState({
        animal: "",
        color: "",
        word: "",
    });

    const navigate = useNavigate();

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
            const response = await fetch("http://145.24.237.142:8000/drawingprompts/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 201) {
                const data = await response.json();
                console.log("Succesvol aangemaakt:", data);

                drawingPromptAdded();
                navigate("/drawingprompts");
            } else {
                const errorData = await response.json();
                console.log("Foutmelding:", errorData.error);
            }
        } catch (error) {
            console.error("Fout bij het verzenden van het formulier:", error);
        }
    }

    return (
        <div>
            <h1 className="bg-pink-600 p-4 text-white text-2xl font-bold">Maak een drawing prompt aan</h1>
            <div className="bg-blue-700 p-4 rounded-b-2xl">
                <form className="bg-slate-200 rounded-2xl p-6 m-4 text-center" onSubmit={handleSubmit}>
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
                    <button className="bg-slate-400 rounded-2xl p-2 m-2 transition hover:bg-white" type="submit">Voeg prompt toe</button>
                </form>
            </div>
        </div>
    );
}

export default Create;