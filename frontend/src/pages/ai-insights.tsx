import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

// ==================== TYPES ====================
interface HealthScore {
  overall: number;
  physical: number;
  mental: number;
  nutrition: number;
  lifestyle: number;
}

interface MoodData {
  current: string;
  emoji: string;
  recent: { day: string; mood: string; emoji: string }[];
}

interface DiseaseRisk {
  disease: string;
  risk: "Low" | "Moderate" | "High";
  emoji: string;
  description: string;
}

interface FoodRecommendation {
  name: string;
  reason: string;
  calories: number;
  protein: number;
  emoji: string;
}

interface NutritionAnalysis {
  calories: { current: number; goal: number; unit: string };
  protein: { current: number; goal: number; unit: string };
  carbs: { current: number; goal: number; unit: string };
  fat: { current: number; goal: number; unit: string };
  fiber: { current: number; goal: number; unit: string };
}

interface VitaminMineral {
  name: string;
  value: number;
  unit: string;
  recommended: number;
  emoji: string;
}

interface WaterIntake {
  current: number;
  goal: number;
  unit: string;
}

interface BmiData {
  value: number;
  category: string;
  healthyRange: string;
}

interface WeeklyTrend {
  day: string;
  mood: number;
  calories: number;
  protein: number;
  sleep: number;
}

interface HealthTip {
  id: string;
  text: string;
  icon: string;
}

interface AIInsightsData {
  healthScore: HealthScore;
  mood: MoodData;
  diseaseRisks: DiseaseRisk[];
  recommendations: FoodRecommendation[];
  nutrition: NutritionAnalysis;
  vitamins: VitaminMineral[];
  water: WaterIntake;
  bmi: BmiData;
  weeklyTrends: WeeklyTrend[];
  tips: HealthTip[];
  explanation: string;
}

