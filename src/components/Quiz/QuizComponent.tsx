import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, ArrowRight, Brain, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { quizService } from '../../services/quizService';
import { QuizItem } from '../../types';
import { Navbar } from '../Layout/Navbar';

export function QuizComponent() {
  const { profile, updateProfile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  useEffect(() => {
    loadQuizItems();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  async function loadQuizItems() {
    try {
      const items = await quizService.getQuizItems();
      setQuizItems(items);
    } catch (error) {
      console.error("Failed to load quiz items", error);
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(optionIndex: number) {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await quizService.submitQuiz(answers);
      updateProfile({ quizCompleted: true });
      navigate('/results');
    } catch (error) {
      console.error("Failed to submit quiz", error);
    } finally {
      setSubmitting(false);
    }
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader className="animate-spin w-10 h-10 text-blue-500" />
        <p className="mt-2">{t("loadingQuiz")}</p>
      </div>
    );
  }

  if (!quizItems.length) {
    return <p className="text-center mt-10">{t("noQuizAvailable")}</p>;
  }

  const currentItem = quizItems[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Navbar included */}
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        {/* Timer */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-1" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Brain className="w-5 h-5 mr-1" />
            <span>{t("question")} {currentQuestionIndex + 1} / {quizItems.length}</span>
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold mb-4">{currentItem.question}</h2>

        {/* Options */}
        <div className="space-y-3">
          {currentItem.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                answers[currentQuestionIndex] === idx
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white hover:bg-gray-50 border-gray-300"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          {currentQuestionIndex > 0 && (
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              onClick={() => setCurrentQuestionIndex(i => i - 1)}
            >
              {t("previous")}
            </button>
          )}
          {currentQuestionIndex < quizItems.length - 1 ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center"
              onClick={() => setCurrentQuestionIndex(i => i + 1)}
            >
              {t("next")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center"
              onClick={handleSubmit}
              disabled={submitting}
            >
              <CheckCircle className="mr-2 w-5 h-5" />
              {submitting ? t("submitting") : t("submit")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
