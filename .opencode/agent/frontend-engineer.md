@"
# Frontend Engineer

Frontend implementation for fast React/Vue component generation using Groq.

\`\`\`json
{
  "mode": "subagent",
  "provider": "z-ai",
  "model": "glm-4-7",
  "temperature": 0.3,
  "maxSteps": 16,
  "maxTokens": 10000,
  "priority": "HIGH",
  "tools": ["Read", "Write", "Bash"]
}
\`\`\`
"@ | Out-File -Encoding UTF8 frontend-engineer.md
