import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mic, Video, Type, Square, Play, Clock, Save } from "lucide-react";
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

  const questions = {
    javascript: [
      {
        id: 1,
        question: "JavaScript에서 클로저(Closure)란 무엇이며, 어떤 상황에서 사용하나요?",
        expectedAnswer: "클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합입니다. 내부 함수가 외부 함수의 변수에 접근할 수 있는 것이 클로저의 핵심입니다."
      }
    ],
    python: [
      {
        id: 2,
        question: "Python에서 데코레이터(Decorator)란 무엇이며, 어떻게 사용하나요?",
        expectedAnswer: "데코레이터는 함수를 감싸서 추가 기능을 제공하는 함수입니다. @decorator_name을 사용하여 함수에 적용할 수 있습니다."
      }
    ],
    os: [
      {
        id: 3,
        question: "운영체제에서 프로세스(Process)와 스레드(Thread)의 차이점은 무엇인가요?",
        expectedAnswer: "프로세스는 독립적인 실행 단위이며, 스레드는 프로세스 내에서 실행되는 실행 흐름의 단위입니다. 스레드는 프로세스의 자원을 공유합니다."
      }
    ],
    network: [
      {
        id: 4,
        question: "HTTP와 HTTPS의 차이점은 무엇인가요?",
        expectedAnswer: "HTTPS는 HTTP에 보안 계층(SSL/TLS)을 추가한 것으로, 데이터를 암호화하여 전송합니다. HTTP는 평문 통신을 사용합니다."
      }
    ],
    database: [
      {
        id: 5,
        question: "SQL 데이터베이스에서 인덱스(Index)는 무엇이며, 왜 사용하나요?",
        expectedAnswer: "인덱스는 데이터 검색 속도를 향상시키기 위해 사용되는 데이터 구조입니다. 특정 열의 값을 빠르게 찾을 수 있도록 돕습니다."
      }
    ],
    algorithm: [
      {
        id: 6,
        question: "알고리즘에서 시간 복잡도(Time Complexity)란 무엇이며, 왜 중요한가요?",
        expectedAnswer: "시간 복잡도는 알고리즘의 실행 시간을 입력 크기에 따라 표현하는 방법입니다. 알고리즘의 효율성을 평가하는 데 중요합니다."
      }
    ]
  };

  const currentQuestion = questions[category as keyof typeof questions]?.[0];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // Auto-save effect
  useEffect(() => {
    if (answer.trim()) {
      localStorage.setItem(`draft_${category}_${currentQuestion?.id}`, answer);
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

  // Real-time score calculation
  useEffect(() => {
    if (answer.trim()) {
      const words = answer.trim().split(/\s+/).length;
      const baseScore = Math.min(words * 0.5, 50);
      const timeBonus = Math.max(0, 50 - elapsedTime * 0.1);
      setCurrentScore(Math.min(100, baseScore + timeBonus));
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
      
      // 자동으로 10초 후 중지 (실제로는 사용자가 수동으로 중지)
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

  const handleSubmit = () => {
    if (!answer.trim() && !recordedBlob) return;

    // Generate feedback with star rating
    const starRating = Math.ceil(Math.random() * 2) + 3; // 3-5 stars
    const mockFeedback = {
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
        "실제 사용 예시를 추가하면 더욱 완벽한 답변이 될 것 같습니다.",
        "실무에서의 경험을 공유해보세요"
      ],
      detailedExample: "예를 들어, '함수가 선언된 렉시컬 환경'이라고 하셨는데, 이를 구체적으로 설명하면 '함수가 정의될 때의 스코프 체인과 변수 바인딩'을 의미합니다.",
      followUpQuestion: "그렇다면 클로저를 사용할 때 메모리 누수를 방지하는 방법은 무엇인가요?",
      experienceGained: 25,
      timeSpent: elapsedTime
    };

    setFeedback(mockFeedback);
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
      />
    );
  }

  if (!currentQuestion) {
    return <div>질문을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
            
            {/* Timer and Score */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-lg shadow-sm">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-mono text-sm">{formatTime(elapsedTime)}</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-lg">
                <span className="text-sm text-green-700">실시간 점수:</span>
                <span className="font-bold text-green-600">{Math.round(currentScore)}</span>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Answer Type Selection */}
              <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
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
                    <span className="text-sm text-gray-600">
                      {answer.trim().split(/\s+/).length}단어 작성됨
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Save className="w-3 h-3" />
                      <span>자동 저장됨</span>
                    </div>
                  </div>
                  <Textarea
                    placeholder="답변을 입력하세요..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-[200px] text-base"
                  />
                  {currentScore < 60 && answer.trim() && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-amber-800 text-sm">
                        💡 현재 점수가 60점 미만입니다. 더 자세한 설명을 추가해보세요!
                      </p>
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
