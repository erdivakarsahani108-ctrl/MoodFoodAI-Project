import React from "react";
import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

// Types
interface StatCard {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  color: string;
}

interface NutritionProgress {
  id: string;
  label: string;
  value: number;
  max: number;
  unit: string;
  emoji: string;
  color: string;
}

interface HealthSummary {
  bmi: number;
  bmr: number;
  bodyFat: number;
  weight: number;
  goal: string;
}

interface WeeklyMood {
  day: string;
  mood: string;
  emoji: string;
}

interface RecentActivity {
  id: string;
  time: string;
  description: string;
  icon: string;
}

interface MealPlan {
  day: string;
  meals: string[];
}

interface HealthTip {
  id: string;
  text: string;
  icon: string;
}

interface Suggestion {
  id: string;
  text: string;
}

interface DiseaseRisk {
  condition: string;
  risk: string;
  emoji: string;
}

interface FavoriteFood {
  id: string;
  name: string;
  emoji: string;
}

interface RecentlyViewed {
  id: string;
  name: string;
  emoji: string;
}

// Dummy data
const stats: StatCard[] = [
  { id: "health-score", title: "Health Score", value: "86", icon: "💪", trend: "+4%", trendUp: true, color: "from-green-400 to-emerald-500" },
  { id: "calories", title: "Calories Today", value: "1,845", icon: "🔥", trend: "-120", trendUp: false, color: "from-orange-400 to-red-500" },
  { id: "protein", title: "Protein", value: "82g", icon: "🥩", trend: "+12g", trendUp: true, color: "from-blue-400 to-indigo-500" },
  { id: "water", title: "Water Intake", value: "2.1L", icon: "💧", trend: "+0.3L", trendUp: true, color: "from-cyan-400 to-blue-500" },
  { id: "bmi", title: "BMI", value: "22.4", icon: "⚖️", trend: "-0.3", trendUp: false, color: "from-purple-400 to-pink-500" },
  { id: "mood", title: "Mood", value: "Happy", icon: "😊", trend: "😌", trendUp: true, color: "from-yellow-400 to-orange-500" },
  { id: "sleep", title: "Sleep", value: "7.2h", icon: "😴", trend: "+0.5h", trendUp: true, color: "from-indigo-400 to-violet-500" },
  { id: "disease-risk", title: "Disease Risk", value: "Low", icon: "🛡️", trend: "↓", trendUp: true, color: "from-red-400 to-rose-500" },
];

const nutritionProgress: NutritionProgress[] = [
  { id: "water", label: "Water", value: 2.1, max: 3, unit: "L", emoji: "💧", color: "bg-cyan-500" },
  { id: "calories", label: "Calories", value: 1845, max: 2200, unit: "kcal", emoji: "🔥", color: "bg-orange-500" },
  { id: "protein", label: "Protein", value: 82, max: 120, unit: "g", emoji: "🥩", color: "bg-blue-500" },
  { id: "fiber", label: "Fiber", value: 28, max: 40, unit: "g", emoji: "🌾", color: "bg-green-500" },
];

const weeklyMood: WeeklyMood[] = [
  { day: "Mon", mood: "Good", emoji: "😊" },
  { day: "Tue", mood: "Great", emoji: "😄" },
  { day: "Wed", mood: "Okay", emoji: "😐" },
  { day: "Thu", mood: "Happy", emoji: "😃" },
  { day: "Fri", mood: "Tired", emoji: "😩" },
  { day: "Sat", mood: "Relaxed", emoji: "😌" },
  { day: "Sun", mood: "Energetic", emoji: "⚡" },
];

const aiAnalytics = [
  { id: "nutrition", label: "Nutrition", value: "85%", emoji: "🥗", color: "from-green-400 to-emerald-500" },
  { id: "sleep", label: "Sleep", value: "78%", emoji: "🛌", color: "from-indigo-400 to-purple-500" },
  { id: "hydration", label: "Hydration", value: "70%", emoji: "💦", color: "from-cyan-400 to-blue-500" },
  { id: "stress", label: "Stress", value: "Low", emoji: "🧘", color: "from-yellow-400 to-orange-500" },
  { id: "exercise", label: "Exercise", value: "65%", emoji: "🏃", color: "from-red-400 to-pink-500" },
];

const recentActivities: RecentActivity[] = [
  { id: "1", time: "10:30 AM", description: "Logged breakfast: Oatmeal with berries", icon: "🥣" },
  { id: "2", time: "12:15 PM", description: "Completed 30 min yoga session", icon: "🧘" },
  { id: "3", time: "2:00 PM", description: "Drank 500ml water", icon: "💧" },
  { id: "4", time: "6:45 PM", description: "Dinner: Grilled tofu salad", icon: "🥗" },
];

