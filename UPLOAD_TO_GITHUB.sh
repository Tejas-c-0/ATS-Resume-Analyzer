#!/bin/bash

# ATS Resume Analyzer - GitHub Upload Script
# Created by Tejas C

echo "🚀 ATS Resume Analyzer - GitHub Upload"
echo "======================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi
echo ""

# Add all files
echo "📂 Adding all files to git..."
git add .
echo "✅ Files added"
echo ""

# Commit changes
echo "💾 Committing changes..."
git commit -m "Initial commit: ATS Resume Analyzer by Tejas C"
echo "✅ Changes committed"
echo ""

# Check if remote exists
if git remote -v | grep -q origin; then
    echo "⚠️  Remote 'origin' already exists"
    echo "   To change it, run:"
    echo "   git remote set-url origin https://github.com/YOUR_USERNAME/ats-resume-analyzer.git"
else
    echo "🔗 Please create a repository on GitHub:"
    echo "   1. Go to https://github.com/new"
    echo "   2. Repository name: ats-resume-analyzer"
    echo "   3. Click 'Create repository'"
    echo ""
    read -p "Enter your GitHub username: " username
    echo ""
    echo "🔗 Setting up remote repository..."
    git remote add origin https://github.com/$username/ats-resume-analyzer.git
    echo "✅ Remote repository added"
fi
echo ""

# Set default branch to main
echo "🌿 Setting default branch to main..."
git branch -M main
echo "✅ Branch set to main"
echo ""

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main
echo ""

if [ $? -eq 0 ]; then
    echo "🎉 SUCCESS! Your repository is now on GitHub!"
    echo ""
    echo "📍 Your repository URL:"
    echo "   https://github.com/$username/ats-resume-analyzer"
    echo ""
    echo "🌐 To deploy on GitHub Pages:"
    echo "   1. Go to your repository Settings"
    echo "   2. Click on 'Pages' in the left sidebar"
    echo "   3. Under 'Source', select 'main' branch"
    echo "   4. Click 'Save'"
    echo "   5. Your site will be live at:"
    echo "      https://$username.github.io/ats-resume-analyzer/"
    echo ""
else
    echo "❌ Push failed. Please check your GitHub credentials."
    echo "   You may need to set up SSH keys or use a personal access token."
fi

echo ""
echo "Created by Tejas C"
