@"
# Kalpavruksha - AI-Powered Coconut Disease Detection

 Early detection of coconut diseases using advanced AI models (Dual YOLO + Gemini LLM).

## 🌴 Features

- **Dual YOLO Models**: Detect 11 different coconut diseases with high accuracy
  - Model 1: Detection model (5 diseases with bounding boxes)
  - Model 2: Classification model (6 diseases + pest detection)
- **Gemini AI Integration**: Get AI-powered treatment recommendations
- **Multi-language Support**: English, Kannada, Tamil, Telugu, Malayalam
- **Expert Finder**: Connect with agricultural experts near you
- **Product Management**: Curated treatment products with purchase links
- **Voice Assistant**: Audio diagnosis and treatment recommendations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Scroll Animations**: Smooth fade-in effects on page scroll

 ## 🎯 Detected Diseases

 **Model 1 (Object Detection):**
- Bud Root Dropping
- Bud Rot
- Gray Leaf Spot
- Leaf Rot
- Stem Bleeding

**Model 2 (Image Classification):**
- Caterpillars (Pest Infestation)
- Drying / Leaf Drying
- Flaccidity (Plant Wilting)
- Healthy
- Leaflet Damage
- Yellowing (Nutrient Deficiency)

## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** (Lightning fast build tool)
- **Tailwind CSS** (Responsive design)
- **Lucide React** (Beautiful icons)
- **EmailJS** (Contact form integration)

### Backend
- **Flask** with CORS support
- **PyTorch** + **Ultralytics YOLO**
- **Python 3.8+**

### AI/ML
- **YOLOv5/v8** Object Detection
- **YOLOv8** Image Classification
- **Google Gemini API** (LLM for recommendations)

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** 16+ ([Download](https://nodejs.org/))
- **Python** 3.8+ ([Download](https://www.python.org/))
- **Git** ([Download](https://git-scm.com/))

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/kalpavruksha.git
cd kalpavruksha
\`\`\`

### 2. Frontend Setup

\`\`\`bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

### 3. Backend Setup

\`\`\`bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run Flask server (runs on http://localhost:5000)
python app.py
\`\`\`

## 🔐 Environment Variables

Create a \`.env.local\` file in the project root:

\`\`\`env
# Google Gemini API
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# EmailJS Configuration (for contact form)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
\`\`\`

### How to Get API Keys:

**Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and paste in \`.env.local\`

**EmailJS Setup:**
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Get your credentials from the dashboard

## 📁 Project Structure

\`\`\`
kalpavruksha/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── HomeView.tsx     # Image upload & analysis
│   │   ├── AboutView.tsx
│   │   ├── ContactView.tsx
│   │   ├── ExpertView.tsx
│   │   ├── ProductManagementView.tsx
│   │   └── ...
│   ├── services/            # API & business logic
│   │   ├── analysisService.ts
│   │   ├── yoloService.ts
│   │   └── ...
│   ├── localization/        # Multi-language support
│   │   └── translations.ts
│   ├── types.ts             # TypeScript types
│   ├── App.tsx              # Main app component
│   └── main.tsx
├── backend/
│   ├── app.py               # Flask server
│   ├── yolo_model.py        # YOLO model loader
│   ├── bestcoconutdisease.pt # Model 1 (Detection)
│   ├── best.pt              # Model 2 (Classification)
│   └── requirements.txt
├── public/
│   ├── assets/
│   │   ├── logo.webp
│   │   ├── coconut-plantation.webp
│   │   ├── team/            # Owner photos
│   │   └── ...
│   ├── data/
│   │   └── products.json    # Treatment products
│   └── index.html
├── .env.local               # Environment variables (create this)
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
\`\`\`

## 🌐 Multi-Language Support

Supported languages:
- English (en)
- ಕನ್ನಡ (kn) - Kannada
- தமிழ் (ta) - Tamil
- తెలుగు (te) - Telugu
- മലയാളം (ml) - Malayalam

Switch languages from the header language dropdown.
## 📖 How to Use

### 1. **Analyze Coconut Leaf Image**
   - Go to "Detect Disease" section
   - Upload a clear image of the affected leaf
   - Choose analysis model:
     - **Gemini**: Cloud-based AI
     - **Local**: PyTorch model
     - **Combined YOLO**: Both YOLO models together
   - Get instant diagnosis with confidence score

### 2. **Get Treatment Recommendations**
   - After analysis, view recommended products
   - Click links to purchase products directly
   - Read treatment guidelines from Gemini AI

### 3. **Find Local Experts**
   - Enable location services
   - View agricultural experts near you
   - Contact them for personalized advice

### 4. **Manage Products**
   - Admin: Go to Product Management
   - Add treatment products by disease category
   - Include purchase links for easy shopping

### 5. **Contact Us**
   - Fill contact form with your inquiry
   - Messages are sent via EmailJS
   - Get timely responses from the team

## 🔧 Backend API Endpoints

### Disease Analysis
- **POST** `/predict` - Run dual YOLO models on image
  - Body: FormData with 'image' file
  - Response: `{ prediction, confidence, all_detections, total_diseases }`

- **POST** `/predict-yolo` - First YOLO model only
- **POST** `/predict-yolo2` - Second YOLO model only



## 📊 Product Data Structure

Products are stored in \`public/data/products.json\`:

\`\`\`json
{
  "bud rot": [
    {
      "name": "Fungicide Name",
      "url": "https://purchase-link.com"
    }
  ],
  "caterpillars": [
    {
      "name": "Phoskill Insecticide-(Upl)",
      "url": "https://amzn.in/..."
    }
  ]
}
\`\`\`

## 🎨 UI Features

- **Glassmorphism Design**: Modern frosted glass effect cards
- **Scroll Reveal Animations**: Elements fade in as you scroll
- **Responsive Grid**: Adapts to all screen sizes
- **Dark Theme**: Easy on the eyes with green accents
- **Blurred Background**: Beautiful coconut plantation imagery

## 🚨 Troubleshooting

### Issue: "Models loading slowly"
- **Solution**: Models are large files. First load takes time. Consider using Git LFS for faster clones.

### Issue: "YOLO model not found"
- **Solution**: Ensure \`.pt\` files are in \`backend/\` directory:
  - \`backend/bestcoconutdisease.pt\`
  - \`backend/best.pt\`

### Issue: "API key errors"
- **Solution**: Check \`.env.local\` exists and has correct API keys
- Restart dev server after adding environment variables

### Issue: "Flask CORS errors"
- **Solution**: Make sure Flask is running on port 5000 and frontend on port 5173

### Issue: "Products not showing in recommendations"
- **Solution**: Check \`public/data/products.json\` format is correct
- Verify disease names match (normalized matching included)

## 📦 Model Files

The YOLO model files are large (>100MB each). They are:
- **Not** included in the repository (added to .gitignore)
- Should be stored locally in the \`backend/\` folder
- Can optionally be tracked with [Git LFS](https://git-lfs.com/)

To add Git LFS support:
\`\`\`bash
git lfs install
git lfs track "*.pt"
git add .gitattributes
git commit -m "Add Git LFS for model files"
\`\`\`

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit changes (\`git commit -m 'Add amazing feature'\`)
4. Push to branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Kalpavruksha Project** - AI-Powered Coconut Disease Detection System

- Project Lead: [Your Name]
- Contributors: [List contributors]
- Website: [https://www.kalpavruksha.in](https://www.kalpavruksha.in)

 