const weeklyMealPlan: MealPlan[] = [
  { day: "Monday", meals: ["Oatmeal", "Quinoa Salad", "Lentil Soup"] },
  { day: "Tuesday", meals: ["Smoothie", "Veggie Wrap", "Chickpea Curry"] },
  { day: "Wednesday", meals: ["Avocado Toast", "Falafel Bowl", "Stir-fry Tofu"] },
  { day: "Thursday", meals: ["Fruit Salad", "Hummus Plate", "Pasta Primavera"] },
  { day: "Friday", meals: ["Granola", "Sushi Rolls", "Veggie Burger"] },
  { day: "Saturday", meals: ["Pancakes", "Burrito Bowl", "Pizza Margherita"] },
  { day: "Sunday", meals: ["Eggs", "Grilled Veggies", "Roasted Potatoes"] },
];

const healthTips: HealthTip[] = [
  { id: "1", text: "Drink 8 glasses of water daily", icon: "💧" },
  { id: "2", text: "Eat a rainbow of fruits and vegetables", icon: "🌈" },
  { id: "3", text: "Get 7-9 hours of quality sleep", icon: "😴" },
  { id: "4", text: "Practice mindful eating", icon: "🧠" },
];

const aiSuggestions: Suggestion[] = [
  { id: "1", text: "Try a high-protein breakfast for sustained energy" },
  { id: "2", text: "Increase fiber intake with more leafy greens" },
  { id: "3", text: "Consider a 20-minute walk after lunch" },
];

const diseaseRisks: DiseaseRisk[] = [
  { condition: "Diabetes", risk: "Low", emoji: "🩸" },
  { condition: "Heart Disease", risk: "Moderate", emoji: "❤️" },
  { condition: "Hypertension", risk: "Low", emoji: "🫀" },
];

const favoriteFoods: FavoriteFood[] = [
  { id: "1", name: "Avocado Toast", emoji: "🥑" },
  { id: "2", name: "Quinoa Bowl", emoji: "🍚" },
  { id: "3", name: "Berry Smoothie", emoji: "🍓" },
  { id: "4", name: "Tofu Stir-fry", emoji: "🍲" },
];

const recentlyViewed: RecentlyViewed[] = [
  { id: "1", name: "Chickpea Curry", emoji: "🍛" },
  { id: "2", name: "Veggie Wrap", emoji: "🌯" },
  { id: "3", name: "Oatmeal", emoji: "🥣" },
  { id: "4", name: "Pasta Primavera", emoji: "🍝" },
];

// Helper function to get current date
const getCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};

