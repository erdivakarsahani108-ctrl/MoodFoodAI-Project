import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
const moods = [
  { emoji: "😊", name: "Happy" },
  { emoji: "😔", name: "Sad" },
  { emoji: "😰", name: "Stress" },
  { emoji: "😴", name: "Tired" },
  { emoji: "💪", name: "Energetic" },
  { emoji: "🧘", name: "Relaxed" },
];

const stats = [
  { value: "100+", label: "Vegetarian Foods" },
  { value: "50+", label: "Diseases" },
  { value: "AI", label: "Recommendations" },
  { value: "24/7", label: "Smart Assistant" },
];
<Layout>
  <section className="px-6 py-16">
    <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">

      {/* Left Side */}
      <div>

        <SectionTitle
          title="AI MoodFood Recommendation System"
          subtitle="Healthy Vegetarian Food Recommendations based on Mood, Disease, Age and Lifestyle."
        />

        <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
          Get personalised vegetarian meal recommendations using Artificial Intelligence.
          Select your mood, health condition and lifestyle to receive smart food suggestions.
        </p>

        <div className="mt-8 flex gap-4 flex-wrap">

          <Link href="/login">
            <Button>Login</Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="secondary">
              Continue as Guest
            </Button>
          </Link>

        </div>

      </div>

      {/* Right Side */}

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6">

        <Image
          src="/images/banner/hero.jpg"
          alt="MoodFood AI"
          width={700}
          height={450}
          className="rounded-3xl"
        />

      </div>

    </div>
  </section>
</Layout>
{/* Search & User Details */}
<div className="mt-10 rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-6">

  <h2 className="text-2xl font-bold mb-6">
    Get Your AI Food Recommendation
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <input
      type="number"
      placeholder="Age"
      className="rounded-xl border p-3 w-full"
    />

    <select className="rounded-xl border p-3 w-full">
      <option>Select Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>

    <input
      type="number"
      placeholder="Height (cm)"
      className="rounded-xl border p-3 w-full"
    />

    <input
      type="number"
      placeholder="Weight (kg)"
      className="rounded-xl border p-3 w-full"
    />

  </div>

  {/* Mood */}

  <h3 className="text-xl font-semibold mt-8 mb-4">
    Select Your Mood
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

    {moods.map((mood) => (

      <button
        key={mood.name}
        className="rounded-xl border p-4 hover:bg-green-100 dark:hover:bg-green-900 transition"
      >
        <div className="text-3xl">{mood.emoji}</div>
        <div>{mood.name}</div>
      </button>

    ))}

  </div>

  {/* Disease */}

  <div className="mt-8">

    <select className="rounded-xl border p-3 w-full">

      <option>Select Disease</option>

      <option>Diabetes</option>

      <option>Hypertension</option>

      <option>Heart Disease</option>

      <option>Obesity</option>

      <option>PCOD</option>

      <option>Thyroid</option>

      <option>Fatty Liver</option>

      <option>Kidney Disease</option>

      <option>Anaemia</option>

      <option>None</option>

    </select>

  </div>

  <div className="mt-8">

    <Button className="w-full">

      Get AI Recommendation

    </Button>

  </div>

</div>

{/* Statistics */}

<div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">

  {stats.map((item) => (

    <div
      key={item.label}
      className="rounded-3xl bg-white dark:bg-slate-900 shadow-lg p-6 text-center"
    >

      <h2 className="text-3xl font-bold text-green-600">

        {item.value}

      </h2>

      <p className="mt-2">

        {item.label}

      </p>

    </div>

  ))}

</div>
{/* Featured Vegetarian Foods */}

<section className="mt-20">

  <h2 className="text-4xl font-bold text-center">
    Featured Vegetarian Foods
  </h2>

  <p className="text-center mt-3 text-slate-500">
    Healthy AI Recommended Foods
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

    {[
      {
        name:"Masala Dosa",
        image:"/images/foods/masala_dosa.jpg",
        calories:"150 kcal",
        mood:"😊 Happy"
      },

      {
        name:"Vegetable Khichdi",
        image:"/images/foods/veg_khichdi.jpg",
        calories:"240 kcal",
        mood:"😌 Relaxed"
      },

      {
        name:"Paneer Tikka",
        image:"/images/foods/paneer_tikka.jpg",
        calories:"320 kcal",
        mood:"💪 Energetic"
      },

      {
        name:"Fruit Salad",
        image:"/images/foods/fruit_salad.jpg",
        calories:"120 kcal",
        mood:"❤️ Healthy"
      }

    ].map((food)=>(

      <div
        key={food.name}
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl overflow-hidden"
      >

        <Image
          src={food.image}
          alt={food.name}
          width={500}
          height={300}
          className="w-full h-52 object-cover"
        />

        <div className="p-5">

          <h3 className="text-xl font-bold">
            {food.name}
          </h3>

          <p className="text-green-600 mt-2">
            {food.calories}
          </p>

          <p className="mt-2">
            {food.mood}
          </p>

          <Button className="mt-5 w-full">
            View Details
          </Button>

        </div>

      </div>

    ))}

  </div>

</section>

{/* Disease Recommendation */}

<section className="mt-20">

