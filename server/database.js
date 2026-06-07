import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = process.env.DATA_DIR || __dirname;
const dbPath = join(dataDir, 'database.json');
const CONTENT_VERSION = '2.1.0';

let database = {
  learnings: [],
  interviews: [],
  preparation_scenarios: [],
  quiz_questions: [],
  quiz_attempts: [],
  metadata: { version: '1.0.0', created: new Date().toISOString() },
};

const ARCHITECT_CATEGORIES = [
  'Cloud Architecture',
  'Kubernetes & Platform',
  'Generative AI',
  'Enterprise Architecture',
  'System Design',
  'Technology Leadership',
  'Telecom & BSS',
  'Security & Compliance',
  'Data & MLOps',
];

function seedArchitectLearnings() {
  const ts = (daysAgo) => new Date(Date.now() - daysAgo * 86400000).toISOString();
  database.learnings = [
    {
      id: 1,
      topic: 'Multi-Cloud Architecture Strategy',
      category: 'Cloud Architecture',
      status: 'Refresher',
      priority: 'high',
      interview_focus: 'Solutions/Enterprise Architect',
      summary: 'Landing zones, workload placement, and governance across AWS, Azure, and GCP.',
      key_points: ['Account/subscription structure and guardrails', 'Network hub-spoke vs mesh for hybrid', 'Identity federation and centralized IAM', 'FinOps tagging and chargeback models', 'Disaster recovery RTO/RPO across regions'],
      notes: 'Anchor answers on 19 years of delivery: migration waves, strangler fig, and portfolio rationalization. Tie to CKA/K8s for platform layer and Bedrock for AI workloads.',
      tags: ['multi-cloud', 'AWS', 'Azure', 'GCP', '2026'],
      created_at: ts(2),
    },
    {
      id: 2,
      topic: 'Kubernetes Platform Engineering',
      category: 'Kubernetes & Platform',
      status: 'Refresher',
      priority: 'high',
      interview_focus: 'Cloud/Platform Architect',
      summary: 'CKA/CKAD-aligned platform patterns for production-grade clusters.',
      key_points: ['Control plane HA and etcd backup', 'RBAC, NetworkPolicy, Pod Security', 'GitOps with Argo CD / Flux', 'HPA/VPA and cluster autoscaling', 'Observability: metrics, logs, traces'],
      notes: 'Position as internal developer platform (IDP) owner: golden paths, Helm charts, and paved roads for product teams.',
      tags: ['kubernetes', 'CKA', 'CKAD', 'GitOps'],
      created_at: ts(3),
    },
    {
      id: 3,
      topic: 'Generative AI with AWS Bedrock',
      category: 'Generative AI',
      status: 'Refresher',
      priority: 'high',
      interview_focus: 'Solutions Architect / AI Leader',
      summary: 'Enterprise GenAI patterns using Bedrock, RAG, and responsible AI controls.',
      key_points: ['Model selection: Claude, Titan, embeddings', 'RAG pipeline: chunking, vector store, retrieval', 'Prompt engineering and guardrails', 'PII redaction and audit logging', 'Cost/latency trade-offs for inference'],
      notes: 'Reference your Bedrock PoC for personalized telecom offers. Emphasize governance, human-in-the-loop, and measurable business outcomes.',
      tags: ['GenAI', 'Bedrock', 'RAG', 'PGP-AIML'],
      created_at: ts(4),
    },
    {
      id: 4,
      topic: 'Agentic AI Architecture (2026)',
      category: 'Generative AI',
      status: 'Hot Topic',
      priority: 'high',
      interview_focus: 'Enterprise / Technology Leader',
      summary: 'Multi-agent systems, tool use, and orchestration for enterprise automation.',
      key_points: ['Agent loops: plan → act → observe', 'Tool/MCP integration boundaries', 'Memory: short-term vs vector long-term', 'Human approval gates for high-risk actions', 'Evaluation harnesses and regression tests'],
      notes: 'Contrast copilot assistants vs autonomous agents. Stress security: least privilege IAM for agent tools.',
      tags: ['agentic-ai', 'MCP', '2026'],
      created_at: ts(5),
    },
    {
      id: 5,
      topic: 'TMF Open Digital Architecture (ODA)',
      category: 'Telecom & BSS',
      status: 'Refresher',
      priority: 'high',
      interview_focus: 'Enterprise Architect (Telecom)',
      summary: 'Component-based BSS modernization aligned to TMF ODA and Open APIs.',
      key_points: ['ODA component map: core, engagement, intelligence', 'Open API / TMF620 product catalog', 'Event-driven integration between components', 'Monolith decomposition for billing and OM', 'Partner ecosystem and API marketplace'],
      notes: 'Differentiator for telecom architect roles. Connect microservices experience to catalog, order, and billing domains.',
      tags: ['TMF', 'BSS', 'telecom', 'Open API'],
      created_at: ts(6),
    },
    {
      id: 6,
      topic: 'Microservices & Event-Driven Architecture',
      category: 'System Design',
      status: 'Refresher',
      priority: 'high',
      interview_focus: 'Software/Solutions Architect',
      summary: 'Distributed systems patterns for scale, resilience, and team autonomy.',
      key_points: ['Bounded contexts and domain-driven design', 'Sync REST vs async Kafka events', 'Saga / outbox for distributed transactions', 'Circuit breakers and bulkheads', 'API versioning and backward compatibility'],
      notes: 'Use AT&T eBill / B2B sales examples. Discuss when NOT to microservice: team size, operational maturity.',
      tags: ['microservices', 'Kafka', 'DDD'],
      created_at: ts(7),
    },
    {
      id: 7,
      topic: 'Enterprise API Strategy',
      category: 'Enterprise Architecture',
      status: 'Refresher',
      priority: 'medium',
      interview_focus: 'Enterprise Architect',
      summary: 'API-led connectivity, governance, and developer experience at enterprise scale.',
      key_points: ['API gateway vs service mesh edge', 'OpenAPI-first design and contract testing', 'Rate limiting, OAuth2/OIDC, mTLS', 'API product thinking and lifecycle', 'Deprecation and sunset policies'],
      notes: 'Bridge SOA heritage to modern API platforms. Mention TMF Open APIs where relevant.',
      tags: ['API', 'OpenAPI', 'SOA'],
      created_at: ts(8),
    },
    {
      id: 8,
      topic: 'System Design Interview Framework',
      category: 'System Design',
      status: 'Refresher',
      priority: 'high',
      interview_focus: 'All architect levels',
      summary: 'Structured approach for 45-minute design discussions.',
      key_points: ['Clarify functional + non-functional requirements', 'Back-of-envelope capacity estimates', 'High-level diagram then deep dives', 'Bottlenecks: DB, cache, queue, CDN', 'Trade-off articulation and failure modes'],
      notes: 'Practice with e-commerce, notification, and data pipeline scenarios from Preparation page.',
      tags: ['system-design', 'interview'],
      created_at: ts(9),
    },
    {
      id: 9,
      topic: 'Technology Leadership & Org Design',
      category: 'Technology Leadership',
      status: 'Refresher',
      priority: 'high',
      interview_focus: 'Technology Leader / Director',
      summary: 'Building teams, roadmaps, and stakeholder alignment for architecture outcomes.',
      key_points: ['Team topologies: stream-aligned, platform, enabling', 'Architecture decision records (ADRs)', 'Build vs buy and build-operate-transfer', 'Mentoring and succession planning', 'Executive communication and KPIs'],
      notes: 'Draw from leading multi-site teams, design thinking savings, and 3-month design-to-deploy wins.',
      tags: ['leadership', 'ADR', 'roadmap'],
      created_at: ts(10),
    },
    {
      id: 10,
      topic: 'Cloud Migration & Modernization',
      category: 'Cloud Architecture',
      status: 'Refresher',
      priority: 'medium',
      interview_focus: 'Solutions Architect',
      summary: 'Patterns for migrating legacy BSS and enterprise workloads to cloud.',
      key_points: ['6Rs: rehost, replatform, refactor, etc.', 'Strangler fig for incremental cutover', 'Data migration strategies and validation', 'Cutover runbooks and rollback', 'Operating model shift to DevOps/SRE'],
      notes: 'Telecom BSS migrations are complex — emphasize phased delivery and risk registers.',
      tags: ['migration', 'modernization'],
      created_at: ts(11),
    },
    {
      id: 11,
      topic: 'Security Architecture & Zero Trust',
      category: 'Security & Compliance',
      status: 'Hot Topic',
      priority: 'high',
      interview_focus: 'Enterprise/Cloud Architect',
      summary: 'Zero trust, IAM, and secure-by-design for cloud-native systems.',
      key_points: ['Never trust, always verify — identity centric', 'Least privilege IAM and permission boundaries', 'Secrets management (Vault, KMS)', 'Supply chain: SBOM, image signing', 'Incident response playbooks'],
      notes: 'Link to production support experience and compliance in regulated telecom environments.',
      tags: ['security', 'zero-trust', 'IAM'],
      created_at: ts(12),
    },
    {
      id: 12,
      topic: 'Data Platform & MLOps',
      category: 'Data & MLOps',
      status: 'Refresher',
      priority: 'medium',
      interview_focus: 'Solutions Architect / AI Leader',
      summary: 'Data lakes, feature stores, and ML lifecycle for production AI.',
      key_points: ['Lakehouse vs warehouse trade-offs', 'Feature store for training/serving parity', 'Model registry, monitoring, drift detection', 'Batch vs real-time inference paths', 'Data governance and lineage'],
      notes: 'Connect PGP-AIML certification and AWS ML Specialty knowledge to platform thinking.',
      tags: ['MLOps', 'data-platform', 'ML'],
      created_at: ts(13),
    },
    {
      id: 13,
      topic: 'FinOps & Cost-Aware Architecture',
      category: 'Cloud Architecture',
      status: 'Hot Topic',
      priority: 'medium',
      interview_focus: 'Cloud Architect / Leader',
      summary: 'Design decisions that balance performance, reliability, and cloud spend.',
      key_points: ['Reserved vs spot vs on-demand sizing', 'Rightsizing and idle resource cleanup', 'Architectural cost drivers: data egress, NAT', 'Unit economics per transaction/API call', 'Showback/chargeback dashboards'],
      notes: 'Leaders expect cost literacy — pair technical depth with business framing.',
      tags: ['FinOps', 'cost'],
      created_at: ts(14),
    },
    {
      id: 14,
      topic: 'Design Thinking for Architecture',
      category: 'Technology Leadership',
      status: 'Refresher',
      priority: 'medium',
      interview_focus: 'Technology Leader',
      summary: 'Human-centered approach to solution design and reusable architecture assets.',
      key_points: ['Empathize → define → ideate → prototype → test', 'Reusable reference architectures', 'PoC vs pilot vs production criteria', 'Stakeholder workshops and journey maps', 'Measuring MM savings and time-to-market'],
      notes: 'Highlight millions in man-month savings from reusable design thinking at Amdocs.',
      tags: ['design-thinking', 'leadership'],
      created_at: ts(15),
    },
    {
      id: 15,
      topic: 'CI/CD & GitOps at Scale',
      category: 'Kubernetes & Platform',
      status: 'Refresher',
      priority: 'medium',
      interview_focus: 'Platform / Software Architect',
      summary: 'Pipeline design for multi-service deployments with security gates.',
      key_points: ['Trunk-based vs GitFlow for microservices', 'Progressive delivery: canary, blue-green', 'Security scanning in pipeline (SAST/DAST)', 'Environment promotion and config separation', 'DORA metrics: deployment frequency, MTTR'],
      notes: 'Tie to container/K8s platform and enterprise release management coordination.',
      tags: ['CI/CD', 'GitOps', 'DevOps'],
      created_at: ts(16),
    },
  ];
}

