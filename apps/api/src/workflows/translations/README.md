# Translation Workflow and API

This document describes how to use the translation system for managing product and product collection translations.

## Overview

The translation system provides:

- **Upsert logic**: Create new translations or update existing ones
- **Generic API routes**: Support for products and product collections
- **Language management**: Get available languages for entity types
- **Batch operations**: Handle multiple translations in a single request
- **Transaction safety**: Rollback on errors

## API Endpoints

### 1. Upsert Translations

```http
POST /admin/translations/{entity_type}/{entity_id}
```

**Parameters:**

- `entity_type`: `"product"` or `"product_collection"`
- `entity_id`: The ID of the entity to translate

**Request Body:**

```json
{
  "translations": [
    {
      "language": "fr",
      "title": "Titre en français",
      "subtitle": "Sous-titre en français",
      "description": "Description en français"
    },
    {
      "language": "de",
      "title": "Titel auf Deutsch",
      "description": "Beschreibung auf Deutsch"
    }
  ]
}
```

**Response:**

```json
{
  "translations": [
    {
      "id": "trans_123",
      "entity_id": "prod_456",
      "language": "fr",
      "title": "Titre en français",
      "subtitle": "Sous-titre en français",
      "description": "Description en français",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 2. Get Translations

```http
GET /admin/translations/{entity_type}/{entity_id}
```
