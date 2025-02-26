const fastify = require('fastify') ({ logger: true })

const start = async () => {
    try{
        await fastify.listen({port: 3000});
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
};

const stack = []

fastify.post('/stack/push', async (request, reply) => {
    const { item } = request.body;
    if (!item) {
        return reply.status(400).send({ error: 'Item is required' });
    }
    stack.push(item);
    return { message: 'Item added to stack' };
}
);

fastify.get('/stack/pop', async (request, reply) => {
    if (stack.length === 0) {
        return reply.status(400).send({ error: 'Stack is empty' });
    }
    const item = stack.pop();
    return reply.send({ item });
});

const kvStore = new Map();

fastify.post('/kv/set', async (request, reply) => {
    const { key, value, ttl } = request.body;
    if (!key || !value === undefined) {
        return reply.status(400).send({ error: 'Key and value are required' });
    }
    const entry = { value };
    if (ttl && typeof ttl === 'number' && ttl > 0) {
        entry.expiry = Date.now() + ttl * 1000;
    }
    kvStore.set(key, entry);
    return { message: 'Key-value pair added' };
}
);

fastify.get('/kv/get/:key', async (request, reply) => {
    const { key } = request.params;
    const entry = kvStore.get(key);
    if (!entry) {
        return reply.send({ value: null });
    }
    if (entry.expiry && entry.expiry < Date.now()) {
        kvStore.delete(key);
        return reply.send({ value: null });
    }
    return reply.send({ value: entry.value });
}
);

fastify.delete('/kv/delete/:key', async (request, reply) => {
    const { key } = request.params;
    if (!kvStore.has(key)) {
        return reply.status(400).send({ error: 'Key not found' });
    }
    kvStore.delete(key);
    return reply.send({ message: 'Key deleted' });
}
);

start();

module.exports = fastify;