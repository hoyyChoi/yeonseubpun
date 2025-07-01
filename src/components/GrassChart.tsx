
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const GrassChart = () => {
  // 잔디 데이터 생성 (지난 100일)
  const generateGrassData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 99; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // 랜덤하게 활동 레벨 생성 (0: 없음, 1-4: 활동 레벨)
      const activity = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
      
      data.push({
        date: date.toISOString().split('T')[0],
        activity,
        day: date.getDay(),
        week: Math.floor(i / 7)
      });
    }
    
    return data;
  };

  const grassData = generateGrassData();
  
  const getActivityColor = (activity: number) => {
    const colors = [
      'bg-gray-100', // 0: 활동 없음
      'bg-green-200', // 1: 낮은 활동
      'bg-green-400', // 2: 보통 활동
      'bg-green-600', // 3: 높은 활동
      'bg-green-800'  // 4: 매우 높은 활동
    ];
    return colors[activity];
  };

  // 주별로 그룹화
  const weeklyData = grassData.reduce((acc, day) => {
    if (!acc[day.week]) acc[day.week] = [];
    acc[day.week].push(day);
    return acc;
  }, {} as { [key: number]: typeof grassData });

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Calendar className="w-5 h-5 mr-2 text-green-600" />
          학습 잔디
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* 요일 라벨 */}
          <div className="flex">
            <div className="w-6"></div>
            {weekDays.map((day, index) => (
              <div key={index} className="w-3 h-3 flex items-center justify-center text-xs text-gray-500 mr-1">
                {index % 2 === 1 ? day : ''}
              </div>
            ))}
          </div>

          {/* 잔디 그리드 */}
          <div className="flex">
            {/* 월 라벨 영역 */}
            <div className="w-6 flex flex-col justify-around text-xs text-gray-500">
              <span>3월</span>
              <span>4월</span>
              <span>5월</span>
            </div>
            
            {/* 잔디 데이터 */}
            <div className="flex flex-wrap">
              {Object.values(weeklyData).map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col mr-1">
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const dayData = week.find(d => d.day === dayIndex);
                    return (
                      <div
                        key={dayIndex}
                        className={`w-3 h-3 rounded-sm mb-1 ${
                          dayData ? getActivityColor(dayData.activity) : 'bg-gray-100'
                        }`}
                        title={dayData ? `${dayData.date}: ${dayData.activity}문제 해결` : '활동 없음'}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* 범례 */}
          <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
            <span>적음</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`}
                />
              ))}
            </div>
            <span>많음</span>
          </div>

          <div className="text-center text-sm text-gray-600 mt-4">
            지난 100일 동안 <strong className="text-green-600">47일</strong> 활동
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrassChart;
