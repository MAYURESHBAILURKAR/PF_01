export const SAMPLE_POSTS = [
    {
        "_id": "699dd82375c1a094f8c1d9d1",
        "title": "Building Offline-First React Native Apps with WatermelonDB",
        "slug": "offline-first-react-native-watermelondb",
        "content": "# Building Offline-First React Native Apps with WatermelonDB\n\nWhen building enterprise mobile tools—like warehouse management systems, delivery trackers, or field service apps you cannot rely on a constant, perfect 5G connection. If your app becomes a blank white screen the second a user walks into a network dead zone, your architecture is failing them.\n\nThe solution is an **Offline-First** architecture. \n\n\n\n## The Offline-First Mindset\n\nIn a traditional app, the flow looks like this:\n`UI Action -> API Request -> Wait for Server -> Update UI`\n\nIn an offline first app, the flow is completely flipped. The server is no longer the immediate source of truth for the UI; the *local database* is.\n`UI Action -> Write to Local DB -> Immediately Update UI -> Sync with Server in Background`\n\n## Enter WatermelonDB\n\nFor React Native, standard SQLite can be slow when dealing with thousands of records, and Async Storage is only meant for simple key-value pairs. \n\nWatermelonDB is a reactive, highly scalable local database built specifically for React Native. It operates lazily, meaning it can load thousands of inventory records instantly without blocking the JavaScript thread.\n\n## 1. Defining the Schema\n\nEverything in WatermelonDB starts with a strongly typed schema. This acts as the blueprint for your local SQLite database.\n\n```javascript\n// schema.js\nimport { appSchema, tableSchema } from '@nozbe/watermelondb';\n\nexport const mySchema = appSchema({\n  version: 1,\n  tables: [\n    tableSchema({\n      name: 'inventory_items',\n      columns: [\n        { name: 'sku', type: 'string', isIndexed: true },\n        { name: 'name', type: 'string' },\n        { name: 'quantity', type: 'number' },\n        { name: 'is_synced', type: 'boolean' },\n      ],\n    }),\n  ],\n});\n```\n## 2. Reactive Components\nThe true magic of WatermelonDB is its reactivity. By wrapping your components in a Higher-Order Component (HOC) called withObservables, your React Native UI will automatically re-render the exact millisecond the local database changes.\n\n```javascript\n// InventoryList.js\nimport withObservables from '@nozbe/with-observables';\n\nconst InventoryList = ({ items }) => (\n  <FlatList\n    data={items}\n    keyExtractor={item => item.id}\n    renderItem={({ item }) => <Text>{item.name}: {item.quantity}</Text>}\n  />\n);\n\n// This automatically subscribes to the local database!\nconst enhance = withObservables([], ({ database }) => ({\n  items: database.collections.get('inventory_items').query().observe(),\n}));\n\nexport default enhance(InventoryList);\n```\n\n## 3. The Sync Engine\nWriting to the local database is easy, but eventually, you need to push those changes to your backend (like a Node.js microservice) and pull down any updates made by other users.\n\nWatermelonDB provides a built-in synchronize function. You just have to provide the logic for communicating with your API.\n\n```javascript\nimport { synchronize } from '@nozbe/watermelondb/sync';\n\nasync function syncData() {\n  await synchronize({\n    database,\n    pullChanges: async ({ lastPulledAt }) => {\n      // Fetch changes from your Node.js backend since the last sync\n      const response = await api.get(`/sync?last_pulled=${lastPulledAt}`);\n      return { changes: response.data.changes, timestamp: response.data.timestamp };\n    },\n    pushChanges: async ({ changes, lastPulledAt }) => {\n      // Push local user changes up to your backend\n      await api.post(`/sync`, { changes, lastPulledAt });\n    },\n  });\n}\n```\n## Conclusion\nTransitioning to an offline first architecture requires a shift in how you think about state management. You have to handle conflict resolution (what happens if two workers update the same inventory item at the exact same time?) and background syncing. But the payoff is immense: a lightning fast app that works flawlessly, regardless of whether the user is on fiber internet or deep inside a concrete facility.\n\n",
        "tags": [
            "React Native",
            "Offline-First",
            "Database",
            "Mobile"
        ],
        "image": "",
        "author": "mayuresh",
        "published": true,
        "date": "2026-02-24T16:56:03.665Z",
        "createdAt": "2026-02-24T16:56:03.666Z",
        "updatedAt": "2026-02-24T16:56:03.666Z",
        "id": "699dd82375c1a094f8c1d9d1"
    },
    {
        "_id": "699dd71075c1a094f8c1d9c7",
        "title": "Mastering FlatList Performance in Complex React Native Apps",
        "slug": "mastering-flatlist-performance-react-native",
        "content": "# Mastering FlatList Performance in Complex React Native Apps\n\nReact Native's `FlatList` component is incredibly powerful, but it is notoriously easy to misconfigure. If you are building a data-heavy mobile application like a real-time warehouse management tool or a media streaming app—and notice your scroll frames dropping, your list implementation is likely the bottleneck.\n\nHere is a pragmatic guide to squeezing every ounce of performance out of your React Native lists.\n\n## The Problem: Unnecessary Re-renders\n\nBy default, when a parent component's state changes, React Native might re-render every single item inside your `FlatList`. If you have 100 complex UI cards on screen, that is 100 expensive layout calculations happening for no reason.\n\n## Solution 1: Memoize Your List Items\n\nThe absolute most important rule of `FlatList` is to separate your render item logic into its own component and wrap it in `React.memo`. This tells React to only re-render the item if its specific props change.\n\n```javascript\n// ❌ Bad: Inline renderItem forces re-renders\n<FlatList\n  data={inventory}\n  renderItem={({ item }) => (\n    <View style={styles.card}>\n      <Text>{item.name}</Text>\n    </View>\n  )}\n/>\n```\n\n```javascript\n// ✅ Good: Extracted and memoized\nimport React, { memo } from 'react';\n\nconst InventoryCard = memo(({ item }) => (\n  <View style={styles.card}>\n    <Text>{item.name}</Text>\n  </View>\n));\n\n// Inside your main component:\n<FlatList\n  data={inventory}\n  renderItem={({ item }) => <InventoryCard item={item} />}\n/>\n```\n\n## Solution 2: Avoid Inline Functions in Props\nEvery time your main component renders, inline functions are recreated. If you pass an inline function to renderItem or keyExtractor, FlatList thinks the prop changed and might trigger a re-render. Wrap them in useCallback.\n\n```javascript\n// ✅ Best Practice\nconst renderItem = useCallback(({ item }) => <InventoryCard item={item} />, []);\nconst keyExtractor = useCallback((item) => item.id.toString(), []);\n\n<FlatList\n  data={inventory}\n  renderItem={renderItem}\n  keyExtractor={keyExtractor}\n/>\n```\n\n## Solution 3: The Magic of `getItemLayout`\nIf your list items have a fixed height, you can use getItemLayout to bypass the costly measurement process entirely. This prevents the UI thread from having to dynamically calculate the height of items as you scroll, which massively improves scroll fluidity.\n\n```javascript\nconst ITEM_HEIGHT = 80;\n\nconst getItemLayout = useCallback((data, index) => ({\n  length: ITEM_HEIGHT,\n  offset: ITEM_HEIGHT * index,\n  index,\n}), []);\n\n<FlatList\n  data={inventory}\n  renderItem={renderItem}\n  getItemLayout={getItemLayout}\n/>\n```\n\n## Conclusion\nA performant FlatList is the difference between an app that feels like a native application and one that feels like a clunky web wrapper. By utilizing memo, useCallback, and skipping dynamic measurements with getItemLayout, you can achieve 60 FPS scrolling even with thousands of complex records.",
        "tags": [
            "React Native",
            "Performance",
            "Mobile",
            "UI"
        ],
        "image": "",
        "author": "mayuresh",
        "published": true,
        "date": "2026-02-24T16:51:28.501Z",
        "createdAt": "2026-02-24T16:51:28.501Z",
        "updatedAt": "2026-02-24T16:52:27.667Z",
        "id": "699dd71075c1a094f8c1d9c7"
    },
    {
        "_id": "699dd58375c1a094f8c1d9bd",
        "title": "Architecting for Scale: A Pragmatic Guide to Microservices",
        "slug": "architecting-scalable-microservices",
        "content": "# Architecting for Scale: A Pragmatic Guide to Microservices\n\nWhen building a modern digital platform, you eventually hit a crossroads: stick with the reliable monolithic architecture, or break your application down into microservices. \n\nWhile monoliths are fantastic for getting a project off the ground quickly, microservices shine when your application demands high scalability, independent deployments, and fault isolation. Let's break down the core principles of a healthy microservices architecture.\n\n## The Core Philosophy: Bounded Contexts\n\nThe biggest mistake developers make when transitioning to microservices is building a \"distributed monolith.\" This happens when services are so tightly coupled that updating one requires updating three others.\n\nTo avoid this, services must be designed around **Bounded Contexts**. A single microservice should own a specific business capability, its own logic, and most importantly, its own database. \n\n\n\n## The API Gateway Pattern\n\nIn a microservices ecosystem, client applications (like a React frontend or a React Native mobile app) shouldn't talk to individual services directly. Instead, they communicate through an API Gateway.\n\nThe API Gateway acts as a reverse proxy, routing requests to the correct underlying service. It also handles cross-cutting concerns like authentication, rate limiting, and logging.\n\n## Service Communication: Sync vs. Async\n\nWhen services need to talk to each other, you have two choices:\n\n1. **Synchronous (REST or gRPC):** Best when you immediately need a response. For example, the API Gateway asking the Auth Service to validate a token.\n2. **Asynchronous (Message Brokers):** Best for decoupling. If a user creates an account, the User Service can publish a \"UserCreated\" event to a RabbitMQ or Kafka exchange. The Email Service can listen to that event and send a welcome email in the background without slowing down the initial request.\n\n## Example: A Node.js Microservice\n\nHere is a simplified example of what an isolated service looks like. Notice how it only cares about its specific domain (managing wishlists for a platform like WishSphere) and handles its own database connection.\n\n```javascript\n// Wishlist Service - index.js\nimport express from 'express';\nimport mongoose from 'mongoose';\nimport { WishlistRouter } from './routes/wishlist.routes.js';\n\nconst app = express();\napp.use(express.json());\n\n// 1. Independent Database Connection\nmongoose.connect(process.env.MONGO_URI_WISHLIST)\n  .then(() => console.log('Wishlist DB Connected'))\n  .catch(err => console.error('DB Connection Failed', err));\n\n// 2. Domain-Specific Routes\napp.use('/api/v1/wishlists', WishlistRouter);\n\n// 3. Health Check for Orchestrators (like Kubernetes or Docker Swarm)\napp.get('/health', (req, res) => {\n  res.status(200).json({ status: 'UP', service: 'wishlist-service' });\n});\n\nconst PORT = process.env.PORT || 3001;\napp.listen(PORT, () => {\n  console.log(`Wishlist Service running on port ${PORT}`);\n});\n```\n\n## The \"Database Per Service\" Rule\nThis is the golden rule of microservices: Services must not share a database. If the Order Service needs user data, it cannot query the User Service's database directly. It must either call the User Service's API or maintain a read-optimized replica of the necessary user data updated via asynchronous events. Sharing a database immediately re-introduces the tight coupling we are trying to escape.\n\n## Conclusion\nMicroservices introduce complexity you now have to manage network latency, distributed tracing, and eventual consistency. However, if your platform is growing rapidly and multiple developers need to work on different features simultaneously without stepping on each other's toes, the architectural overhead is absolutely worth the investment.",
        "tags": [
            "Microservices",
            "Architecture",
            "Node.js",
            "Backend"
        ],
        "image": "",
        "author": "mayuresh",
        "published": true,
        "date": "2026-02-24T16:44:51.880Z",
        "createdAt": "2026-02-24T16:44:51.882Z",
        "updatedAt": "2026-02-24T16:44:51.882Z",
        "id": "699dd58375c1a094f8c1d9bd"
    },
    {
        "_id": "699dbe520347432970bd2866",
        "title": "Embracing Angular Signals: A New Era of Reactivity",
        "slug": "embracing-angular-signals",
        "content": "# Embracing Angular Signals: A New Era of Reactivity\n\nFor years, Angular developers have relied on RxJS and `Zone.js` to handle reactivity and change detection. While powerful, this approach often came with a steep learning curve and performance overhead. \n\nWith the introduction of **Signals** in Angular 16+, we finally have a built-in, lightweight reactive primitive that tells the framework exactly what changed and where.\n\n## What is a Signal?\n\nA Signal is essentially a wrapper around a value that can notify interested consumers when that value changes. It can contain anything: a simple string, a complex object, or even an array.\n\nHere is the difference between the old `BehaviorSubject` approach and the new Signal approach:\n\n```typescript\n// ❌ The Old Way (RxJS)\nimport { BehaviorSubject } from 'rxjs';\n\nexport class CounterComponent {\n  private countSubject = new BehaviorSubject<number>(0);\n  count$ = this.countSubject.asObservable();\n\n  increment() {\n    this.countSubject.next(this.countSubject.value + 1);\n  }\n}",
        "tags": [
            "Angular",
            "Signals",
            "Performance",
            "TypeScript"
        ],
        "image": "",
        "author": "mayuresh",
        "published": true,
        "date": "2026-02-24T15:05:54.814Z",
        "createdAt": "2026-02-24T15:05:54.814Z",
        "updatedAt": "2026-02-24T15:17:37.026Z",
        "id": "699dbe520347432970bd2866"
    }
]