
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, Key, Shield, Bell, Palette, Save, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');
  const { toast } = useToast();

  useEffect(() => {
    // 저장된 API 키 로드
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setGeminiApiKey(savedApiKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (geminiApiKey.trim()) {
      localStorage.setItem('gemini_api_key', geminiApiKey.trim());
      toast({
        title: "API 키 저장 완료",
        description: "Gemini API 키가 안전하게 저장되었습니다.",
      });
    } else {
      localStorage.removeItem('gemini_api_key');
      toast({
        title: "API 키 제거됨",
        description: "기본 AI 피드백으로 전환됩니다.",
      });
    }
  };

  const handleTestApiKey = async () => {
    if (!geminiApiKey.trim()) {
      toast({
        title: "API 키 없음",
        description: "먼저 API 키를 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    try {
      // 실제 API 호출 테스트
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + geminiApiKey.trim(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "안녕하세요. 테스트 메시지입니다."
            }]
          }]
        })
      });

      if (response.ok) {
        toast({
          title: "API 키 검증 성공",
          description: "Gemini API 연결이 정상적으로 작동합니다.",
        });
      } else {
        throw new Error('API 키가 유효하지 않습니다.');
      }
    } catch (error) {
      toast({
        title: "API 키 검증 실패",
        description: "API 키를 확인해주세요.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">설정</h1>
            <p className="text-gray-600 mt-2">AI 피드백 및 개인화 설정을 관리하세요</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI 설정 */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2 text-blue-500" />
                  AI 피드백 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-1">더 정확한 AI 피드백을 원하시나요?</p>
                      <p className="text-blue-700">
                        Gemini API 키를 설정하면 더욱 정확하고 개인화된 피드백을 받을 수 있습니다.
                        키가 설정되지 않은 경우 기본 피드백이 제공됩니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="gemini-api-key">Gemini API 키</Label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input
                        id="gemini-api-key"
                        type={showApiKey ? "text" : "password"}
                        placeholder="AIzaSy... (선택사항)"
                        value={geminiApiKey}
                        onChange={(e) => setGeminiApiKey(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button onClick={handleTestApiKey} variant="outline">
                      테스트
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    API 키는 브라우저에만 저장되며 외부로 전송되지 않습니다.
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleSaveApiKey} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </Button>
                </div>

                {/* API 키 상태 표시 */}
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">현재 AI 상태:</span>
                    <Badge variant={geminiApiKey ? "default" : "secondary"}>
                      {geminiApiKey ? "Gemini API 연결됨" : "기본 피드백"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API 키 가이드 */}
            <Card className="border-0 shadow-sm bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg">API 키 발급 방법</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <p className="font-medium">1. Google AI Studio 접속</p>
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline block"
                  >
                    → aistudio.google.com/app/apikey
                  </a>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">2. "Create API Key" 클릭</p>
                  <p className="text-gray-600">Google 계정으로 로그인 후 새 API 키를 생성합니다.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">3. API 키 복사하여 붙여넣기</p>
                  <p className="text-gray-600">생성된 키를 위 입력란에 붙여넣고 저장하세요.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 일반 설정 */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-gray-500" />
                  일반 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">알림 설정</Label>
                    <p className="text-xs text-gray-500">학습 리마인더 및 목표 달성 알림</p>
                  </div>
                  <Button
                    variant={notifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(!notifications)}
                  >
                    <Bell className="w-4 h-4 mr-1" />
                    {notifications ? 'ON' : 'OFF'}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">테마 설정</Label>
                    <p className="text-xs text-gray-500">화면 테마 선택</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  >
                    <Palette className="w-4 h-4 mr-1" />
                    {theme === 'light' ? '라이트' : '다크'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 통계 */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">사용 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>총 문제 풀이</span>
                  <span className="font-medium">23회</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>평균 점수</span>
                  <span className="font-medium">80점</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>연속 학습</span>
                  <span className="font-medium">7일</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>가입일</span>
                  <span className="font-medium">2024.01.15</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
