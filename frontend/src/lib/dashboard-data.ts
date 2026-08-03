export type StatCard = {
  id: string;
  title: string;
  value: string;
  icon: string;
  change: string;
  positive: boolean;
  gradient: string;
};

export type RecommendationItem = {
  id: string;
  name: string;
  subtitle: string;
  calories: string;
  protein: string;
  mood: string;
  emoji: string;
  accent: string;
};

export const statCards: StatCard[] = [
  { id: 'health', title: 'AI Health Score', value: '89/100', icon: '✦', change: '+4.2%', positive: true, gradient: 'from-emerald-500 via-teal-500 to-cyan-500' },
  { id: 'calories', title: "Today's Calories", value: '1,842 kcal', icon: '🔥', change: '-128 kcal', positive: true, gradient: 'from-orange-500 via-amber-500 to-yellow-400' },
  { id: 'bmi', title: 'BMI & BMR', value: '22.4 / 1,540', icon: '⚖️', change: 'Healthy range', positive: true, gradient: 'from-violet-500 via-purple-500 to-fuchsia-500' },
  { id: 'water', title: 'Water Intake', value: '2.1 L', icon: '💧', change: '+0.4 L', positive: true, gradient: 'from-sky-500 via-cyan-500 to-blue-500' },
  { id: 'score', title: 'Nutrition Score', value: '92%', icon: '🥗', change: '+7 pts', positive: true, gradient: 'from-green-500 via-lime-500 to-emerald-500' },
  { id: 'ai', title: 'AI Insight', value: 'Balanced', icon: '🧠', change: 'Stable mood', positive: true, gradient: 'from-indigo-500 via-blue-500 to-sky-500' },
];

export const recommendedFoods: RecommendationItem[] = [
  { id: 'avocado-toast', name: 'Avocado Toast', subtitle: 'Healthy fats + fiber boost', calories: '320 kcal', protein: '12 g', mood: 'Happy', emoji: '🥑', accent: 'from-emerald-500 to-lime-500' },
  { id: 'quinoa-bowl', name: 'Quinoa Power Bowl', subtitle: 'Sustains energy and satiety', calories: '410 kcal', protein: '18 g', mood: 'Energetic', emoji: '🥗', accent: 'from-violet-500 to-indigo-500' },
  { id: 'berry-smoothie', name: 'Berry Protein Smoothie', subtitle: 'Recovery and antioxidant support', calories: '280 kcal', protein: '16 g', mood: 'Calm', emoji: '🍓', accent: 'from-pink-500 to-rose-500' },
  { id: 'lentil-soup', name: 'Lentil Citrus Soup', subtitle: 'Protein-rich and gut friendly', calories: '290 kcal', protein: '17 g', mood: 'Balanced', emoji: '🍲', accent: 'from-amber-500 to-orange-500' },
];

export const recommendedRecipes = [
  { id: 'green-wrap', name: 'Green Protein Wrap', time: '20 min', difficulty: 'Easy', calories: '390 kcal', emoji: '🌯' },
  { id: 'tofu-bowl', name: 'Citrus Tofu Bowl', time: '25 min', difficulty: 'Medium', calories: '430 kcal', emoji: '🍱' },
  { id: 'oat-pudding', name: 'Chia Oat Pudding', time: '15 min', difficulty: 'Easy', calories: '260 kcal', emoji: '🥣' },
];

export const recommendedRestaurants = [
  { id: 'green-plate', name: 'Green Plate Studio', rating: '4.8', category: 'Vegan Cafe', distance: '1.2 km', emoji: '🌿' },
  { id: 'nutri-bowl', name: 'Nutri Bowl Co.', rating: '4.7', category: 'Healthy Grill', distance: '2.4 km', emoji: '🥗' },
  { id: 'midtown', name: 'Midtown Kitchen', rating: '4.9', category: 'Plant-Based Bistro', distance: '3.1 km', emoji: '🍃' },
];

export const weeklyCalories = [
  { day: 'Mon', value: 2100 },
  { day: 'Tue', value: 1900 },
  { day: 'Wed', value: 2200 },
  { day: 'Thu', value: 1800 },
  { day: 'Fri', value: 2050 },
  { day: 'Sat', value: 1950 },
  { day: 'Sun', value: 2000 },
];

export const nutritionDistribution = [
  { label: 'Protein', value: 35, color: 'bg-emerald-500' },
  { label: 'Carbs', value: 30, color: 'bg-violet-500' },
  { label: 'Fats', value: 20, color: 'bg-amber-400' },
  { label: 'Fiber', value: 15, color: 'bg-sky-500' },
];

export const moodTrend = [
  { day: 'Mon', value: 68 },
  { day: 'Tue', value: 72 },
  { day: 'Wed', value: 74 },
  { day: 'Thu', value: 81 },
  { day: 'Fri', value: 77 },
  { day: 'Sat', value: 88 },
  { day: 'Sun', value: 90 },
];

export const waterIntake = [
  { label: 'M', value: 1.8 },
  { label: 'T', value: 2.2 },
  { label: 'W', value: 2.0 },
  { label: 'T', value: 2.6 },
  { label: 'F', value: 2.8 },
  { label: 'S', value: 2.4 },
  { label: 'S', value: 2.9 },
];

export const favoriteFoods = [
  { id: 'f1', name: 'Chia Oat Bowl', emoji: '🥣' },
  { id: 'f2', name: 'Green Smoothie', emoji: '🥤' },
  { id: 'f3', name: 'Quinoa Salad', emoji: '🥗' },
  { id: 'f4', name: 'Stuffed Avocado', emoji: '🥑' },
];

export const savedPlans = [
  { id: 'p1', name: 'High Energy Week', duration: '7 days', goal: 'Performance' },
  { id: 'p2', name: 'Mood Recovery', duration: '5 days', goal: 'Stress relief' },
  { id: 'p3', name: 'Lean Balance', duration: '14 days', goal: 'Weight management' },
];

export const recentActivity = [
  { id: 'a1', time: '08:40 AM', text: 'Logged breakfast with chia oats and berries.', icon: '🥣' },
  { id: 'a2', time: '12:15 PM', text: 'Completed a 22-minute walking session.', icon: '🚶' },
  { id: 'a3', time: '06:30 PM', text: 'Hydration goal reached with 2.4L water.', icon: '💧' },
  { id: 'a4', time: '08:00 PM', text: 'Saved a new mood-boosting recipe plan.', icon: '✨' },
];

export const orderHistory = [
  { id: 'o1', item: 'Protein Harvest Bowl', date: 'Jul 24', amount: '$18', status: 'Delivered' },
  { id: 'o2', item: 'Green Glow Smoothie', date: 'Jul 21', amount: '$11', status: 'Delivered' },
  { id: 'o3', item: 'Mood Balance Snack Box', date: 'Jul 16', amount: '$22', status: 'In transit' },
];

export const aiInsights = [
  { id: 's1', title: 'Personalized Suggestions', text: 'Increase protein at breakfast by 12 g to sustain your energy through the afternoon.', icon: '💡' },
  { id: 's2', title: 'Disease Risk Alerts', text: 'Cardio health score is trending well; keep sodium under control for the next 3 days.', icon: '⚠️' },
  { id: 's3', title: 'Nutrition Tips', text: 'Add a leafy green serving at lunch to improve fiber and magnesium intake.', icon: '🌱' },
];
