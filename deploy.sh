#!/bin/bash

# --- DEPLOY SCRIPT FOR MENTOR-ONE ---
# Run this script to push to GitHub and deploy to Vercel.
# Make sure to set the following environment variables before running:
# export GITHUB_PAT="your_github_pat"
# export GITHUB_REPO="username/repo"
# export VERCEL_TOKEN="your_vercel_token"

echo "Starting deployment process for MENTOR-ONE..."

if [ -z "$GITHUB_PAT" ] || [ -z "$GITHUB_REPO" ] || [ -z "$VERCEL_TOKEN" ]; then
  echo "Error: Missing required environment variables."
  echo "Please set GITHUB_PAT, GITHUB_REPO, and VERCEL_TOKEN."
  exit 1
fi

echo "1. Initializing Git repository..."
git init
git add .
git commit -m "feat: Mentor-One initial build"
git branch -M main

echo "2. Pushing to GitHub..."
git remote add origin https://${GITHUB_PAT}@github.com/${GITHUB_REPO}.git
git push -u origin main

echo "3. Deploying to Vercel..."
npm i -g vercel

# Initial link and deploy
vercel --token $VERCEL_TOKEN --yes

# Production deploy
vercel --prod --token $VERCEL_TOKEN --yes

echo "Deployment complete!"
