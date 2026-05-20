import type { Note } from "../types"

const now = new Date()

const hoursAgo = (n: number) => {
  const d = new Date(now)
  d.setHours(d.getHours() - n)
  return d.toISOString()
}

export const mockNotes: Note[] = [
  {
    id: "note-1",
    title: "Getting Started with React Hooks",
    content: `# React Hooks

React Hooks are functions that let you use state and other React features without writing a class.

## useState

\`\`\`tsx
const [count, setCount] = useState(0)
\`\`\`

## useEffect

\`\`\`tsx
useEffect(() => {
  document.title = \`Count: \${count}\`
}, [count])
\`\`\`

## Custom Hooks

You can create your own hooks to reuse stateful logic between components.

\`\`\`tsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return size
}
\`\`\`
`,
    category: "Programming",
    tags: ["react", "hooks", "javascript"],
    createdAt: hoursAgo(2),
    updatedAt: hoursAgo(2),
    favorite: true,
    pinned: true,
  },
  {
    id: "note-2",
    title: "TCP/IP Protocol Suite Summary",
    content: `# TCP/IP Protocol Suite

The TCP/IP model is a conceptual framework for describing network protocols.

## Layers

1. **Application Layer** - HTTP, FTP, DNS, SMTP
2. **Transport Layer** - TCP, UDP
3. **Internet Layer** - IP, ICMP, ARP
4. **Network Access Layer** - Ethernet, Wi-Fi

## Key Protocols

| Protocol | Port | Description |
|----------|------|-------------|
| HTTP | 80 | Web traffic |
| HTTPS | 443 | Secure web traffic |
| DNS | 53 | Domain name resolution |
| SSH | 22 | Secure shell |

> TCP ensures reliable, ordered delivery of a stream of bytes.
`,
    category: "Networking",
    tags: ["tcp/ip", "networking", "protocols"],
    createdAt: hoursAgo(6),
    updatedAt: hoursAgo(4),
    favorite: false,
    pinned: true,
  },
  {
    id: "note-3",
    title: "Linear Algebra — Matrix Operations",
    content: `# Matrix Operations

## Addition

Matrices of the same dimensions can be added element-wise.

$$(A + B)_{ij} = A_{ij} + B_{ij}$$

## Multiplication

For matrices $A_{m \\times n}$ and $B_{n \\times p}$:

$$(AB)_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}$$

## Determinant

For a $2 \\times 2$ matrix:

$$\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$$

### Properties

- $(AB)C = A(BC)$ — Associative
- $A(B + C) = AB + AC$ — Distributive
- $AB \\neq BA$ — Not commutative
`,
    category: "Mathematics",
    tags: ["linear algebra", "matrices", "determinants"],
    createdAt: hoursAgo(12),
    updatedAt: hoursAgo(10),
    favorite: true,
    pinned: false,
  },
  {
    id: "note-4",
    title: "DNA Replication Process",
    content: `# DNA Replication

DNA replication is the biological process of producing two identical replicas of DNA from one original DNA molecule.

## Steps

1. **Initiation** - DNA helicase unwinds the double helix
2. **Elongation** - DNA polymerase adds complementary nucleotides
3. **Termination** - Replication forks meet

## Key Enzymes

| Enzyme | Function |
|--------|----------|
| Helicase | Unwinds DNA |
| DNA Polymerase | Synthesizes new strand |
| Ligase | Joins Okazaki fragments |
| Primase | Adds RNA primers |

## Leading vs Lagging Strand

- **Leading strand**: Continuous synthesis (5' → 3')
- **Lagging strand**: Discontinuous synthesis via Okazaki fragments
`,
    category: "Biology",
    tags: ["dna", "replication", "genetics"],
    createdAt: hoursAgo(24),
    updatedAt: hoursAgo(20),
    favorite: false,
    pinned: false,
  },
  {
    id: "note-5",
    title: "RESTful API Design Principles",
    content: `# RESTful API Design

## HTTP Methods

| Method | CRUD | Idempotent |
|--------|------|------------|
| GET | Read | Yes |
| POST | Create | No |
| PUT | Update/Replace | Yes |
| PATCH | Partial Update | No |
| DELETE | Delete | Yes |

## URL Structure

\`\`\`
GET    /api/users          → List users
GET    /api/users/:id      → Get user
POST   /api/users          → Create user
PUT    /api/users/:id      → Update user
DELETE /api/users/:id      → Delete user
\`\`\`

## Status Codes

- **200** OK
- **201** Created
- **204** No Content
- **400** Bad Request
- **401** Unauthorized
- **404** Not Found
- **500** Internal Server Error
`,
    category: "Programming",
    tags: ["api", "rest", "backend"],
    createdAt: hoursAgo(36),
    updatedAt: hoursAgo(30),
    favorite: true,
    pinned: false,
  },
  {
    id: "note-6",
    title: "Quantum Mechanics — Wave Function",
    content: `# Wave Function

The wave function $\\psi(x,t)$ describes the quantum state of a particle.

## Schrödinger Equation

$$i\\hbar\\frac{\\partial}{\\partial t}|\\psi(t)\\rangle = \\hat{H}|\\psi(t)\\rangle$$

## Key Principles

- **Superposition**: A particle exists in all possible states simultaneously
- **Collapse**: Measurement collapses the wave function to a single state
- **Uncertainty**: $\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}$

## Born Rule

The probability of finding a particle at position $x$ is:

$$P(x) = |\\psi(x)|^2$$
`,
    category: "Physics",
    tags: ["quantum", "wave function", "schrödinger"],
    createdAt: hoursAgo(48),
    updatedAt: hoursAgo(40),
    favorite: false,
    pinned: false,
  },
  {
    id: "note-7",
    title: "World War II — Key Events Timeline",
    content: `# World War II Timeline

## 1939
- **Sep 1**: Germany invades Poland
- **Sep 3**: Britain and France declare war

## 1940
- **May**: Winston Churchill becomes Prime Minister
- **Jul–Oct**: Battle of Britain

## 1941
- **Jun 22**: Operation Barbarossa (Germany invades USSR)
- **Dec 7**: Attack on Pearl Harbor

## 1942
- **Jun**: Battle of Midway
- **Aug**: Battle of Stalingrad begins

## 1944
- **Jun 6**: D-Day (Normandy landings)

## 1945
- **May 8**: VE Day
- **Aug 6/9**: Atomic bombs on Hiroshima & Nagasaki
- **Sep 2**: Japan surrenders
`,
    category: "History",
    tags: ["wwii", "history", "timeline"],
    createdAt: hoursAgo(72),
    updatedAt: hoursAgo(48),
    favorite: true,
    pinned: false,
  },
  {
    id: "note-8",
    title: "English Grammar — Tenses Overview",
    content: `# English Tenses

## Present Tenses

| Tense | Example | Usage |
|-------|---------|-------|
| Simple Present | I walk | Habits, facts |
| Present Continuous | I am walking | Ongoing now |
| Present Perfect | I have walked | Past with present relevance |
| Present Perfect Continuous | I have been walking | Ongoing past to now |

## Past Tenses

| Tense | Example | Usage |
|-------|---------|-------|
| Simple Past | I walked | Completed action |
| Past Continuous | I was walking | Interrupted action |
| Past Perfect | I had walked | Before another past action |
| Past Perfect Continuous | I had been walking | Duration before past |

## Future Tenses

- **Simple Future**: I will walk
- **Future Continuous**: I will be walking
- **Future Perfect**: I will have walked
`,
    category: "English",
    tags: ["grammar", "tenses", "english"],
    createdAt: hoursAgo(96),
    updatedAt: hoursAgo(72),
    favorite: false,
    pinned: false,
  },
]
