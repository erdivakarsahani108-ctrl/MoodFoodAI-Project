from dataclasses import dataclass
from typing import List

@dataclass
class SyntheticVocabulary:
    cuisines: List[str]
    regions: List[str]
    food_categories: List[str]
    diet_options: List[str]
    weather_tags: List[str]
    seasonal_tags: List[str]
    mood_categories: List[str]
    emotions: List[str]
    allergens: List[str]
    diseases: List[str]
    cooking_methods: List[str]
    restaurant_styles: List[str]
    ingredients: List[str]


VOCABULARY = SyntheticVocabulary(
    cuisines=[
        'South Indian', 'North Indian', 'Mediterranean', 'Latin American', 'East Asian',
        'Middle Eastern', 'American Comfort', 'Healthy Fusion', 'Italian', 'French',
        'Caribbean', 'Thai', 'Japanese', 'Mexican', 'Korean', 'Vietnamese', 'Greek',
        'Spanish', 'Turkish', 'Lebanese', 'Indonesian', 'Moroccan', 'British', 'German',
        'Nordic', 'Australian', 'Brazilian', 'Peruvian', 'African', 'Filipino',
    ],
    regions=[
        'Karnataka', 'Punjab', 'Bengal', 'Gujarat', 'Kerala', 'Rajasthan', 'Tamil Nadu',
        'Maharashtra', 'Uttar Pradesh', 'Himachal Pradesh', 'Andhra Pradesh', 'Goa',
        'Delhi', 'Telangana', 'Odisha', 'West Bengal', 'Assam', 'Sikkim', 'Jammu & Kashmir',
        'Northeast India', 'South India', 'Central India', 'East India', 'North India',
    ],
    food_categories=[
        'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts', 'Beverages', 'Salads', 'Soups',
        'Main Course', 'Appetizers', 'Street Food', 'Healthy Bowls', 'Smoothies',
        'Wraps', 'Sandwiches', 'Seafood', 'Grills', 'Curry', 'Sushi', 'Pasta', 'Rice Dishes',
        'Bread', 'Tea & Coffee', 'Juices', 'Fermented', 'Plant-based', 'Dessertbites',
    ],
    diet_options=[
        'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Low Sodium', 'Low Sugar',
        'High Protein', 'Low Carb', 'Dairy-Free', 'Nut-Free', 'Halal', 'Kosher',
        'Pescatarian', 'Heart-Healthy', 'Diabetes-Friendly',
    ],
    weather_tags=[
        'Sunny', 'Rainy', 'Cloudy', 'Windy', 'Snowy', 'Humid', 'Dry', 'Stormy', 'Foggy',
        'Cool', 'Warm', 'Cold', 'Misty', 'Thunderstorm', 'Breezy', 'Monsoon', 'Heatwave',
        'Seasonal', 'Holiday', 'Festive',
    ],
    seasonal_tags=[
        'Winter', 'Spring', 'Summer', 'Autumn', 'Monsoon', 'Festive', 'Harvest',
        'New Year', 'Valentine', 'Diwali', 'Navratri', 'Eid', 'Christmas', 'Thanksgiving',
        'Back to School', 'Ramadan', 'Summer Vacation', 'Cold Weather', 'Warm Weather',
        'Berry Season', 'Citrus Season',
    ],
    mood_categories=[
        'Comfort', 'Energized', 'Relaxed', 'Romantic', 'Adventurous', 'Focused',
        'Social', 'Calm', 'Festive', 'Nostalgic', 'Cheerful', 'Comforting', 'Sunny',
        'Cozy', 'Motivated', 'Happy', 'Peaceful', 'Spicy', 'Sweet', 'Savory',
    ],
    emotions=[
        'joyful', 'melancholic', 'excited', 'calm', 'anxious', 'hopeful', 'bored', 'nostalgic',
        'content', 'adventurous', 'relaxed', 'stressed', 'playful', 'confident', 'serene',
        'optimistic', 'grateful', 'lonely', 'inspired', 'tired', 'romantic', 'curious',
        'focused', 'relieved', 'energetic', 'pensive', 'satisfied', 'mellow', 'determined',
    ],
    allergens=[
        'gluten', 'milk', 'egg', 'peanuts', 'tree nuts', 'soy', 'shellfish', 'fish',
        'sesame', 'mustard', 'sulphites', 'lupin', 'celery', 'corn', 'nightshades',
        'garlic', 'onion', 'yeast', 'wheat', 'sesame oil', 'cashew', 'almond', 'hazelnut',
    ],
    diseases=[
        'Diabetes', 'Hypertension', 'Heart Disease', 'PCOS', 'Obesity', 'Anemia',
        'Thyroid', 'Asthma', 'Arthritis', 'Celiac Disease', 'Lactose Intolerance',
        'Cholesterol', 'Kidney Disease', 'Liver Health', 'Digestive Disorder',
    ],
    cooking_methods=[
        'Grilled', 'Baked', 'Steamed', 'Roasted', 'Fried', 'Sautéed', 'Poached',
        'Smoked', 'Marinated', 'Stir-fried', 'Slow-cooked', 'Pressure-cooked',
    ],
    restaurant_styles=[
        'Fine Dining', 'Casual Dining', 'Quick Service', 'Cafe', 'Food Truck', 'Buffet',
        'Family Style', 'Fine Casual', 'Rooftop', 'Boutique', 'Organic Cafe',
        'Healthy Eatery', 'Dessert Bar', 'Juice Bar', 'Street Food Stall',
    ],
    ingredients=[
        'rice', 'lentils', 'chicken', 'tofu', 'spinach', 'tomato', 'onion', 'garlic',
        'ginger', 'potato', 'cheese', 'yogurt', 'coconut milk', 'cilantro', 'paneer',
        'black pepper', 'cumin', 'turmeric', 'chili flakes', 'lemon', 'olive oil',
        'mushroom', 'bell pepper', 'cabbage', 'carrot', 'zucchini', 'quinoa',
        'avocado', 'kale', 'almonds', 'walnuts', 'oats', 'banana', 'berries',
        'chickpeas', 'kidney beans', 'salmon', 'shrimp', 'pasta', 'bread', 'milk',
        'egg', 'beef', 'pork', 'sesame seeds', 'soy sauce', 'honey', 'brown sugar',
        'basil', 'oregano', 'cinnamon', 'nutmeg', 'vanilla', 'coriander', 'mustard seed',
        'vinegar', 'cream', 'cinnamon', 'paprika', 'mint', 'turmeric powder', 'cayenne',
        'lemongrass', 'dill', 'rosemary', 'thyme', 'mayonnaise', 'mustard', 'ketchup',
        'sour cream', 'black beans', 'pineapple', 'coconut', 'mango', 'peas', 'sweet potato',
        'broccoli', 'cauliflower', 'brussels sprouts', 'zucchini', 'squash', 'pumpkin',
        'watermelon', 'apple', 'pear', 'grapes', 'peach', 'kiwi', 'chocolate', 'oats',
        'chia seeds', 'flaxseed', 'almond milk', 'cottage cheese', 'turkey', 'duck',
        'lamb', 'seaweed', 'edamame', 'cream cheese', 'feta', 'parmesan', 'mozzarella',
        'ginger paste', 'garam masala', 'tahini', 'pesto', 'barbecue sauce', 'fish sauce',
    ],
)
