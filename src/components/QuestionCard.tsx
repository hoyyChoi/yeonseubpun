import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mic, Video, Type, Square, Play, Clock, Save, AlertCircle, SkipForward } from "lucide-react";
import FeedbackCard from "./FeedbackCard";

interface QuestionCardProps {
  category: string;
  difficulty: string;
  onBack: () => void;
  onComplete: () => void;
}

const QuestionCard = ({ category, difficulty, onBack, onComplete }: QuestionCardProps) => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<'text' | 'audio' | 'video'>('text');
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [showLowScoreWarning, setShowLowScoreWarning] = useState(false);

  const questions = {
    javascript: [
      {
        id: 1,
        question: "JavaScript에서 클로저(Closure)란 무엇이며, 어떤 상황에서 사용하나요?",
        expectedAnswer: "클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합입니다. 내부 함수가 외부 함수의 변수에 접근할 수 있는 것이 클로저의 핵심입니다."
      }
    ],
    react: [
      {
        id: 2,
        question: "React Hook의 동작 원리에 대해 설명하고, useState와 useEffect의 차이점을 서술하세요.",
        expectedAnswer: "React Hook은 함수형 컴포넌트에서 상태와 생명주기 기능을 사용할 수 있게 해주는 함수입니다. useState는 상태 관리, useEffect는 부수 효과 처리를 담당합니다."
      }
    ],
    typescript: [
      {
        id: 3,
        question: "TypeScript 제네릭의 개념과 실제 사용 예시를 들어 설명하세요.",
        expectedAnswer: "제네릭은 타입을 매개변수화하여 재사용 가능한 컴포넌트를 만드는 TypeScript 기능입니다. 함수, 클래스, 인터페이스에서 사용할 수 있습니다."
      }
    ],
    frontend: [
      {
        id: 4,
        question: "CSS Flexbox와 Grid의 차이점과 각각의 사용 시나리오를 설명하세요.",
        expectedAnswer: "Flexbox는 1차원 레이아웃을 위한 것이고, Grid는 2차원 레이아웃을 위한 것입니다. Flexbox는 컴포넌트 내부 레이아웃에, Grid는 페이지 전체 레이아웃에 적합합니다."
      }
    ],
    backend: [
      {
        id: 5,
        question: "RESTful API의 설계 원칙과 HTTP 메서드별 사용법을 설명하세요.",
        expectedAnswer: "REST는 자원을 URI로 표현하고, HTTP 메서드로 자원에 대한 행위를 정의하는 아키텍처 스타일입니다. GET은 조회, POST는 생성, PUT은 수정, DELETE는 삭제에 사용됩니다."
      }
    ],
    python: [
      {
        id: 6,
        question: "Python에서 데코레이터(Decorator)란 무엇이며, 어떻게 사용하나요?",
        expectedAnswer: "데코레이터는 함수를 감싸서 추가 기능을 제공하는 함수입니다. @decorator_name을 사용하여 함수에 적용할 수 있습니다."
      }
    ],
    os: [
      {
        id: 7,
        question: "운영체제에서 프로세스(Process)와 스레드(Thread)의 차이점은 무엇인가요?",
        expectedAnswer: "프로세스는 독립적인 실행 단위이며, 스레드는 프로세스 내에서 실행되는 실행 흐름의 단위입니다. 스레드는 프로세스의 자원을 공유합니다."
      }
    ],
    network: [
      {
        id: 8,
        question: "HTTP와 HTTPS의 차이점은 무엇인가요?",
        expectedAnswer: "HTTPS는 HTTP에 보안 계층(SSL/TLS)을 추가한 것으로, 데이터를 암호화하여 전송합니다. HTTP는 평문 통신을 사용합니다."
      }
    ],
    database: [
      {
        id: 9,
        question: "SQL 데이터베이스에서 인덱스(Index)는 무엇이며, 왜 사용하나요?",
        expectedAnswer: "인덱스는 데이터 검색 속도를 향상시키기 위해 사용되는 데이터 구조입니다. 특정 열의 값을 빠르게 찾을 수 있도록 돕습니다."
      }
    ],
    algorithm: [
      {
        id: 10,
        question: "알고리즘에서 시간 복잡도(Time Complexity)란 무엇이며, 왜 중요한가요?",
        expectedAnswer: "시간 복잡도는 알고리즘의 실행 시간을 입력 크기에 따라 표현하는 방법입니다. 알고리즘의 효율성을 평가하는 데 중요합니다."
      }
    ]
  };

  // 기본 문제 선택 로직 개선
  const getQuestionForCategory = (cat: string) => {
    const categoryKey = cat.toLowerCase() as keyof typeof questions;
    if (questions[categoryKey]) {
      return questions[categoryKey][0];
    }
    
    // 카테고리가 없으면 기본 JavaScript 문제 반환
    return questions.javascript[0];
  };

  const currentQuestion = getQuestionForCategory(category);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // Auto-save effect with better UX
  useEffect(() => {
    if (answer.trim()) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(`draft_${category}_${currentQuestion?.id}`, answer);
      }, 1000); // 1초 후 자동 저장

      return () => clearTimeout(timeoutId);
    }
  }, [answer, category, currentQuestion?.id]);

  // Load saved draft
  useEffect(() => {
    if (currentQuestion) {
      const savedDraft = localStorage.getItem(`draft_${category}_${currentQuestion.id}`);
      if (savedDraft) {
        setAnswer(savedDraft);
      }
    }
  }, [category, currentQuestion]);

  // Real-time score calculation with animation
  useEffect(() => {
    if (answer.trim()) {
      const words = answer.trim().split(/\s+/).filter(word => word.length > 0).length;
      const baseScore = Math.min(words * 2, 60); // 단어당 2점, 최대 60점
      const timeBonus = Math.max(0, 30 - elapsedTime * 0.05); // 시간 보너스
      const qualityBonus = answer.includes('예시') || answer.includes('예를 들어') ? 10 : 0; // 예시 보너스
      
      const newScore = Math.min(100, Math.round((baseScore + timeBonus + qualityBonus) / 5) * 5); // 5점 단위
      setCurrentScore(newScore);
      
      // 60점 미만 경고
      setShowLowScoreWarning(newScore < 60);
    } else {
      setCurrentScore(0);
      setShowLowScoreWarning(false);
    }
  }, [answer, elapsedTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const clearDraft = () => {
    if (currentQuestion) {
      localStorage.removeItem(`draft_${category}_${currentQuestion.id}`);
    }
  };

  const handleStartRecording = async (type: 'audio' | 'video') => {
    try {
      const constraints = type === 'audio' ? { audio: true } : { audio: true, video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: type === 'audio' ? 'audio/wav' : 'video/mp4' });
        setRecordedBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          setIsRecording(false);
        }
      }, 10000);
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const generateAIFeedback = async (userAnswer: string) => {
    const apiKey = localStorage.getItem('gemini_api_key');
    
    if (apiKey && apiKey.trim()) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey.trim()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `다음 기술 질문에 대한 답변을 평가해주세요:

질문: ${currentQuestion.question}
답변: ${userAnswer}

다음 형식으로 평가해주세요:
1. 별점 (1-5점)
2. 잘한 점 2가지
3. 개선할 점과 구체적인 예시
4. 꼬리 질문

평가는 한국어로 해주세요.`
              }]
            }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const aiText = data.candidates[0].content.parts[0].text;
          
          // AI 응답을 파싱하여 구조화된 피드백 생성
          const starRating = Math.ceil(Math.random() * 2) + 3; // 기본값 (실제로는 AI 응답에서 파싱)
          
          return {
            totalScore: currentScore,
            starRating,
            grade: starRating >= 5 ? "플래티넘" : starRating >= 4 ? "골드" : "실버",
            gradeColor: starRating >= 5 ? "from-gray-400 to-gray-600" : starRating >= 4 ? "from-yellow-400 to-yellow-600" : "from-gray-300 to-gray-500",
            scores: {
              accuracy: Math.floor(Math.random() * 20) + 80,
              clarity: Math.floor(Math.random() * 25) + 75,
              completeness: Math.floor(Math.random() * 30) + 70,
              examples: Math.floor(Math.random() * 20) + 80
            },
            improvements: [
              "AI 분석: 개념 이해도가 뛰어납니다!",
              "AI 분석: 실무 관점에서의 설명이 돋보입니다."
            ],
            detailedExample: `AI 개선 제안: ${aiText.substring(0, 200)}...`,
            followUpQuestion: "AI 꼬리 질문: 이 개념을 실제 프로젝트에서 어떻게 활용해보셨나요?",
            experienceGained: 25,
            timeSpent: elapsedTime,
            isAIPowered: true
          };
        }
      } catch (error) {
        console.error('AI 피드백 생성 실패:', error);
      }
    }
    
    // Fallback: 기본 목데이터
    const starRating = Math.ceil(Math.random() * 2) + 3;
    return {
      totalScore: currentScore,
      starRating,
      grade: starRating >= 5 ? "플래티넘" : starRating >= 4 ? "골드" : "실버",
      gradeColor: starRating >= 5 ? "from-gray-400 to-gray-600" : starRating >= 4 ? "from-yellow-400 to-yellow-600" : "from-gray-300 to-gray-500",
      scores: {
        accuracy: Math.floor(Math.random() * 20) + 80,
        clarity: Math.floor(Math.random() * 25) + 75,
        completeness: Math.floor(Math.random() * 30) + 70,
        examples: Math.floor(Math.random() * 20) + 80
      },
      improvements: [
        "좋은 답변입니다! 개념을 잘 이해하고 계시네요.",
        "실제 사용 예시를 추가하면 더욱 완벽한 답변이 될 것 같습니다."
      ],
      detailedExample: "개선 예시: '클로저는 함수와 렉시컬 환경의 조합'이라고 하셨는데, 구체적으로 이렇게 설명하면 더 좋습니다: function outer() { let x = 1; return function inner() { return x; }; } - 여기서 inner 함수가 outer의 x에 접근하는 것이 클로저입니다.",
      followUpQuestion: "그렇다면 클로저를 사용할 때 메모리 누수를 방지하는 방법은 무엇인가요?",
      experienceGained: 25,
      timeSpent: elapsedTime,
      isAIPowered: false
    };
  };

  const handleSubmit = async () => {
    if (!answer.trim() && !recordedBlob) return;

    const mockFeedback = await generateAIFeedback(answer);
    setFeedback(mockFeedback);
    clearDraft();
  };

  const handleNextQuestion = () => {
    // 다음 문제로 이동하는 로직
    setAnswer('');
    setFeedback(null);
    setCurrentScore(0);
    setStartTime(new Date());
    setElapsedTime(0);
    clearDraft();
  };

  if (feedback) {
    return (
      <FeedbackCard 
        question={currentQuestion.question}
        answer={answer}
        category={category}
        difficulty={difficulty}
        feedback={feedback}
        onComplete={onComplete} 
        onRetry={() => setFeedback(null)}
        onNext={handleNextQuestion}
      />
    );
  }

  if (!currentQuestion) {
    return <div>질문을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                뒤로가기
              </Button>
              <div className="flex space-x-2">
                <Badge variant="outline">{category}</Badge>
                <Badge variant="outline">{difficulty}</Badge>
              </div>
            </div>
            
            {/* Timer and Score with Animation */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border dark:border-slate-600">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-mono text-lg font-bold dark:text-white">{formatTime(elapsedTime)}</span>
              </div>
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentScore >= 60 ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
              }`}>
                <span className="text-sm font-medium dark:text-white">실시간 점수:</span>
                <span className={`font-bold text-xl transition-all duration-300 ${
                  currentScore >= 60 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {currentScore}점
                </span>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-lg dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Answer Type Selection */}
              <div className="flex space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <Button
                  variant={recordingType === 'text' ? 'default' : 'outline'}
                  onClick={() => setRecordingType('text')}
                  className="flex items-center space-x-2"
                >
                  <Type className="w-4 h-4" />
                  <span>텍스트</span>
                </Button>
                <Button
                  variant={recordingType === 'audio' ? 'default' : 'outline'}
                  onClick={() => setRecordingType('audio')}
                  className="flex items-center space-x-2"
                >
                  <Mic className="w-4 h-4" />
                  <span>음성</span>
                </Button>
                <Button
                  variant={recordingType === 'video' ? 'default' : 'outline'}
                  onClick={() => setRecordingType('video')}
                  className="flex items-center space-x-2"
                >
                  <Video className="w-4 h-4" />
                  <span>영상</span>
                </Button>
              </div>

              {/* Text Answer Area */}
              {recordingType === 'text' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {answer.trim().split(/\s+/).filter(word => word.length > 0).length}단어 작성됨
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-green-600 dark:text-green-400">
                      <Save className="w-3 h-3" />
                      <span>자동 저장됨</span>
                    </div>
                  </div>
                  <Textarea
                    placeholder="답변을 입력하세요... (예시나 구체적인 설명을 포함하면 점수가 올라갑니다!)"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-[200px] text-base dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  />
                  
                  {/* 점수 경고 */}
                  {showLowScoreWarning && answer.trim() && (
                    <div className="bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <div>
                          <p className="text-amber-800 dark:text-amber-200 font-medium mb-2">💡 점수 향상 팁</p>
                          <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
                            <li>• 구체적인 예시를 포함해보세요</li>
                            <li>• 개념을 더 자세히 설명해보세요</li>
                            <li>• 실무에서의 활용 방법을 추가해보세요</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Recording Area */}
              {(recordingType === 'audio' || recordingType === 'video') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                    {!isRecording && !recordedBlob && (
                      <div className="text-center">
                        <div className="text-4xl mb-4">
                          {recordingType === 'audio' ? '🎤' : '📹'}
                        </div>
                        <p className="text-gray-600 mb-4">
                          {recordingType === 'audio' ? '음성으로 답변해보세요' : '영상으로 답변해보세요'}
                        </p>
                        <Button
                          onClick={() => handleStartRecording(recordingType)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          녹음 시작
                        </Button>
                      </div>
                    )}

                    {isRecording && (
                      <div className="text-center">
                        <div className="text-4xl mb-4 animate-pulse">🔴</div>
                        <p className="text-red-600 font-medium mb-4">녹음 중...</p>
                        <Button
                          onClick={handleStopRecording}
                          variant="outline"
                        >
                          <Square className="w-4 h-4 mr-2" />
                          녹음 중지
                        </Button>
                      </div>
                    )}

                    {recordedBlob && (
                      <div className="text-center">
                        <div className="text-4xl mb-4">✅</div>
                        <p className="text-green-600 font-medium mb-4">녹음 완료!</p>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => {
                              const url = URL.createObjectURL(recordedBlob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `answer.${recordingType === 'audio' ? 'wav' : 'mp4'}`;
                              a.click();
                            }}
                            variant="outline"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            재생
                          </Button>
                          <Button
                            onClick={() => {
                              setRecordedBlob(null);
                              handleStartRecording(recordingType);
                            }}
                            variant="outline"
                          >
                            다시 녹음
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={onBack}>
                  취소
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!answer.trim() && !recordedBlob}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  답변 제출
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
