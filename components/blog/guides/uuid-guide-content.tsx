"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { UuidGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "UUID Generation: A Developer's Complete Guide",
  description:
    "UUIDs (Universally Unique Identifiers) are 128-bit identifiers that guarantee uniqueness across both time and space. This comprehensive guide covers UUID versions, generation methods, and best practices.",
  author: "Dev Team",
  date: "2024-12-12",
  readTime: "11 min",
  tags: ["UUID", "Guide", "Database"],
  image: "/uuid-guide-pixel.jpeg",
  featured: false,
};

export function UuidGuideContent() {
  // Comprehensive UUID guide content
  const content = `# UUID Generation: A Developer's Complete Guide

UUIDs (Universally Unique Identifiers) are 128-bit identifiers that guarantee uniqueness across both time and space. This comprehensive guide covers UUID versions, generation methods, and best practices for modern applications.

## What is a UUID?

A UUID is a 128-bit identifier represented as a 36-character string (32 hexadecimal digits plus 4 hyphens). The probability of generating duplicate UUIDs is so low that it's considered practically impossible for most applications.

### Format:

\`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\`

### Example:

|**Version 4:** \`123e4567-e89b-12d3-a456-426614174000\`|

### Key Properties:

| Property | Description |
|----------|-------------|
| **128-bit identifier** | Provides 340 undecillion possible values |
| **Globally unique** | Extremely low collision probability |
| **No central authority needed** | Decentralized generation |
| **Standardized format** | RFC 4122 specification |
| **Self-describing** | Version and variant encoded in the ID |

### UUID Structure Breakdown

\`\`\`
UUID: 123e4567-e89b-12d3-a456-426614174000
      |________| |___| |___| |___________|
          |        |     |          |
          |        |     |          └── Node ID (48 bits)
          |        |     └── Clock Sequence (14 bits)
          |        └── Timestamp & Version (60 bits)
          └── Variant (10 bits)

Breakdown by version field:
- Version: 4 (bits 48-51 of time_high)
- Variant: 10xx (RFC 4122 variant)

Total combinations: 2^128 ≈ 3.4 × 10^38
\`\`\`

### Probability of Collision

\`\`\`
Birthday Paradox Calculation:
- With 1 billion UUIDs: ~1 in 2.7 × 10^20 chance of collision
- With 1 trillion UUIDs: ~1 in 2.7 × 10^14 chance of collision
- With 1 quadrillion UUIDs: ~1 in 2.7 × 10^8 chance of collision

To have a 50% chance of collision:
- Need to generate ~2.71 quintillion UUIDs
- At 1 billion per second: ~85 years of continuous generation

Conclusion: Practically unique for any realistic use case.
\`\`\`

## UUID Versions

### UUID v1 (Time-based)

**Based on timestamp and MAC address:**

| Aspect | Details |
|--------|---------|
| **Generation** | Current timestamp (60-bit) + MAC address (48-bit) |
| **Uniqueness** | High within single machine, lower across distributed systems |
| **Sortable** | ✅ Lexicographically sortable by creation time |
| **Predictable** | ❌ Based on timestamps - can be guessed |
| **Privacy** | ❌ Reveals MAC address and approximate generation time |

**Version 1 Format:**
\`\`\`
123e4567-e89b-11d3-a456-426614174000
              ^^
              └── Version 1 (time-based)
\`\`\`

### UUID v4 (Random)

**Uses random or pseudo-random numbers:**

| Aspect | Details |
|--------|---------|
| **Generation** | 122 random bits (2 bits reserved for version/variant) |
| **Uniqueness** | Extremely high - relies on random chance |
| **Sortable** | ❌ Not naturally sortable (random distribution) |
| **Predictable** | ❌ Not predictable (if using cryptographically secure RNG) |
| **Privacy** | ✅ No identifiable information |

**Version 4 Format:**
\`\`\`
123e4567-e89b-42d3-a456-426614174000
              ^^
              └── Version 4 (random)
\`\`\`

### UUID v7 (Time-ordered)

**Newest standard combining time and randomness (RFC 4122 compliant):**

| Aspect | Details |
|--------|---------|
| **Generation** | Timestamp (48-bit) + random bits (74-bit) |
| **Uniqueness** | High - combines time-based and random elements |
| **Sortable** | ✅ Lexicographically sortable by creation time |
| **Predictable** | ❌ Only timestamp portion is predictable |
| **Privacy** | ✅ No MAC address, safe for distributed systems |
| **Adoption** | Growing - supported by modern databases |

**Version 7 Format:**
\`\`\`
017f22e2-7b8c-7b89-8d17-ee6e3d8f9b4a
     |_____| |____| |__________________|
       |       |           |
       |       |           └── Random (74 bits)
       |       └── Version + Variant (10 bits)
       └── Unix timestamp in milliseconds (48 bits)
\`\`\`

### Version Comparison Table

| Feature | v1 | v4 | v7 | Best For |
|---------|----|----|----|----------|
| **Uniqueness** | High | Very High | Very High | All versions |
| **Sortable** | ✅ Yes | ❌ No | ✅ Yes | v1, v7 |
| **Privacy** | ❌ Poor | ✅ Good | ✅ Good | v4, v7 |
| **Predictable** | ✅ Yes | ❌ No | Partial | v4 (most secure) |
| **Performance** | Fast | Random | Fast | v1, v7 |
| **Distributed Safe** | ❌ No | ✅ Yes | ✅ Yes | v4, v7 |
| **Database Index** | Good | Poor | Excellent | v7 |

### Which Version to Choose?

\`\`\`javascript
// Use v1 when:
// - You need chronological sorting
// - Working within a single system
// - MAC address exposure is acceptable

// Use v4 when:
// - Security is paramount (unpredictable IDs)
// - Working across distributed systems
// - Privacy is important

// Use v7 when (RECOMMENDED for new projects):
// - Need both sorting and uniqueness
// - Working with databases (MySQL 8+, PostgreSQL)
// - Building distributed systems
// - Best balance of performance and features
\`\`\`

## UUID in Different Programming Languages

### JavaScript

\`\`\`javascript
// Native browser support (UUID v4)
function generateUUIDv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Node.js crypto module (UUID v4)
const crypto = require('crypto');
function generateUUIDv4Node() {
  return crypto.randomUUID();
}

// UUID v7 implementation
class UUID7 {
  static generate() {
    const timestamp = Date.now();
    const random = crypto.randomBytes(10);
    
    // Set version 7 and variant
    random[0] = (random[0] & 0x0f) | 0x70; // Version 7
    random[8] = (random[8] & 0x3f) | 0x80; // Variant 10
    
    // Combine timestamp (48 bits) and random (80 bits)
    const timestampHex = timestamp.toString(16).padStart(12, '0');
    const uuid = timestampHex.substring(0, 8) + '-' + 
                 timestampHex.substring(8, 12) + '-7' + 
                 random.slice(1, 4).toString('hex') + '-' +
                 random.slice(4, 6).toString('hex') + '-' +
                 random.slice(6, 11).toString('hex');
    
    return uuid;
  }
}

// Validation
function isValidUUID(str) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(str);
}
\`\`\`

### Python

\`\`\`python
import uuid

# UUID v4 (random) - most common
uuid_v4 = uuid.uuid4()
print(uuid_v4)  # UUID('123e4567-e89b-12d3-a456-426614174000')

# UUID v1 (time-based)
uuid_v1 = uuid.uuid1()
print(uuid_v1)  # UUID('123e4567-e89b-11d3-a456-426614174000')

# UUID v3 (namespace-based, deterministic)
# Uses MD5 hash of namespace and name
namespace_dns = uuid.NAMESPACE_DNS
uuid_v3 = uuid.uuid3(namespace_dns, 'example.com')
print(uuid_v3)  # Consistent for same inputs

# UUID v5 (namespace-based, deterministic)
# Uses SHA-1 hash of namespace and name
uuid_v5 = uuid.uuid5(namespace_dns, 'example.com')
print(uuid_v5)  # Consistent for same inputs

# UUID v7 (if using uuid-utils library)
try:
    from uuid_utils import uuid7
    uuid_v7 = uuid7()
    print(uuid_v7)  # Time-ordered UUID
except ImportError:
    print("Install: pip install uuid-utils")

# Custom UUID v7 implementation
import secrets
import time

def generate_uuid7():
    """Generate UUID v7 from timestamp and random bytes."""
    timestamp = int(time.time() * 1000).to_bytes(6, 'big')
    random_bytes = secrets.token_bytes(10)
    
    # Set version and variant
    random_bytes = bytearray(random_bytes)
    random_bytes[0] = (random_bytes[0] & 0x0f) | 0x70  # Version 7
    random_bytes[8] = (random_bytes[8] & 0x3f) | 0x80  # Variant
    
    return (
        timestamp[0:4].hex() + '-' + 
        timestamp[4:6].hex() + '-' + 
        random_bytes[0:2].hex() + '-' + 
        random_bytes[2:4].hex() + '-' + 
        random_bytes[4:].hex()
    )

# Validation
import re

def is_valid_uuid(value):
    pattern = r'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    return bool(re.match(pattern, str(value)))
\`\`\`

### Java

\`\`\`java
import java.util.UUID;
import java.security.SecureRandom;

public class UuidExample {
    private static final SecureRandom secureRandom = new SecureRandom();
    
    // UUID v4 (random) - using built-in
    public static String generateUUIDv4() {
        return UUID.randomUUID().toString();
    }
    
    // UUID v7 implementation
    public static String generateUUIDv7() {
        long timestamp = System.currentTimeMillis();
        byte[] randomBytes = new byte[10];
        secureRandom.nextBytes(randomBytes);
        
        // Set version 7 (bits 4-7 of time_hi_and_version)
        randomBytes[6] &= 0x0f;
        randomBytes[6] |= 0x70;
        
        // Set variant (bits 6-7 of clock_seq_hi_and_reserved)
        randomBytes[8] &= 0x3f;
        randomBytes[8] |= 0x80;
        
        // Convert to hex string
        StringBuilder sb = new StringBuilder();
        sb.append(hex(timestamp >> 32, 4));
        sb.append('-');
        sb.append(hex(timestamp >> 16, 4));
        sb.append('-');
        sb.append(hex(timestamp, 4));
        sb.append('-');
        sb.append(hex(((randomBytes[0] & 0xff) << 8) | (randomBytes[1] & 0xff), 4));
        sb.append('-');
        sb.append(hex(((randomBytes[2] & 0xff) << 24) | ((randomBytes[3] & 0xff) << 16) | 
                     ((randomBytes[4] & 0xff) << 8) | (randomBytes[5] & 0xff), 12));
        
        return sb.toString();
    }
    
    private static String hex(long value, int length) {
        String hex = Long.toHexString(value);
        return "0".repeat(Math.max(0, length - hex.length())) + hex;
    }
    
    // Validation
    public static boolean isValidUUID(String str) {
        String pattern = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
        return str.matches(pattern);
    }
}
\`\`\`

### Go

\`\`\`go
package main

import (
    "fmt"
    "github.com/google/uuid"
    "github.com/oklog/ulid/v2"
    "crypto/rand"
    "encoding/hex"
)

// UUID v4 (random)
func generateUUIDv4() uuid.UUID {
    return uuid.New()
}

// UUID v7 using ulid (similar concept)
func generateULID() ulid.ULID {
    entropy := make([]byte, 10)
    rand.Read(entropy)
    
    ulidInst, err := ulid.New(ulid.Timestamp(time.Now()), entropy)
    if err != nil {
        panic(err)
    }
    return ulidInst
}

// UUID v7 custom implementation
type UUID7 struct {
    timestamp uint64
    random    [10]byte
}

func generateUUIDv7() string {
    timestamp := uint64(time.Now().UnixMilli())
    var random [10]byte
    rand.Read(random[:])
    
    // Set version 7 and variant
    random[0] = (random[0] & 0x0f) | 0x70
    random[8] = (random[8] & 0x3f) | 0x80
    
    return fmt.Sprintf("%08x-%04x-%04x-%04x-%012x",
        timestamp>>32,                    // time_hi_and_version
        timestamp&0xFFFF,                 // time_mid
        timestamp>>16&0x0FFF|0x7000,      // version 7
        random[0]<<8|random[1],           // clock_seq_hi_and_reserved
        random[2:])                       // node
}

// Validation
func isValidUUID(s string) bool {
    _, err := uuid.Parse(s)
    return err == nil
}
\`\`\`

### C#

\`\`\`csharp
using System;

public class UuidExample
{
    // UUID v4 (random) - built-in
    public static Guid GenerateUUIDv4()
    {
        return Guid.NewGuid();
    }
    
    // UUID v7 implementation
    public static Guid GenerateUUIDv7()
    {
        DateTimeOffset timestamp = DateTimeOffset.UtcNow;
        byte[] random = new byte[10];
        new Random().NextBytes(random);
        
        // Set version 7 (bits 4-7 of time_hi_and_version)
        random[6] = (byte)((random[6] & 0x0F) | 0x70);
        
        // Set variant (bits 6-7 of clock_seq_hi_and_reserved)
        random[8] = (byte)((random[8] & 0x3F) | 0x80);
        
        // Combine timestamp (48 bits) and random (80 bits)
        byte[] uuidBytes = new byte[16];
        
        // Timestamp (bytes 0-5)
        BitConverter.GetBytes((ushort)(timestamp.ToUnixTimeMilliseconds() >> 32)).CopyTo(uuidBytes, 0);
        BitConverter.GetBytes((ushort)(timestamp.ToUnixTimeMilliseconds() >> 16)).CopyTo(uuidBytes, 2);
        BitConverter.GetBytes((ushort)(timestamp.ToUnixTimeMilliseconds() & 0xFFFF)).CopyTo(uuidBytes, 4);
        
        // Version and variant
        uuidBytes[6] = (byte)((uuidBytes[6] & 0x0F) | 0x70);
        uuidBytes[8] = (byte)((uuidBytes[8] & 0x3F) | 0x80);
        
        // Random bytes (bytes 9-15)
        Array.Copy(random, 2, uuidBytes, 9, 7);
        
        return new Guid(uuidBytes);
    }
    
    // Validation
    public static bool IsValidUUID(string s)
    {
        return Guid.TryParse(s, out _);
    }
}
\`\`\`

## Common Use Cases

### Database Primary Keys

**Advantages over auto-increment:**

\`\`\`sql
-- Traditional auto-increment (vulnerable)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- UUID-based (more secure)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100)
);

-- UUID v7 (recommended for sorting)
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v7(),
    event_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

**Benefits:**

| Benefit | Description |
|---------|-------------|
| **Security** | No predictable ID enumeration |
| **Merging** | Easy to merge data from different sources |
| **Scalability** | No central sequence number coordination needed |
| **Privacy** | Users can't guess other users' IDs |
| **Distribution** | Works across distributed databases |

### Session Management

**Session identifiers:**

\`\`\`javascript
// Express.js session example
const express = require('express');
const crypto = require('crypto');

const session = require('express-session')({
  secret: 'your-secret-key',
  genid: function(req) {
    return crypto.randomUUID(); // Use UUID for session IDs
  },
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
});

// Session store with UUID keys
const sessionStore = new Map();

function createSession(userId) {
  const sessionId = crypto.randomUUID();
  const session = {
    id: sessionId,
    userId: userId,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  };
  sessionStore.set(sessionId, session);
  return sessionId;
}
\`\`\`

### Distributed Systems

**Unique identifiers across services:**

\`\`\`javascript
// Microservice architecture
class DistributedIdGenerator {
  constructor(serviceId) {
    this.serviceId = serviceId;
  }
  
  generate() {
    const timestamp = Date.now();
    const random = crypto.randomBytes(8);
    const serviceId = Buffer.from(this.serviceId.padEnd(6, '0').substring(0, 6), 'utf8');
    
    return crypto.randomUUID();
  }
}

// Order ID generation
class OrderIdGenerator {
  constructor(storeId) {
    this.storeId = storeId;
  }
  
  generate() {
    // Combine store ID, timestamp, and random
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(6).toString('hex');
    return 'ORD-' + this.storeId + '-' + timestamp + '-' + random;
  }
}
\`\`\`

### Event Sourcing

**Event IDs in event sourcing:**

\`\`\`typescript
interface Event {
  id: string;
  type: string;
  aggregateId: string;
  aggregateType: string;
  data: Record<string, any>;
  timestamp: Date;
  version: number;
}

function createEvent(
  type: string,
  aggregateId: string,
  aggregateType: string,
  data: Record<string, any>,
  version: number
): Event {
  return {
    id: crypto.randomUUID(), // v4 for unpredictability
    type,
    aggregateId,
    aggregateType,
    data,
    timestamp: new Date(),
    version
  };
}

// Event store
class EventStore {
  private events: Map<string, Event[]> = new Map();
  
  async append(aggregateId: string, events: Event[]) {
    const currentEvents = this.events.get(aggregateId) || [];
    const newEvents = [...currentEvents, ...events];
    this.events.set(aggregateId, newEvents);
    return events;
  }
}
\`\`\`

## Best Practices

### 1. Choose the Right Version

**Use cases for each version:**

\`\`\`javascript
// Use v4 for most applications
const uuidV4 = crypto.randomUUID();

// Use v7 for modern time-ordered IDs
const uuidV7 = generateUUIDv7(); // Custom implementation

// Use v1 only when you need v1-specific features
const uuidV1 = uuid.v1(); // Not recommended for new projects
\`\`\`

### 2. Database Considerations

**Indexing and performance:**

\`\`\`sql
-- Good: Use UUID as primary key with proper indexing
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id),
    total DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Better: Use UUID v7 for better indexing performance
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v7(),
    event_type VARCHAR(50),
    data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Index for time-range queries
CREATE INDEX idx_events_created ON events (created_at DESC);

-- Composite index for common queries
CREATE INDEX idx_orders_customer ON orders (customer_id, created_at DESC);
\`\`\`

### 3. Storage Optimization

**Store UUIDs efficiently:**

\`\`\`sql
-- Store as BINARY(16) instead of VARCHAR(36)
-- PostgreSQL example
CREATE TABLE users (
    id BYTEA PRIMARY KEY,
    name VARCHAR(100)
);

-- Insert using decode
INSERT INTO users (id, name) VALUES (decode('123e4567e89b12d3a456426614174000', 'hex'), 'John');

-- Select using encode
SELECT encode(id, 'hex') as id, name FROM users;

-- MySQL example
CREATE TABLE users (
    id BINARY(16) PRIMARY KEY,
    name VARCHAR(100)
);

-- Insert UUID as binary
INSERT INTO users (id, name) VALUES (UNHEX(REPLACE('123e4567-e89b-12d3-a456-426614174000', '-', '')), 'John');
\`\`\`

### 4. Performance Optimization

**Batch generation and caching:**

\`\`\`python
import uuid
from functools import lru_cache

class UUIDPool:
    def __init__(self, pool_size=1000):
        self.pool_size = pool_size
        self.available = []
        self.used = set()
        self._refill()
    
    def _refill(self):
        while len(self.available) < self.pool_size:
            self.available.append(str(uuid.uuid4()))
    
    def get(self):
        if not self.available:
            self._refill()
        return self.available.pop()
    
    def return_uuid(self, uuid_str):
        if uuid_str in self.used:
            self.available.append(uuid_str)
            self.used.discard(uuid_str)

# Usage
pool = UUIDPool(1000)
uuid1 = pool.get()
# ... use uuid1 ...
pool.return_uuid(uuid1)
\`\`\`

## Performance Considerations

### Database Performance

**UUID v7 vs v1 vs v4:**

\`\`\`sql
-- Performance comparison query
EXPLAIN ANALYZE
SELECT * FROM orders ORDER BY id LIMIT 100;

-- UUID v7 and v1 are naturally sortable (good B-tree performance)
-- UUID v4 is random (poor B-tree performance)

-- For large tables, consider partitioning by time
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v7(),
    event_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
) PARTITION BY RANGE (created_at);
\`\`\`

### Storage Size Impact

**Storage comparison:**

| Format | Size | Use Case | Index Efficiency |
|--------|------|----------|------------------|
| VARCHAR(36) | 36 bytes | Human-readable | Poor |
| CHAR(36) | 36 bytes | Fixed-length | Poor |
| BINARY(16) | 16 bytes | Most efficient | Good |
| UUID (native) | 16 bytes | Database native | Good |

### Benchmarking UUID Generation

\`\`\`python
import uuid
import time

def benchmark_uuid_generation(iterations=100000):
    # UUID v4
    start = time.time()
    for _ in range(iterations):
        uuid.uuid4()
    v4_time = time.time() - start
    
    # UUID v1
    start = time.time()
    for _ in range(iterations):
        uuid.uuid1()
    v1_time = time.time() - start
    
    print(f"UUID v4: {iterations} generations in {v4_time:.4f}s ({iterations/v4_time:.0f}/sec)")
    print(f"UUID v1: {iterations} generations in {v1_time:.4f}s ({iterations/v1_time:.0f}/sec)")
    print(f"v4 is {v1_time/v4_time:.2f}x slower than v1")
\`\`\`

## Common Pitfalls

### 1. Using Wrong Version

**Problem:** Choosing v1 for privacy-sensitive applications

\`\`\`javascript
// ❌ Wrong - v1 reveals MAC address and timestamp
const uuidV1 = uuid.v1(); // Can reveal system information and generation time

// ✅ Correct - use v4 for privacy
const uuidV4 = uuid.v4(); // Random, privacy-friendly

// ✅ Better - use v7 for sorting + privacy
const uuidV7 = generateUUIDv7(); // Time-ordered without MAC exposure
\`\`\`

### 2. Storage Inefficiency

**Problem:** Storing UUIDs as strings when binary would be more efficient

\`\`\`python
# ❌ Inefficient - 36 character string
user_id = "123e4567-e89b-12d3-a456-426614174000"  # 36 bytes

# ✅ Efficient - 16 byte binary
user_id_bytes = uuid.uuid4().bytes  # 16 bytes
# Storage: 36 bytes vs 16 bytes (55% reduction)

# Database example
# ❌ Poor: VARCHAR(36)
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY
);

# ✅ Better: BINARY(16)
CREATE TABLE users (
    id BINARY(16) PRIMARY KEY
);
\`\`\`

### 3. Case Sensitivity Issues

**Problem:** UUIDs are case-insensitive but stored with mixed case

\`\`\`python
# ❌ Wrong - string comparison might fail
uuid1 = "123e4567-e89b-12d3-a456-426614174000"
uuid2 = "123E4567-E89B-12D3-A456-426614174000"
print(uuid1 == uuid2)  # False

# ✅ Correct - normalize before comparison
def normalize_uuid(u):
    return u.lower().replace('-', '')

print(normalize_uuid(uuid1) == normalize_uuid(uuid2))  # True

# ✅ Also correct - use UUID type for comparison
uuid_obj1 = uuid.UUID(uuid1)
uuid_obj2 = uuid.UUID(uuid2)
print(uuid_obj1 == uuid_obj2)  # True (case-insensitive)
\`\`\`

### 4. Performance in Indexes

**Problem:** Random UUIDs cause index fragmentation

\`\`\`sql
-- ❌ Poor: Random UUIDs cause B-tree page splits
INSERT INTO events (id, data) VALUES 
    (gen_random_uuid(), 'event1'),
    (gen_random_uuid(), 'event2'),
    (gen_random_uuid(), 'event3');

-- ✅ Better: UUID v7 for sequential insertion
INSERT INTO events (id, data) VALUES 
    (uuid_generate_v7(), 'event1'),
    (uuid_generate_v7(), 'event2'),
    (uuid_generate_v7(), 'event3');

-- ✅ Alternative: Use separate timestamp column for ordering
CREATE TABLE events (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_events_created ON events (created_at);
\`\`\`

## Migration Strategies

### From Auto-increment to UUID

**Gradual migration approach:**

\`\`\`sql
-- Step 1: Add UUID column (nullable)
ALTER TABLE users ADD COLUMN uuid_id UUID;

-- Step 2: Generate UUIDs for existing records
UPDATE users SET uuid_id = gen_random_uuid() WHERE uuid_id IS NULL;

-- Step 3: Add unique constraint
ALTER TABLE users ADD CONSTRAINT users_uuid_id_unique UNIQUE (uuid_id);

-- Step 4: Create new table with UUID as primary key
CREATE TABLE users_new (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Step 5: Migrate data
INSERT INTO users_new (id, name, email, created_at)
SELECT uuid_id, name, email, created_at FROM users;

-- Step 6: Swap tables
ALTER TABLE users RENAME TO users_old;
ALTER TABLE users_new RENAME TO users;

-- Step 7: Drop old table (after verification)
DROP TABLE users_old;
\`\`\`

### Dual-Write During Migration

\`\`\`javascript
class UserRepository {
  constructor(db) {
    this.db = db;
  }
  
  async createUser(data) {
    const uuid = crypto.randomUUID();
    const now = new Date();
    
    // Write to both systems during migration
    await Promise.all([
      // Old system (auto-increment)
      this.db.query(
        'INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)',
        [data.name, data.email, now]
      ),
      // New system (UUID)
      this.db.query(
        'INSERT INTO users_v2 (id, name, email, created_at) VALUES (?, ?, ?, ?)',
        [uuid, data.name, data.email, now]
      )
    ]);
    
    return uuid;
  }
}
\`\`\`

## Tools and Resources

Use our **UUID Generator** tool to quickly generate UUIDs of different versions online. The tool supports v1, v4, and v7 generation with validation and formatting options.

### Recommended Tools:

| Tool | Purpose | URL |
|------|---------|-----|
| **UUID Generators** | Online UUID creation tools | Various online tools |
| **Database Extensions** | PostgreSQL UUID support, MySQL UUID functions | Database docs |
| **Libraries** | uuid.js (JavaScript), python-uuid (Python), java.util.UUID (Java) | NPM, PyPI, Maven |
| **Validators** | UUID format and version validation tools | Online validators |
| **Benchmarking** | Performance comparison tools | Custom scripts |

### Database-Specific Functions:

\`\`\`sql
-- PostgreSQL
SELECT gen_random_uuid();              -- v4
SELECT uuid_generate_v1();             -- v1
SELECT uuid_generate_v4();             -- v4
SELECT uuid_generate_v7();             -- v7 (if extension installed)

-- MySQL
SELECT UUID();                         -- v1
SELECT UUID_SHORT();                   -- MySQL-specific
SELECT REPLACE(UUID(), '-', '');       -- Remove dashes

-- SQL Server
SELECT NEWID();                        -- v4
SELECT NEWSEQUENTIALID();              -- Sequential (not UUID standard)

-- SQLite
-- No built-in UUID support, use extension or application-level generation
\`\`\`

## Conclusion

UUIDs provide a robust solution for generating unique identifiers across distributed systems. Modern UUID v7 combines the benefits of time-based ordering with privacy protection, making it ideal for most new applications.

### Key Takeaways:

- ✅ **Use UUID v4** for general-purpose unique identifiers (most common)
- ✅ **Use UUID v7** for time-ordered, sortable identifiers (recommended for new projects)
- ✅ **Store as BINARY(16)** for database efficiency
- ✅ **Index properly** for good query performance
- ✅ **Choose version based on use case** - not all versions are equal
- ⚠️ **Avoid v1** in privacy-sensitive applications (reveals MAC address)
- ⚠️ **Consider v7** for database primary keys (better index performance)

### Quick Reference:

\`\`\`
UUID Versions Summary:

v1 (Time-based):
- Pros: Sortable, fast
- Cons: Reveals MAC address, not privacy-friendly
- Use: Legacy systems, internal tracking

v4 (Random):
- Pros: Most secure, privacy-friendly, widely supported
- Cons: Not sortable, index fragmentation
- Use: Security tokens, session IDs, general use

v7 (Time-ordered):
- Pros: Sortable, privacy-friendly, good for databases
- Cons: Newer, may need library support
- Use: Database primary keys, event sourcing, logs

Best Practices:
- Database: Use v7, store as BINARY(16)
- APIs: Use v4 for security
- Internal: Use v7 for performance
\`\`\`

---

*This guide covers UUID fundamentals and modern best practices. For legacy systems and specific requirements, always consider the trade-offs of different UUID versions.*`;

  const tocItems = extractTOCFromText(content);
  const showTOC = shouldShowTOC(tocItems);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <UuidGuideStructuredData />
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex gap-8">
          {/* Main Content */}
          <motion.article
            className={`${showTOC ? "lg:w-2/3" : "max-w-4xl mx-auto"}`}
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div className="space-y-8" variants={fadeInUp}>
              {/* Article Header with Cover Image */}
              <ArticleHeader
                title={articleData.title}
                description={articleData.description}
                author={articleData.author}
                date={articleData.date}
                readTime={articleData.readTime}
                tags={articleData.tags}
                image={articleData.image}
                featured={articleData.featured}
              />

              {/* Article Content */}
              <div className="prose prose-lg max-w-none streamdown-content">
                <StreamdownRenderer content={content} />
              </div>
            </motion.div>
          </motion.article>

          {/* Enhanced Streamdown TOC */}
          {showTOC && (
            <StreamdownTOC
              items={tocItems}
              enableAutoExtract={false}
              stickyOffset={80}
              showProgress={true}
            />
          )}
        </div>
      </div>
    </>
  );
}