const DashboardPage: React.FC = () => {
  const currentDate = getCurrentDate();

  return (
    <Layout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* 1. Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              👋 Welcome back, User!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{currentDate}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg flex items-center gap-2">
              <span>🧠</span>
              <span className="font-medium">AI Health Summary: 86% Optimal</span>
            </div>
          </div>
        </div>

        {/* 2. Statistics Cards (8 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.id}
              className={`bg-gradient-to-br ${stat.color} text-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 backdrop-blur-sm bg-opacity-90`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
              {stat.trend && (
                <div className="mt-2 text-xs flex items-center gap-1">
                  <span>{stat.trendUp ? "📈" : "📉"}</span>
                  <span className="opacity-80">{stat.trend}</span>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* 3. Daily Recommendation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                🤖 AI Recommended Foods
              </h2>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full">🥑 Avocado Toast</span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full">🥗 Quinoa Salad</span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full">🍲 Lentil Soup</span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full">🍣 Veggie Sushi</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="block text-gray-500 dark:text-gray-400">Calories</span>
                  <span className="text-lg font-bold text-gray-800 dark:text-white">1,845</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="block text-gray-500 dark:text-gray-400">Protein</span>
                  <span className="text-lg font-bold text-gray-800 dark:text-white">82g</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="block text-gray-500 dark:text-gray-400">Carbs</span>
                  <span className="text-lg font-bold text-gray-800 dark:text-white">210g</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <span className="block text-gray-500 dark:text-gray-400">Fiber</span>
                  <span className="text-lg font-bold text-gray-800 dark:text-white">28g</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button variant="primary" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-full">
                  🍽️ View Full Plan
                </Button>
                <Button variant="outline" className="border-2 border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 px-6 py-2 rounded-full">
                  📋 Customize
                </Button>
              </div>
            </Card>
          </div>

          {/* 4. Nutrition Progress */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 h-full">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                📊 Nutrition Progress
              </h2>
              <div className="space-y-5">
                {nutritionProgress.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>{item.emoji} {item.label}</span>
                      <span>{item.value}{item.unit} / {item.max}{item.unit}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* 5. Health Summary + 6. Weekly Mood History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">🩺 Health Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl text-center">
                <span className="block text-sm text-gray-500 dark:text-gray-400">BMI</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white">22.4</span>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl text-center">
                <span className="block text-sm text-gray-500 dark:text-gray-400">BMR</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white">1,650</span>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl text-center">
                <span className="block text-sm text-gray-500 dark:text-gray-400">Body Fat</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white">18%</span>
              </div>
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl text-center">
                <span className="block text-sm text-gray-500 dark:text-gray-400">Weight</span>
                <span className="text-xl font-bold text-gray-800 dark:text-white">68 kg</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <p className="text-sm text-green-800 dark:text-green-200">🎯 Goal: Maintain current weight & build muscle</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📅 Weekly Mood History</h2>
            <div className="flex justify-between">
              {weeklyMood.map((day) => (
                <div key={day.day} className="text-center">
                  <div className="text-3xl">{day.emoji}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{day.day}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 7. AI Health Analytics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📈 AI Health Analytics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {aiAnalytics.map((item) => (
              <Card
                key={item.id}
                className={`bg-gradient-to-br ${item.color} text-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 text-center`}
              >
                <div className="text-3xl mb-1">{item.emoji}</div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm opacity-90">{item.value}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* 8. Recent Activity Timeline */}
        <div className="mb-8">
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">⏳ Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 9. Weekly Meal Plan */}
        <div className="mb-8">
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">📆 Weekly Meal Plan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {weeklyMealPlan.map((day) => (
                <div key={day.day} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <p className="font-medium text-gray-800 dark:text-white">{day.day}</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                    {day.meals.map((meal, idx) => (
                      <li key={idx}>{meal}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 10. Today's Health Tips & 11. AI Suggestions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">💡 Today's Health Tips</h2>
            <ul className="space-y-3">
              {healthTips.map((tip) => (
                <li key={tip.id} className="flex items-start gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <span className="text-gray-700 dark:text-gray-200">{tip.text}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">🧠 AI Suggestions</h2>
            <ul className="space-y-3">
              {aiSuggestions.map((suggestion) => (
                <li key={suggestion.id} className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <span className="text-gray-700 dark:text-gray-200">{suggestion.text}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* 12. Disease Risk Prediction */}
        <div className="mb-8">
          <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-gray-800 dark:to-gray-700/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">🛡️ Disease Risk Prediction</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {diseaseRisks.map((risk) => (
                <div key={risk.condition} className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl text-center">
                  <div className="text-3xl">{risk.emoji}</div>
                  <p className="font-medium text-gray-800 dark:text-white">{risk.condition}</p>
                  <p className={`text-sm font-bold ${risk.risk === "Low" ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"}`}>
                    {risk.risk}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 13. Favourite Foods & 14. Recently Viewed Foods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">❤️ Favourite Foods</h2>
            <div className="flex flex-wrap gap-3">
              {favoriteFoods.map((food) => (
                <span key={food.id} className="px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 rounded-full flex items-center gap-2">
                  <span>{food.emoji}</span> {food.name}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">👀 Recently Viewed</h2>
            <div className="flex flex-wrap gap-3">
              {recentlyViewed.map((food) => (
                <span key={food.id} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full flex items-center gap-2">
                  <span>{food.emoji}</span> {food.name}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* 15. Water Intake Tracker, 16. Exercise Tracker, 17. Sleep Tracker, 18. Daily Goals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-700/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 text-center">
            <div className="text-3xl">💧</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Water Intake</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">2.1 / 3.0 L</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 text-center">
            <div className="text-3xl">🏃</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Exercise</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">45 min</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 text-center">
            <div className="text-3xl">😴</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sleep</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">7.2 h</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/30 text-center">
            <div className="text-3xl">🎯</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Daily Goals</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">80%</p>
          </Card>
        </div>

        {/* 19. Download Report Button, 20. Export PDF Button, 21. Print Button */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="primary" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            ⬇️ Download Report
          </Button>
          <Button variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            📄 Export PDF
          </Button>
          <Button variant="outline" className="border-2 border-gray-400 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 rounded-full flex items-center gap-2">
            🖨️ Print
          </Button>
        </div>
      </div>
    </Layout>
  );
};

