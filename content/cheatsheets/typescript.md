# TypeScript Quick Cheatsheet: Essential Tips, Tricks & Core Concepts

## Basic TypeScript Types (TypeScript Fundamentals)

```typescript
// Essential primitive types
let isComplete: boolean = false;
let age: number = 25;
let userName: string = "developer123";
let notDefined: undefined = undefined;
let empty: null = null;
let anything: any = "avoid using this when possible";

// Arrays & collection types
let numberList: number[] = [1, 2, 3];
let stringArray: Array<string> = ["TypeScript", "JavaScript", "Node.js"];

// Tuple - fixed length arrays with ordered types
let userInfo: [string, number] = ["john_doe", 28];

// Enum - named constant sets
enum ApiStatus {
  Success = 200,
  NotFound = 404,
  Error = 500
}
```

## Type Inference & Best Practices (TypeScript Tips)

```typescript
// 💡 TIP: Let TypeScript infer types when possible
let inferred = "TypeScript will know this is a string"; // No need for `: string`

// 💡 TIP: Use const assertions for immutable values
const settings = {
  darkMode: true,
  fontSize: 16,
  theme: "dark"
} as const; // All properties become readonly literal types

// 💡 TIP: Choose union types over any
function processValue(value: string | number) {
  // Type is narrowed based on control flow
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows it's a string
  }
  return value * 2; // TypeScript knows it's a number
}

// ⚠️ COMMON MISTAKE: Not using strictNullChecks
// Fix: Enable strictNullChecks in tsconfig.json
function getLength(text: string | null): number {
  if (text === null) return 0;
  return text.length; // Safe access after null check
}
```

## Essential Interfaces & Types (TypeScript Type Definitions)

```typescript
// Interface for object shape definition
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
  readonly createdAt: Date; // Can't be modified after creation
}

// Type alias - alternative to interfaces
type Point = {
  x: number;
  y: number;
};

// 💡 TIP: When to use interface vs type
// Use interface for object shapes that might be extended
// Use type for unions, primitives, tuples, and complex types

// Extending interfaces
interface Employee extends User {
  department: string;
  salary: number;
}

// Index signature for dynamic properties
interface Dictionary {
  [key: string]: string | number;
}
const cache: Dictionary = {
  userId: 42,
  userName: "typescript_dev"
};
```

## Functions in TypeScript (TypeScript Function Types)

```typescript
// Function type definition
type MathOperation = (a: number, b: number) => number;

// Function implementation with parameter & return types
const add: MathOperation = (a, b) => a + b;

// Optional, default & rest parameters
function formatName(
  first: string,
  last: string,
  middle?: string, // Optional
  prefix: string = "Mr./Ms.", // Default
  ...suffixes: string[] // Rest parameters
): string {
  // Implementation
  return `${prefix} ${first} ${middle ? middle + ' ' : ''}${last} ${suffixes.join(' ')}`;
}

// 💡 TIP: Use function overloads for complex type behaviors
function process(input: string): string[];
function process(input: number): number;
function process(input: string | number): string[] | number {
  if (typeof input === "string") {
    return input.split("");
  }
  return input * 2;
}
```

## Advanced Types & Techniques (TypeScript Advanced Concepts)

```typescript
// Union & intersection types
type FormInput = string | number | boolean; // Can be any of these
type Admin = User & { privileges: string[] }; // Has all properties from both

// 💡 TIP: Type narrowing with type guards
function displayValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // Safe string operations
  } else {
    console.log(value.toFixed(2)); // Safe number operations
  }
}

// Literal types for specific values
type Direction = "North" | "South" | "East" | "West";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Utility types (most commonly used)
type UserSummary = Pick<User, "id" | "name">; // Only selected properties
type PartialUser = Partial<User>; // All properties optional
type ReadonlyUser = Readonly<User>; // All properties readonly

// 💡 TIP: Template literal types for string patterns
type EmailDomain = `${string}@${string}.com` | `${string}@${string}.org`;
```

## Generics (TypeScript Generic Programming)

```typescript
// Basic generic function
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Using the generic function
const firstNumber = getFirst<number>([1, 2, 3]); // Type: number | undefined
const firstString = getFirst(["a", "b", "c"]); // Type inference works!

// Generic interfaces
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 💡 TIP: Constraints with extends
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]; // Safe property access
}

// ⚠️ COMMON MISTAKE: Overusing generics
// Only use generics when you need type relationships
```

