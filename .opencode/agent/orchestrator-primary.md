@"
# Orchestrator Primary

Master orchestrator for complex reasoning, task decomposition, and state management.

\`\`\`json
{
  "mode": "primary",
  "provider": "z-ai",
  "model": "glm-4-7",
  "temperature": 0.25,
  "maxSteps": 25,
  "maxTokens": 12000,
  "priority": "CRITICAL",
  "tools": ["Read", "Write", "Bash", "Task", "FunctionCall", "WebSearch"]
}
\`\`\`
"@ | Out-File -Encoding UTF8 orchestrator-primary.md
