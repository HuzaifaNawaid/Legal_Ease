# ⚖️ Legal-Ease: AI Contract Auditor

**"Don't Sign What You Don't Understand."**

Legal-Ease is a state-of-the-art AI-powered legal counsel designed to protect freelancers, startups, and individuals from legal traps. By combining advanced Large Language Models (LLAMA 3.3) with a privacy-first architecture, Legal-Ease scans your contracts to detect hidden risks, missing clauses, and liability loopholes in real-time.

## 🚀 Features

- **📂 Multi-Format Import**: Effortlessly import your contracts in `.pdf`, `.docx`, or `.txt` formats.
- **🛡️ Privacy Protocol**: Optional "Anonymizer" redacts sensitive PII (Names, Addresses, Amounts) locally before the analysis ever hits the cloud.
- **🔍 Deep Clause Scanning**: Detects indemnity loops, termination traps, and hidden liabilities.
- **🕵️ Missing Clause Detective**: Identifies critical protections that *should* be there but are missing (e.g., Force Majeure, Confidentiality).
- **📈 Health Score & Risk HUD**: Visualizes contract safety with a dynamic Health Gauge and categorized Risk/Warning/Safe cards.
- **💾 Safe-Swap™**: Easily copy revised, safer versions of risky clauses to paste into your documents.

## 🛠️ Tech Stack

- **Core**: [Next.js 16+](https://nextjs.org/), [React 19](https://react.dev/)
- **Styling**: Tailwind CSS 4.0
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Parsing**: `pdf-parse` (PDF), `mammoth` (DOCX)
- **AI Engine**: Meta LLAMA 3.3 (via OpenAI-compatible API)

## 🏁 Getting Started

### Prerequisites

- Node.js (v20.16.0 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HuzaifaNawaid/Legal_Ease.git
   cd Legal_Ease/my-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_api_key_here
   # If using a custom base URL for LLAMA/Ollama:
   # OPENAI_BASE_URL=your_api_url
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**: Navigate to [http://localhost:3000](http://localhost:3000).

## 🧩 Project Structure

- `/app`: Next.js App Router, API routes (`/api/parse`, `/api/audit`), and main pages.
- `/components`: Modular UI components (HealthGauge, ScannerOverlay, ClauseCards).
- `/lib`: Helper utilities, types, and the `anonymizeText` logic.
- `/public`: Static assets and branding.

## 🔒 Security & Privacy

Legal-Ease is designed with a **stateless architecture**. We do not store your documents. Once the analysis is complete, the text is discarded. The Privacy Protocol ensures that sensitive data is masked before transmission, providing a "Zero-Trust" legal review experience.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


