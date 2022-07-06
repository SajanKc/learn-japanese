import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function App() {
	const hiragana = [
		{ romanji: "a", hiragana: "あ" },
		{ romanji: "i", hiragana: "い" },
		{ romanji: "u", hiragana: "う" },
		{ romanji: "e", hiragana: "え" },
		{ romanji: "o", hiragana: "お" },
		{ romanji: "ka", hiragana: "か" },
		{ romanji: "ki", hiragana: "き" },
		{ romanji: "ku", hiragana: "く" },
		{ romanji: "ke", hiragana: "け" },
		{ romanji: "ko", hiragana: "こ" },
		{ romanji: "sa", hiragana: "さ" },
		{ romanji: "shi", hiragana: "し" },
		{ romanji: "su", hiragana: "す" },
		{ romanji: "se", hiragana: "せ" },
		{ romanji: "so", hiragana: "そ" },
		{ romanji: "ta", hiragana: "た" },
		{ romanji: "chi", hiragana: "ち" },
		{ romanji: "tsu", hiragana: "つ" },
		{ romanji: "te", hiragana: "て" },
		{ romanji: "to", hiragana: "と" },
		{ romanji: "na", hiragana: "な" },
		{ romanji: "ni", hiragana: "に" },
		{ romanji: "nu", hiragana: "ぬ" },
		{ romanji: "ne", hiragana: "ね" },
		{ romanji: "no", hiragana: "の" },
		{ romanji: "ha", hiragana: "は" },
		{ romanji: "hi", hiragana: "ひ" },
		{ romanji: "fu", hiragana: "ふ" },
		{ romanji: "he", hiragana: "へ" },
		{ romanji: "ho", hiragana: "ほ" },
		{ romanji: "ma", hiragana: "ま" },
		{ romanji: "mi", hiragana: "み" },
		{ romanji: "mu", hiragana: "む" },
		{ romanji: "me", hiragana: "め" },
		{ romanji: "mo", hiragana: "も" },
		{ romanji: "ya", hiragana: "や" },
		{ romanji: "yu", hiragana: "ゆ" },
		{ romanji: "yo", hiragana: "よ" },
		{ romanji: "ra", hiragana: "ら" },
		{ romanji: "ri", hiragana: "り" },
		{ romanji: "ru", hiragana: "る" },
		{ romanji: "re", hiragana: "れ" },
		{ romanji: "ro", hiragana: "ろ" },
		{ romanji: "wa", hiragana: "わ" },
		{ romanji: "wo", hiragana: "を" },
		{ romanji: "n", hiragana: "ん" },
	];

	const [currentIndex, setcurrentIndex] = useState(0);
	const [currentValue, setcurrentValue] = useState("");

	const [options, setOptions] = useState([]);
	const suffledOptions = options.sort(() => Math.random() - 0.5);

	const [streak, setStreak] = useState(0);
	const [maxStreak, setMaxStreak] = useState(0);

	const [error, setError] = useState(false);

	const setAnswers = () => {
		// adding 3 random answer
		options.length = 0;
		while (options.length < 3) {
			const r = Math.floor(Math.random() * hiragana.length);
			if (options.indexOf(r) === -1) {
				options.push(hiragana[r].romanji);
			}
		}

		// adding correct answer
		const randomIndex = Math.floor(Math.random() * hiragana.length);
		setOptions([...options, hiragana[randomIndex].romanji]);
		setcurrentValue(hiragana[randomIndex].romanji);
		setcurrentIndex(randomIndex);
	};

	const handleClick = (event) => {
		event.preventDefault();

		const tempValue = event.target.innerText;

		if (tempValue === currentValue) {
			setStreak(streak + 1);
			setMaxStreak(Math.max(streak + 1, maxStreak));
			setError(false);

			localStorage.setItem("streak", streak + 1);
			localStorage.setItem("maxStreak", Math.max(streak, maxStreak));
		} else {
			setStreak(0);
			setError(
				`Wrong!!! The correct answer for ${hiragana[currentIndex].hiragana} is ${hiragana[currentIndex].romanji}`
			);

			localStorage.setItem("streak", 0);
		}
		setAnswers();
	};

	useEffect(() => {
		setError(false);
		setAnswers();
		setStreak(parseInt(localStorage.getItem("streak")) || 0);
		setMaxStreak(parseInt(localStorage.getItem("maxStreak")) || 0);
	}, []);

	return (
		<div className="app bg-dark text-white mx-auto">
			<div className="text-center p-2">
				<h1>Hiragana Quiz</h1>
				<span>
					{streak}/{maxStreak}
				</span>
			</div>
			<hr />

			<div className="main_content d-flex flex-column justify-content-center mx-auto text-center">
				<h1 className="heading">{hiragana[currentIndex].hiragana}</h1>
				<div className="container">
					<div className="options row g-2">
						{suffledOptions.map((option, i) => (
							<div key={i} className="col-6">
								<button className="btn btn-warning" onClick={handleClick}>
									{option}
								</button>
							</div>
						))}
					</div>

					{error && (
						<div className="mt-2 alert alert-danger fade show" role="alert">
							{error}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
