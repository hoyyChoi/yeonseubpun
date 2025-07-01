
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityData {
  date: string;
  count: number;
}

const GrassChart = () => {
  const generateGrassData = (): ActivityData[] => {
    const data: ActivityData[] = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const count = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
      data.push({ date: dateStr, count });
    }
    
    return data;
  };

  const data = generateGrassData();

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-gray-100";
    if (count === 1) return "bg-green-200";
    if (count === 2) return "bg-green-300";
    if (count === 3) return "bg-green-400";
    return "bg-green-500";
  };

  const getTooltip = (item: ActivityData) => {
    const date = new Date(item.date);
    const dateStr = date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    return `${dateStr}: ${item.count}문제`;
  };

  // 월별로 그룹화하여 가로 표시
  const months: ActivityData[][] = [];
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  
  for (let i = 0; i < 12; i++) {
    const monthData = data.filter(item => {
      const date = new Date(item.date);
      return date.getMonth() === i;
    });
    if (monthData.length > 0) {
      months.push(monthData);
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">학습 현황</CardTitle>
        <p className="text-sm text-gray-600">지난 1년간의 문제 풀이 기록</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-12 gap-1 min-w-[600px]">
            {months.map((month, monthIndex) => (
              <div key={monthIndex} className="space-y-1">
                <div className="text-xs text-gray-500 text-center mb-2">
                  {monthNames[monthIndex]}
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {month.slice(0, 31).map((day, dayIndex) => (
                    <div
                      key={`${monthIndex}-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm ${getIntensity(day.count)}`}
                      title={getTooltip(day)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>적음</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          </div>
          <span>많음</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrassChart;
