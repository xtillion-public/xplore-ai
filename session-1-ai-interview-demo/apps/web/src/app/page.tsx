"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/loader";

export default function Home() {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [selectedFileName, setSelectedFileName] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [timeRemaining, setTimeRemaining] = React.useState(60);
  const [isPaused, setIsPaused] = React.useState(false);

  function handleChooseFileClick() {
    fileInputRef.current?.click();
  }

  function handleStop() {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setTimeRemaining(60);
    setIsPaused(false);
    setSelectedFileName("");
  }

  function handleNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(60);
      setIsPaused(false);
    } else {
      handleStop();
    }
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setSelectedFileName(file.name);
    setIsLoading(true);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result?.toString().split(",")[1];
        
        // Call API
        const response = await fetch("http://localhost:3000/api/analyze-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64Pdf: base64 }),
        });
        
        const data = await response.json();
        console.log("API Response:", data);
        setQuestions(data.questions || []);
        setCurrentQuestionIndex(0);
        setTimeRemaining(60);
        setIsPaused(false);
        setIsLoading(false);
      };
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  }

  // Timer countdown effect
  React.useEffect(() => {
    if (questions.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto-advance to next question
          setCurrentQuestionIndex((currentIdx) => {
            if (currentIdx < questions.length - 1) {
              return currentIdx + 1;
            } else {
              // Finished all questions
              handleStop();
              return 0;
            }
          });
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [questions.length, isPaused]);

  const TITLE_TEXT = `
 █████  ██     ███    ███  ██████   ██████ ██   ██     ██ ███    ██ ████████ ███████ ██████  ██    ██ ██ ███████ ██     ██ 
██   ██ ██     ████  ████ ██    ██ ██      ██  ██      ██ ████   ██    ██    ██      ██   ██ ██    ██ ██ ██      ██     ██ 
███████ ██     ██ ████ ██ ██    ██ ██      █████       ██ ██ ██  ██    ██    █████   ██████  ██    ██ ██ █████   ██  █  ██ 
██   ██ ██     ██  ██  ██ ██    ██ ██      ██  ██      ██ ██  ██ ██    ██    ██      ██   ██  ██  ██  ██ ██      ██ ███ ██ 
██   ██ ██     ██      ██  ██████   ██████ ██   ██     ██ ██   ████    ██    ███████ ██   ██   ████   ██ ███████  ███ ███`;

  if (isLoading) {
    return (
      <main className="h-full">
        <Loader />
      </main>
    );
  }

  if (questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    // Timer color changes based on time remaining
    const getTimerColor = () => {
      if (timeRemaining > 40) return "text-green-600";
      if (timeRemaining > 20) return "text-yellow-600";
      return "text-red-600";
    };

    return (
      <main className="h-full">
        <div className="container mx-auto h-full px-4 py-8">
          <div className="flex flex-col gap-6 h-full">
            {/* Header with progress */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsPaused(!isPaused)}
                >
                  {isPaused ? "Resume" : "Pause"}
                </Button>
                <Button variant="destructive" onClick={handleStop}>
                  Stop
                </Button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Timer */}
            <Card className="w-full">
              <CardContent className="pt-6 text-center">
                <div className={`text-6xl font-bold ${getTimerColor()}`}>
                  {timeRemaining}s
                </div>
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card className="w-full flex-1">
              <CardContent className="pt-6 flex items-center justify-center h-full">
                <p className="text-2xl text-left">{currentQuestion}</p>
              </CardContent>
            </Card>

            {/* Next button */}
            <Button
              className="w-full"
              size="lg"
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish"}
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="h-full">
      <div className="container mx-auto h-full px-4">
        <div className="flex h-full flex-col items-center justify-center gap-10 py-8">
          <pre className="w-full overflow-x-auto flex justify-center">{TITLE_TEXT}</pre>
          <Card className="w-full max-w-3xl text-center">
            <CardHeader>
              <CardTitle>Upload a document</CardTitle>
              <CardDescription>
                Choose a file to begin your mock interview.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-3">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button type="button" onClick={handleChooseFileClick}>
                  Choose file
                </Button>
                {selectedFileName && (
                  <span className="text-sm text-muted-foreground truncate">
                    {selectedFileName}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground flex justify-center">
              We'll prompt questions after the upload in the next step.
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
