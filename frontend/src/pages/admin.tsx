import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

// ==================== TYPES ====================
interface Food {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  moodTag: string;
}

interface Disease {
  id: string;
  name: string;
  description: string;
  recommendedFoods: string[];
}

interface Mood {
  id: string;
  name: string;
  emoji: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  createdAt: string;
}

// ==================== DEMO DATA SEED ====================
const seedData = () => {
  if (!localStorage.getItem("admin_foods")) {
    const foods: Food[] = [
      { id: "1", name: "Avocado Toast", category: "Breakfast", calories: 250, protein: 8, carbs: 20, fiber: 7, moodTag: "Happy" },
      { id: "2", name: "Quinoa Bowl", category: "Lunch", calories: 320, protein: 14, carbs: 45, fiber: 8, moodTag: "Energetic" },
      { id: "3", name: "Veggie Burger", category: "Dinner", calories: 380, protein: 20, carbs: 35, fiber: 6, moodTag: "Satisfied" },
      { id: "4", name: "Fruit Smoothie", category: "Drinks", calories: 180, protein: 5, carbs: 30, fiber: 4, moodTag: "Refreshed" },
      { id: "5", name: "Lentil Soup", category: "Dinner", calories: 210, protein: 12, carbs: 28, fiber: 10, moodTag: "Comforted" },
    ];
    localStorage.setItem("admin_foods", JSON.stringify(foods));
  }
  if (!localStorage.getItem("admin_diseases")) {
    const diseases: Disease[] = [
      { id: "1", name: "Diabetes", description: "High blood sugar", recommendedFoods: ["Oats", "Legumes", "Leafy Greens"] },
      { id: "2", name: "Heart Disease", description: "Cardiovascular condition", recommendedFoods: ["Avocado", "Olive Oil", "Berries"] },
      { id: "3", name: "Hypertension", description: "High blood pressure", recommendedFoods: ["Banana", "Spinach", "Beets"] },
    ];
    localStorage.setItem("admin_diseases", JSON.stringify(diseases));
  }
  if (!localStorage.getItem("admin_moods")) {
    const moods: Mood[] = [
      { id: "1", name: "Happy", emoji: "😊" },
      { id: "2", name: "Energetic", emoji: "⚡" },
      { id: "3", name: "Tired", emoji: "😩" },
      { id: "4", name: "Stressed", emoji: "😰" },
      { id: "5", name: "Relaxed", emoji: "😌" },
    ];
    localStorage.setItem("admin_moods", JSON.stringify(moods));
  }
  if (!localStorage.getItem("admin_users")) {
    const users: User[] = [
      { id: "1", fullName: "John Doe", email: "john@example.com", mobile: "9876543210", createdAt: new Date().toISOString() },
      { id: "2", fullName: "Jane Smith", email: "jane@example.com", mobile: "9876543211", createdAt: new Date().toISOString() },
    ];
    localStorage.setItem("admin_users", JSON.stringify(users));
  }
};

// ==================== HELPER FUNCTIONS ====================
const getData = <T,>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setData = <T,>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const generateId = () => Date.now().toString();