function seedArchitectInterviews() {
  const ts = (daysAgo) => new Date(Date.now() - daysAgo * 86400000).toISOString();
  database.interviews = [
    { id: 1, question: 'How do you approach multi-cloud strategy without creating operational sprawl?', answer: 'Standardize on a platform layer (K8s, GitOps, observability), use landing zones per cloud with shared IAM patterns, and place workloads by capability fit — not vendor preference. Centralize FinOps and security guardrails.', difficulty: 'Hard', category: 'Cloud Architecture', created_at: ts(1) },
    { id: 2, question: 'Describe your AWS Bedrock architecture for a regulated enterprise use case.', answer: 'VPC-private endpoints, KMS encryption, prompt/response logging, RAG with sanitized corpora, guardrails for PII/toxicity, human review for high-impact outputs, and per-tenant cost caps with CloudWatch dashboards.', difficulty: 'Hard', category: 'Generative AI', created_at: ts(2) },
    { id: 3, question: 'What is TMF ODA and how does it change BSS architecture?', answer: 'ODA defines standardized, interoperable software components for telecom with Open APIs. It shifts BSS from monoliths to composable components (catalog, order, billing) enabling faster partner integration and cloud-native deployment.', difficulty: 'Medium', category: 'Telecom & BSS', created_at: ts(3) },
    { id: 4, question: 'How do you lead architecture decisions across distributed teams?', answer: 'Use ADRs, architecture guild/review board, reference implementations, and clear escalation paths. Balance autonomy with guardrails; measure outcomes via DORA metrics and business KPIs.', difficulty: 'Medium', category: 'Technology Leadership', created_at: ts(4) },
    { id: 5, question: 'Explain saga pattern vs two-phase commit in microservices.', answer: '2PC is strongly consistent but brittle across services. Sagas use choreographed or orchestrated local transactions with compensating actions — better for availability at the cost of eventual consistency.', difficulty: 'Medium', category: 'System Design', created_at: ts(5) },
    { id: 6, question: 'How would you design a zero-trust network for Kubernetes workloads?', answer: 'Identity via OIDC/IRSA, NetworkPolicies default-deny, service mesh mTLS, secrets via external secrets operator, policy-as-code (OPA/Kyverno), and continuous vulnerability scanning.', difficulty: 'Hard', category: 'Security & Compliance', created_at: ts(6) },
    { id: 7, question: 'What differentiates an Enterprise Architect from a Solutions Architect?', answer: 'EA sets portfolio standards, capability maps, and multi-year roadmaps across the enterprise. SA delivers solution designs for specific programs. EA is breadth/governance; SA is depth/delivery — both must align on principles.', difficulty: 'Medium', category: 'Enterprise Architecture', created_at: ts(7) },
    { id: 8, question: 'How do you handle agentic AI risks in production?', answer: 'Scope tools with least privilege, require human approval for irreversible actions, sandbox execution, full audit trails, eval suites for regression, and kill switches with rate limits.', difficulty: 'Hard', category: 'Generative AI', created_at: ts(8) },
  ];
}

