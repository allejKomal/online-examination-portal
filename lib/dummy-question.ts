import { QuestionType, Question } from "@/types/question.type";

export const dummyQuestions: Question[] = [];

export const questions: Question[] = [
  {
    id: "q1",
    question:
      "In a client-server architecture, which of the following protocols ensures secure communication over an insecure network by encrypting the data during transmission?",
    options: [
      { id: "o1", option: "HTTP (HyperText Transfer Protocol)" },
      { id: "o2", option: "FTP (File Transfer Protocol)" },
      {
        id: "o3",
        option: "SSL/TLS (Secure Sockets Layer / Transport Layer Security)",
      },
      { id: "o4", option: "SMTP (Simple Mail Transfer Protocol)" },
    ],
    type: QuestionType.SINGLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q2",
    question:
      "Which of the following data structures can be used to efficiently implement a priority queue, and why might one structure be preferred over another in terms of complexity and memory usage?",
    options: [
      {
        id: "o1",
        option:
          "Binary Heap because it provides O(log n) insertion and deletion",
      },
      { id: "o2", option: "Array because it allows O(1) insertion at the end" },
      {
        id: "o3",
        option: "Linked List because it allows easy reordering of elements",
      },
      {
        id: "o4",
        option: "Hash Table because it provides O(1) lookups for keys",
      },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q3",
    question:
      "When designing a distributed system, which of the following CAP theorem properties cannot be guaranteed simultaneously, and why does this limitation exist in practical systems?",
    options: [
      { id: "o1", option: "Consistency" },
      { id: "o2", option: "Availability" },
      { id: "o3", option: "Partition Tolerance" },
      { id: "o4", option: "Durability" },
    ],
    type: QuestionType.SINGLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q4",
    question:
      "Which of the following are primary benefits of using the REST architectural style for building web APIs, and how does it compare to SOAP-based services in terms of simplicity and performance?",
    options: [
      { id: "o1", option: "Stateless communication" },
      { id: "o2", option: "Human-readable URLs and JSON responses" },
      { id: "o3", option: "Tight coupling between client and server" },
      { id: "o4", option: "Requires strict XML formatting for requests" },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q5",
    question:
      "In relational database design, which normal form ensures that there is no partial dependency of any column on the primary key, and what is the significance of achieving this normal form?",
    options: [
      { id: "o1", option: "First Normal Form (1NF)" },
      { id: "o2", option: "Second Normal Form (2NF)" },
      { id: "o3", option: "Third Normal Form (3NF)" },
      { id: "o4", option: "Boyce-Codd Normal Form (BCNF)" },
    ],
    type: QuestionType.SINGLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q6",
    question:
      "Which of the following statements are true about garbage collection in modern programming languages such as Java or C#, and what strategies are commonly used to optimize performance?",
    options: [
      {
        id: "o1",
        option: "Garbage collection completely eliminates memory leaks",
      },
      {
        id: "o2",
        option: "Mark-and-Sweep algorithm is commonly used in many collectors",
      },
      {
        id: "o3",
        option: "Reference counting can lead to circular reference issues",
      },
      {
        id: "o4",
        option:
          "Garbage collection always happens deterministically at fixed intervals",
      },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q7",
    question:
      "When working with version control systems like Git, which of the following actions are performed locally and do not require any interaction with a remote repository?",
    options: [
      { id: "o1", option: "Committing changes" },
      { id: "o2", option: "Checking out a branch" },
      { id: "o3", option: "Pushing to origin" },
      { id: "o4", option: "Stashing changes" },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q8",
    question:
      "In JavaScript, which of the following best explains the concept of event delegation, and why is it useful when dealing with a large number of dynamic DOM elements?",
    options: [
      {
        id: "o1",
        option: "Attaching event handlers to individual elements directly",
      },
      {
        id: "o2",
        option:
          "Using a parent element to handle events for its child elements",
      },
      {
        id: "o3",
        option:
          "Preventing the default behavior of an event using event.preventDefault()",
      },
      {
        id: "o4",
        option: "Stopping event propagation using event.stopPropagation()",
      },
    ],
    type: QuestionType.SINGLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q9",
    question:
      "Which of the following are valid strategies to optimize the performance of a React application by reducing unnecessary re-renders?",
    options: [
      { id: "o1", option: "Using React.memo to memoize functional components" },
      {
        id: "o2",
        option: "Using useCallback and useMemo hooks to cache values",
      },
      { id: "o3", option: "Avoiding the use of keys in lists" },
      { id: "o4", option: "Keeping state as local as possible" },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q10",
    question:
      "In the context of cloud computing, what are the key advantages of using Infrastructure as a Service (IaaS) compared to Platform as a Service (PaaS), particularly in terms of flexibility and control?",
    options: [
      {
        id: "o1",
        option: "Full control over the operating system and hardware",
      },
      {
        id: "o2",
        option: "Automatic scaling and built-in application management",
      },
      {
        id: "o3",
        option: "Ability to install custom software on virtual machines",
      },
      {
        id: "o4",
        option: "Predefined development environment with limited customization",
      },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q11",
    question:
      "Which of the following database isolation levels can prevent dirty reads but still allow non-repeatable reads in concurrent transactions?",
    options: [
      { id: "o1", option: "Read Uncommitted" },
      { id: "o2", option: "Read Committed" },
      { id: "o3", option: "Repeatable Read" },
      { id: "o4", option: "Serializable" },
    ],
    type: QuestionType.SINGLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q12",
    question:
      "When implementing an authentication system using JSON Web Tokens (JWT), which practices are considered best for ensuring security and preventing token-related vulnerabilities?",
    options: [
      { id: "o1", option: "Storing JWTs in localStorage for easy access" },
      { id: "o2", option: "Using short expiration times for tokens" },
      {
        id: "o3",
        option: "Signing tokens with a strong secret or private key",
      },
      {
        id: "o4",
        option: "Avoiding sending tokens over insecure HTTP connections",
      },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q13",
    question:
      "Which of the following are benefits of using containerization with tools like Docker for deploying applications across different environments?",
    options: [
      { id: "o1", option: "Ensures consistent runtime environments" },
      { id: "o2", option: "Reduces dependency conflicts between systems" },
      {
        id: "o3",
        option: "Provides hardware-level virtualization for better isolation",
      },
      {
        id: "o4",
        option: "Allows scaling applications by replicating containers easily",
      },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q14",
    question:
      "Which HTTP status code indicates that the client’s request was valid but the server is refusing to fulfill it, usually due to lack of necessary permissions?",
    options: [
      { id: "o1", option: "401 Unauthorized" },
      { id: "o2", option: "403 Forbidden" },
      { id: "o3", option: "404 Not Found" },
      { id: "o4", option: "500 Internal Server Error" },
    ],
    type: QuestionType.SINGLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q15",
    question:
      "In object-oriented programming, which of the following principles are essential to achieve loose coupling and high cohesion in software design?",
    options: [
      { id: "o1", option: "Encapsulation" },
      { id: "o2", option: "Inheritance" },
      { id: "o3", option: "Polymorphism" },
      { id: "o4", option: "Global variable usage" },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q16",
    question:
      "In CSS, which techniques are commonly used to create responsive layouts that adapt to different screen sizes without breaking the design?",
    options: [
      { id: "o1", option: "Using media queries to apply conditional styles" },
      { id: "o2", option: "Using CSS Grid or Flexbox for flexible layouts" },
      { id: "o3", option: "Setting fixed pixel widths for containers" },
      { id: "o4", option: "Using relative units like %, em, and rem" },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q17",
    question:
      "When implementing caching strategies in web applications, which of the following techniques can help reduce load on the database and improve performance?",
    options: [
      {
        id: "o1",
        option: "Using HTTP caching headers like Cache-Control and ETag",
      },
      { id: "o2", option: "Implementing in-memory caches such as Redis" },
      {
        id: "o3",
        option: "Fetching fresh data for every request without caching",
      },
      {
        id: "o4",
        option: "Using Content Delivery Networks (CDNs) for static assets",
      },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q18",
    question:
      "Which of the following statements correctly describe the differences between synchronous and asynchronous programming models in JavaScript?",
    options: [
      {
        id: "o1",
        option:
          "Synchronous code blocks the execution thread until it completes",
      },
      {
        id: "o2",
        option:
          "Asynchronous code uses promises or callbacks to avoid blocking",
      },
      {
        id: "o3",
        option: "Synchronous code is always faster than asynchronous code",
      },
      { id: "o4", option: "Async/await is syntactic sugar over promises" },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q19",
    question:
      "In microservices architecture, which patterns are commonly used to ensure communication reliability and fault tolerance between services?",
    options: [
      { id: "o1", option: "Circuit Breaker pattern" },
      { id: "o2", option: "Saga pattern for distributed transactions" },
      { id: "o3", option: "Shared database for all services" },
      { id: "o4", option: "Retry logic with exponential backoff" },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q20",
    question:
      "In React, what is the purpose of the key prop when rendering lists of components, and what problems can occur if it is omitted or incorrectly assigned?",
    options: [
      {
        id: "o1",
        option:
          "It uniquely identifies elements to help React efficiently re-render",
      },
      { id: "o2", option: "It is used to pass props down to child components" },
      { id: "o3", option: "It helps React avoid unnecessary DOM operations" },
      { id: "o4", option: "It allows conditional rendering of elements" },
    ],
    type: QuestionType.SINGLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q21",
    question:
      "When using TypeScript, which of the following features provide compile-time type safety and reduce runtime errors in large-scale applications?",
    options: [
      { id: "o1", option: "Interfaces and type aliases" },
      { id: "o2", option: "Optional chaining and nullish coalescing" },
      { id: "o3", option: "Type inference for variables and function returns" },
      { id: "o4", option: "Dynamic typing at runtime" },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q22",
    question:
      "Which of the following indexing strategies in SQL databases can improve query performance but may increase the cost of write operations?",
    options: [
      { id: "o1", option: "Creating composite indexes for multiple columns" },
      { id: "o2", option: "Using clustered indexes on primary keys" },
      { id: "o3", option: "Adding indexes on frequently filtered columns" },
      { id: "o4", option: "Removing all indexes to speed up inserts" },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q23",
    question:
      "In the context of algorithms, which sorting algorithms provide O(n log n) performance in the average case, and what are their space complexities?",
    options: [
      { id: "o1", option: "Merge Sort with O(n log n) and O(n) space" },
      {
        id: "o2",
        option: "Quick Sort with O(n log n) average and O(log n) space",
      },
      { id: "o3", option: "Bubble Sort with O(n log n) complexity" },
      { id: "o4", option: "Heap Sort with O(n log n) and O(1) space" },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q24",
    question:
      "Which of the following are recommended practices for writing secure SQL queries to prevent SQL injection attacks?",
    options: [
      {
        id: "o1",
        option: "Using parameterized queries or prepared statements",
      },
      { id: "o2", option: "Escaping all user input manually" },
      { id: "o3", option: "Avoiding string concatenation in queries" },
      {
        id: "o4",
        option: "Using ORM frameworks with built-in query sanitization",
      },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
  {
    id: "q25",
    question:
      "Which design patterns are categorized under creational patterns in software engineering, and what problem do they aim to solve?",
    options: [
      { id: "o1", option: "Singleton pattern for single instance control" },
      {
        id: "o2",
        option:
          "Factory Method for object creation without specifying concrete classes",
      },
      { id: "o3", option: "Observer pattern for event-based communication" },
      {
        id: "o4",
        option: "Builder pattern for constructing complex objects step by step",
      },
    ],
    type: QuestionType.MULTIPLE_CHOICE,
    positiveMarks: 4,
    negativeMarks: -1,
  },
];