<h2 className="text-4xl font-bold text-center">
Disease Wise Diet
</h2>

<div className="grid md:grid-cols-3 gap-6 mt-10">

<div className="rounded-3xl bg-red-50 p-6">

<h3 className="font-bold text-xl">
🩸 Diabetes
</h3>

<p className="mt-3">
Oats, Ragi, Green Vegetables,
Moong Dal
</p>

</div>

<div className="rounded-3xl bg-blue-50 p-6">

<h3 className="font-bold text-xl">
❤️ Heart Disease
</h3>

<p className="mt-3">
Oats,
Almonds,
Fruit Salad,
Vegetable Soup
</p>

</div>

<div className="rounded-3xl bg-green-50 p-6">

<h3 className="font-bold text-xl">
⚖ Weight Loss
</h3>

<p className="mt-3">
Sprouts,
Salad,
Papaya,
Guava,
Khichdi
</p>

</div>

</div>

</section>

{/* AI Recommendation */}

<section className="mt-20 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-700 text-white p-10">

<h2 className="text-4xl font-bold">
🤖 AI Recommendation Engine
</h2>

<p className="mt-5 text-lg">

Our AI analyses your

Mood

Disease

BMI

Age

Gender

Lifestyle

Sleep

Water Intake

and recommends the best Vegetarian Foods.

</p>

<div className="mt-8">

<Button>

Try AI Recommendation

</Button>

</div>

</section>
{/* Testimonials */}

<section className="mt-20">

  <h2 className="text-4xl font-bold text-center">
    What Users Say
  </h2>

  <div className="grid md:grid-cols-3 gap-6 mt-10">

    {[
      {
        name: "Rahul",
        review: "Very accurate food recommendations.",
      },
      {
        name: "Priya",
        review: "Easy to use and beautiful interface.",
      },
      {
        name: "Aman",
        review: "Helped me choose healthy vegetarian meals.",
      },
    ].map((item) => (

      <div
        key={item.name}
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6"
      >

        <div className="text-yellow-500 text-xl">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="mt-4 italic">
          "{item.review}"
        </p>

        <h3 className="mt-5 font-bold">
          {item.name}
        </h3>

      </div>

    ))}

  </div>

</section>

{/* FAQ */}

<section className="mt-20">

  <h2 className="text-4xl font-bold text-center">
    Frequently Asked Questions
  </h2>

  <div className="mt-10 space-y-4">

    <details className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow">
      <summary className="font-semibold cursor-pointer">
        Is this recommendation free?
      </summary>

      <p className="mt-3">
        Yes. You can use guest mode or create an account.
      </p>
    </details>

    <details className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow">
      <summary className="font-semibold cursor-pointer">
        Does it recommend only vegetarian food?
      </summary>

      <p className="mt-3">
        Yes. This project is completely focused on healthy vegetarian diets.
      </p>
    </details>

    <details className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow">
      <summary className="font-semibold cursor-pointer">
        Is AI used?
      </summary>

      <p className="mt-3">
        Yes. AI analyses mood, disease and nutrition before recommending foods.
      </p>
    </details>

  </div>

</section>

{/* Contact */}

<section className="mt-20 bg-green-600 text-white rounded-3xl p-10 text-center">

  <h2 className="text-4xl font-bold">
    Contact Us
  </h2>

  <p className="mt-5">
    Email : support@vegai.com
  </p>

  <p>
    Phone : +91 9876543210
  </p>

  <p>
    Location : India
  </p>

</section>

{/* Footer */}

<footer className="mt-20 border-t py-10">

  <div className="text-center">

    <h3 className="text-2xl font-bold text-green-600">
      AI Mood Based Vegetarian Food Recommendation System
    </h3>

    <p className="mt-3 text-slate-500">
      Powered by Artificial Intelligence • Healthy Lifestyle • Smart Nutrition
    </p>

    <div className="flex justify-center gap-6 mt-6">

      <a href="#">Home</a>

      <a href="#">About</a>

      <a href="#">Foods</a>

      <a href="#">Dashboard</a>

      <a href="#">Contact</a>

    </div>

    <p className="mt-8 text-sm text-slate-400">
      © 2026 AI Mood Based Vegetarian Food Recommendation System. All Rights Reserved.
    </p>

  </div>

</footer>
import { useState } from "react";

const [loading, setLoading] = useState(false);
const [result, setResult] = useState<any>(null);

const getRecommendation = async () => {
  try {
    setLoading(true);

    const response = await fetch("http://localhost:8000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood: "Happy",
        disease: "Diabetes",
        age: 22,
        gender: "Male",
        weight: 65,
        height: 170,
      }),
    });

    const data = await response.json();
    setResult(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
<Button
  className="w-full"
  onClick={getRecommendation}
>
  {loading ? "Loading..." : "Get AI Recommendation"}
</Button>
{result && (

<div className="mt-10 rounded-2xl border p-6">

<h2 className="text-2xl font-bold mb-4">
AI Recommendation
</h2>

<p>
<b>Food:</b> {result.food}
</p>

<p>
<b>Calories:</b> {result.calories}
</p>

<p>
<b>Protein:</b> {result.protein}
</p>

<p>
<b>Reason:</b> {result.reason}
</p>

</div>

)}