function seedQuizQuestions() {
  const ts = (daysAgo) => new Date(Date.now() - daysAgo * 86400000).toISOString();
  database.quiz_questions = [
    { id: 1, category: 'Cloud Architecture', type: 'mcq', difficulty: 'Medium', question: 'What is the primary purpose of a cloud landing zone?', options: ['Minimize compute cost', 'Provide a pre-configured secure foundation for workloads', 'Replace Kubernetes', 'Eliminate the need for IAM'], answer: 'Provide a pre-configured secure foundation for workloads', explanation: 'Landing zones standardize accounts, networking, security, and governance before workloads land.', created_at: ts(1) },
    { id: 2, category: 'Cloud Architecture', type: 'flashcard', difficulty: 'Medium', question: 'Name three drivers of cloud data egress cost.', answer: 'Cross-region replication, NAT gateway traffic, and CDN/origin pull patterns without edge caching.', explanation: null, created_at: ts(2) },
    { id: 3, category: 'Kubernetes & Platform', type: 'mcq', difficulty: 'Hard', question: 'Which Kubernetes object enforces pod-to-pod network rules?', options: ['Ingress', 'NetworkPolicy', 'Deployment', 'ConfigMap'], answer: 'NetworkPolicy', explanation: 'NetworkPolicy controls traffic at L3/L4 between pods; Ingress handles external HTTP routing.', created_at: ts(3) },
    { id: 4, category: 'Kubernetes & Platform', type: 'flashcard', difficulty: 'Medium', question: 'What problem does GitOps solve?', answer: 'Declarative desired state in Git with automated reconciliation to cluster — auditability, rollback, and consistent deployments.', explanation: null, created_at: ts(4) },
    { id: 5, category: 'Generative AI', type: 'mcq', difficulty: 'Medium', question: 'In a RAG architecture, what is the vector database used for?', options: ['Training foundation models', 'Storing embedding-indexed chunks for semantic retrieval', 'Replacing the LLM', 'User authentication'], answer: 'Storing embedding-indexed chunks for semantic retrieval', explanation: 'Embeddings enable similarity search to ground LLM responses in enterprise documents.', created_at: ts(5) },
    { id: 6, category: 'Generative AI', type: 'flashcard', difficulty: 'Hard', question: 'List three enterprise guardrails for GenAI deployments.', answer: 'PII detection/redaction, content filtering/toxicity checks, and human-in-the-loop for high-risk decisions.', explanation: null, created_at: ts(6) },
    { id: 7, category: 'Enterprise Architecture', type: 'mcq', difficulty: 'Medium', question: 'What does an Architecture Decision Record (ADR) capture?', options: ['Sprint velocity', 'A single architecture decision with context and consequences', 'Unit test coverage', 'Cloud invoice breakdown'], answer: 'A single architecture decision with context and consequences', explanation: 'ADRs document why a decision was made for future teams and audits.', created_at: ts(7) },
    { id: 8, category: 'System Design', type: 'mcq', difficulty: 'Hard', question: 'When is eventual consistency typically acceptable?', options: ['Bank ledger with strict ACID', 'Social media like counts or notification feeds', 'Single-node SQLite transactions', 'Password hash storage'], answer: 'Social media like counts or notification feeds', explanation: 'High-availability distributed systems often trade strict consistency for availability and partition tolerance.', created_at: ts(8) },
    { id: 9, category: 'System Design', type: 'flashcard', difficulty: 'Medium', question: 'What is the strangler fig pattern?', answer: 'Incrementally replace legacy system functionality by routing traffic to new services until the monolith can be retired.', explanation: null, created_at: ts(9) },
    { id: 10, category: 'Technology Leadership', type: 'mcq', difficulty: 'Medium', question: 'In Team Topologies, a platform team primarily provides:', options: ['Project management', 'Self-service capabilities that reduce cognitive load on stream teams', 'Manual QA sign-off', 'Annual budget approval'], answer: 'Self-service capabilities that reduce cognitive load on stream teams', explanation: 'Platform teams build paved roads (IDP) so product teams deliver faster with guardrails.', created_at: ts(10) },
    { id: 11, category: 'Telecom & BSS', type: 'mcq', difficulty: 'Medium', question: 'TMF Open APIs are primarily intended to:', options: ['Replace Kubernetes APIs', 'Standardize telecom component interoperability', 'Define CSS frameworks', 'Manage payroll'], answer: 'Standardize telecom component interoperability', explanation: 'TMF APIs enable catalog, order, and billing components to integrate in an ODA ecosystem.', created_at: ts(11) },
    { id: 12, category: 'Telecom & BSS', type: 'flashcard', difficulty: 'Medium', question: 'What BSS domains pair with product catalog and order management?', answer: 'Billing, fulfillment, inventory, and customer management — often event-linked across the quote-to-cash flow.', explanation: null, created_at: ts(12) },
    { id: 13, category: 'Security & Compliance', type: 'mcq', difficulty: 'Hard', question: 'Zero trust core principle is:', options: ['Trust internal network traffic by default', 'Never trust, always verify every request', 'Disable MFA for service accounts', 'Use shared admin passwords'], answer: 'Never trust, always verify every request', explanation: 'Identity and context determine access regardless of network location.', created_at: ts(13) },
    { id: 14, category: 'Data & MLOps', type: 'flashcard', difficulty: 'Medium', question: 'What is model drift?', answer: 'Degradation of model performance over time as production data distribution shifts from training data.', explanation: null, created_at: ts(14) },
    { id: 15, category: 'Data & MLOps', type: 'mcq', difficulty: 'Medium', question: 'A feature store mainly helps with:', options: ['UI theming', 'Consistent features between training and online inference', 'DNS routing', 'Container image builds'], answer: 'Consistent features between training and online inference', explanation: 'Feature stores prevent training-serving skew in ML systems.', created_at: ts(15) },
    { id: 16, category: 'Generative AI', type: 'mcq', difficulty: 'Hard', question: 'Agentic AI differs from a simple chatbot primarily because agents:', options: ['Only return static FAQs', 'Plan multi-step actions and use tools autonomously within guardrails', 'Cannot access APIs', 'Require no evaluation'], answer: 'Plan multi-step actions and use tools autonomously within guardrails', explanation: 'Agents loop through reasoning and tool calls — requiring stronger governance.', created_at: ts(16) },
    { id: 17, category: 'Cloud Architecture', type: 'flashcard', difficulty: 'Easy', question: 'What are the 6Rs of cloud migration?', answer: 'Rehost, replatform, refactor/re-architect, repurchase, retire, and retain.', explanation: null, created_at: ts(17) },
    { id: 18, category: 'Technology Leadership', type: 'flashcard', difficulty: 'Medium', question: 'Name two DORA metrics relevant to architecture leadership.', answer: 'Deployment frequency and mean time to recovery (MTTR) — plus change failure rate and lead time for changes.', explanation: null, created_at: ts(18) },
  ];
}

