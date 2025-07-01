
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
    if (count === 0) return "bg-gray-100 border-gray-200";
    if (count === 1) return "bg-green-100 border-green-200";
    if (count === 2) return "bg-green-200 border-green-300";
    if (count === 3) return "bg-green-300 border-green-400";
    return "bg-green-400 border-green-500";
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

  // 주별로 그룹화
  const weeks: ActivityData[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">학습 현황</CardTitle>
        <p className="text-sm text-gray-600">지난 1년간의 문제 풀이 기록</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-53 gap-1 min-w-[700px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm border transition-all hover:scale-110 ${getIntensity(day.count)}`}
                    title={getTooltip(day)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
          <span>적음</span>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-100 border border-green-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-200 border border-green-300 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-300 border border-green-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-400 border border-green-500 rounded-sm"></div>
          </div>
          <span>많음</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrassChart;
