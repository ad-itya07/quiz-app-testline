"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trophy, Loader2 } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface Option {
  id: number;
  description: string;
  is_correct: boolean;
  question_id: number;
}

interface Question {
  id: number;
  description: string;
  options: Option[];
  detailed_solution: string;
  topic: string;
}

interface QuizData {
  questions: Question[];
}

export function QuizComponent() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetchQuizData();
  }, []);

  async function fetchQuizData() {
    try {
      const response = await fetch("/api/jsonserve");
      if (!response.ok) throw new Error("Failed to fetch quiz data");
      const data = await response.json();
      console.log(data.questions);
      setQuizData(data);
    } catch (err) {
      setError("Failed to load quiz. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleAnswer = () => {
    if (!quizData) return;

    const currentQuestionData = quizData.questions[currentQuestion];
    const correctOption = currentQuestionData.options.find(
      (opt) => opt.is_correct
    );

    if (correctOption && selectedAnswer === correctOption.description) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!quizData) return null;

  if (showResults) {
    const percentage = (score / quizData.questions.length) * 100;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
        <div className="flex flex-col items-center gap-4">
          <Trophy className="h-12 w-12 text-primary" />
          <h2 className="text-2xl font-bold">Quiz Complete!</h2>
          <p className="text-muted-foreground">
            You scored {score} out of {quizData.questions.length} questions
            correctly
          </p>
        </div>
        <Progress value={percentage} className="h-2" />
        <Button onClick={() => window.location.reload()} className="w-full">
          Try Again
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {quizData.questions.length}
          </span>
          <span className="text-sm font-medium">Score: {score}</span>
        </div>
        <Progress
          value={(currentQuestion / quizData.questions.length) * 100}
          className="h-2"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-medium">
            {quizData.questions[currentQuestion].description}
          </h2>
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            {quizData.questions[currentQuestion].options.map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
              >
                <RadioGroupItem
                  value={option.description}
                  id={`choice-${option.id}`}
                />
                <Label htmlFor={`choice-${option.id}`}>
                  {option.description}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </motion.div>
      </AnimatePresence>

      <Button
        onClick={handleAnswer}
        disabled={!selectedAnswer}
        className="w-full"
      >
        {currentQuestion === quizData.questions.length - 1
          ? "Finish Quiz"
          : "Next Question"}
      </Button>

      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4"
        >
          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-medium">Detailed Solution:</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {quizData.questions[currentQuestion].detailed_solution}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