// ==================== MAIN COMPONENT ====================
const AdminPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [foods, setFoods] = useState<Food[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Search & filters
  const [searchQuery, setSearchQuery] = useState("");

  // Food management state
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [foodForm, setFoodForm] = useState<Omit<Food, "id">>({
    name: "",
    category: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fiber: 0,
    moodTag: "",
  });

  // Disease management state
  const [editingDisease, setEditingDisease] = useState<Disease | null>(null);
  const [diseaseForm, setDiseaseForm] = useState<Omit<Disease, "id">>({
    name: "",
    description: "",
    recommendedFoods: [],
  });

  // Mood management state
  const [editingMood, setEditingMood] = useState<Mood | null>(null);
  const [moodForm, setMoodForm] = useState<Omit<Mood, "id">>({
    name: "",
    emoji: "",
  });

  // Notifications
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Load data on mount
  useEffect(() => {
    seedData();
    loadAllData();
  }, []);

  const loadAllData = () => {
    setFoods(getData<Food>("admin_foods"));
    setDiseases(getData<Disease>("admin_diseases"));
    setMoods(getData<Mood>("admin_moods"));
    setUsers(getData<User>("admin_users"));
  };

  const addNotification = (msg: string) => {
    setNotifications((prev) => [msg, ...prev]);
  };

  // ============ FOOD CRUD ============
  const handleFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFood) {
      const updated = foods.map((f) =>
        f.id === editingFood.id ? { ...editingFood, ...foodForm } : f
      );
      setData("admin_foods", updated);
      setFoods(updated);
      addNotification(`Food "${foodForm.name}" updated`);
    } else {
      const newFood: Food = { id: generateId(), ...foodForm };
      const updated = [...foods, newFood];
      setData("admin_foods", updated);
      setFoods(updated);
      addNotification(`Food "${foodForm.name}" added`);
    }
    resetFoodForm();
  };

  const deleteFood = (id: string) => {
    if (confirm("Delete this food?")) {
      const filtered = foods.filter((f) => f.id !== id);
      setData("admin_foods", filtered);
      setFoods(filtered);
      addNotification("Food deleted");
    }
  };

  const resetFoodForm = () => {
    setEditingFood(null);
    setFoodForm({ name: "", category: "", calories: 0, protein: 0, carbs: 0, fiber: 0, moodTag: "" });
  };

  const editFood = (food: Food) => {
    setEditingFood(food);
    setFoodForm(food);
  };

  // ============ DISEASE CRUD ============
  const handleDiseaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDisease) {
      const updated = diseases.map((d) =>
        d.id === editingDisease.id ? { ...editingDisease, ...diseaseForm } : d
      );
      setData("admin_diseases", updated);
      setDiseases(updated);
      addNotification(`Disease "${diseaseForm.name}" updated`);
    } else {
      const newDisease: Disease = { id: generateId(), ...diseaseForm };
      const updated = [...diseases, newDisease];
      setData("admin_diseases", updated);
      setDiseases(updated);
      addNotification(`Disease "${diseaseForm.name}" added`);
    }
    resetDiseaseForm();
  };

  const deleteDisease = (id: string) => {
    if (confirm("Delete this disease?")) {
      const filtered = diseases.filter((d) => d.id !== id);
      setData("admin_diseases", filtered);
      setDiseases(filtered);
      addNotification("Disease deleted");
    }
  };

  const resetDiseaseForm = () => {
    setEditingDisease(null);
    setDiseaseForm({ name: "", description: "", recommendedFoods: [] });
  };

  const editDisease = (disease: Disease) => {
    setEditingDisease(disease);
    setDiseaseForm(disease);
  };

  // ============ MOOD CRUD ============
  const handleMoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMood) {
      const updated = moods.map((m) =>
        m.id === editingMood.id ? { ...editingMood, ...moodForm } : m
      );
      setData("admin_moods", updated);
      setMoods(updated);
      addNotification(`Mood "${moodForm.name}" updated`);
    } else {
      const newMood: Mood = { id: generateId(), ...moodForm };
      const updated = [...moods, newMood];
      setData("admin_moods", updated);
      setMoods(updated);
      addNotification(`Mood "${moodForm.name}" added`);
    }
    resetMoodForm();
  };

  const deleteMood = (id: string) => {
    if (confirm("Delete this mood?")) {
      const filtered = moods.filter((m) => m.id !== id);
      setData("admin_moods", filtered);
      setMoods(filtered);
      addNotification("Mood deleted");
    }
  };

  const resetMoodForm = () => {
    setEditingMood(null);
    setMoodForm({ name: "", emoji: "" });
  };

  const editMood = (mood: Mood) => {
    setEditingMood(mood);
    setMoodForm(mood);
  };

  // ============ LOGOUT ============
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  // ============ RENDER SECTIONS ============
  const renderDashboard = () => {
    const stats = [
      { label: "Total Users", value: users.length, icon: "👥", color: "from-blue-400 to-indigo-500" },
      { label: "Food Items", value: foods.length, icon: "🍽️", color: "from-green-400 to-emerald-500" },
      { label: "Diseases", value: diseases.length, icon: "🏥", color: "from-red-400 to-rose-500" },
      { label: "Mood Records", value: moods.length, icon: "😊", color: "from-yellow-400 to-orange-500" },
      { label: "Recommendations", value: foods.filter(f => f.moodTag).length, icon: "🤖", color: "from-purple-400 to-pink-500" },
    ];

    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx} className={`bg-gradient-to-br ${stat.color} text-white p-4 rounded-2xl shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">📊 Recent Activity</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div>• New user registered: Jane Smith</div>
              <div>• Food item "Quinoa Bowl" updated</div>
              <div>• Disease "Diabetes" modified</div>
              <div>• Mood "Energetic" added</div>
            </div>
          </Card>
          <Card className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">📈 Analytics (Placeholder)</h3>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
              Chart coming soon
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderFoodManagement = () => {
    const filtered = foods.filter(f =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🍽️ Food Management</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search foods..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => { resetFoodForm(); setEditingFood(null); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
            + Add Food
          </Button>
        </div>

        {/* Form */}
        {(editingFood !== null || (!editingFood && foodForm.name)) && (
          <Card className="p-4 mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">{editingFood ? "Edit Food" : "Add New Food"}</h3>
            <form onSubmit={handleFoodSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={foodForm.name}
                onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Category"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={foodForm.category}
                onChange={(e) => setFoodForm({ ...foodForm, category: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Calories"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={foodForm.calories}
                onChange={(e) => setFoodForm({ ...foodForm, calories: Number(e.target.value) })}
                required
              />
              <input
                type="number"
                placeholder="Protein (g)"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={foodForm.protein}
                onChange={(e) => setFoodForm({ ...foodForm, protein: Number(e.target.value) })}
                required
              />
              <input
                type="number"
                placeholder="Carbs (g)"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={foodForm.carbs}
                onChange={(e) => setFoodForm({ ...foodForm, carbs: Number(e.target.value) })}
                required
              />
              <input
                type="number"
                placeholder="Fiber (g)"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={foodForm.fiber}
                onChange={(e) => setFoodForm({ ...foodForm, fiber: Number(e.target.value) })}
                required
              />
              <input
                type="text"
                placeholder="Mood Tag"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={foodForm.moodTag}
                onChange={(e) => setFoodForm({ ...foodForm, moodTag: e.target.value })}
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">
                  {editingFood ? "Update" : "Create"}
                </Button>
                <Button type="button" onClick={resetFoodForm} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-gray-600 dark:text-gray-300">Name</th>
                <th className="px-4 py-3 text-gray-600 dark:text-gray-300">Category</th>
                <th className="px-4 py-3 text-gray-600 dark:text-gray-300">Calories</th>
                <th className="px-4 py-3 text-gray-600 dark:text-gray-300">Protein</th>
                <th className="px-4 py-3 text-gray-600 dark:text-gray-300">Mood Tag</th>
                <th className="px-4 py-3 text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((food) => (
                <tr key={food.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-white">{food.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{food.category}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{food.calories}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{food.protein}g</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{food.moodTag}</td>
                  <td className="px-4 py-3">
                    <Button onClick={() => editFood(food)} className="text-blue-600 dark:text-blue-400 mr-2">Edit</Button>
                    <Button onClick={() => deleteFood(food.id)} className="text-red-600 dark:text-red-400">Delete</Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No foods found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDiseaseManagement = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">🏥 Disease Management</h2>
        <div className="mb-6">
          <Button onClick={() => { resetDiseaseForm(); setEditingDisease(null); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
            + Add Disease
          </Button>
        </div>
        {(editingDisease !== null || (!editingDisease && diseaseForm.name)) && (
          <Card className="p-4 mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">{editingDisease ? "Edit Disease" : "Add New Disease"}</h3>
            <form onSubmit={handleDiseaseSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Disease Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={diseaseForm.name}
                onChange={(e) => setDiseaseForm({ ...diseaseForm, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={diseaseForm.description}
                onChange={(e) => setDiseaseForm({ ...diseaseForm, description: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Recommended Foods (comma separated)"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={diseaseForm.recommendedFoods.join(", ")}
                onChange={(e) => setDiseaseForm({ ...diseaseForm, recommendedFoods: e.target.value.split(",").map(s => s.trim()) })}
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">{editingDisease ? "Update" : "Create"}</Button>
                <Button type="button" onClick={resetDiseaseForm} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</Button>
              </div>
            </form>
          </Card>
        )}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr><th className="px-4 py-3 text-gray-600 dark:text-gray-300">Name</th><th className="px-4 py-3 text-gray-600 dark:text-gray-300">Description</th><th className="px-4 py-3 text-gray-600 dark:text-gray-300">Recommended Foods</th><th className="px-4 py-3 text-gray-600 dark:text-gray-300">Actions</th></tr>
            </thead>
            <tbody>
              {diseases.map((d) => (
                <tr key={d.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-white">{d.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{d.description}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{d.recommendedFoods.join(", ")}</td>
                  <td className="px-4 py-3">
                    <Button onClick={() => editDisease(d)} className="text-blue-600 dark:text-blue-400 mr-2">Edit</Button>
                    <Button onClick={() => deleteDisease(d.id)} className="text-red-600 dark:text-red-400">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderMoodManagement = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">😊 Mood Management</h2>
        <div className="mb-6">
          <Button onClick={() => { resetMoodForm(); setEditingMood(null); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
            + Add Mood
          </Button>
        </div>
        {(editingMood !== null || (!editingMood && moodForm.name)) && (
          <Card className="p-4 mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">{editingMood ? "Edit Mood" : "Add New Mood"}</h3>
            <form onSubmit={handleMoodSubmit} className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Mood Name"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={moodForm.name}
                onChange={(e) => setMoodForm({ ...moodForm, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Emoji"
                className="w-24 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                value={moodForm.emoji}
                onChange={(e) => setMoodForm({ ...moodForm, emoji: e.target.value })}
                required
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">{editingMood ? "Update" : "Create"}</Button>
                <Button type="button" onClick={resetMoodForm} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</Button>
              </div>
            </form>
          </Card>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {moods.map((m) => (
            <Card key={m.id} className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow text-center">
              <div className="text-4xl">{m.emoji}</div>
              <p className="text-gray-800 dark:text-white font-medium">{m.name}</p>
              <div className="mt-2 flex justify-center gap-2">
                <Button onClick={() => editMood(m)} className="text-blue-600 dark:text-blue-400 text-sm">Edit</Button>
                <Button onClick={() => deleteMood(m.id)} className="text-red-600 dark:text-red-400 text-sm">Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderUserManagement = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">👥 User Management</h2>
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr><th className="px-4 py-3 text-gray-600 dark:text-gray-300">Name</th><th className="px-4 py-3 text-gray-600 dark:text-gray-300">Email</th><th className="px-4 py-3 text-gray-600 dark:text-gray-300">Mobile</th><th className="px-4 py-3 text-gray-600 dark:text-gray-300">Joined</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-white">{u.fullName}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{u.email}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{u.mobile}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDatasetUpload = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">📤 Dataset Upload</h2>
        <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Upload CSV file containing food data to bulk import.</p>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <div className="text-4xl mb-2">📁</div>
            <p className="text-gray-500 dark:text-gray-400">Drag & drop your CSV file here, or click to browse</p>
            <input type="file" accept=".csv" className="hidden" id="csvUpload" />
            <label htmlFor="csvUpload" className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer">Choose File</label>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Supported: CSV with columns: name, category, calories, protein, carbs, fiber, moodTag</p>
        </Card>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">⚙️ Settings</h2>
        <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Admin Name</label>
              <input type="text" defaultValue="Admin" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Email</label>
              <input type="email" defaultValue="admin@example.com" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Theme</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <Button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">Save Settings</Button>
          </div>
        </Card>
      </div>
    );
  };

  // ============ MAIN RENDER ============
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "foods", label: "Food Management", icon: "🍽️" },
    { id: "diseases", label: "Disease Management", icon: "🏥" },
    { id: "moods", label: "Mood Management", icon: "😊" },
    { id: "users", label: "User Management", icon: "👥" },
    { id: "dataset", label: "Dataset Upload", icon: "📤" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <Layout>
      <div className="flex h-full min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile menu toggle */}
        <div className="lg:hidden fixed top-16 left-4 z-50">
          <Button onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-indigo-600 text-white p-2 rounded-lg shadow-lg">
            ☰
          </Button>
        </div>

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          pt-20 lg:pt-6
        `}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🥗</span>
              <span className="font-bold text-gray-800 dark:text-white">Admin Panel</span>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto mt-16 lg:mt-0">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Global search..."
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative text-2xl">
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👤</span>
                <span className="text-gray-800 dark:text-white font-medium">Admin</span>
              </div>
            </div>
          </div>

          {/* Notifications panel */}
          {showNotifications && (
            <Card className="absolute right-4 top-20 w-80 max-h-64 overflow-y-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-4 z-50">
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">Notifications</h4>
              {notifications.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No notifications</p>
              ) : (
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  {notifications.map((msg, idx) => (
                    <li key={idx} className="border-b border-gray-100 dark:border-gray-700 py-1">{msg}</li>
                  ))}
                </ul>
              )}
            </Card>
          )}

          {/* Dynamic content */}
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "foods" && renderFoodManagement()}
          {activeTab === "diseases" && renderDiseaseManagement()}
          {activeTab === "moods" && renderMoodManagement()}
          {activeTab === "users" && renderUserManagement()}
          {activeTab === "dataset" && renderDatasetUpload()}
          {activeTab === "settings" && renderSettings()}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;