## Type Assertions & Type Guards (TypeScript Type Safety)

```typescript
// Type assertions (when you know more than TypeScript)
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// Alternative syntax
const ctx = (<HTMLCanvasElement>canvas).getContext("2d");

// Custom type guard with type predicate
function isUser(obj: any): obj is User {
  return obj && 
    typeof obj.id === "number" && 
    typeof obj.name === "string";
}

// Using the type guard
function processEntity(entity: unknown) {
  if (isUser(entity)) {
    console.log(entity.name); // TypeScript knows entity is User
  }
}

// 💡 TIP: The 'unknown' type is safer than 'any'
// Forces you to verify type before operations
```

## TypeScript with React (React TypeScript Patterns)

```tsx
// Function component with props interface
interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: "primary" | "secondary";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  color = "primary",
  disabled = false 
}) => (
  <button 
    onClick={onClick}
    className={`btn-${color}`}
    disabled={disabled}
  >
    {text}
  </button>
);

// 💡 TIP: useState with type inference
const [user, setUser] = useState<User | null>(null);

// 💡 TIP: Event handler types
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Typed event object
};
```

## Essential tsconfig.json Settings (TypeScript Configuration)

```json
{
  "compilerOptions": {
    // Recommended strict settings
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    
    // Modern JavaScript features
    "target": "ES2020",
    "module": "ESNext",
    
    // Module resolution
    "moduleResolution": "node",
    "esModuleInterop": true,
    
    // Path aliases for imports
    "baseUrl": "./src",
    "paths": {
      "@components/*": ["components/*"],
      "@utils/*": ["utils/*"]
    }
  }
}
```

## Top 10 TypeScript Interview Questions & Concepts

1. **What's the difference between `interface` and `type`?**
   - Interfaces can be extended, merged, and are better for object shapes
   - Types can represent unions, primitives, and can't be modified after creation

2. **Explain TypeScript's structural typing system**
   - TypeScript checks compatibility based on structure not names
   - If two objects have the same shape, they're compatible

3. **What are generic type parameters?**
   - Allow types to be specified later, enabling reusable, type-safe components
   - Example: `Array<T>` works with any type

4. **How do you handle nullability in TypeScript?**
   - Use union types with `null` or `undefined`
   - Enable `strictNullChecks` and use conditional checks

5. **What are declaration files (.d.ts)?**
   - Provide type information for JavaScript libraries
   - Enable TypeScript to understand external JavaScript code

6. **Explain `unknown` vs `any` types**
   - `any` bypasses type checking
   - `unknown` requires type checking before operations (safer)

7. **How does type narrowing work?**
   - Using control flow analysis, type guards, and instanceof checks
   - Narrows types within conditional blocks

8. **What are discriminated unions?**
   - Union types with a common field that identifies specific type
   - Used for type-safe pattern matching

9. **What's the `keyof` operator?**
   - Returns union type of all property names from an object type
   - Example: `keyof User` is `"id" | "name" | "email"`

10. **How do you type asynchronous operations?**
    - Use `Promise<T>` for the expected return type
    - Example: `async function getData(): Promise<User[]>`

## 5 Pro TypeScript Tips & Tricks

1. **💡 Use mapped types for transformations**
   ```typescript
   type Nullable<T> = { [P in keyof T]: T[P] | null };
   ```

2. **💡 Consider branded types for type safety**
   ```typescript
   type UserId = string & { readonly __brand: unique symbol };
   function createUserId(id: string): UserId {
     return id as UserId;
   }
   ```

3. **💡 Leverage discriminated unions for state management**
   ```typescript
   type State = 
     | { status: "idle" }
     | { status: "loading" }
     | { status: "success", data: User[] }
     | { status: "error", error: Error };
   ```

4. **💡 Use assertion functions for runtime checks**
   ```typescript
   function assertIsString(value: any): asserts value is string {
     if (typeof value !== "string") {
       throw new Error("Not a string!");
     }
   }
   ```

5. **💡 Create factory functions with generics**
   ```typescript
   function createState<T>(initial: T) {
     let state = initial;
     return {
       get: () => state,
       set: (newState: T) => { state = newState; }
     };
   }
   ```

---

*Keywords: TypeScript tutorial, TypeScript examples, TypeScript advanced concepts, TypeScript with React, TypeScript best practices, TypeScript generics, TypeScript type definitions, TypeScript interview questions, TypeScript type safety, TypeScript configuration*