import React from "react";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

// ----- Dummy Data -----
const featuredFoods = [
  { id: 1, name: "Avocado Toast", image: "🥑", calories: 250, protein: 8, rating: 4.8 },
  { id: 2, name: "Quinoa Bowl", image: "🍚", calories: 320, protein: 14, rating: 4.9 },
  { id: 3, name: "Veggie Burger", image: "🍔", calories: 380, protein: 20, rating: 4.7 },
  { id: 4, name: "Fruit Smoothie", image: "🥤", calories: 180, protein: 5, rating: 4.5 },
  { id: 5, name: "Lentil Soup", image: "🍲", calories: 210, protein: 12, rating: 4.6 },
  { id: 6, name: "Tofu Stir-fry", image: "🥘", calories: 290, protein: 18, rating: 4.8 },
  { id: 7, name: "Hummus Plate", image: "🧆", calories: 230, protein: 9, rating: 4.4 },
  { id: 8, name: "Pasta Primavera", image: "🍝", calories: 340, protein: 15, rating: 4.7 },
];

const diseaseDiets = [
  { disease: "Diabetes", foods: ["Oats", "Legumes", "Leafy Greens", "Nuts"], emoji: "🩸" },
  { disease: "Heart Disease", foods: ["Avocado", "Olive Oil", "Whole Grains", "Berries"], emoji: "❤️" },
  { disease: "Hypertension", foods: ["Banana", "Spinach", "Pumpkin Seeds", "Beets"], emoji: "🫀" },
  { disease: "Obesity", foods: ["Quinoa", "Broccoli", "Apple", "Green Tea"], emoji: "⚖️" },
  { disease: "PCOD", foods: ["Flaxseed", "Tofu", "Lentils", "Cinnamon"], emoji: "🌸" },
  { disease: "Kidney Disease", foods: ["Cabbage", "Red Grapes", "Cauliflower", "Blueberries"], emoji: "🧬" },
];

const categories = [
  { name: "Breakfast", emoji: "🍳" },
  { name: "Lunch", emoji: "🥗" },
  { name: "Dinner", emoji: "🍽️" },
  { name: "Snacks", emoji: "🍿" },
  { name: "Fruits", emoji: "🍎" },
  { name: "Drinks", emoji: "🥤" },
];

const whyAI = [
  { title: "AI Recommendation", icon: "🧠", desc: "Smart suggestions based on your mood and health" },
  { title: "Nutrition Analysis", icon: "📊", desc: "Deep insights into your daily nutrient intake" },
  { title: "Mood Detection", icon: "😊", desc: "Adapts recommendations to your emotional state" },
  { title: "Disease Prediction", icon: "🔮", desc: "Early risk assessment for lifestyle diseases" },
  { title: "Personalized Plan", icon: "🎯", desc: "Customized diet plans tailored just for you" },
];

const testimonials = [
  { name: "Priya Sharma", avatar: "👩", text: "This AI completely transformed my eating habits! I feel more energetic and my mood has improved significantly.", rating: 5 },
  { name: "Raj Patel", avatar: "👨", text: "The disease prediction feature helped me take preventive measures. I love the personalized meal plans.", rating: 4.5 },
  { name: "Ananya Reddy", avatar: "👩‍🦰", text: "I've tried many apps but this one is different. The mood-based recommendations are spot on!", rating: 4.8 },
];

const faqs = [
  { q: "How does the AI recommendation work?", a: "Our AI analyzes your mood, health data, and preferences to suggest the best vegetarian foods for you." },
  { q: "Is my data secure?", a: "Absolutely. We use encryption and never share your personal information with third parties." },
  { q: "Can I customize my diet plan?", a: "Yes! You can adjust portions, swap foods, and set personal goals anytime." },
  { q: "Does it track my daily nutrition?", a: "Yes, you get a complete breakdown of calories, protein, carbs, fiber, and more." },
  { q: "Is the app suitable for beginners?", a: "Definitely. We provide step-by-step guidance and easy-to-follow meal suggestions." },
];

