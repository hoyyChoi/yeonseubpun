
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, X, Zap, Trophy, Calendar, Target } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "연습푼에 오신 것을 환영합니다! 🎉",
      description: "기술 면접을 체계적으로 준비할 수 있는 플랫폼입니다.",
      icon: <Trophy className="w-12 h-12 text-yellow-500" />,
      content: (
        <div className="text-center space-y-4">
          <p className="text-gray-600">매일 꾸준히 문제를 풀고, AI 피드백으로 실력을 향상시켜보세요.</p>
          <div className="flex justify-center space-x-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">JavaScript</Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-700">Python</Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">운영체제</Badge>
          </div>
        </div>
      )
    },
    {
      title: "카테고리와 난이도 선택",
      description: "관심 있는 기술 분야와 적절한 난이도를 선택하세요.",
      icon: <Target className="w-12 h-12 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl mb-1">🟨</div>
              <div className="text-sm font-medium">JavaScript</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <div className="text-2xl mb-1">🐍</div>
              <div className="text-sm font-medium">Python</div>
            </div>
          </div>
          <p className="text-sm text-gray-600">쉬움 → 보통 → 어려움 순으로 단계별 학습이 가능합니다.</p>
        </div>
      )
    },
    {
      title: "AI 피드백으로 성장하기",
      description: "답변을 작성하면 즉시 점수와 개선점을 받아볼 수 있습니다.",
      icon: <Zap className="w-12 h-12 text-purple-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">평가 결과</span>
              <Badge className="bg-yellow-100 text-yellow-700">🥈 실버</Badge>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">87점</div>
            <p className="text-xs text-gray-600">구체적인 예시를 더 추가해보세요!</p>
          </div>
        </div>
      )
    },
    {
      title: "매일 꾸준히, 함께 성장하기",
      description: "학습 잔디와 챌린지로 동기부여를 받으세요.",
      icon: <Calendar className="w-12 h-12 text-green-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm font-medium mb-2">학습 잔디</div>
            <div className="flex space-x-1">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className={`w-3 h-3 rounded-sm ${i < 7 ? 'bg-green-400' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">연속 학습 기록을 쌓고, 다른 사용자들과 함께 챌린지에 참여해보세요!</p>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg bg-white">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="text-center space-y-4">
            {steps[currentStep].icon}
            <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {steps[currentStep].content}
          
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              이전
            </Button>
            
            <Button onClick={nextStep} className="flex items-center">
              {currentStep === steps.length - 1 ? '시작하기' : '다음'}
              {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingModal;
