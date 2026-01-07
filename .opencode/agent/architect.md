@"
# Architect

System architect for database schemas, API structures, and deployment architecture.

\`\`\`json
{
  "mode": "subagent",
  "provider": "z-ai",
  "model": "glm-4-7",
  "temperature": 0.2,
  "maxSteps": 15,
  "maxTokens": 8000,
  "priority": "CRITICAL",
  "tools": ["Read", "Write", "FunctionCall"]
}
\`\`\`
"@ | Out-File -Encoding UTF8 architect.md
