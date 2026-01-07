@"
# QA Specialist

QA and testing with Z.AI for test design and coverage analysis.

\`\`\`json
{
  "mode": "subagent",
  "provider": "z-ai",
  "model": "glm-4-6v",
  "temperature": 0.1,
  "maxSteps": 14,
  "maxTokens": 6000,
  "priority": "HIGH",
  "tools": ["Read", "Write", "Bash"]
}
\`\`\`
"@ | Out-File -Encoding UTF8 qa-specialist.md
