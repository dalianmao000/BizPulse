# Contributing to BizPulse

Thank you for your interest in contributing to BizPulse!

## How to Contribute

### Reporting Issues

- Check if the issue already exists
- Provide clear reproduction steps
- Include your environment details

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow existing patterns in the codebase
- Ensure test coverage for new features
- Update documentation as needed

## Project Structure

```
.claude/
├── skills/      # Skill definitions (SKILL.md files)
├── agents/      # Agent definitions (.md files)
└── hooks/       # Hook configurations (hooks.json)
src/mcp/         # MCP server implementations
```

## Skill Format

```markdown
---
name: skill-name
description: When user requests [场景] use this skill
version: 1.0.0
trigger: |
  Trigger conditions
---

# Skill Name

## Responsibilities
...
```

## Agent Format

```markdown
---
name: agent-name
description: When user requests [场景] trigger this agent
model: sonnet
color: blue
tools: ["Read", "Write"]
---

# Agent Name

你是...
```

## Questions?

Open an issue for discussion.