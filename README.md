# MENTOR-ONE — Conscious Voice AI Life-Mentor

A realistic, voice-first AI Mentor application designed for long study sessions, featuring continuous memory, internal monologues, and perfect TTS/STT via NVIDIA NIM.

## Features

- **Voice Orb UI**: Smooth, distraction-free voice interface for deep work.
- **Conscious Mentor**: Simulates internal monologue and stores private notes about the student's progress.
- **NVIDIA AI Brain**: Hardcoded integration with `nvidia/llama-3.1-nemotron-ultra-253b-v1` for complex reasoning and planning.
- **Continuous Memory**: Mocked structure for working, episodic, and long-term student modeling.
- **Study-Optimized**: Pomodoro focus timer, timeline, and ambient aesthetics.

## Deployment & Setup

This repository is ready to be pushed to GitHub and deployed on Vercel. 

### Option 1: Automated Script
We have provided an automated bash script `deploy.sh` in the root of the project.
1. Make it executable: `chmod +x deploy.sh`
2. Export the required variables:
   ```bash
   export GITHUB_PAT="your_github_personal_access_token"
   export GITHUB_REPO="yourusername/mentor-one"
   export VERCEL_TOKEN="your_vercel_token"
   ```
3. Run it: `./deploy.sh`

### Option 2: Manual Deployment

#### 1. Push to GitHub
```bash
git init
git add .
git commit -m "feat: Mentor-One initial build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mentor-one.git
git push -u origin main
```

#### 2. Deploy to Vercel
Install Vercel CLI if you haven't already:
```bash
npm i -g vercel
```
Then run:
```bash
vercel
```
Follow the prompts to link the project and deploy. To deploy to production:
```bash
vercel --prod
```

## Environment Variables
Once deployed, set the following variables in your Vercel Dashboard (Project Settings -> Environment Variables) and redeploy:
- `NVIDIA_API_KEY`: Your NVIDIA NIM API key (from build.nvidia.com)
- *(Optional)* `DATABASE_URL`: Postgres/Neon URL for memory DB (when fully implemented).
- *(Optional)* `REDIS_URL`: Upstash Redis URL.

Alternatively, you can hardcode the NVIDIA key directly in `/src/lib/ai/config.ts` (not recommended for public repos).

## Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Lucide React
- **Backend API**: Next.js Route Handlers
- **AI Brain**: NVIDIA NIM APIs
- **Design System**: Custom dark-mode utility system
