# Clootrack Support Ticket Assignment System

> **Note:** I haven't coded backends in Django before - this is my first time! I've only coded backends in Node.js and Next.js as mentioned in my resume till now, so I had to do a lot of ChatGPT to get this backend right.

## Tech Stack

### Backend
- **Framework:** Django 6.0.2
- **Database:** PostgreSQL 17
- **REST API:** Django REST Framework
- **ORM:** Django ORM with Psycopg2 (PostgreSQL driver)

### Frontend
- **Framework:** React with Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Routing:** React Router DOM

### AI/ML Integration
- **AI Provider:** Groq API (for ticket classification)
- **Purpose:** Automatic ticket categorisation and priority assignment

### Containerization
- **Containerization:** Docker & Docker Compose

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Groq API Key (free tier available at https://console.groq.com)

## Environment Variables

```env
# Database
POSTGRES_DB=tickets
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432

# AI/ML
GROQ_API_KEY=your_api_key_here

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:80,http://tickets_frontend

# Frontend
VITE_APP_BACKEND_URL=http://localhost:8000
```

## Build and Run

```bash
docker-compose up --build
```

## Design Decisions

### Why Groq?
- **Generous Free Tier:** 1,000 API calls per day (more than enough for development)
- **OpenAI-Compatible:** 

### Cost Optimisation

#### Option 2: Use Local Models (Zero Cost)
You can replace Groq with local models for completely free operation.

### Frontend

- Choose JavaScript over TypeScript for building it quickly.

## API Endpoints

### Tickets
- `GET /api/tickets/` - List all tickets
- `POST /api/tickets/` - Create ticket
- `GET /api/tickets/{id}/` - Get ticket details
- `PUT /api/tickets/{id}/` - Update ticket
- `DELETE /api/tickets/{id}/` - Delete ticket
- `GET /api/tickets/?search=query` - Search tickets
- `GET /api/tickets/?category=billing` - Filter by category
- `GET /api/tickets/?priority=high` - Filter by priority
- `GET /api/tickets/?status=open` - Filter by status

### AI Classification

- `POST /api/tickets/classify/` - Auto-classify ticket
  
  ```json
  {
    "description": "I can't login to my account"
  }
  ```
