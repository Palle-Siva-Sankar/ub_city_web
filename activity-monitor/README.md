# Activity Monitor (Standalone)

This is a separate monitoring app (outside the main website UI) to track:

- who logged in
- user activity timeline
- last login and activity count

## Run

```bash
node activity-monitor/server.mjs
```

Open:

- [http://127.0.0.1:8899](http://127.0.0.1:8899)

## API

- `POST /api/activity`
- `GET /api/users`
- `GET /api/user/:id`

### Example activity payload

```json
{
  "userId": "user-123",
  "username": "john",
  "email": "john@example.com",
  "phone": "+919999999999",
  "action": "LOGIN_SUCCESS",
  "details": { "source": "web-login" }
}
```

## Notes

- Data is stored locally at `activity-monitor/data/events.json`.
- This monitor is intentionally separate from the website pages.