// ----- Main Page -----
const IndexPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            🥗 AI Mood Based Vegetarian Food Recommendation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Smart, personalized vegetarian meal suggestions tailored to your mood and health.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button variant="primary" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full shadow-lg">
              Get Started
            </Button>
            <Button variant="outline" className="border-2 border-green-500 text-green-600 dark:text-green-400 px-8 py-3 rounded-full">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* 1. Featured Vegetarian Foods */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">🌟 Featured Vegetarian Foods</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">Discover our top-rated plant-based delights</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFoods.map((food) => (
              <Card key={food.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-6 text-center">
                  <div className="text-6xl mb-3">{food.image}</div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{food.name}</h3>
                  <div className="flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-300 mt-2">
                    <span>🔥 {food.calories} cal</span>
                    <span>🥩 {food.protein}g</span>
                    <span>⭐ {food.rating}</span>
                  </div>
                  <Button variant="primary" className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-full text-sm">
                    View Details →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Disease Wise Diet */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">🩺 Disease Wise Diet</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">Tailored vegetarian recommendations for common health conditions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diseaseDiets.map((item, idx) => (
              <Card key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow p-5 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{item.disease}</h3>
                </div>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  {item.foods.map((food, i) => (
                    <li key={i}>{food}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular Categories */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">📂 Popular Categories</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">Explore our most popular food categories</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <Card key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 p-4 text-center border border-gray-200 dark:border-gray-700">
                <div className="text-4xl">{cat.emoji}</div>
                <p className="text-sm font-medium text-gray-800 dark:text-white mt-1">{cat.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Our AI */}
      <section className="py-12 px-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">🤖 Why Choose Our AI</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">Intelligent, personalized, and science-backed</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {whyAI.map((item, idx) => (
              <div key={idx} className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300 border border-white/30 dark:border-gray-700/30">
                <div className="text-5xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">💬 What Our Users Say</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">Real stories from real people</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-6 border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-5xl mb-2">{testimonial.avatar}</div>
                <p className="text-gray-700 dark:text-gray-200 italic text-sm">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-800 dark:text-white mt-3">{testimonial.name}</p>
                <div className="text-yellow-400 text-sm">
                  {'⭐'.repeat(Math.floor(testimonial.rating))}
                  {testimonial.rating % 1 !== 0 ? '⭐' : ''}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">❓ Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">Got questions? We've got answers.</p>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
                <summary className="cursor-pointer font-medium text-gray-800 dark:text-white">{faq.q}</summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">📬 Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">We'd love to hear from you</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📧</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">support@aimoodfood.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">📞</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-3xl">📍</span>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Address</h4>
                  <p className="text-gray-600 dark:text-gray-300">123 Wellness Blvd, Suite 100, Health City, HC 12345</p>
                </div>
              </div>
            </div>
            <div>
              <form className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
                  <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Message</label>
                  <textarea rows={4} placeholder="How can we help?" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
                </div>
                <Button variant="primary" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 rounded-lg">
                  Send Message 📨
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Professional Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 px-4 mt-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">🥗 AI Mood Food</h3>
              <p className="text-sm">Empowering your health with intelligent vegetarian recommendations.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition">Recipes</a></li>
                <li><a href="#" className="hover:text-white transition">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-4 text-2xl">
                <a href="#" className="hover:text-white transition">📘</a>
                <a href="#" className="hover:text-white transition">🐦</a>
                <a href="#" className="hover:text-white transition">📸</a>
                <a href="#" className="hover:text-white transition">▶️</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} AI Mood Based Vegetarian Food Recommendation System. All rights reserved.
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default IndexPage;import React, { useState } from "react";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  const handleGuestLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    router.push("/dashboard");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/30 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/30 transition-all duration-300 hover:shadow-3xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
              🥗 Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  📧
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none transition text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  🔒
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none transition text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="text-red-500 dark:text-red-400 text-sm text-center bg-red-100/50 dark:bg-red-900/30 p-2 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/30 dark:bg-gray-800/40 backdrop-blur-sm text-gray-500 dark:text-gray-400">
                or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGuestLogin}
            className="w-full py-3 px-4 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-600/80 text-gray-800 dark:text-white font-medium rounded-xl border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-lg transition-all duration-200"
          >
            🚪 Continue as Guest
          </button>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              onClick={(e) => { e.preventDefault(); router.push("/register"); }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
