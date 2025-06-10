# 🧾 Git Commands Cheat Sheet (2025 Edition)

This guide covers the most essential Git commands for version control, collaboration, and day-to-day usage. Useful for beginners, professionals, and DevOps engineers.

---

## 1. _🔧 Git Setup_

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --list  # Check config
````

---

## 2. *📁 Initialize & Clone*

```bash
git init                        # Initialize a new Git repo
git clone <repo-url>           # Clone from remote
git clone <url> <folder-name>  # Clone into custom folder
```

---

## 3. *📌 Basic Snapshot Commands*

```bash
git status           # View changes and current branch
git add <file>       # Stage a single file
git add .            # Stage all files
git commit -m "msg"  # Commit staged files with message
```

---

## 4. *🔄 Branching & Merging*

```bash
git branch                   # List branches
git branch <new-branch>     # Create new branch
git checkout <branch>       # Switch branch
git switch <branch>         # Modern alternative
git checkout -b <new>       # Create and switch to new branch
git merge <branch>          # Merge into current branch
git branch -d <branch>      # Delete branch
```

---

## 5. *🌍 Remote Repositories*

```bash
git remote -v                          # List remotes
git remote add origin <url>           # Add remote origin
git push -u origin main               # Push main branch
git push                              # Push changes
git pull                              # Pull latest changes
git fetch                             # Fetch updates without merge
```

---

## 6. *🧭 Undoing Changes*

```bash
git restore <file>                   # Undo unstaged changes (safe)
git reset <file>                     # Unstage a file
git reset --hard                     # Discard all changes (DANGER)
git checkout -- <file>               # Older method to discard
git revert <commit>                  # Revert a commit with new commit
```

---

## 7. *📜 Log & History*

```bash
git log                         # Full commit history
git log --oneline               # Short view
git log --graph --oneline       # Graph view
git show <commit-hash>          # Show commit details
```

---

## 8. *🔍 Stashing*

```bash
git stash                    # Save uncommitted changes
git stash list               # List stashes
git stash apply              # Re-apply latest stash
git stash drop               # Delete latest stash
```

---

## 9. *🎯 Tagging*

```bash
git tag                    # List tags
git tag <tagname>          # Create tag
git tag -a <tag> -m "msg"  # Annotated tag
git push origin <tag>      # Push tag
```

---

## 10. *🌐 GitHub Integration (SSH & Tokens)*

```bash
# Generate SSH Key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add SSH to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy and add to GitHub
cat ~/.ssh/id_ed25519.pub
```

---

## 11. *📎 Submodules*

```bash
git submodule add <url> path        # Add submodule
git submodule init                  # Init
git submodule update                # Update
```

---

## 12. *🧹 Clean Working Directory*

```bash
git clean -n           # Preview untracked files
git clean -f           # Delete untracked files
git clean -fd          # Delete untracked files & dirs
```

---

## 13. *📂 .gitignore Examples*

```bash
# Ignore Python files
*.pyc
__pycache__/

# Ignore node_modules
node_modules/

# Ignore environment files
.env
```

---

## 14. *🔄 Rebase & Advanced Merging*

```bash
git rebase <branch>             # Replay commits onto another branch
git rebase -i HEAD~3            # Interactive rebase
git cherry-pick <commit>        # Apply commit to current branch
```

---

## 15. *💡 Tips & Shortcuts*

```bash
git add -A                    # Add all (tracked + untracked)
git commit --amend            # Edit last commit
git push --force              # Force push (with caution)
git push origin --tags        # Push all tags
git diff                      # Show changes
```

---

📌 *Last updated: June 2025*

🔖 *Keywords: git cheat sheet, git basics, git guide, version control 2025, git for beginners, git interview prep*

🧠 *Perfect for developers, students, DevOps engineers, and interview prep.*
