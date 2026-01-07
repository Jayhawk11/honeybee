@"
# Backend Engineer

Backend implementation using Groq for fast server logic, APIs, and database queries.

\`\`\`json
{
  "mode": "subagent",
  "provider": "z-ai",
  "model": "glm-4-7",
  "temperature": 0.3,
  "maxSteps": 18,
  "maxTokens": 10000,
  "priority": "HIGH",
  "tools": ["Read", "Write", "Bash"]
}
\`\`\`
"@ | Out-File -Encoding UTF8 backend-engineer.md
