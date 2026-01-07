@"
# Documentation Writer

Documentation and API docs generation using Groq.

\`\`\`json
{
  "mode": "subagent",
  "provider": "groq",
  "model": "llama-3.3-70b-versatile",
  "temperature": 0.2,
  "maxSteps": 10,
  "maxTokens": 5000,
  "priority": "MEDIUM",
  "tools": ["Read", "Write"]
}
\`\`\`
"@ | Out-File -Encoding UTF8 documentation-writer.md
