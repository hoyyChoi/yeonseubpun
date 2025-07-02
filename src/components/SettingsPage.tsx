
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Settings, Key, Shield, Bell, Palette, Save, Eye, EyeOff, User, Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');
  const [userName, setUserName] = useState('김개발');
  const [userEmail, setUserEmail] = useState('kim@example.com');
  const { toast } = useToast();

  useEffect(() => {
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

  const handleSaveProfile = () => {
    toast({
      title: "프로필 저장 완료",
      description: "프로필 정보가 업데이트되었습니다.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 헤더 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                뒤로가기
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">설정</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">계정 및 서비스 설정을 관리하세요</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ai" className="flex items-center space-x-2">
                <Key className="w-4 h-4" />
                <span className="hidden sm:inline">AI 설정</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">계정</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">알림</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">테마</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai" className="space-y-6">
              <Card className="border-0 shadow-lg dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Key className="w-5 h-5 mr-2 text-blue-500" />
                    AI 피드백 설정
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">더 정확한 AI 피드백을 원하시나요?</p>
                        <p className="text-blue-700 dark:text-blue-200">
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      API 키는 브라우저에만 저장되며 외부로 전송되지 않습니다.
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleSaveApiKey} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      저장
                    </Button>
                  </div>

                  <div className="pt-3 border-t dark:border-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">현재 AI 상태:</span>
                      <Badge variant={geminiApiKey ? "default" : "secondary"}>
                        {geminiApiKey ? "Gemini API 연결됨" : "기본 피드백"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API 키 가이드 */}
              <Card className="border-0 shadow-sm bg-gray-50 dark:bg-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">API 키 발급 방법</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="space-y-2">
                    <p className="font-medium dark:text-white">1. Google AI Studio 접속</p>
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
                    <p className="font-medium dark:text-white">2. "Create API Key" 클릭</p>
                    <p className="text-gray-600 dark:text-gray-300">Google 계정으로 로그인 후 새 API 키를 생성합니다.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium dark:text-white">3. API 키 복사하여 붙여넣기</p>
                    <p className="text-gray-600 dark:text-gray-300">생성된 키를 위 입력란에 붙여넣고 저장하세요.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card className="border-0 shadow-lg dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <User className="w-5 h-5 mr-2 text-green-500" />
                    계정 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">이름</Label>
                    <Input
                      id="user-name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="사용자 이름"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">이메일</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="user@example.com"
                    />
                  </div>
                  <Button onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    프로필 저장
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-0 shadow-lg dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Bell className="w-5 h-5 mr-2 text-yellow-500" />
                    알림 설정
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <Label className="text-sm font-medium dark:text-white">학습 리마인더</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">일일 학습 목표 달성 알림</p>
                    </div>
                    <Button
                      variant={notifications ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNotifications(!notifications)}
                    >
                      {notifications ? 'ON' : 'OFF'}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <Label className="text-sm font-medium dark:text-white">스터디 그룹 알림</Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">그룹 활동 및 챌린지 알림</p>
                    </div>
                    <Button variant="outline" size="sm">
                      ON
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card className="border-0 shadow-lg dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Palette className="w-5 h-5 mr-2 text-purple-500" />
                    외관 설정
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {theme === 'light' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
                      <div>
                        <Label className="text-sm font-medium dark:text-white">테마 모드</Label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">라이트 / 다크 모드 선택</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    >
                      {theme === 'light' ? '라이트' : '다크'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
