# Fastify Tech Task

This is a Fastify-based application implementing an in-memory stack (LIFO) and a key-value store with optional TTL, as part of a tech evaluation. The project includes unit tests and a screen recording of the development process.

## Submission Details
- **Tar File**: `tech-task.tar` (excludes `node_modules` and `.git`)
- **Screen Recording**: [Link](https://unhnewhaven-my.sharepoint.com/:v:/g/personal/mvomm1_unh_newhaven_edu/Edq1zULcHptKqFQ_hVdiBMEBRK-u8tA58vr9rrukuRGbzQ?e=qjsb1N)

## Setup
1. Extract the tar archive: tar -xf tech-task.tar
2. Install dependencies: npm install
3. Run unit tests: npm test
4. Start the server: npm start


- The server will run on `http://localhost:3000`.
## Endpoints
### Stack (LIFO)
- **POST /stack/push**
- Adds an item to the stack.
- **Body**: `{ "item": "value" }` (e.g., `"Hello"`)
- **Response**: `{ "message": "Item added to stack", "stackSize": number }`
- **Error**: `400` if `item` is missing.
- **GET /stack/pop**
- Retrieves and removes the top item from the stack.
- **Response**: `{ "item": "value" }`
- **Error**: `404` if the stack is empty.
### Key-Value Store with TTL
- **POST /kv/set**
- Sets a key-value pair with an optional TTL (in seconds).
- **Body**: `{ "key": "string", "value": any, "ttl": number (optional) }`
- **Response**: `{ "message": "Key set successfully" }`
- **Error**: `400` if `key` or `value` is missing.
- **GET /kv/get/:key**
- Retrieves the value for a key, respecting TTL.
- **URL**: `/kv/get/{key}` (e.g., `/kv/get/name`)
- **Response**: `{ "value": any }` (returns `null` if not found or expired)
- **DELETE /kv/delete/:key**
- Deletes a key-value pair.
- **URL**: `/kv/delete/{key}` (e.g., `/kv/delete/name`)
- **Response**: `{ "message": "Key deleted successfully" }`
- **Error**: `404` if the key doesn’t exist.
## Implementation Notes
- **Stack**: Uses a JavaScript array for LIFO behavior, stored in memory.
- **Key-Value Store**: Uses a `Map` for key-value pairs, with TTL handled via timestamps (checked on retrieval).
- **Persistence**: Both the stack and key-value store are in-memory only and reset on server restart, per requirements.
- **Testing**: Unit tests are in `test/index.test.js`, covering all endpoints and TTL functionality using Tap and Fastify’s `inject`.
## Running Tests
- Run `npm test` to execute unit tests, which verify:
- Stack push/pop operations (LIFO behavior).
- Key-value set/get/delete with and without TTL.
- Edge cases (e.g., empty stack, expired keys).
## Development Process
The screen recording shows the step-by-step creation of this project, including:
- Setting up the Fastify app and routes.
- Manual testing with Postman.
- Writing and running unit tests.
- Archiving the project with `7z` (Windows equivalent of `tar`).
Let me know if you need any additional details or modifications!
