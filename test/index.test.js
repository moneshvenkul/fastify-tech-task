const tap = require('tap')
const build = require('../src/index')

tap.test('Stack Tests', async (t) => {
    const fastify = build;

    let response = await fastify.inject({
        method: 'POST',
        url: '/stack/push',
        payload: { item: 'testItem' }
    });
    t.equal(response.statusCode, 200);

    response = await fastify.inject({
        method: 'GET',
        url: '/stack/pop'
    });
    t.equal(response.statusCode, 200);
    t.same(response.json(), { item: 'testItem' });
}
);

tap.test('Key-Value Store Tests', async (t) => {
    const fastify = build;
    t.teardown(() => fastify.close());

    await fastify.inject({
        method: 'POST',
        url: '/kv/set',
        payload: { key: 'testKey', value: 'testValue', ttl: 1 },
    });

    let response = await fastify.inject({
        method: 'GET',
        url: '/kv/get/testKey'
    });
    t.same(response.json(), { value: 'testValue' });

    await new Promise(resolve => setTimeout(resolve, 1500));
    response = await fastify.inject({
        method: 'GET',
        url: '/kv/get/testKey'
    });
    t.same(response.json(), { value: null });
});