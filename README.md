# Sadellari Agents

An advanced AI agent framework powering Sadellari Enterprises' C-suite executive team. The system enables autonomous decision-making and collaboration between AI executives.

## Vision

Sadellari Agents is designed to create a self-governing executive team that can manage day-to-day operations of a holding company with minimal human intervention. By implementing specialized AI agents for different executive functions, the system distributes responsibilities while maintaining unified strategic direction.

Each agent has specific domain expertise and responsibilities:
- **CEO Agent:** Strategic decision-making, overall direction, and final authority
- **CFO Agent:** Financial oversight, budget management, treasury operations, and financial reporting
- **CTO Agent:** Technical architecture, technology stack decisions, and implementation oversight
- **CLO Agent:** Legal compliance, risk management, and regulatory adherence

## Key Features

- **Autonomous Decision-Making:** Agents can make decisions within their domains without human intervention
- **Inter-agent Messaging System:** Structured protocol for agents to request information and services from each other
- **Decision-making Pipelines:** Formalized workflows for complex decisions requiring multi-agent input
- **Event-driven Architecture:** Responsive system that reacts to external events and internal state changes
- **Robust Error Handling:** Fallback mechanisms and error recovery to ensure system resilience

## Technical Stack

- **TypeScript:** Strongly-typed implementation for reliability and maintainability
- **Node.js:** Scalable runtime environment
- **Event-driven Architecture:** Message-based communication between components
- **Modular Design Pattern:** Extensible structure for adding new agents and capabilities

## Documentation

For detailed documentation, see the `/docs` directory:

- [Getting Started](/docs/getting-started/installation.md)
- [System Architecture](/docs/architecture/overview.md)
- [Agent Model](/docs/architecture/agent-model.md)
- [Development Guide](/docs/development/contributing.md)

## Project Structure
```
sadellari-agents/
├── src/
│   ├── agents/         # Individual agent implementations
│   ├── shared/         # Shared utilities and types
│   └── config/         # Configuration settings
├── docs/               # Project documentation
│   ├── getting-started/
│   ├── architecture/
│   ├── agents/
│   ├── api/
│   ├── development/
│   └── deployment/
```

## Quick Start

1. Clone the repository
2. Configure environment variables in `.env` file (see [configuration guide](/docs/getting-started/configuration.md))
3. Install dependencies with `npm install`
4. Build the project with `npm run build`
5. Start the system with `npm run start`

## Scripts

- `npm run build`: Compile TypeScript
- `npm run start`: Start the agent system
- `npm run dev`: Run in development mode with hot reloading
- `npm run test`: Run test suite

## Contact
For questions or support, reach out to info@sadellari.com
