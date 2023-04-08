import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const GAME_TIME = 15;
  const [text, setText] = useState("");
  const [timeRemaining, setRemainingTime] = useState(GAME_TIME);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const textBoxRef = useRef(null);
  const button = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    console.log(text);
  };

  const calculateWordCount = () => {
    const wordsArr = text.trim().split(" ");
    return wordsArr.filter((word) => word !== "").length;
  };

  const decrement = () => {};

  const startGame = () => {
    setIsGameStarted(true);
    setRemainingTime(GAME_TIME);
    setText("");
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
    button.current.disabled = true;
  };

  const endGame = () => {
    setIsGameStarted(false);
    setWordCount(calculateWordCount());
    textBoxRef.current.disabled = true;
    button.current.disabled = false;
  };

  useEffect(() => {
    if (isGameStarted && timeRemaining > 0) {
      setTimeout(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isGameStarted]);

  return (
    <div className="App">
      <h1>How fast do you type?</h1>
      <textarea
        ref={textBoxRef}
        value={text}
        disabled={true}
        onChange={handleChange}
      />

      <h4>Time remaining: {timeRemaining}</h4>
      <button ref={button} onClick={startGame}>
        START
      </button>
      <h2>Word count: {wordCount}</h2>
    </div>
  );
}

export default App;
