
# 🐍 Complete Python Syntax Cheat Sheet (2025 Edition)

This guide provides a quick reference to core *Python syntax*, designed for beginners, students, and professionals preparing for coding interviews or learning Python in 2025.

---

## 1. _Python Basics: Syntax and Print Statements_

```python
# This is a comment
print("Hello, World!")  # Output text to the console
````

---

## 2. *Python Variables and Data Types*

```python
x = 5            # Integer
y = 3.14         # Float
name = "Alice"   # String
is_valid = True  # Boolean
```

📌 *Python is dynamically typed. You don't need to declare types.*

---

## 3. *Python Data Structures Overview*

### *List (Ordered & Mutable)*

```python
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
fruits[1] = "mango"
```

### *Tuple (Ordered & Immutable)*

```python
point = (10, 20)
```

### *Set (Unordered & Unique Items)*

```python
colors = {"red", "green", "blue"}
colors.add("yellow")
```

### *Dictionary (Key-Value Pairs)*

```python
person = {"name": "Bob", "age": 25}
person["age"] = 26
```

---

## 4. *Python Control Flow: Conditionals & Loops*

### *If-Elif-Else Statements*

```python
if x > 0:
    print("Positive")
elif x < 0:
    print("Negative")
else:
    print("Zero")
```

### *For Loop*

```python
for i in range(5):
    print(i)
```

### *While Loop*

```python
while x < 10:
    x += 1
```

### *Break and Continue*

```python
for i in range(5):
    if i == 3:
        break
    if i == 1:
        continue
    print(i)
```

---

## 5. *Python Functions*

```python
def greet(name):
    return f"Hello, {name}"

print(greet("Rohit"))
```

---

## 6. *Lambda (Anonymous) Functions*

```python
add = lambda a, b: a + b
print(add(5, 3))
```

---

## 7. *List Comprehensions in Python*

```python
squares = [x**2 for x in range(10)]
```

Efficient one-liner for generating lists.

---

## 8. *Python Exception Handling (Try-Except Block)*

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
finally:
    print("Done")
```

---

## 9. *Object-Oriented Programming: Classes and Objects*

```python
class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"Hi, I’m {self.name}")

p = Person("Rohit")
p.greet()
```

---

## 10. *Python Modules and Standard Library Imports*

```python
import math
print(math.sqrt(16))

from datetime import datetime
print(datetime.now())
```

---

## 11. *File Handling in Python (Read/Write Files)*

```python
# Write to file
with open("data.txt", "w") as f:
    f.write("Hello World")

# Read from file
with open("data.txt", "r") as f:
    print(f.read())
```

---

## 12. *Most Used Built-in Functions*

```python
len(), type(), int(), float(), str(), input(), range(), sorted(), max(), min(), sum()
```

---

## 13. *Decorators in Python (Function Wrappers)*

```python
def decorator(func):
    def wrapper():
        print("Before function call")
        func()
        print("After function call")
    return wrapper

@decorator
def say_hello():
    print("Hello!")

say_hello()
```

---

## 14. *Generators in Python (Memory Efficient Iteration)*

```python
def count_up_to(n):
    i = 1
    while i <= n:
        yield i
        i += 1

for number in count_up_to(5):
    print(number)
```

---

## 15. *Popular Python Libraries in 2025*

* `numpy` – Scientific computing
* `pandas` – Data analysis and manipulation
* `matplotlib` – Data visualization
* `requests` – HTTP library
* `flask` / `django` – Web development
* `scikit-learn` – Machine learning
* `asyncio` – Async programming

---

## 16. *Type Hinting (Python 3.5+)*

```python
def add(x: int, y: int) -> int:
    return x + y
```

Improves code readability and works with static type checkers like `mypy`.

---

## 17. *Pattern Matching (Python 3.10+ Match-Case Syntax)*

```python
command = "start"

match command:
    case "start":
        print("Starting...")
    case "stop":
        print("Stopping...")
    case _:
        print("Unknown command")
```

---

## 18. *Async / Await (Asynchronous Code Execution)*

```python
import asyncio

async def main():
    await asyncio.sleep(1)
    print("Hello async")

asyncio.run(main())
```

---

### ✅ *Pro Tips for Python Interviews*

* Practice list comprehension and lambda functions.
* Understand class vs instance variables.
* Learn exception patterns and decorators.
* Always read Python Enhancement Proposals (PEPs) for newer features.

---

📌 *Last updated: June 2025*
🔖 *Keywords: Python cheat sheet, python basics, python quick guide, python syntax 2025, python beginner reference*
🧠 *Keep this saved as your Python reference for interviews and projects!*