function getLearningEnrichments() {
  return {
    1: {
      deep_dive:
        'Multi-cloud is not "use every cloud equally" — it is deliberate workload placement. Interview narrative: start with business drivers (latency, compliance, vendor negotiation, acquired subsidiaries), then map to landing zones per cloud. Discuss centralized identity (SSO federation), shared observability, and a single IaC/Terraform module library with cloud-specific implementations. Mention your migration experience: wave planning, dependency mapping, and executive dashboards for FinOps.',
      extra_key_points: [
        'Sovereignty and data residency drive region/account design',
        'Inter-cloud connectivity: VPN, Direct Connect, ExpressRoute, Cloud Interconnect',
        'Platform engineering team owns golden paths across clouds',
      ],
      resources: [
        { title: 'AWS Landing Zone', url: 'https://aws.amazon.com/solutions/implementations/aws-landing-zone/', type: 'article' },
        { title: 'Azure Cloud Adoption Framework', url: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/', type: 'article' },
        { title: 'Google Cloud Architecture Framework', url: 'https://cloud.google.com/architecture/framework', type: 'article' },
      ],
    },
    2: {
      deep_dive:
        'Platform engineering interview angle: you are not "the Kubernetes admin" — you enable product teams via IDP. Cover cluster lifecycle (upgrade strategy, node pools), multi-tenancy (namespaces, quotas, RBAC), and day-2 ops (backup etcd, disaster recovery drills). Tie CKA/CKAD to real incidents: pod crash loops, DNS failures, resource limits.',
      extra_key_points: [
        'Cluster upgrade strategy: blue-green node pools vs in-place',
        'Service mesh when: mTLS, traffic shifting, observability at L7',
        'Cost visibility: Kubecost, rightsizing requests/limits',
      ],
      resources: [
        { title: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/home/', type: 'article' },
        { title: 'CNCF GitOps Principles', url: 'https://opengitops.dev/', type: 'article' },
        { title: 'Platform Engineering Overview', url: 'https://platformengineering.org/', type: 'video' },
      ],
    },
    3: {
      deep_dive:
        'Bedrock interview story: PoC for personalized telecom offers — emphasize data boundaries, model selection criteria (latency, cost, multilingual), and evaluation (human rubric + automated checks). Cover Knowledge Bases, Agents, and Guardrails. Discuss when to fine-tune vs RAG vs prompt engineering.',
      extra_key_points: [
        'Bedrock Knowledge Bases vs custom OpenSearch/pgvector',
        'Inference profiles and provisioned throughput for SLA workloads',
        'Responsible AI: bias testing, red-teaming, model cards',
      ],
      resources: [
        { title: 'Amazon Bedrock User Guide', url: 'https://docs.aws.amazon.com/bedrock/', type: 'article' },
        { title: 'AWS Generative AI Solutions', url: 'https://aws.amazon.com/ai/generative-ai/', type: 'article' },
        { title: 'RAG Architecture Patterns', url: 'https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/what-is-rag.html', type: 'article' },
      ],
    },
    4: {
      deep_dive:
        '2026 hot topic: agents that plan, call tools (APIs, MCP servers), and iterate. Interview framing: copilot (human-driven) vs agent (goal-driven with guardrails). Discuss orchestration frameworks, tool schemas, memory tiers, and eval harnesses. Security: sandboxing, approval workflows, audit logs.',
      extra_key_points: [
        'ReAct vs plan-and-execute agent patterns',
        'Tool routing and schema validation for LLM calls',
        'Cost controls: max steps, token budgets per session',
      ],
      resources: [
        { title: 'Anthropic: Building Effective Agents', url: 'https://www.anthropic.com/research/building-effective-agents', type: 'article' },
        { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/', type: 'article' },
        { title: 'AWS Bedrock Agents', url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html', type: 'article' },
      ],
    },
    5: {
      deep_dive:
        'TMF ODA is your telecom differentiator. Explain component boundaries (party, product, order, billing), Open API catalog (TMF620/622/632), and event-driven decoupling. Map your BSS monolith experience to ODA migration waves. Discuss API-first partner onboarding.',
      extra_key_points: [
        'ODA Canvas and component certification',
        'Event Hub for asynchronous BSS integration',
        'Monolith strangler aligned to ODA component map',
      ],
      resources: [
        { title: 'TMF Open Digital Architecture', url: 'https://www.tmforum.org/oda/', type: 'article' },
        { title: 'TMF Open API Catalog', url: 'https://www.tmforum.org/oda/open-apis/', type: 'article' },
        { title: 'ODA Component Definitions', url: 'https://www.tmforum.org/oda/directory/components-and-entities/', type: 'article' },
      ],
    },
    6: {
      deep_dive:
        'Microservices interview: start with team topology and Conway\'s Law. Cover sync vs async boundaries, idempotency, distributed tracing, and schema evolution. Your AT&T eBill example: high read traffic, batch windows, integration with legacy SOAP/REST hybrids.',
      extra_key_points: [
        'Database-per-service vs shared DB anti-pattern',
        'CQRS when read/write profiles diverge sharply',
        'Contract testing (Pact) for consumer-driven APIs',
      ],
      resources: [
        { title: 'Microservices.io Patterns', url: 'https://microservices.io/patterns/index.html', type: 'article' },
        { title: 'Martin Fowler: Microservices', url: 'https://martinfowler.com/articles/microservices.html', type: 'article' },
        { title: 'Enterprise Integration Patterns', url: 'https://www.enterpriseintegrationpatterns.com/', type: 'article' },
      ],
    },
    7: {
      deep_dive:
        'Enterprise API strategy spans technology and governance. Discuss API product owners, developer portals, lifecycle (design → publish → deprecate), and federation across business units. Connect SOA heritage to API mesh / gateway consolidation.',
      extra_key_points: [
        'API versioning: URI vs header vs content negotiation',
        'Internal vs partner vs public API tiers',
        'GraphQL at BFF layer vs REST at domain services',
      ],
      resources: [
        { title: 'OpenAPI Specification', url: 'https://swagger.io/specification/', type: 'article' },
        { title: 'Google API Design Guide', url: 'https://cloud.google.com/apis/design', type: 'article' },
        { title: 'TMF API Design Guidelines', url: 'https://www.tmforum.org/resources/', type: 'article' },
      ],
    },
    8: {
      deep_dive:
        'System design rubric: requirements (5 min), estimation (5 min), HLD (10 min), deep dives (15 min), wrap-up (5 min). Practice drawing load balancers, caches, queues, DB primary/replica, CDN. Always state assumptions. For architect level, emphasize operability and cost.',
      extra_key_points: [
        'CAP/PACELC framing for storage and consistency choices',
        'Hot partition detection and mitigation (sharding keys)',
        'SLI/SLO definition as part of design',
      ],
      resources: [
        { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'article' },
        { title: 'ByteByteGo Newsletter', url: 'https://blog.bytebytego.com/', type: 'article' },
        { title: 'Gaurav Sen System Design', url: 'https://www.youtube.com/@gkcs0', type: 'video' },
      ],
    },
    9: {
      deep_dive:
        'Technology leadership interviews probe influence without authority. Prepare STAR stories: design thinking savings, 3-month design-to-deploy, mentoring offshore teams, client-facing production support. Discuss architecture governance that enables speed — not bureaucracy.',
      extra_key_points: [
        'Stakeholder mapping: business, product, security, ops',
        'Talent: T-shaped engineers, architecture champions in squads',
        'Roadmap: horizon 1/2/3 portfolio for architecture investments',
      ],
      resources: [
        { title: 'Team Topologies', url: 'https://teamtopologies.com/', type: 'article' },
        { title: 'DORA Research', url: 'https://dora.dev/', type: 'article' },
        { title: 'Architecture Decision Records', url: 'https://adr.github.io/', type: 'article' },
      ],
    },
    10: {
      deep_dive:
        'Cloud migration at enterprise scale: discovery, dependency graphs, landing zone readiness, pilot wave, scale wave. Address organizational change: ops model, skill gaps, and hybrid runbooks during transition. Telecom BSS adds data migration complexity and billing cutover windows.',
      extra_key_points: [
        'Migration factory: repeatable playbook per app archetype',
        'Mainframe/SOA coexistence during transition',
        'Business continuity testing before cutover',
      ],
      resources: [
        { title: 'AWS Migration Hub', url: 'https://aws.amazon.com/migration-hub/', type: 'article' },
        { title: 'Azure Migrate', url: 'https://azure.microsoft.com/products/azure-migrate/', type: 'article' },
        { title: 'Strangler Fig Pattern', url: 'https://martinfowler.com/bliki/StranglerFig.html', type: 'article' },
      ],
    },
    11: {
      deep_dive:
        'Zero trust for cloud-native: identity is the perimeter. Cover SSO/OIDC, workload identity (IRSA, workload federation), secrets rotation, and policy-as-code. In regulated telecom, map to audit evidence and incident response integration.',
      extra_key_points: [
        'CSPM and CIEM for cloud posture management',
        'SBOM and signed artifacts in supply chain',
        'Break-glass access with full audit trail',
      ],
      resources: [
        { title: 'NIST Zero Trust Architecture', url: 'https://www.nist.gov/publications/zero-trust-architecture', type: 'article' },
        { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/', type: 'article' },
        { title: 'CISA Zero Trust Maturity Model', url: 'https://www.cisa.gov/zero-trust-maturity-model', type: 'article' },
      ],
    },
    12: {
      deep_dive:
        'MLOps bridges your PGP-AIML background to platform architecture. Cover feature pipelines, model registry, A/B testing inference routes, and monitoring (drift, latency, cost). For GenAI, add prompt/version management and eval datasets.',
      extra_key_points: [
        'Batch vs online feature computation',
        'Shadow deployments for model upgrades',
        'Lineage from raw data to model artifact',
      ],
      resources: [
        { title: 'Google MLOps Guide', url: 'https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning', type: 'article' },
        { title: 'AWS ML Best Practices', url: 'https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/welcome.html', type: 'article' },
        { title: 'Made With ML', url: 'https://madewithml.com/', type: 'article' },
      ],
    },
    13: {
      deep_dive:
        'FinOps is a leadership competency in 2026. Articulate unit economics, showback dashboards, and architecture decisions that reduce waste (right-sizing, graviton, spot for batch, caching to cut egress). Pair technical optimization with engineering accountability.',
      extra_key_points: [
        'Tagging strategy: owner, cost-center, environment, service',
        'Anomaly detection on daily spend',
        'Architecture review gate for cost impact',
      ],
      resources: [
        { title: 'FinOps Foundation', url: 'https://www.finops.org/', type: 'article' },
        { title: 'AWS Cost Optimization', url: 'https://aws.amazon.com/aws-cost-management/', type: 'article' },
        { title: 'Cloud Financial Management', url: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/', type: 'article' },
      ],
    },
    14: {
      deep_dive:
        'Design thinking saved millions in MM at Amdocs — use this as a leadership story. Walk through workshop facilitation, persona/journey mapping, prototype validation, and translating insights into reusable architecture components. Shows customer-centric architecture beyond diagrams.',
      extra_key_points: [
        'Reusable component libraries from design thinking outputs',
        'Rapid PoC criteria: learn fast, fail cheap',
        'Bridging UX research and technical feasibility',
      ],
      resources: [
        { title: 'IDEO Design Thinking', url: 'https://designthinking.ideo.com/', type: 'article' },
        { title: 'Google Design Sprint', url: 'https://www.gesprint.com/', type: 'article' },
        { title: 'Nielsen Norman Group', url: 'https://www.nngroup.com/', type: 'article' },
      ],
    },
    15: {
      deep_dive:
        'GitOps and CI/CD at scale: trunk-based development, feature flags, progressive delivery, and automated rollback. For 40+ microservices, discuss pipeline templates, artifact promotion, and environment parity. Security gates: SAST, dependency scan, container scan.',
      extra_key_points: [
        'DORA metrics as architecture team KPIs',
        'Deployment windows vs continuous deployment in regulated domains',
        'Immutable infrastructure and cattle-not-pets',
      ],
      resources: [
        { title: 'Argo CD Documentation', url: 'https://argo-cd.readthedocs.io/', type: 'article' },
        { title: 'Continuous Delivery Book', url: 'https://continuousdelivery.com/', type: 'article' },
        { title: 'GitHub Actions / GitLab CI Docs', url: 'https://docs.github.com/en/actions', type: 'article' },
      ],
    },
  };
}

function applyLearningEnrichments() {
  const enrichments = getLearningEnrichments();
  database.learnings = database.learnings.map((learning) => {
    const enrichment = enrichments[learning.id] || {};
    const keyPoints = [...(learning.key_points || [])];
    (enrichment.extra_key_points || []).forEach((point) => {
      if (!keyPoints.includes(point)) keyPoints.push(point);
    });
    return {
      ...learning,
      key_points: keyPoints,
      deep_dive: learning.deep_dive || enrichment.deep_dive || '',
      resources: learning.resources?.length ? learning.resources : enrichment.resources || [],
      source: learning.source || 'curated',
      is_private: learning.is_private ?? false,
    };
  });
}

function seedPreparationScenarios() {
  const ts = (daysAgo) => new Date(Date.now() - daysAgo * 86400000).toISOString();
  database.preparation_scenarios = [
    { id: 1, scenario: 'Design a multi-tenant B2B sales platform on AWS for a telecom provider: identity, catalog (TMF620), order capture, and integration with legacy billing. Address scalability, security, and 99.95% availability.', topic: 'Enterprise Architecture', created_at: ts(1) },
    { id: 2, scenario: 'Your org wants GenAI-powered customer offer personalization using Bedrock. Design the architecture including data privacy, evaluation, cost controls, and rollout plan.', topic: 'Generative AI', created_at: ts(2) },
    { id: 3, scenario: 'Lead a Kubernetes platform migration for 40 microservices. Define team structure, migration waves, observability, and rollback strategy.', topic: 'Technology Leadership', created_at: ts(3) },
    { id: 4, scenario: 'A BSS monolith causes 12-hour release cycles. Propose a modernization roadmap using strangler fig, event-driven integration, and ODA-aligned components.', topic: 'Telecom & BSS', created_at: ts(4) },
    { id: 5, scenario: 'Design a real-time analytics pipeline ingesting 500K events/sec from network elements with ML-based anomaly detection and executive dashboards.', topic: 'Data & MLOps', created_at: ts(5) },
  ];
}

function seedDatabase() {
  seedArchitectLearnings();
  applyLearningEnrichments();
  seedArchitectInterviews();
  seedQuizQuestions();
  seedPreparationScenarios();
  database.quiz_attempts = [];
  database.metadata = { version: CONTENT_VERSION, created: new Date().toISOString(), profile: 'architect-leader-2026' };
}

function migrateDatabase() {
  let changed = false;

  if (!database.quiz_questions) {
    database.quiz_questions = [];
    changed = true;
  }
  if (!database.quiz_attempts) {
    database.quiz_attempts = [];
    changed = true;
  }

  const version = database.metadata?.version || '1.0.0';

  if (version < '2.0.0') {
    seedArchitectLearnings();
    seedArchitectInterviews();
    seedQuizQuestions();
    seedPreparationScenarios();
    changed = true;
    console.log('⬆️  Migrated content to v2.0.0 (architect-leader-2026)');
  }

  if (version < '2.1.0') {
    applyLearningEnrichments();
    changed = true;
    console.log('⬆️  Enriched learnings with deep dives and references (v2.1.0)');
  }

  if (changed) {
    database.metadata = {
      ...database.metadata,
      version: CONTENT_VERSION,
      profile: 'architect-leader-2026',
      migrated_at: new Date().toISOString(),
    };
    saveDatabase();
  }
}

function loadDatabase() {
  try {
    if (existsSync(dbPath)) {
      database = JSON.parse(readFileSync(dbPath, 'utf8'));
      console.log('✅ Loaded JSON database');
      migrateDatabase();
    } else {
      seedDatabase();
      saveDatabase();
      console.log('✅ Created database with architect-leader seed data');
    }
  } catch (error) {
    console.error('Database error:', error);
    seedDatabase();
    saveDatabase();
  }
}

function saveDatabase() {
  writeFileSync(dbPath, JSON.stringify(database, null, 2));
}

function getNextId(table) {
  const items = database[table] || [];
  return Math.max(0, ...items.map((item) => item.id)) + 1;
}

function extractTableName(query) {
  const match = query.match(/(?:FROM|INTO|UPDATE)\s+(\w+)/i);
  return match ? match[1] : null;
}

function createItem(table, params) {
  const schemas = {
    learnings: ['topic', 'category', 'status', 'notes', 'summary', 'interview_focus', 'priority'],
    interviews: ['question', 'answer', 'difficulty', 'category'],
    preparation_scenarios: ['scenario', 'topic'],
    quiz_questions: ['category', 'type', 'difficulty', 'question', 'answer', 'options', 'explanation'],
    quiz_attempts: ['mode', 'categories', 'score', 'total', 'duration_seconds', 'details'],
  };
  const item = { created_at: new Date().toISOString() };
  (schemas[table] || []).forEach((field, i) => {
    if (params[i] !== undefined) item[field] = params[i];
  });
  return item;
}

const dbInterface = {
  all: (query) => {
    const table = extractTableName(query);
    return database[table] ? [...database[table]].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : [];
  },

  get: (query, params = []) => {
    const table = extractTableName(query);
    if (!database[table]) return null;
    return params[0] ? database[table].find((item) => item.id === params[0]) || null : database[table][0] || null;
  },

  run: (query, ...params) => {
    const table = extractTableName(query);
    if (!database[table]) return { lastID: 0, changes: 0 };

    try {
      if (query.includes('INSERT')) {
        const id = getNextId(table);
        const newItem = { id, ...createItem(table, params) };
        database[table].push(newItem);
        saveDatabase();
        return { lastID: id, changes: 1 };
      }
      if (query.includes('UPDATE')) {
        const id = params[params.length - 1];
        const index = database[table].findIndex((item) => item.id === id);
        if (index !== -1) {
          database[table][index] = {
            ...database[table][index],
            ...createItem(table, params.slice(0, -1)),
            updated_at: new Date().toISOString(),
          };
          saveDatabase();
          return { lastID: 0, changes: 1 };
        }
      }
      if (query.includes('DELETE')) {
        const initialLength = database[table].length;
        database[table] = database[table].filter((item) => item.id !== params[0]);
        const changes = initialLength - database[table].length;
        if (changes > 0) saveDatabase();
        return { lastID: 0, changes };
      }
    } catch (error) {
      console.error('DB operation error:', error);
    }

    return { lastID: 0, changes: 0 };
  },

  getCategories: () => ARCHITECT_CATEGORIES,

  filterQuizQuestions: ({ categories = [], type, limit = 20, source = 'curated' }) => {
    let items = [];

    if (source === 'curated' || source === 'mixed') {
      items = database.quiz_questions.filter((q) => !q.source || q.source === 'curated');
      if (categories.length > 0) {
        items = items.filter((q) => categories.includes(q.category));
      }
      if (type) {
        items = items.filter((q) => q.type === type);
      }
    }

    if (source === 'personal' || source === 'mixed') {
      const personal = dbInterface.generatePersonalQuiz({ categories, type, limit: limit * 2 });
      items = [...items, ...personal];
    }

    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items.slice(0, limit);
  },

  getLearnings: ({ includePrivate = true } = {}) => {
    return database.learnings
      .filter((l) => includePrivate || !l.is_private)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  getLearningById: (id) => database.learnings.find((l) => l.id === Number(id)) || null,

  createLearning: (body) => {
    const id = getNextId('learnings');
    const item = {
      id,
      topic: body.topic,
      category: body.category,
      status: body.status || 'Personal',
      priority: body.priority || 'medium',
      interview_focus: body.interview_focus || '',
      summary: body.summary || '',
      notes: body.notes || '',
      key_points: body.key_points || [],
      deep_dive: body.deep_dive || '',
      resources: body.resources || [],
      tags: body.tags || [],
      source: 'personal',
      is_private: body.is_private ?? true,
      created_at: new Date().toISOString(),
    };
    database.learnings.push(item);
    saveDatabase();
    return item;
  },

  patchLearning: (id, updates) => {
    const index = database.learnings.findIndex((l) => l.id === Number(id));
    if (index === -1) return null;
    database.learnings[index] = {
      ...database.learnings[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    saveDatabase();
    return database.learnings[index];
  },

  createQuizQuestion: (body) => {
    const id = getNextId('quiz_questions');
    const item = {
      id,
      category: body.category,
      type: body.type || 'flashcard',
      difficulty: body.difficulty || 'Medium',
      question: body.question,
      answer: body.answer,
      options: body.options || [],
      explanation: body.explanation || '',
      source: 'personal',
      learning_id: body.learning_id || null,
      created_at: new Date().toISOString(),
    };
    database.quiz_questions.push(item);
    saveDatabase();
    return item;
  },

  generatePersonalQuiz: ({ categories = [], learningIds = [], type = null, limit = 20 }) => {
    let learnings = database.learnings.filter((l) => !l.is_private || true);
    if (categories.length > 0) {
      learnings = learnings.filter((l) => categories.includes(l.category));
    }
    if (learningIds.length > 0) {
      learnings = learnings.filter((l) => learningIds.includes(l.id));
    }

    const generated = [];

    learnings.forEach((learning) => {
      (learning.key_points || []).forEach((point, idx) => {
        generated.push({
          id: `p-${learning.id}-kp-${idx}`,
          category: learning.category,
          type: 'flashcard',
          difficulty: 'Medium',
          source: 'personal',
          learning_id: learning.id,
          question: `[${learning.topic}] ${point}`,
          answer: learning.notes || learning.summary || point,
          explanation: `From your knowledge base: ${learning.topic}`,
        });
      });

      if (learning.deep_dive) {
        generated.push({
          id: `p-${learning.id}-deep`,
          category: learning.category,
          type: 'flashcard',
          difficulty: 'Hard',
          source: 'personal',
          learning_id: learning.id,
          question: `Deep dive: ${learning.topic}`,
          answer: learning.deep_dive.length > 500 ? `${learning.deep_dive.slice(0, 500)}…` : learning.deep_dive,
          explanation: 'Expanded learn-more content from your knowledge base',
        });
      }

      const distractors = ARCHITECT_CATEGORIES.filter((c) => c !== learning.category)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [learning.category, ...distractors].sort(() => Math.random() - 0.5);
      generated.push({
        id: `p-${learning.id}-mcq-cat`,
        category: learning.category,
        type: 'mcq',
        difficulty: 'Easy',
        source: 'personal',
        learning_id: learning.id,
        question: `Which domain does "${learning.topic}" belong to?`,
        options,
        answer: learning.category,
        explanation: `Topic "${learning.topic}" is categorized under ${learning.category} in your knowledge base.`,
      });
    });

    const savedPersonal = database.quiz_questions.filter((q) => q.source === 'personal');
    let pool = [...generated, ...savedPersonal];

    if (categories.length > 0) {
      pool = pool.filter((q) => categories.includes(q.category));
    }
    if (type) {
      pool = pool.filter((q) => q.type === type);
    }

    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    return pool.slice(0, limit);
  },
};

loadDatabase();
console.log(
  `📊 Database ready: ${database.learnings.length} learnings, ${database.interviews.length} interviews, ${database.preparation_scenarios.length} scenarios, ${database.quiz_questions.length} quiz questions`
);

export default dbInterface;