// ==================== DEMO DATA GENERATORS ====================
const generateDemoData = (): AIInsightsData => {
  const weeklyMoods = ["😊", "😄", "😐", "😃", "😩", "😌", "⚡"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return {
    healthScore: {
      overall: 82,
      physical: 78,
      mental: 85,
      nutrition: 80,
      lifestyle: 75,
    },
    mood: {
      current: "Energetic",
      emoji: "⚡",
      recent: days.map((day, i) => ({
        day,
        mood: ["Happy", "Great", "Okay", "Happy", "Tired", "Relaxed", "Energetic"][i % 7],
        emoji: weeklyMoods[i % 7],
      })),
    },
    diseaseRisks: [
      { disease: "Diabetes", risk: "Low", emoji: "🩸", description: "Your fasting blood sugar is within healthy range." },
      { disease: "Heart Disease", risk: "Moderate", emoji: "❤️", description: "Your cholesterol levels need monitoring." },
      { disease: "Hypertension", risk: "Low", emoji: "🫀", description: "Blood pressure is well controlled." },
      { disease: "Obesity", risk: "Low", emoji: "⚖️", description: "Your BMI is in the healthy range." },
    ],
    recommendations: [
      { name: "Avocado Toast", reason: "Rich in healthy fats and fiber, great for mood stability.", calories: 250, protein: 8, emoji: "🥑" },
      { name: "Quinoa Bowl", reason: "Complete protein and high in iron, boosts energy.", calories: 320, protein: 14, emoji: "🍚" },
      { name: "Berry Smoothie", reason: "Antioxidants and vitamin C, helps reduce stress.", calories: 180, protein: 6, emoji: "🥤" },
      { name: "Lentil Soup", reason: "High in fiber and plant protein, stabilizes blood sugar.", calories: 210, protein: 12, emoji: "🍲" },
    ],
    nutrition: {
      calories: { current: 1845, goal: 2200, unit: "kcal" },
      protein: { current: 82, goal: 120, unit: "g" },
      carbs: { current: 210, goal: 250, unit: "g" },
      fat: { current: 45, goal: 65, unit: "g" },
      fiber: { current: 28, goal: 40, unit: "g" },
    },
    vitamins: [
      { name: "Vitamin A", value: 85, unit: "µg", recommended: 900, emoji: "🥕" },
      { name: "Vitamin C", value: 60, unit: "mg", recommended: 90, emoji: "🍊" },
      { name: "Vitamin D", value: 12, unit: "µg", recommended: 15, emoji: "☀️" },
      { name: "Vitamin B12", value: 2.4, unit: "µg", recommended: 2.4, emoji: "🥩" },
      { name: "Iron", value: 12, unit: "mg", recommended: 18, emoji: "🩸" },
      { name: "Calcium", value: 800, unit: "mg", recommended: 1000, emoji: "🦴" },
    ],
    water: { current: 2.1, goal: 3.0, unit: "L" },
    bmi: { value: 22.4, category: "Normal weight", healthyRange: "18.5 – 24.9" },
    weeklyTrends: days.map((day, i) => ({
      day,
      mood: [8, 9, 7, 8, 5, 7, 9][i % 7],
      calories: [1900, 2100, 1800, 2200, 1700, 2000, 1850][i % 7],
      protein: [80, 90, 75, 95, 70, 85, 82][i % 7],
      sleep: [7.0, 7.5, 6.8, 8.0, 6.5, 7.2, 7.4][i % 7],
    })),
    tips: [
      { id: "1", text: "Drink at least 8 glasses of water daily to stay hydrated.", icon: "💧" },
      { id: "2", text: "Include a rainbow of fruits and vegetables for diverse nutrients.", icon: "🌈" },
      { id: "3", text: "Practice 10 minutes of mindfulness to reduce stress.", icon: "🧘" },
      { id: "4", text: "Eat slowly and mindfully to improve digestion.", icon: "🍽️" },
    ],
    explanation: "Your AI analysis indicates that your overall health is good. Your mood is currently elevated, likely due to your balanced nutrition and active lifestyle. We recommend maintaining your current protein intake and increasing fiber slightly. Your disease risk profile is favorable, but continue monitoring cholesterol. Based on your data, the suggested foods are tailored to support your energy needs and mood stability.",
  };
};

// ==================== MAIN COMPONENT ====================
const AIInsightsPage: React.FC = () => {
  const [data, setData] = useState<AIInsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load data from localStorage or generate demo
  const loadData = () => {
    setLoading(true);
    setError(null);
    try {
      const stored = localStorage.getItem("ai_insights_data");
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        const demo = generateDemoData();
        localStorage.setItem("ai_insights_data", JSON.stringify(demo));
        setData(demo);
      }
    } catch (err) {
      setError("Failed to load insights. Please try again.");
      // Fallback to demo
      const demo = generateDemoData();
      setData(demo);
    } finally {
      setLoading(false);
    }
  };

  // Refresh analysis (simulate new data)
  const refreshAnalysis = () => {
    setRefreshing(true);
    setTimeout(() => {
      const fresh = generateDemoData();
      localStorage.setItem("ai_insights_data", JSON.stringify(fresh));
      setData(fresh);
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Export report (UI placeholder)
  const handleExport = () => {
    alert("Export report feature would generate a PDF or CSV of your health insights.");
  };

  // Loading skeleton
  if (loading) {
    return (
      <Layout>
        <div className="p-4 md:p-8 space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Unable to load insights</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{error || "No data available"}</p>
          <Button onClick={loadData} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg">
            Retry
          </Button>
        </div>
      </Layout>
    );
  }

  // Helper to get progress percentage
  const progress = (current: number, goal: number) => Math.min((current / goal) * 100, 100);

  // Helper to get risk color
  const riskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-600 dark:text-green-400";
      case "Moderate": return "text-yellow-600 dark:text-yellow-400";
      case "High": return "text-red-600 dark:text-red-400";
      default: return "";
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🧠 AI Health Insights</h1>
            <p className="text-gray-600 dark:text-gray-300">Personalized analysis based on your data</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={refreshAnalysis}
              disabled={refreshing}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {refreshing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </>
              ) : (
                "🔄 Refresh"
              )}
            </Button>
            <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
              📄 Export Report
            </Button>
          </div>
        </div>

        {/* 1. AI Health Score Card */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="md:col-span-2 p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold mb-2">Overall Health Score</h2>
            <div className="flex items-end gap-4">
              <div className="text-6xl font-extrabold">{data.healthScore.overall}</div>
              <div className="text-sm opacity-80">/ 100</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>Physical: {data.healthScore.physical}%</div>
              <div>Mental: {data.healthScore.mental}%</div>
              <div>Nutrition: {data.healthScore.nutrition}%</div>
              <div>Lifestyle: {data.healthScore.lifestyle}%</div>
            </div>
          </Card>
          <Card className="md:col-span-3 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Score Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(data.healthScore)
                .filter(([key]) => key !== "overall")
                .map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 capitalize">
                      <span>{key}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>

        {/* 2. Mood Analysis Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">😊 Current Mood</h2>
            <div className="flex items-center gap-3">
              <span className="text-5xl">{data.mood.emoji}</span>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{data.mood.current}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Updated just now</p>
              </div>
            </div>
          </Card>
          <Card className="md:col-span-2 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">📊 Weekly Mood History</h2>
            <div className="flex justify-between">
              {data.mood.recent.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl">{item.emoji}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.day}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 3. Disease Risk Prediction Cards */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🛡️ Disease Risk Prediction</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.diseaseRisks.map((risk, idx) => (
              <Card key={idx} className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{risk.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{risk.disease}</h3>
                    <p className={`font-semibold ${riskColor(risk.risk)}`}>{risk.risk}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{risk.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* 4. Personalized Vegetarian Food Recommendations */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🥗 Personalized Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.recommendations.map((food, idx) => (
              <Card key={idx} className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
                <div className="flex items-start gap-3">
                  <span className="text-4xl">{food.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{food.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{food.reason}</p>
                    <div className="flex gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>🔥 {food.calories} kcal</span>
                      <span>🥩 {food.protein}g protein</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 5. Nutrition Analysis */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📊 Nutrition Analysis</h2>
          <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(data.nutrition).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 capitalize">
                    <span>{key}</span>
                    <span>{value.current}{value.unit} / {value.goal}{value.unit}</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all"
                      style={{ width: `${progress(value.current, value.goal)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 6. Vitamin & Mineral Analysis */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">🧪 Vitamin & Mineral Analysis</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {data.vitamins.map((vit, idx) => (
              <Card key={idx} className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow text-center">
                <div className="text-3xl">{vit.emoji}</div>
                <p className="font-bold text-gray-800 dark:text-white text-sm">{vit.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{vit.value}{vit.unit}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Goal: {vit.recommended}{vit.unit}</p>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${Math.min((vit.value / vit.recommended) * 100, 100)}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 7. Water Intake Tracker & 8. BMI Calculator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">💧 Water Intake</h2>
            <div className="flex items-center gap-4">
              <div className="text-4xl">💦</div>
              <div className="flex-1">
                <div className="flex justify-between text-sm">
                  <span>{data.water.current} {data.water.unit}</span>
                  <span>Goal: {data.water.goal} {data.water.unit}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full"
                    style={{ width: `${progress(data.water.current, data.water.goal)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {progress(data.water.current, data.water.goal) >= 80 ? "Great hydration!" : "Keep drinking!"}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">⚖️ BMI Calculator</h2>
            <div className="flex items-center gap-6">
              <div className="text-5xl">{data.bmi.value}</div>
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{data.bmi.category}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Healthy range: {data.bmi.healthyRange}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* 9. Weekly Health Trends Charts (UI) */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">📈 Weekly Health Trends</h2>
          <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
                {data.weeklyTrends.map((day) => (
                  <div key={day.day}>{day.day}</div>
                ))}
              </div>
              {/* Mood trend */}
              <div className="mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Mood (1-10)</p>
                <div className="grid grid-cols-7 gap-2">
                  {data.weeklyTrends.map((day, idx) => (
                    <div key={idx} className="h-8 bg-indigo-100 dark:bg-indigo-900/50 rounded flex items-center justify-center text-xs">
                      {day.mood}
                    </div>
                  ))}
                </div>
              </div>
              {/* Calories trend */}
              <div className="mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Calories</p>
                <div className="grid grid-cols-7 gap-2">
                  {data.weeklyTrends.map((day, idx) => (
                    <div key={idx} className="h-8 bg-orange-100 dark:bg-orange-900/50 rounded flex items-center justify-center text-xs">
                      {day.calories}
                    </div>
                  ))}
                </div>
              </div>
              {/* Protein trend */}
              <div className="mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Protein (g)</p>
                <div className="grid grid-cols-7 gap-2">
                  {data.weeklyTrends.map((day, idx) => (
                    <div key={idx} className="h-8 bg-blue-100 dark:bg-blue-900/50 rounded flex items-center justify-center text-xs">
                      {day.protein}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 10. Daily Health Tips & 11. AI Recommendation Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">💡 Daily Health Tips</h2>
            <ul className="space-y-3">
              {data.tips.map((tip) => (
                <li key={tip.id} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                  <span className="text-2xl">{tip.icon}</span>
                  <span>{tip.text}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">🧠 AI Recommendation Explanation</h2>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{data.explanation}</p>
          </Card>
        </div>

        {/* Footer note */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
          🤖 AI insights are generated based on your health data. Always consult a healthcare professional for medical decisions.
        </div>
      </div>
    </Layout>
  );
};

export default AIInsightsPage;

