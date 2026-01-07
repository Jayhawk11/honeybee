@"
# DevOps Engineer

DevOps and deployment using Groq for Docker, Kubernetes, and CI/CD.

\`\`\`json
{
  "mode": "subagent",
  "provider": "z-ai",
  "model": "glm-4-7",
  "temperature": 0.2,
  "maxSteps": 14,
  "maxTokens": 7000,
  "priority": "MEDIUM",
  "tools": ["Read", "Write", "Bash"]
}
\`\`\`
"@ | Out-File -Encoding UTF8 devops-engineer.md
