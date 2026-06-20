// Comprehensive course data for career guidance
export const coursesData = [
  // =========================================================================
  // CORE CODING COURSES — Phase 3 Learning Ecosystem
  // Each course: difficulty, skillsGained, prerequisites, learningOutcomes,
  // careerRelevance, requiredSkills, modules (with lessons & quizzes), projects
  // =========================================================================
  {
    id: 'python',
    name: 'Python Programming',
    stream: 'Science',
    duration: '8 weeks',
    difficulty: 'Beginner',
    totalXP: 2250,
    careerRelevance: 'Python is the primary language for AI, data science, automation, and web backends. It is the most in-demand skill for entry-level tech roles.',
    skillsGained: ['Python Syntax', 'Functions & Modules', 'OOP in Python', 'File I/O', 'Data Structures', 'Error Handling', 'Libraries & Packages', 'Scripting & Automation'],
    prerequisites: ['Basic computer knowledge', 'Logical thinking'],
    learningOutcomes: [
      'Write clean, readable Python programs from scratch',
      'Use built-in data structures: lists, dicts, sets, tuples',
      'Build modular programs with functions and classes',
      'Read/write files and handle runtime errors',
      'Automate repetitive tasks using scripts',
    ],
    requiredSkills: ['Python', 'Scripting', 'OOP', 'Data Analysis', 'Automation'],
    eligibility: { subjects: ['Any'], minPercentage: 0, entranceExams: ['None'] },
    description: 'Master pythonic coding, structured problem solving, and foundation tools for scripting and basic AI.',
    careerPaths: ['Software Engineer', 'Data Scientist', 'Automation Engineer'],
    averageSalary: '6-12 LPA',
    topColleges: ['Online Self-Paced', 'Coursera', 'edX'],
    interests: ['Technology', 'Programming', 'AI'],
    skills: ['Python', 'Coding', 'Logic'],
    workEnvironment: 'Remote/Office',
    futureScope: 'Excellent — standard for AI and automation',
    projects: [
      {
        id: 'python_proj_1',
        level: 'Beginner',
        title: 'Simple Calculator',
        description: 'Build a command-line calculator that handles arithmetic operations, operator precedence, and input validation.',
        skills: ['Functions', 'Control Flow', 'Input Handling'],
        xpReward: 150,
        estimatedTime: '2 hours',
      },
      {
        id: 'python_proj_2',
        level: 'Intermediate',
        title: 'Student Grade Manager',
        description: 'Create a system to add students, record grades, calculate averages, and store data to a CSV file.',
        skills: ['OOP', 'File I/O', 'Data Structures'],
        xpReward: 300,
        estimatedTime: '4 hours',
      },
      {
        id: 'python_proj_3',
        level: 'Advanced',
        title: 'Web Scraper & Report Generator',
        description: 'Build a scraper that fetches structured data from a public website, parses it, and generates a formatted report.',
        skills: ['Libraries', 'Error Handling', 'Automation'],
        xpReward: 500,
        estimatedTime: '8 hours',
      },
    ],
    modules: [
      {
        id: 'py_m1',
        title: 'Python Fundamentals',
        description: 'Variables, data types, input/output, and basic operators.',
        lessons: [
          {
            id: 'py_m1_l1',
            title: 'Variables and Data Types',
            duration: '20 min',
            xpReward: 50,
            concept: 'A variable is a named storage location in memory. Python supports dynamic typing — you do not need to declare the type explicitly. Core types include int, float, str, bool, and NoneType.',
            codeExample: `# Declaring variables
age = 20
name = "Arjun"
gpa = 8.75
is_enrolled = True

# Checking types
print(type(age))       # <class 'int'>
print(type(name))      # <class 'str'>
print(type(gpa))       # <class 'float'>`,
            realWorldExample: 'Every mobile app stores user data as variables. Your username, balance, or score are all stored in typed variables that the program reads and manipulates.',
            challenge: 'Create three variables: your name (str), your age (int), and your CGPA (float). Print all three on separate lines.',
            quiz: [
              { question: 'Which of these is a valid Python variable name?', options: ['2name', 'my_name', 'my-name', 'class'], answer: 1 },
              { question: 'What is the output of type(3.14)?', options: ['int', 'str', 'float', 'double'], answer: 2 },
              { question: 'What keyword is used to get input from the user in Python?', options: ['scanf', 'cin', 'input', 'read'], answer: 2 },
            ],
          },
          {
            id: 'py_m1_l2',
            title: 'Operators and Expressions',
            duration: '18 min',
            xpReward: 50,
            concept: 'Operators perform operations on variables and values. Python has arithmetic (+, -, *, /, //, %, **), comparison (==, !=, <, >), logical (and, or, not), and assignment operators.',
            codeExample: `x = 15
y = 4

print(x + y)    # 19
print(x // y)   # 3  (floor division)
print(x % y)    # 3  (remainder)
print(x ** 2)   # 225 (power)
print(x > 10 and y < 5)  # True`,
            realWorldExample: 'E-commerce platforms use arithmetic and comparison operators to calculate discounts: if price > 1000 and discount_code == "SAVE20": final_price = price * 0.80.',
            challenge: 'Write a program that takes two numbers and prints their sum, difference, product, quotient, and remainder.',
            quiz: [
              { question: 'What does the // operator do in Python?', options: ['Exponentiation', 'Floor division', 'Modulus', 'Integer cast'], answer: 1 },
              { question: 'What is 2 ** 3 in Python?', options: ['6', '8', '9', '5'], answer: 1 },
              { question: 'Which operator checks equality in Python?', options: ['=', ':=', '==', '==='], answer: 2 },
            ],
          },
          {
            id: 'py_m1_l3',
            title: 'Conditional Statements',
            duration: '22 min',
            xpReward: 50,
            concept: 'if, elif, and else statements control which code runs based on conditions. Python uses indentation (4 spaces) to define code blocks — there are no curly braces.',
            codeExample: `marks = 75

if marks >= 90:
    grade = "O"
elif marks >= 75:
    grade = "A"
elif marks >= 60:
    grade = "B"
else:
    grade = "C"

print(f"Your grade is: {grade}")`,
            realWorldExample: 'Banking apps use conditionals to determine transaction approval: if balance >= amount and account_active: approve_transaction() else: decline_transaction().',
            challenge: 'Write a program that takes a number and prints whether it is positive, negative, or zero.',
            quiz: [
              { question: 'What symbol ends an if statement in Python?', options: [';', '{', ':', 'None'], answer: 2 },
              { question: 'How does Python define a code block?', options: ['Curly braces {}', 'BEGIN/END', 'Indentation', 'Parentheses'], answer: 2 },
              { question: 'Which keyword handles multiple conditions after if?', options: ['else if', 'elsif', 'elseif', 'elif'], answer: 3 },
            ],
          },
        ],
      },
      {
        id: 'py_m2',
        title: 'Loops and Iteration',
        description: 'for loops, while loops, break, continue, and range().',
        lessons: [
          {
            id: 'py_m2_l1',
            title: 'for Loops and range()',
            duration: '20 min',
            xpReward: 50,
            concept: 'A for loop iterates over a sequence (list, range, string). range(start, stop, step) generates a sequence of numbers. Use for when you know how many times to repeat.',
            codeExample: `# Print numbers 1 to 5
for i in range(1, 6):
    print(i)

# Iterate over a list
fruits = ["mango", "guava", "banana"]
for fruit in fruits:
    print(fruit.upper())

# Sum of first 10 numbers
total = sum(range(1, 11))
print(total)   # 55`,
            realWorldExample: 'Sending bulk notifications to 10,000 users is done with a for loop: for user in user_list: send_email(user.email, message).',
            challenge: 'Use a for loop to print the multiplication table of 7 from 1 to 10.',
            quiz: [
              { question: 'What does range(1, 5) produce?', options: ['1,2,3,4,5', '1,2,3,4', '0,1,2,3,4', '2,3,4,5'], answer: 1 },
              { question: 'Which keyword exits a loop immediately?', options: ['exit', 'stop', 'break', 'return'], answer: 2 },
              { question: 'What does continue do inside a loop?', options: ['Exits the loop', 'Restarts the program', 'Skips the current iteration', 'Pauses execution'], answer: 2 },
            ],
          },
          {
            id: 'py_m2_l2',
            title: 'while Loops',
            duration: '18 min',
            xpReward: 50,
            concept: 'A while loop continues executing as long as its condition is True. Use while when the number of iterations is unknown. Always ensure the condition eventually becomes False to avoid infinite loops.',
            codeExample: `count = 1
while count <= 5:
    print(f"Count: {count}")
    count += 1

# Password retry example
attempts = 0
password = "secure123"
while attempts < 3:
    entered = input("Enter password: ")
    if entered == password:
        print("Access granted")
        break
    attempts += 1
else:
    print("Account locked")`,
            realWorldExample: 'Games use while loops to keep running until the player wins or loses: while player_health > 0 and enemies_remain: update_game_state().',
            challenge: 'Write a while loop that counts down from 10 to 1 and prints "Launch!" at the end.',
            quiz: [
              { question: 'When does a while loop stop?', options: ['After 10 iterations', 'When condition is False', 'When condition is True', 'Never'], answer: 1 },
              { question: 'What happens in an infinite while loop?', options: ['Program crashes', 'Loop runs indefinitely', 'Python raises SyntaxError', 'Loop skips'], answer: 1 },
              { question: 'How do you safely exit a while loop mid-execution?', options: ['pass', 'continue', 'break', 'return'], answer: 2 },
            ],
          },
          {
            id: 'py_m2_l3',
            title: 'List Comprehensions',
            duration: '20 min',
            xpReward: 50,
            concept: 'List comprehensions are a concise, Pythonic way to create lists. They combine a for loop and optional condition in a single expression: [expression for item in iterable if condition].',
            codeExample: `# Traditional approach
squares = []
for x in range(1, 6):
    squares.append(x ** 2)

# List comprehension (same result)
squares = [x ** 2 for x in range(1, 6)]
print(squares)   # [1, 4, 9, 16, 25]

# With condition — only even numbers
evens = [x for x in range(20) if x % 2 == 0]
print(evens)`,
            realWorldExample: 'Filtering a product catalog: affordable = [p for p in products if p.price < 500 and p.in_stock] — retrieves only affordable, available products in one line.',
            challenge: 'Use a list comprehension to create a list of all numbers between 1 and 50 that are divisible by 3.',
            quiz: [
              { question: 'What does [x*2 for x in range(3)] produce?', options: ['[0,2,4]', '[2,4,6]', '[1,2,3]', '[0,1,2]'], answer: 0 },
              { question: 'Where does the condition go in a list comprehension?', options: ['Before the for', 'After the for', 'Before the expression', 'At the end after if'], answer: 3 },
              { question: 'List comprehensions are faster than which alternative?', options: ['Recursion', 'map()', 'Traditional for loops', 'Generators'], answer: 2 },
            ],
          },
        ],
      },
      {
        id: 'py_m3',
        title: 'Functions and Modules',
        description: 'Defining functions, arguments, return values, scope, and importing modules.',
        lessons: [
          {
            id: 'py_m3_l1',
            title: 'Defining and Calling Functions',
            duration: '22 min',
            xpReward: 50,
            concept: 'A function is a reusable block of code. Define with def, call by name. Functions can accept parameters and return values. Default arguments allow flexible calling.',
            codeExample: `def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Priya"))           # Hello, Priya!
print(greet("Ravi", "Welcome")) # Welcome, Ravi!

def calculate_bmi(weight, height):
    bmi = weight / (height ** 2)
    if bmi < 18.5:
        return bmi, "Underweight"
    elif bmi < 25:
        return bmi, "Normal"
    else:
        return bmi, "Overweight"

bmi, category = calculate_bmi(70, 1.75)
print(f"BMI: {bmi:.2f} — {category}")`,
            realWorldExample: 'Payment gateways use functions like process_payment(amount, method, user_id) that internally validate, charge, and return a success/failure status.',
            challenge: 'Write a function that takes a temperature in Celsius and returns it converted to Fahrenheit.',
            quiz: [
              { question: 'Which keyword defines a function in Python?', options: ['func', 'function', 'def', 'define'], answer: 2 },
              { question: 'What does a function return if no return statement is given?', options: ['0', 'False', 'None', 'Error'], answer: 2 },
              { question: 'What are default argument values?', options: ['Values used when no argument is passed', 'Values auto-cast to strings', 'Global variables', 'Return values'], answer: 0 },
            ],
          },
          {
            id: 'py_m3_l2',
            title: 'Scope and Namespaces',
            duration: '18 min',
            xpReward: 50,
            concept: 'Scope determines where a variable is accessible. Local variables exist only inside a function. Global variables exist throughout the module. Use the global keyword to modify a global variable inside a function.',
            codeExample: `total = 0  # global

def add_to_total(amount):
    global total
    total += amount

add_to_total(100)
add_to_total(250)
print(total)   # 350

def outer():
    x = 10
    def inner():
        nonlocal x
        x += 5
    inner()
    print(x)   # 15

outer()`,
            realWorldExample: 'Cart total in an e-commerce app is a global state that multiple functions (add_item, remove_item, apply_discount) read and modify using scope rules.',
            challenge: 'Create a global counter variable. Write two functions: one that increments it and one that resets it to zero. Call them and print the result.',
            quiz: [
              { question: 'Where is a local variable accessible?', options: ['Everywhere in the file', 'Only inside its function', 'Only inside if blocks', 'Anywhere after declaration'], answer: 1 },
              { question: 'What keyword lets a function modify a global variable?', options: ['extern', 'global', 'shared', 'public'], answer: 1 },
              { question: 'What is nonlocal used for?', options: ['Accessing module-level variables', 'Accessing variables in enclosing (outer) functions', 'Deleting variables', 'Type casting'], answer: 1 },
            ],
          },
          {
            id: 'py_m3_l3',
            title: 'Importing and Using Modules',
            duration: '20 min',
            xpReward: 50,
            concept: 'Modules are Python files containing reusable functions and classes. Use import to load them. Python ships with a standard library (math, os, random, datetime). Third-party packages are installed via pip.',
            codeExample: `import math
import random
from datetime import datetime, timedelta

print(math.sqrt(144))        # 12.0
print(math.pi)               # 3.14159...
print(random.randint(1, 100)) # random int

now = datetime.now()
tomorrow = now + timedelta(days=1)
print(now.strftime("%d-%m-%Y"))
print(tomorrow.strftime("%d-%m-%Y"))`,
            realWorldExample: 'A weather app uses the datetime module to compute "7 days from today", the math module for unit conversions, and requests (third-party) to call weather APIs.',
            challenge: 'Use the math module to calculate the hypotenuse of a right triangle with legs of length 3 and 4.',
            quiz: [
              { question: 'How do you import only the sqrt function from math?', options: ['import math.sqrt', 'from math get sqrt', 'from math import sqrt', 'include math.sqrt'], answer: 2 },
              { question: 'Which module generates random numbers?', options: ['math', 'rand', 'random', 'numpy'], answer: 2 },
              { question: 'What tool installs third-party Python packages?', options: ['npm', 'cargo', 'pip', 'gem'], answer: 2 },
            ],
          },
        ],
      },
      {
        id: 'py_m4',
        title: 'Object Oriented Programming',
        description: 'Classes, objects, inheritance, encapsulation, and polymorphism in Python.',
        lessons: [
          {
            id: 'py_m4_l1',
            title: 'Classes and Objects',
            duration: '25 min',
            xpReward: 50,
            concept: 'A class is a blueprint for creating objects. Objects are instances of classes with their own attributes (data) and methods (behavior). __init__ is the constructor that runs when an object is created.',
            codeExample: `class Student:
    def __init__(self, name, roll, cgpa):
        self.name = name
        self.roll = roll
        self.cgpa = cgpa

    def display(self):
        print(f"[{self.roll}] {self.name} — CGPA: {self.cgpa}")

    def is_distinction(self):
        return self.cgpa >= 9.0

s1 = Student("Arjun", "CS001", 9.2)
s2 = Student("Priya", "CS002", 8.5)

s1.display()
print(s1.is_distinction())  # True
s2.display()`,
            realWorldExample: 'Every product on Amazon is an object of a Product class: Product("Headphones", price=2499, stock=150, rating=4.3) — attributes and methods define how it behaves.',
            challenge: 'Create a BankAccount class with attributes: owner name, balance. Add methods: deposit(amount) and withdraw(amount) with balance check.',
            quiz: [
              { question: 'What method runs when a new object is created?', options: ['__create__', '__new__', '__init__', '__start__'], answer: 2 },
              { question: 'What is self in a class method?', options: ['A global variable', 'A reference to the current object', 'A static method marker', 'A type annotation'], answer: 1 },
              { question: 'What is an instance of a class called?', options: ['Module', 'Function', 'Object', 'Variable'], answer: 2 },
            ],
          },
          {
            id: 'py_m4_l2',
            title: 'Inheritance',
            duration: '22 min',
            xpReward: 50,
            concept: 'Inheritance allows a child class to inherit attributes and methods from a parent class. Use super() to call the parent constructor. Override methods in the child for specialized behavior.',
            codeExample: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return f"{self.name} says: Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says: Meow!"

animals = [Dog("Bruno"), Cat("Luna"), Dog("Max")]
for a in animals:
    print(a.speak())`,
            realWorldExample: 'In a bank system: Account is the parent class. SavingsAccount and CurrentAccount inherit from it, overriding interest_rate() and transaction_limit() with their specific rules.',
            challenge: 'Create a Shape parent class with an area() method. Create subclasses Circle and Rectangle that override area() with their own formulas.',
            quiz: [
              { question: 'How do you define a child class inheriting from Parent?', options: ['class Child extends Parent:', 'class Child(Parent):', 'class Child -> Parent:', 'class Child : Parent:'], answer: 1 },
              { question: 'What does super() do?', options: ['Deletes the parent', 'Calls the parent class method', 'Creates a new object', 'Inherits all variables'], answer: 1 },
              { question: 'What is method overriding?', options: ['Deleting a parent method', 'Redefining a parent method in the child class', 'Calling a parent method twice', 'Adding new parameters to a method'], answer: 1 },
            ],
          },
          {
            id: 'py_m4_l3',
            title: 'Encapsulation and Properties',
            duration: '20 min',
            xpReward: 50,
            concept: 'Encapsulation hides internal implementation details. Use _ (protected) and __ (private) prefixes. Python @property decorators allow controlled attribute access, like getters/setters without verbose syntax.',
            codeExample: `class Temperature:
    def __init__(self, celsius):
        self.__celsius = celsius   # private

    @property
    def celsius(self):
        return self.__celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self.__celsius = value

    @property
    def fahrenheit(self):
        return (self.__celsius * 9/5) + 32

t = Temperature(25)
print(t.fahrenheit)   # 77.0
t.celsius = 100
print(t.fahrenheit)   # 212.0`,
            realWorldExample: 'A user profile class hides the raw password hash (__password_hash) and only exposes a check_password(input) method — never the hash directly.',
            challenge: 'Create a Product class with a private __price attribute. Add a property that returns the price and a setter that raises an error if price is negative.',
            quiz: [
              { question: 'How is a private attribute named in Python?', options: ['private_var', '_var', '__var', '#var'], answer: 2 },
              { question: 'What decorator is used to define a getter property?', options: ['@getter', '@property', '@classmethod', '@staticmethod'], answer: 1 },
              { question: 'What is the purpose of encapsulation?', options: ['Speed up code', 'Hide implementation details and protect data', 'Reduce memory use', 'Enable parallelism'], answer: 1 },
            ],
          },
        ],
      },
      {
        id: 'py_m5',
        title: 'File Handling and Error Management',
        description: 'Reading/writing files, exception handling, and building robust programs.',
        lessons: [
          {
            id: 'py_m5_l1',
            title: 'Reading and Writing Files',
            duration: '22 min',
            xpReward: 50,
            concept: 'Python opens files with open(filename, mode). Modes: "r" (read), "w" (write/overwrite), "a" (append), "r+" (read+write). Always use with blocks for automatic file closing and resource cleanup.',
            codeExample: `# Writing to a file
with open("students.txt", "w") as f:
    f.write("Arjun,CS001,9.2\\n")
    f.write("Priya,CS002,8.5\\n")

# Reading the file
with open("students.txt", "r") as f:
    for line in f:
        parts = line.strip().split(",")
        print(f"Name: {parts[0]}, Roll: {parts[1]}, CGPA: {parts[2]}")

# Appending
with open("students.txt", "a") as f:
    f.write("Ravi,CS003,7.8\\n")`,
            realWorldExample: 'Exam result systems write student marks to CSV files using Python file operations, then read them back to generate individual mark sheets and analytics.',
            challenge: 'Write a program that asks the user for 3 names, saves them to a file (one per line), then reads and prints the file contents.',
            quiz: [
              { question: 'Which mode opens a file for appending without erasing?', options: ['r', 'w', 'a', 'x'], answer: 2 },
              { question: 'What is the benefit of using with open()?', options: ['Faster reads', 'Auto-closes the file', 'Prevents all errors', 'Compresses data'], answer: 1 },
              { question: 'Which method reads the entire file as a string?', options: ['f.line()', 'f.readall()', 'f.read()', 'f.get()'], answer: 2 },
            ],
          },
          {
            id: 'py_m5_l2',
            title: 'Exception Handling',
            duration: '22 min',
            xpReward: 50,
            concept: 'Exceptions are runtime errors. Handle them with try/except blocks. Use specific exception types (ValueError, TypeError, FileNotFoundError) for precise handling. finally always runs. raise re-throws exceptions.',
            codeExample: `def divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Cannot divide by zero.")
        return None
    except TypeError:
        print("Error: Both inputs must be numbers.")
        return None
    finally:
        print("Division attempted.")

print(divide(10, 2))    # 5.0
print(divide(10, 0))    # Error: Cannot divide by zero.
print(divide("a", 2))  # Error: Both inputs must be numbers.`,
            realWorldExample: 'Payment processors wrap every transaction in try/except: if the bank API call raises a NetworkError, the system retries; if it raises a InsufficientFundsError, it notifies the user.',
            challenge: 'Write a function that opens a file and reads its contents, handling FileNotFoundError gracefully with a friendly message instead of crashing.',
            quiz: [
              { question: 'Which block always runs in a try/except/finally structure?', options: ['try', 'except', 'finally', 'else'], answer: 2 },
              { question: 'What error is raised when dividing by zero?', options: ['ValueError', 'ArithmeticError', 'ZeroDivisionError', 'MathError'], answer: 2 },
              { question: 'How do you manually trigger an exception?', options: ['throw', 'error()', 'raise', 'except'], answer: 2 },
            ],
          },
          {
            id: 'py_m5_l3',
            title: 'Working with JSON and CSV',
            duration: '20 min',
            xpReward: 50,
            concept: 'JSON (JavaScript Object Notation) and CSV (Comma-Separated Values) are the two most common data exchange formats. Python\'s json and csv modules handle both natively. json.loads()/json.dumps() for parsing/serializing.',
            codeExample: `import json
import csv

# JSON operations
data = {"name": "Arjun", "skills": ["Python", "SQL"], "cgpa": 9.2}
json_str = json.dumps(data, indent=2)
print(json_str)

parsed = json.loads(json_str)
print(parsed["skills"])   # ['Python', 'SQL']

# Writing CSV
with open("results.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Score"])
    writer.writerow(["Arjun", 92])
    writer.writerow(["Priya", 88])`,
            realWorldExample: 'REST APIs return JSON responses. When you log into Instagram, the server returns JSON with your profile data, posts, and notifications that the app parses and displays.',
            challenge: 'Create a Python dictionary representing a student profile, convert it to a JSON string, print it, then parse it back and print a specific field.',
            quiz: [
              { question: 'Which function converts a Python dict to a JSON string?', options: ['json.parse()', 'json.convert()', 'json.dumps()', 'json.encode()'], answer: 2 },
              { question: 'What does CSV stand for?', options: ['Coded Structured Values', 'Comma-Separated Values', 'Character String Variables', 'Common Schema Variables'], answer: 1 },
              { question: 'Which module handles CSV files in Python?', options: ['file', 'data', 'csv', 'tabular'], answer: 2 },
            ],
          },
        ],
      },
    ],
  },

  // ===== C PROGRAMMING =====
  {
    id: 'c',
    name: 'C Programming Core',
    stream: 'Science',
    duration: '10 weeks',
    difficulty: 'Beginner',
    totalXP: 2250,
    careerRelevance: 'C is the foundational language for systems programming, embedded devices, operating systems, and compilers. Mastery of C gives deep insight into how computers actually work.',
    skillsGained: ['Syntax & Structure', 'Pointers & Memory', 'Arrays & Strings', 'Structures', 'File I/O in C', 'Dynamic Memory', 'Preprocessor Macros', 'Low-level Debugging'],
    prerequisites: ['Basic computer knowledge', 'Mathematical logic'],
    learningOutcomes: [
      'Write compilable C programs using gcc/clang',
      'Understand how pointers and memory addresses work',
      'Manipulate arrays, strings, and structures',
      'Allocate and free dynamic memory safely',
      'Read/write binary and text files in C',
    ],
    requiredSkills: ['C Programming', 'Memory Management', 'Pointers', 'System Programming', 'Embedded Systems'],
    eligibility: { subjects: ['Any'], minPercentage: 0, entranceExams: ['None'] },
    description: 'Understand low-level registers, compiler execution, system variables, pointers, and memory manipulation.',
    careerPaths: ['Systems Programmer', 'Embedded Engineer', 'Game Developer'],
    averageSalary: '5-10 LPA',
    topColleges: ['Online Self-Paced', 'NPTEL', 'Standard Textbooks'],
    interests: ['Technology', 'Embedded Systems', 'Pointers'],
    skills: ['C Programming', 'Memory Management', 'Logic'],
    workEnvironment: 'R&D Labs/Office',
    futureScope: 'Very Good — core of hardware/systems programming',
    projects: [
      { id: 'c_proj_1', level: 'Beginner', title: 'Student Record System', description: 'Build a menu-driven C program to add, display, and search student records stored in arrays of structures.', skills: ['Structures', 'Arrays', 'Input/Output'], xpReward: 150, estimatedTime: '3 hours' },
      { id: 'c_proj_2', level: 'Intermediate', title: 'Dynamic Memory Linked List', description: 'Implement a singly linked list using malloc/free with insert, delete, and display operations.', skills: ['Pointers', 'Dynamic Memory', 'Structs'], xpReward: 300, estimatedTime: '5 hours' },
      { id: 'c_proj_3', level: 'Advanced', title: 'Mini Shell Interpreter', description: 'Build a basic shell that reads commands, forks child processes, and executes system calls using fork()/exec().', skills: ['System Calls', 'Process Management', 'File I/O'], xpReward: 500, estimatedTime: '10 hours' },
    ],
    modules: [
      {
        id: 'c_m1', title: 'C Basics and Compilation',
        description: 'Program structure, data types, printf/scanf, and the compilation pipeline.',
        lessons: [
          { id: 'c_m1_l1', title: 'C Program Structure and Compilation', duration: '20 min', xpReward: 50,
            concept: 'A C program must have a main() function. The preprocessor handles #include and #define before compilation. The compiler (gcc) translates C to machine code. Understand the pipeline: source -> preprocessor -> compiler -> linker -> executable.',
            codeExample: `#include <stdio.h>

int main() {
    printf("Hello, Systems World!\\n");
    return 0;
}

// Compile: gcc hello.c -o hello
// Run:     ./hello`,
            realWorldExample: 'Linux kernel (30 million lines of C) is compiled using gcc with optimization flags. Understanding the compilation pipeline is essential for writing efficient system software.',
            challenge: 'Write a C program that prints your name, age, and college on three separate lines using printf.',
            quiz: [
              { question: 'What is the entry point function in a C program?', options: ['start()', 'begin()', 'main()', 'init()'], answer: 2 },
              { question: 'What does #include <stdio.h> do?', options: ['Imports Python modules', 'Includes standard input/output library', 'Defines main()', 'Allocates memory'], answer: 1 },
              { question: 'Which command compiles a C file named prog.c?', options: ['run prog.c', 'python prog.c', 'gcc prog.c -o prog', 'c prog.c'], answer: 2 },
            ],
          },
          { id: 'c_m1_l2', title: 'Data Types and Variables', duration: '20 min', xpReward: 50,
            concept: 'C is statically typed — every variable must be declared with a type before use. Core types: int (4 bytes), float (4 bytes), double (8 bytes), char (1 byte), long (8 bytes). sizeof() returns the memory size of a type.',
            codeExample: `#include <stdio.h>

int main() {
    int age = 20;
    float gpa = 8.75f;
    double pi = 3.14159265;
    char grade = 'A';

    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
    printf("Pi: %.5lf\\n", pi);
    printf("Grade: %c\\n", grade);
    printf("int size: %lu bytes\\n", sizeof(int));
    return 0;
}`,
            realWorldExample: 'Embedded systems use specific data types (uint8_t, int16_t) to precisely control memory usage on microcontrollers with only 2KB of RAM.',
            challenge: 'Declare variables of each basic C type, assign them values, and print them using the correct format specifiers.',
            quiz: [
              { question: 'Which format specifier prints an integer in C?', options: ['%f', '%s', '%d', '%c'], answer: 2 },
              { question: 'How many bytes does a char occupy in C?', options: ['4', '2', '8', '1'], answer: 3 },
              { question: 'What does sizeof(double) return?', options: ['4', '6', '8', '16'], answer: 2 },
            ],
          },
          { id: 'c_m1_l3', title: 'Operators and Control Flow', duration: '18 min', xpReward: 50,
            concept: 'C uses the same arithmetic/comparison operators as other languages, plus bitwise operators: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift). The ternary operator (condition ? true_val : false_val) is a compact if-else.',
            codeExample: `#include <stdio.h>

int main() {
    int a = 12;   // binary: 1100
    int b = 10;   // binary: 1010

    printf("AND: %d\\n", a & b);   // 1000 = 8
    printf("OR:  %d\\n", a | b);   // 1110 = 14
    printf("XOR: %d\\n", a ^ b);   // 0110 = 6
    printf("Left shift: %d\\n", a << 1); // 24

    // Ternary
    int max = (a > b) ? a : b;
    printf("Max: %d\\n", max);
    return 0;
}`,
            realWorldExample: 'Device drivers use bitwise operators to set/clear specific hardware register bits: status |= (1 << 3) sets bit 3; status &= ~(1 << 3) clears bit 3.',
            challenge: 'Write a C program that uses bitwise AND to check whether a number is odd or even (hint: odd numbers have their last bit set).',
            quiz: [
              { question: 'What is 5 & 3 in binary? (101 & 011)', options: ['7', '1', '6', '2'], answer: 1 },
              { question: 'What does << do in C?', options: ['Right shifts bits', 'Left shifts bits (multiplies by 2)', 'Bitwise NOT', 'Logical AND'], answer: 1 },
              { question: 'What is the ternary operator syntax?', options: ['if(c) a else b', 'c ? a : b', 'a if c else b', 'c then a else b'], answer: 1 },
            ],
          },
        ],
      },
      {
        id: 'c_m2', title: 'Arrays and Strings',
        description: 'One-dimensional arrays, multi-dimensional arrays, and C-style string operations.',
        lessons: [
          { id: 'c_m2_l1', title: 'Arrays in C', duration: '22 min', xpReward: 50,
            concept: 'An array stores a fixed-size sequence of elements of the same type. Indexed from 0. Stored contiguously in memory. C does not perform bounds checking — accessing out-of-range indices causes undefined behavior.',
            codeExample: `#include <stdio.h>

int main() {
    int marks[5] = {85, 92, 78, 95, 88};
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        sum += marks[i];
    }

    printf("Total: %d\\n", sum);
    printf("Average: %.1f\\n", (float)sum / 5);

    // 2D array
    int matrix[2][3] = {{1,2,3},{4,5,6}};
    printf("Element [1][2]: %d\\n", matrix[1][2]);  // 6
    return 0;
}`,
            realWorldExample: 'Image processing libraries store pixel data as 2D arrays of integers. Applying filters is simply iterating over the array and modifying each pixel value.',
            challenge: 'Declare an array of 10 integers, fill it with values 1 to 10, then print the sum and the largest element.',
            quiz: [
              { question: 'What is the index of the first element in a C array?', options: ['1', '-1', '0', 'undefined'], answer: 2 },
              { question: 'What happens when you access an array out of bounds in C?', options: ['Compiler error', 'Runtime exception', 'Undefined behavior', 'Returns 0'], answer: 2 },
              { question: 'How do you declare an integer array of size 5?', options: ['int arr(5)', 'array int[5]', 'int arr[5]', 'int[5] arr'], answer: 2 },
            ],
          },
          { id: 'c_m2_l2', title: 'Strings in C', duration: '22 min', xpReward: 50,
            concept: 'C strings are arrays of char terminated by a null character \\0. String functions are in <string.h>: strlen(), strcpy(), strcat(), strcmp(), strchr(). Never use = to copy strings — use strcpy().',
            codeExample: `#include <stdio.h>
#include <string.h>

int main() {
    char name[50] = "Arjun";
    char greeting[100];

    printf("Length: %lu\\n", strlen(name));  // 5

    strcpy(greeting, "Hello, ");
    strcat(greeting, name);
    printf("%s\\n", greeting);   // Hello, Arjun

    char city[] = "Chennai";
    if (strcmp(city, "Mumbai") == 0)
        printf("Same city\\n");
    else
        printf("Different city\\n");
    return 0;
}`,
            realWorldExample: 'Username validation in C uses strncmp() to compare stored usernames with input, and strlen() to enforce length limits before processing.',
            challenge: 'Write a C program that reads a name from the user, converts every character to uppercase (hint: subtract 32 from lowercase ASCII), and prints the result.',
            quiz: [
              { question: 'What terminates a C string?', options: ['\\n', '\\0', '\\t', 'NULL keyword'], answer: 1 },
              { question: 'Which function copies a string in C?', options: ['strdup', 'strcopy', 'strcpy', 'copy()'], answer: 2 },
              { question: 'What does strcmp() return when strings are equal?', options: ['1', '-1', '0', 'true'], answer: 2 },
            ],
          },
          { id: 'c_m2_l3', title: 'Structures (struct)', duration: '20 min', xpReward: 50,
            concept: 'A struct groups variables of different types under one name. Access members with . (direct) or -> (pointer). typedef creates an alias. Structures are the foundation of complex data modeling in C.',
            codeExample: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    int roll;
    float cgpa;
} Student;

void printStudent(Student *s) {
    printf("[%d] %s — CGPA: %.2f\\n", s->roll, s->name, s->cgpa);
}

int main() {
    Student s1 = {"Arjun", 101, 9.2f};
    Student s2 = {"Priya", 102, 8.5f};

    printStudent(&s1);
    printStudent(&s2);
    return 0;
}`,
            realWorldExample: 'Database engines internally represent rows as structs. A Row struct might have fields for each column value, and arrays of Row structs hold the entire table in memory.',
            challenge: 'Define a struct Book with fields: title, author, and price. Create two Book variables, fill their data, and print all fields.',
            quiz: [
              { question: 'How do you access a struct member via a pointer p?', options: ['p.member', 'p[member]', 'p->member', '*p.member'], answer: 2 },
              { question: 'What does typedef struct do?', options: ['Creates an anonymous struct', 'Creates a named alias for the struct type', 'Allocates memory', 'Defines a union'], answer: 1 },
              { question: 'Which header file contains string functions like strcpy?', options: ['<stdio.h>', '<stdlib.h>', '<string.h>', '<ctype.h>'], answer: 2 },
            ],
          },
        ],
      },
      {
        id: 'c_m3', title: 'Pointers and Memory',
        description: 'Pointer arithmetic, dynamic allocation, and memory management.',
        lessons: [
          { id: 'c_m3_l1', title: 'Pointers Fundamentals', duration: '25 min', xpReward: 50,
            concept: 'A pointer stores the memory address of a variable. Declare with *. Get address with &. Dereference (access the value at the address) with *. Pointer arithmetic moves by the size of the pointed-to type.',
            codeExample: `#include <stdio.h>

int main() {
    int x = 42;
    int *ptr = &x;

    printf("Value of x:       %d\\n", x);
    printf("Address of x:     %p\\n", (void *)&x);
    printf("Value of ptr:     %p\\n", (void *)ptr);
    printf("Dereferenced ptr: %d\\n", *ptr);

    *ptr = 100;   // Modify x through pointer
    printf("x is now: %d\\n", x);   // 100
    return 0;
}`,
            realWorldExample: 'Linux system calls receive pointers as arguments. read(fd, buffer, count) takes a pointer to a buffer where it writes the data — pointer is the address where data should be stored.',
            challenge: 'Write a swap function that takes two int pointers and swaps the values of the two integers they point to. Test it in main().',
            quiz: [
              { question: 'What does the & operator do?', options: ['Dereferences a pointer', 'Returns the memory address of a variable', 'Performs bitwise AND', 'Declares a pointer'], answer: 1 },
              { question: 'How do you dereference a pointer p to get its value?', options: ['&p', '*p', 'p.val', 'p->val'], answer: 1 },
              { question: 'What is pointer arithmetic in C?', options: ['Arithmetic on addresses (moves by type size)', 'Normal math on pointers', 'Allocating memory', 'Accessing struct fields'], answer: 0 },
            ],
          },
          { id: 'c_m3_l2', title: 'Dynamic Memory Allocation', duration: '25 min', xpReward: 50,
            concept: 'malloc() allocates a block of uninitialized memory. calloc() allocates and zeroes the memory. realloc() resizes an existing block. free() releases memory back to the heap. Always check if malloc returns NULL.',
            codeExample: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int *)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) arr[i] = (i + 1) * 10;
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");

    free(arr);   // ALWAYS free allocated memory
    arr = NULL;  // Prevent dangling pointer
    return 0;
}`,
            realWorldExample: 'Database buffers allocate memory dynamically using malloc when a query result set size is unknown at compile time, then free it after sending results to the client.',
            challenge: 'Allocate memory for a dynamic array of n integers (read n from user), fill it with squares of indices, print it, then free the memory.',
            quiz: [
              { question: 'What does malloc return if allocation fails?', options: ['0', '-1', 'NULL', 'error code'], answer: 2 },
              { question: 'What function frees dynamically allocated memory?', options: ['delete', 'dealloc', 'free', 'release'], answer: 2 },
              { question: 'What is a memory leak?', options: ['Writing to wrong memory', 'Allocated memory that is never freed', 'Reading uninitialized memory', 'Buffer overflow'], answer: 1 },
            ],
          },
          { id: 'c_m3_l3', title: 'Function Pointers and Callbacks', duration: '22 min', xpReward: 50,
            concept: 'A function pointer stores the address of a function. This enables passing functions as arguments (callbacks), implementing dispatch tables, and building flexible, plugin-style architectures.',
            codeExample: `#include <stdio.h>
#include <stdlib.h>

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

// A function that takes a function pointer
int apply(int x, int y, int (*op)(int, int)) {
    return op(x, y);
}

int compare(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int main() {
    printf("%d\\n", apply(4, 5, add));       // 9
    printf("%d\\n", apply(4, 5, multiply));  // 20

    // qsort uses a callback
    int arr[] = {5, 2, 8, 1, 9};
    qsort(arr, 5, sizeof(int), compare);
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    return 0;
}`,
            realWorldExample: 'Linux signal handlers are function pointers: signal(SIGINT, my_handler) registers my_handler() to run when Ctrl+C is pressed — the OS calls your function pointer.',
            challenge: 'Write a function calculate(a, b, op) where op is a function pointer to either add or subtract. Call it with both operations.',
            quiz: [
              { question: 'How do you declare a pointer to a function returning int with two int params?', options: ['int *fp(int,int)', 'int (*fp)(int,int)', 'pointer<int> fp', 'func int fp(int,int)'], answer: 1 },
              { question: 'What is a callback function?', options: ['A function that calls main()', 'A function passed as an argument to another function', 'A recursive function', 'A function returning void'], answer: 1 },
              { question: 'Which standard library function uses a comparison callback?', options: ['printf', 'scanf', 'qsort', 'malloc'], answer: 2 },
            ],
          },
        ],
      },
      {
        id: 'c_m4', title: 'File I/O and Preprocessor',
        description: 'File operations in C, binary files, and preprocessor macros.',
        lessons: [
          { id: 'c_m4_l1', title: 'File Operations', duration: '22 min', xpReward: 50,
            concept: 'C uses FILE* pointers for file operations. fopen() opens, fclose() closes. fprintf()/fscanf() for formatted text. fwrite()/fread() for binary. Always check if fopen returns NULL.',
            codeExample: `#include <stdio.h>

int main() {
    FILE *fp = fopen("data.txt", "w");
    if (fp == NULL) { perror("Error"); return 1; }

    fprintf(fp, "Name: Arjun\\nCGPA: 9.2\\n");
    fclose(fp);

    fp = fopen("data.txt", "r");
    char line[100];
    while (fgets(line, sizeof(line), fp)) {
        printf("%s", line);
    }
    fclose(fp);
    return 0;
}`,
            realWorldExample: 'Game save files are written using fwrite() to serialize the entire game state struct as binary — this is faster and more compact than text formats.',
            challenge: 'Write a C program that writes 5 student names to a file and reads them back, printing each one with its line number.',
            quiz: [
              { question: 'What does fopen return if the file cannot be opened?', options: ['0', 'false', 'NULL', '-1'], answer: 2 },
              { question: 'Which function reads a line from a file in C?', options: ['fread', 'fgets', 'fscanf', 'readline'], answer: 1 },
              { question: 'What mode string opens a file for binary writing?', options: ['"w"', '"bw"', '"wb"', '"b+"'], answer: 2 },
            ],
          },
          { id: 'c_m4_l2', title: 'Preprocessor Directives', duration: '20 min', xpReward: 50,
            concept: '#define creates constants and macros. #ifdef/#ifndef enables conditional compilation. #include inserts header content. Header guards (#ifndef HEADER_H / #define HEADER_H / #endif) prevent double inclusion.',
            codeExample: `#include <stdio.h>

#define MAX_SIZE 100
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

#ifdef DEBUG
    #define LOG(msg) printf("[DEBUG] %s\\n", msg)
#else
    #define LOG(msg)
#endif

int main() {
    int arr[MAX_SIZE];
    printf("4 squared: %d\\n", SQUARE(4));
    printf("Max(7,3):  %d\\n", MAX(7, 3));
    LOG("Program started");
    return 0;
}`,
            realWorldExample: 'Cross-platform code uses #ifdef _WIN32 ... #elif __linux__ ... to compile different system call implementations depending on the target OS.',
            challenge: 'Write a C program using #define to create constants for PI and a CIRCLE_AREA(r) macro. Calculate and print the area for radius 7.',
            quiz: [
              { question: 'What does #define PI 3.14 do?', options: ['Declares a variable', 'Creates a preprocessor constant', 'Imports a module', 'Defines a function'], answer: 1 },
              { question: 'What is the purpose of header guards?', options: ['Speed up compilation', 'Prevent a header from being included twice', 'Define global variables', 'Enable debug mode'], answer: 1 },
              { question: 'When are preprocessor directives processed?', options: ['At runtime', 'After linking', 'Before compilation', 'During execution'], answer: 2 },
            ],
          },
          { id: 'c_m4_l3', title: 'Command Line Arguments', duration: '18 min', xpReward: 50,
            concept: 'main() can accept argc (argument count) and argv (argument vector — array of strings). argv[0] is always the program name. argv[1] through argv[argc-1] are user-provided arguments.',
            codeExample: `#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    printf("Program: %s\\n", argv[0]);
    printf("Arguments: %d\\n", argc - 1);

    if (argc < 3) {
        printf("Usage: %s num1 num2\\n", argv[0]);
        return 1;
    }

    double a = atof(argv[1]);
    double b = atof(argv[2]);
    printf("Sum: %.2f\\n", a + b);
    return 0;
}
// Run: ./calc 3.5 2.1`,
            realWorldExample: 'Every Linux command uses argc/argv. ls -la /home receives argc=3 and argv={"ls", "-la", "/home"} — the program reads these to know what to list.',
            challenge: 'Write a C program that accepts a filename as a command-line argument, opens that file, counts lines, and prints the count.',
            quiz: [
              { question: 'What does argc represent?', options: ['Number of characters', 'Number of command-line arguments including program name', 'Array of arguments', 'Argument type'], answer: 1 },
              { question: 'What is always stored in argv[0]?', options: ['First user argument', 'The program name', 'NULL', 'The current directory'], answer: 1 },
              { question: 'Which function converts a string argument to a double?', options: ['atoi', 'strtod', 'atof', 'convert'], answer: 2 },
            ],
          },
        ],
      },
      {
        id: 'c_m5', title: 'Advanced C Concepts',
        description: 'Linked lists, recursion, sorting algorithms, and system interfaces.',
        lessons: [
          { id: 'c_m5_l1', title: 'Recursion', duration: '22 min', xpReward: 50,
            concept: 'A recursive function calls itself with a smaller problem until it reaches a base case. Every recursive solution needs: 1. A base case (termination), 2. A recursive case that moves toward the base case.',
            codeExample: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;       // base case
    return n * factorial(n - 1); // recursive case
}

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int binarySearch(int arr[], int low, int high, int target) {
    if (low > high) return -1;
    int mid = (low + high) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binarySearch(arr, mid+1, high, target);
    return binarySearch(arr, low, mid-1, target);
}

int main() {
    printf("5! = %d\\n", factorial(5));        // 120
    printf("Fib(8) = %d\\n", fibonacci(8));    // 21
    return 0;
}`,
            realWorldExample: 'File system traversal is inherently recursive. Finding all .c files in a directory tree: list current directory, then recursively apply to each subdirectory.',
            challenge: 'Write a recursive function that calculates the sum of digits of a positive integer. For example, sumDigits(1234) should return 10.',
            quiz: [
              { question: 'What is the base case in recursion?', options: ['The first call', 'The termination condition', 'The return type', 'The recursive call'], answer: 1 },
              { question: 'What happens if a recursive function has no base case?', options: ['It returns 0', 'Stack overflow/infinite recursion', 'Compiler error', 'Returns NULL'], answer: 1 },
              { question: 'What is the time complexity of naive Fibonacci recursion?', options: ['O(n)', 'O(log n)', 'O(2^n)', 'O(n^2)'], answer: 2 },
            ],
          },
          { id: 'c_m5_l2', title: 'Sorting Algorithms', duration: '25 min', xpReward: 50,
            concept: 'Sorting arranges data in order. Bubble sort (O(n^2)) repeatedly swaps adjacent out-of-order elements. Selection sort finds the minimum and places it. Insertion sort builds the sorted array one element at a time.',
            codeExample: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;
    bubbleSort(arr, n);
    printArray(arr, n);
    return 0;
}`,
            realWorldExample: 'Database engines use quicksort internally to sort query results for ORDER BY clauses. Understanding sorting algorithms is core to database and search performance.',
            challenge: 'Implement selection sort in C. Test it with an array of 6 integers and print the array at each pass to visualize the sorting process.',
            quiz: [
              { question: 'What is the time complexity of bubble sort?', options: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(1)'], answer: 2 },
              { question: 'In bubble sort, what happens in each inner loop pass?', options: ['Finds minimum element', 'Swaps all adjacent out-of-order pairs', 'Inserts element in right position', 'Divides array in half'], answer: 1 },
              { question: 'Which sort algorithm is most efficient for nearly sorted data?', options: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Counting Sort'], answer: 2 },
            ],
          },
          { id: 'c_m5_l3', title: 'Linked Lists', duration: '28 min', xpReward: 50,
            concept: 'A linked list is a dynamic data structure where each node contains data and a pointer to the next node. Unlike arrays, nodes are not contiguous in memory. Supports O(1) insert/delete at known positions.',
            codeExample: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* createNode(int val) {
    Node *n = (Node *)malloc(sizeof(Node));
    n->data = val;
    n->next = NULL;
    return n;
}

void insertFront(Node **head, int val) {
    Node *n = createNode(val);
    n->next = *head;
    *head = n;
}

void printList(Node *head) {
    while (head) {
        printf("%d -> ", head->data);
        head = head->next;
    }
    printf("NULL\\n");
}

int main() {
    Node *head = NULL;
    insertFront(&head, 30);
    insertFront(&head, 20);
    insertFront(&head, 10);
    printList(head);
    return 0;
}`,
            realWorldExample: 'Browsers implement undo/redo history as linked lists. Each action is a node. Undo traverses backward, redo traverses forward.',
            challenge: 'Build a linked list with insertFront and insertEnd functions. Insert 5 values, print the list, then write a function to delete the last node.',
            quiz: [
              { question: 'What is the time complexity of inserting at the front of a linked list?', options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'], answer: 3 },
              { question: 'What does a node in a singly linked list contain?', options: ['Data only', 'Two pointers', 'Data and a pointer to the next node', 'An index'], answer: 2 },
              { question: 'What does the last node\'s next pointer hold?', options: ['-1', '0', 'NULL', 'Address of head'], answer: 2 },
            ],
          },
        ],
      },
    ],
  },

  // ===== C++ =====
  {
    id: 'cplusplus',
    name: 'C++ Object Oriented Programming',
    stream: 'Science',
    duration: '10 weeks',
    difficulty: 'Intermediate',
    totalXP: 2250,
    careerRelevance: 'C++ is the language of choice for game engines, high-frequency trading, embedded firmware, and system-level software where performance is non-negotiable.',
    skillsGained: ['Classes & Inheritance', 'Polymorphism', 'Templates', 'STL', 'Memory Management', 'Operator Overloading', 'Exception Handling', 'Modern C++ (C++17)'],
    prerequisites: ['C Programming Core (recommended)', 'Basic programming logic'],
    learningOutcomes: [
      'Design class hierarchies using inheritance and polymorphism',
      'Use STL containers: vector, map, set, queue',
      'Write generic code with function and class templates',
      'Manage memory with RAII and smart pointers',
      'Overload operators for custom types',
    ],
    requiredSkills: ['C++', 'OOP', 'STL', 'Polymorphism', 'Performance Tuning'],
    eligibility: { subjects: ['Any'], minPercentage: 0, entranceExams: ['None'] },
    description: 'Master Object Oriented Programming principles, classes, templates, STL, and memory management in C++.',
    careerPaths: ['Software Engineer', 'Game Developer', 'High-Frequency Trader'],
    averageSalary: '8-18 LPA',
    topColleges: ['Online Self-Paced', 'Codecademy', 'Udemy'],
    interests: ['Programming', 'Game Dev', 'Performance Optimization'],
    skills: ['C++', 'OOP', 'STL'],
    workEnvironment: 'Corporate/Office/Remote',
    futureScope: 'Excellent — gold standard for performance critical code',
    projects: [
      { id: 'cpp_proj_1', level: 'Beginner', title: 'Library Book Manager', description: 'Build a Book class with title, author, and ISBN. Use a vector to store and manage a collection of books with search and display methods.', skills: ['Classes', 'Vectors', 'Constructors'], xpReward: 150, estimatedTime: '3 hours' },
      { id: 'cpp_proj_2', level: 'Intermediate', title: 'Shape Area Calculator', description: 'Implement an abstract Shape class with virtual area() and perimeter(). Derive Circle, Rectangle, and Triangle. Use polymorphism to process any shape.', skills: ['Polymorphism', 'Abstract Classes', 'Inheritance'], xpReward: 300, estimatedTime: '5 hours' },
      { id: 'cpp_proj_3', level: 'Advanced', title: 'Generic Stack with Templates', description: 'Implement a templated Stack<T> class with push, pop, peek, isEmpty. Test with int, string, and double types.', skills: ['Templates', 'STL Design', 'Memory Management'], xpReward: 500, estimatedTime: '8 hours' },
    ],
    modules: [
      {
        id: 'cpp_m1', title: 'Classes and OOP Foundations',
        description: 'Defining classes, constructors, destructors, and access specifiers.',
        lessons: [
          { id: 'cpp_m1_l1', title: 'Classes, Constructors, and Destructors', duration: '25 min', xpReward: 50,
            concept: 'A class encapsulates data (member variables) and behavior (member functions). The constructor initializes an object. The destructor cleans up when the object goes out of scope. Use member initialization lists for efficiency.',
            codeExample: `#include <iostream>
using namespace std;

class BankAccount {
private:
    string owner;
    double balance;

public:
    BankAccount(string name, double init = 0.0)
        : owner(name), balance(init) {}

    ~BankAccount() {
        cout << "Account closed: " << owner << endl;
    }

    void deposit(double amount) { balance += amount; }
    bool withdraw(double amount) {
        if (amount > balance) return false;
        balance -= amount;
        return true;
    }
    void display() const {
        cout << owner << ": Rs." << balance << endl;
    }
};

int main() {
    BankAccount acc("Arjun", 5000.0);
    acc.deposit(2000);
    acc.withdraw(1500);
    acc.display();
    return 0;
}`,
            realWorldExample: 'Game engines use destructors (RAII) to automatically free GPU textures, audio buffers, and network connections when a game object is destroyed.',
            challenge: 'Create a Rectangle class with width and height. Add a constructor, and methods: area(), perimeter(), and display().',
            quiz: [
              { question: 'What access specifier hides members from outside the class?', options: ['public', 'protected', 'private', 'internal'], answer: 2 },
              { question: 'When is a destructor called?', options: ['When the object is created', 'When the program starts', 'When the object goes out of scope or is deleted', 'Manually only'], answer: 2 },
              { question: 'What is the member initialization list syntax?', options: ['Constructor() = { init }', 'Constructor() : var(val) {}', 'Constructor(init val) {}', 'init Constructor()'], answer: 1 },
            ],
          },
          { id: 'cpp_m1_l2', title: 'Inheritance and Access Control', duration: '22 min', xpReward: 50,
            concept: 'C++ inheritance uses class Child : public Parent. Public inheritance preserves the public/protected interface. Protected members are accessible in derived classes. Private members are not inherited.',
            codeExample: `#include <iostream>
using namespace std;

class Vehicle {
protected:
    string brand;
    int year;
public:
    Vehicle(string b, int y) : brand(b), year(y) {}
    virtual void describe() {
        cout << year << " " << brand;
    }
};

class Car : public Vehicle {
private:
    int doors;
public:
    Car(string b, int y, int d) : Vehicle(b, y), doors(d) {}
    void describe() override {
        Vehicle::describe();
        cout << " (" << doors << "-door car)" << endl;
    }
};

class Truck : public Vehicle {
private:
    double payload;
public:
    Truck(string b, int y, double p) : Vehicle(b, y), payload(p) {}
    void describe() override {
        Vehicle::describe();
        cout << " (truck, " << payload << "T payload)" << endl;
    }
};`,
            realWorldExample: 'UI frameworks define a base Widget class. Button, TextInput, and Slider all inherit from Widget, reusing layout, event handling, and rendering code.',
            challenge: 'Create an Animal base class with a speak() method. Derive Dog and Cat classes that override speak() with different outputs.',
            quiz: [
              { question: 'What does class Child : public Parent mean?', options: ['Child inherits all private members', 'Child inherits public and protected members', 'Parent inherits from Child', 'Child becomes an alias for Parent'], answer: 1 },
              { question: 'Can a derived class access private members of its base class?', options: ['Yes, always', 'Yes, only with protected', 'No', 'Only with friend'], answer: 2 },
              { question: 'What keyword explicitly calls the parent class method?', options: ['base::', 'super::', 'Parent::', 'parent()'], answer: 2 },
            ],
          },
          { id: 'cpp_m1_l3', title: 'Polymorphism and Virtual Functions', duration: '22 min', xpReward: 50,
            concept: 'Polymorphism allows a base class pointer to call derived class methods. Declare methods as virtual in the base. The correct version is resolved at runtime (dynamic dispatch). Pure virtual functions (= 0) make a class abstract.',
            codeExample: `#include <iostream>
#include <vector>
using namespace std;

class Shape {
public:
    virtual double area() const = 0;  // pure virtual
    virtual string name() const = 0;
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;
public:
    Circle(double radius) : r(radius) {}
    double area() const override { return 3.14159 * r * r; }
    string name() const override { return "Circle"; }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
    string name() const override { return "Rectangle"; }
};

int main() {
    vector<Shape*> shapes = { new Circle(5), new Rectangle(4, 6) };
    for (auto s : shapes) {
        cout << s->name() << ": " << s->area() << endl;
        delete s;
    }
}`,
            realWorldExample: 'A game engine\'s render loop calls draw() on a vector<GameObject*> — each object (Player, Enemy, Projectile) has its own draw() implementation called via virtual dispatch.',
            challenge: 'Create a Payment abstract class with a virtual process(amount) method. Derive CreditCard and UPI classes with different processing messages.',
            quiz: [
              { question: 'What keyword makes a method dynamically dispatched?', options: ['dynamic', 'override', 'virtual', 'abstract'], answer: 2 },
              { question: 'What does = 0 after a virtual function declaration mean?', options: ['The function returns 0', 'The function is pure virtual', 'The function is deleted', 'The function is final'], answer: 1 },
              { question: 'A class with at least one pure virtual function is called?', options: ['Interface class', 'Abstract class', 'Virtual class', 'Pure class'], answer: 1 },
            ],
          },
        ],
      },
      {
        id: 'cpp_m2', title: 'STL and Generic Programming',
        description: 'Standard Template Library containers, iterators, and algorithms.',
        lessons: [
          { id: 'cpp_m2_l1', title: 'Vectors and Lists', duration: '22 min', xpReward: 50,
            concept: 'vector<T> is a dynamic array that grows automatically. push_back(), pop_back(), size(), at(), and iterators are core operations. list<T> is a doubly-linked list for O(1) insert/delete but O(n) random access.',
            codeExample: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> scores = {85, 92, 78, 95, 88};
    scores.push_back(90);

    sort(scores.begin(), scores.end());

    auto maxIt = max_element(scores.begin(), scores.end());
    cout << "Max: " << *maxIt << endl;

    double sum = 0;
    for (int s : scores) sum += s;
    cout << "Average: " << sum / scores.size() << endl;

    // Range-based for
    for (const auto& s : scores) cout << s << " ";
    cout << endl;
    return 0;
}`,
            realWorldExample: 'A social media feed is a vector of Post objects. New posts are push_back(). The feed is sorted by timestamp. Filtered with std::remove_if.',
            challenge: 'Create a vector of 10 integers. Use STL algorithms to find: the sum, the maximum, and sort them in descending order. Print all results.',
            quiz: [
              { question: 'Which method adds an element to the end of a vector?', options: ['append()', 'insert()', 'add()', 'push_back()'], answer: 3 },
              { question: 'What is the time complexity of vector random access?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'], answer: 2 },
              { question: 'Which STL function sorts a vector?', options: ['sort(v)', 'v.sort()', 'sort(v.begin(), v.end())', 'arrange(v)'], answer: 2 },
            ],
          },
          { id: 'cpp_m2_l2', title: 'Maps and Sets', duration: '20 min', xpReward: 50,
            concept: 'map<K,V> stores key-value pairs in sorted order (O(log n) operations). unordered_map<K,V> uses hashing for O(1) average. set<T> stores unique sorted elements. Use find() to check existence without inserting.',
            codeExample: `#include <iostream>
#include <map>
#include <unordered_map>
#include <set>
using namespace std;

int main() {
    // Frequency count
    string words[] = {"apple","banana","apple","cherry","banana","apple"};
    unordered_map<string, int> freq;
    for (auto& w : words) freq[w]++;

    for (auto& [word, count] : freq)
        cout << word << ": " << count << endl;

    // Unique sorted elements
    set<int> scores = {85, 92, 78, 85, 92, 70};
    for (int s : scores) cout << s << " ";  // 70 78 85 92
    cout << endl;
    return 0;
}`,
            realWorldExample: 'A search engine uses unordered_map<string, vector<URL>> as an inverted index — given a word, instantly retrieve all pages containing it.',
            challenge: 'Read 10 words from the user. Use a map to count the frequency of each word and print the results sorted alphabetically.',
            quiz: [
              { question: 'What is the time complexity of map<K,V> lookup?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], answer: 1 },
              { question: 'What does a set guarantee about its elements?', options: ['Sorted and duplicates allowed', 'Sorted and unique', 'Unsorted and unique', 'Fastest access'], answer: 1 },
              { question: 'Which container provides O(1) average lookup time?', options: ['map', 'set', 'unordered_map', 'list'], answer: 2 },
            ],
          },
          { id: 'cpp_m2_l3', title: 'Templates', duration: '22 min', xpReward: 50,
            concept: 'Templates allow writing generic code that works with any type. Function templates use type parameters. Class templates build generic data structures. Template specialization provides custom behavior for specific types.',
            codeExample: `#include <iostream>
using namespace std;

// Function template
template<typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

// Class template
template<typename T>
class Stack {
    T data[100];
    int top = -1;
public:
    void push(T val) { data[++top] = val; }
    T pop() { return data[top--]; }
    bool empty() { return top == -1; }
    T peek() { return data[top]; }
};

int main() {
    cout << maximum(3, 7) << endl;          // 7
    cout << maximum(3.14, 2.71) << endl;    // 3.14
    cout << maximum(string("B"), string("A")) << endl;  // B

    Stack<int> intStack;
    intStack.push(10); intStack.push(20);
    cout << intStack.pop() << endl;  // 20
}`,
            realWorldExample: 'The entire C++ STL is built on templates. vector<T>, map<K,V>, and sort() work on any type because they use template parameters — write once, use everywhere.',
            challenge: 'Write a template function swap_values<T> that swaps two values of any type. Test it with int, double, and string types.',
            quiz: [
              { question: 'What keyword introduces a template parameter?', options: ['generic', 'type', 'typename', 'class only'], answer: 2 },
              { question: 'What is the benefit of function templates?', options: ['Faster execution', 'Write type-agnostic code once', 'Reduce memory use', 'Enable virtual dispatch'], answer: 1 },
              { question: 'When are templates instantiated?', options: ['At runtime', 'At link time', 'At compile time', 'At startup'], answer: 2 },
            ],
          },
        ],
      },
      {
        id: 'cpp_m3', title: 'Modern C++ and Smart Pointers',
        description: 'C++11/17 features: auto, range-for, lambdas, and smart pointers.',
        lessons: [
          { id: 'cpp_m3_l1', title: 'Auto, Lambda, and Range-based For', duration: '22 min', xpReward: 50,
            concept: 'auto deduces the type automatically. Range-based for simplifies iteration. Lambda functions are anonymous functions defined inline. Capture list [=] captures by value, [&] by reference.',
            codeExample: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {3, 1, 4, 1, 5, 9, 2, 6};

    // auto type deduction
    auto it = nums.begin();

    // Range-based for
    for (auto n : nums) cout << n << " ";
    cout << endl;

    // Lambda for sorting descending
    sort(nums.begin(), nums.end(), [](int a, int b) {
        return a > b;
    });

    // Lambda with capture
    int threshold = 4;
    auto count = count_if(nums.begin(), nums.end(),
        [threshold](int n) { return n > threshold; });
    cout << "Numbers above " << threshold << ": " << count << endl;
}`,
            realWorldExample: 'Event-driven UI frameworks use lambdas as callbacks: button.onClick([this]{ handleClick(); }) — the lambda captures the object and runs when clicked.',
            challenge: 'Create a vector of strings. Use a lambda with sort() to sort them by length (shortest first). Use a lambda with count_if() to count strings longer than 5 characters.',
            quiz: [
              { question: 'What does auto do in C++?', options: ['Marks a variable as automatic storage', 'Deduces the type from initialization', 'Enables dynamic typing', 'Creates a global variable'], answer: 1 },
              { question: 'What does [&] in a lambda capture list mean?', options: ['Capture nothing', 'Capture all by value', 'Capture all by reference', 'Capture only &-prefixed vars'], answer: 2 },
              { question: 'What is a lambda function?', options: ['A recursive function', 'A template specialization', 'An anonymous inline function', 'A virtual method'], answer: 2 },
            ],
          },
          { id: 'cpp_m3_l2', title: 'Smart Pointers', duration: '25 min', xpReward: 50,
            concept: 'Smart pointers automate memory management. unique_ptr<T> has exclusive ownership — deleted when out of scope. shared_ptr<T> allows shared ownership with reference counting. weak_ptr<T> breaks circular references.',
            codeExample: `#include <iostream>
#include <memory>
using namespace std;

class Resource {
    string name;
public:
    Resource(string n) : name(n) { cout << "Created: " << name << endl; }
    ~Resource() { cout << "Destroyed: " << name << endl; }
    void use() { cout << "Using: " << name << endl; }
};

int main() {
    {   // unique_ptr
        auto uptr = make_unique<Resource>("Texture");
        uptr->use();
    }   // auto-deleted here

    {   // shared_ptr
        auto sp1 = make_shared<Resource>("AudioBuffer");
        {
            auto sp2 = sp1;   // ref count = 2
            cout << "Ref count: " << sp1.use_count() << endl;
        }   // sp2 destroyed, ref count = 1
        sp1->use();
    }   // sp1 destroyed, ref count = 0, object deleted
}`,
            realWorldExample: 'Game engines use unique_ptr for assets owned by a single system (render queue owns texture), and shared_ptr for assets shared between systems (audio clip used by multiple entities).',
            challenge: 'Create a class Node with a unique_ptr<Node> next pointer. Build a simple linked list of 3 nodes using smart pointers — the chain deletes automatically.',
            quiz: [
              { question: 'What happens to a unique_ptr when it goes out of scope?', options: ['Nothing', 'The pointer is reset to null', 'The owned object is deleted', 'Ownership transfers'], answer: 2 },
              { question: 'Which smart pointer allows multiple owners?', options: ['unique_ptr', 'weak_ptr', 'shared_ptr', 'auto_ptr'], answer: 2 },
              { question: 'What is the purpose of weak_ptr?', options: ['Faster access', 'Break circular references in shared_ptr chains', 'Exclusive ownership', 'Array management'], answer: 1 },
            ],
          },
          { id: 'cpp_m3_l3', title: 'Operator Overloading', duration: '20 min', xpReward: 50,
            concept: 'Operator overloading lets you define how operators (+, -, ==, <<, etc.) behave for custom types. Implement as member functions or friend functions. Do not change the fundamental meaning of operators.',
            codeExample: `#include <iostream>
using namespace std;

class Vector2D {
public:
    double x, y;
    Vector2D(double x = 0, double y = 0) : x(x), y(y) {}

    Vector2D operator+(const Vector2D& v) const {
        return {x + v.x, y + v.y};
    }
    Vector2D operator*(double scalar) const {
        return {x * scalar, y * scalar};
    }
    bool operator==(const Vector2D& v) const {
        return x == v.x && y == v.y;
    }
    friend ostream& operator<<(ostream& os, const Vector2D& v) {
        return os << "(" << v.x << ", " << v.y << ")";
    }
};

int main() {
    Vector2D a(3, 4), b(1, 2);
    cout << a + b << endl;    // (4, 6)
    cout << a * 2.0 << endl;  // (6, 8)
}`,
            realWorldExample: 'Math libraries for graphics use operator overloading so you can write natural math: Matrix4 transform = rotation * translation * scaling instead of manual function calls.',
            challenge: 'Create a Fraction class representing a/b. Overload +, -, *, and == operators. The + operator should return the correct reduced fraction.',
            quiz: [
              { question: 'Which keyword is used to define an operator function?', options: ['overload', 'op', 'operator', 'define'], answer: 2 },
              { question: 'Why use friend functions for operator<<?', options: ['friend functions run faster', 'cout is the left operand so it cannot be a member', 'It prevents copying', 'Only friends can access private data'], answer: 1 },
              { question: 'Which operator CANNOT be overloaded in C++?', options: ['+', '==', '::', '<<'], answer: 2 },
            ],
          },
        ],
      },
      {
        id: 'cpp_m4', title: 'Exception Handling and File I/O',
        description: 'C++ exceptions, RAII, and file stream operations.',
        lessons: [
          { id: 'cpp_m4_l1', title: 'Exception Handling in C++', duration: '20 min', xpReward: 50,
            concept: 'C++ uses try/catch/throw. Throw any type (prefer derived from std::exception). Catch specific types before general. RAII ensures resources are released even when exceptions propagate.',
            codeExample: `#include <iostream>
#include <stdexcept>
using namespace std;

double safeDivide(double a, double b) {
    if (b == 0) throw runtime_error("Division by zero");
    return a / b;
}

int main() {
    try {
        cout << safeDivide(10, 2) << endl;  // 5
        cout << safeDivide(10, 0) << endl;  // throws
    } catch (const runtime_error& e) {
        cout << "Caught: " << e.what() << endl;
    } catch (const exception& e) {
        cout << "General error: " << e.what() << endl;
    } finally {
        cout << "Cleanup done" << endl;
    }
}`,
            realWorldExample: 'Network libraries throw connection_error when servers are unreachable. The caller catches it and retries or shows the user a friendly "Connection failed" message.',
            challenge: 'Create a custom exception class InvalidAgeException. Throw it in a setAge() function when age is negative or > 150. Catch and print the message.',
            quiz: [
              { question: 'What does throw do in C++?', options: ['Prints an error', 'Creates a new thread', 'Raises an exception', 'Terminates the program'], answer: 2 },
              { question: 'What method provides the error message from std::exception?', options: ['message()', 'str()', 'what()', 'error()'], answer: 2 },
              { question: 'In which order should catches be ordered?', options: ['General to specific', 'Alphabetically', 'Specific to general', 'Any order'], answer: 2 },
            ],
          },
          { id: 'cpp_m4_l2', title: 'File Streams', duration: '20 min', xpReward: 50,
            concept: 'C++ uses fstream, ifstream, ofstream. ofstream writes, ifstream reads, fstream does both. Use getline() for reading lines. Files can be opened with flags: ios::app, ios::binary, ios::trunc.',
            codeExample: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // Write
    ofstream out("students.txt");
    out << "Arjun 92\\n";
    out << "Priya 88\\n";
    out.close();

    // Read
    ifstream in("students.txt");
    string name; int score;
    while (in >> name >> score) {
        cout << name << " scored " << score << endl;
    }
    in.close();

    // Append
    ofstream app("students.txt", ios::app);
    app << "Ravi 78\\n";
    app.close();
    return 0;
}`,
            realWorldExample: 'Config files (settings.txt, config.ini) are read using ifstream at startup to configure the application — a common pattern in all desktop applications.',
            challenge: 'Write a C++ program that reads a text file line by line, counts the total words across all lines, and prints the count.',
            quiz: [
              { question: 'Which class is used for reading files in C++?', options: ['fstream', 'ofstream', 'ifstream', 'instream'], answer: 2 },
              { question: 'What flag appends to an existing file?', options: ['ios::write', 'ios::add', 'ios::append', 'ios::app'], answer: 3 },
              { question: 'Which function reads a full line including spaces?', options: ['cin >>', 'in >>', 'getline()', 'readline()'], answer: 2 },
            ],
          },
          { id: 'cpp_m4_l3', title: 'Move Semantics and Performance', duration: '22 min', xpReward: 50,
            concept: 'Move semantics (C++11) transfers ownership of resources instead of copying. Rvalue references (&&) identify temporary objects. Move constructors and move assignment operators avoid expensive deep copies.',
            codeExample: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Buffer {
    int* data;
    size_t size;
public:
    Buffer(size_t s) : size(s), data(new int[s]) {
        cout << "Constructed (size=" << s << ")" << endl;
    }
    // Move constructor
    Buffer(Buffer&& other) : data(other.data), size(other.size) {
        other.data = nullptr; other.size = 0;
        cout << "Moved!" << endl;
    }
    ~Buffer() { delete[] data; }
};

Buffer makeBuffer(size_t n) {
    return Buffer(n);   // Return Value Optimization or move
}

int main() {
    Buffer b = makeBuffer(1000);
    vector<string> v;
    string s = "hello_world_string";
    v.push_back(move(s));  // move instead of copy
    cout << "s after move: '" << s << "'" << endl; // empty
}`,
            realWorldExample: 'Game asset loading returns large Buffer objects. Without move semantics, every return copies megabytes of data. With move, it transfers a pointer — near-zero cost.',
            challenge: 'Create a String class that wraps a char*. Implement a move constructor that transfers ownership. Verify the source is null after moving.',
            quiz: [
              { question: 'What does std::move() do?', options: ['Copies the object', 'Casts to an rvalue reference for moving', 'Deletes the object', 'Allocates new memory'], answer: 1 },
              { question: 'What is an rvalue reference in C++?', options: ['A reference to a named variable', 'A reference to a temporary object', 'A pointer alias', 'A const reference'], answer: 1 },
              { question: 'Why are move semantics important?', options: ['They enable polymorphism', 'They avoid expensive deep copies of resources', 'They replace virtual functions', 'They enable threading'], answer: 1 },
            ],
          },
        ],
      },
      {
        id: 'cpp_m5', title: 'Advanced Topics and Design Patterns',
        description: 'Singleton, Factory, Observer patterns, and concurrency basics.',
        lessons: [
          { id: 'cpp_m5_l1', title: 'Singleton and Factory Patterns', duration: '22 min', xpReward: 50,
            concept: 'Singleton ensures only one instance of a class exists. Factory pattern creates objects without exposing instantiation logic. Both are creational design patterns that improve code organization.',
            codeExample: `#include <iostream>
using namespace std;

// Singleton
class Config {
    Config() = default;
    static Config* instance;
public:
    static Config* getInstance() {
        if (!instance) instance = new Config();
        return instance;
    }
    string dbUrl = "localhost:5432";
};
Config* Config::instance = nullptr;

// Factory
class Logger {
public:
    virtual void log(string msg) = 0;
    virtual ~Logger() {}
};
class FileLogger : public Logger {
public: void log(string msg) { cout << "[FILE] " << msg << endl; }
};
class ConsoleLogger : public Logger {
public: void log(string msg) { cout << "[CONSOLE] " << msg << endl; }
};
Logger* createLogger(string type) {
    if (type == "file") return new FileLogger();
    return new ConsoleLogger();
}`,
            realWorldExample: 'Database connection pools are Singletons — ensuring only one pool manages all connections. Logger factories create the right logger type (file, console, remote) based on configuration.',
            challenge: 'Implement a Singleton GameSettings class that stores volume and difficulty. Verify that two getInstance() calls return the same object.',
            quiz: [
              { question: 'What does Singleton pattern guarantee?', options: ['Thread safety', 'Only one instance of the class exists', 'All members are public', 'Fast object creation'], answer: 1 },
              { question: 'What problem does the Factory pattern solve?', options: ['Thread synchronization', 'Decoupling object creation from usage', 'Memory management', 'Template instantiation'], answer: 1 },
              { question: 'Why is Singleton constructor typically private?', options: ['For encapsulation of data', 'To prevent external code from creating instances directly', 'Performance optimization', 'Required by the standard'], answer: 1 },
            ],
          },
          { id: 'cpp_m5_l2', title: 'Observer Pattern', duration: '22 min', xpReward: 50,
            concept: 'Observer (Publish-Subscribe) defines a one-to-many dependency. When the subject state changes, all registered observers are notified. Core of event systems, UI frameworks, and reactive architectures.',
            codeExample: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Observer {
public:
    virtual void update(string event) = 0;
    virtual ~Observer() {}
};

class EventSystem {
    vector<Observer*> observers;
public:
    void subscribe(Observer* o) { observers.push_back(o); }
    void unsubscribe(Observer* o) {
        observers.erase(remove(observers.begin(), observers.end(), o), observers.end());
    }
    void notify(string event) {
        for (auto o : observers) o->update(event);
    }
};

class UI : public Observer {
public:
    void update(string event) override {
        cout << "[UI] Received: " << event << endl;
    }
};

class Logger : public Observer {
public:
    void update(string event) override {
        cout << "[LOG] " << event << endl;
    }
};`,
            realWorldExample: 'React state management (Redux) is Observer pattern — the store is the subject, components are observers. When state changes, all subscribed components re-render.',
            challenge: 'Build a StockMarket class (subject) and two observers: MobileApp and EmailAlert. When stock price changes, both observers are notified and print the new price.',
            quiz: [
              { question: 'What role does the Subject play in Observer pattern?', options: ['Receives notifications', 'Sends notifications to observers', 'Stores observer data', 'Creates observer objects'], answer: 1 },
              { question: 'What method do observers implement?', options: ['receive()', 'listen()', 'update()', 'handle()'], answer: 2 },
              { question: 'Which real-world system commonly uses Observer pattern?', options: ['File systems', 'Event-driven UI frameworks', 'Sorting algorithms', 'Memory allocators'], answer: 1 },
            ],
          },
          { id: 'cpp_m5_l3', title: 'Introduction to Concurrency', duration: '25 min', xpReward: 50,
            concept: 'C++11 introduced std::thread for concurrent execution. mutex protects shared data from race conditions. lock_guard provides RAII-based locking. async/future run tasks asynchronously.',
            codeExample: `#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
using namespace std;

mutex mtx;
int counter = 0;

void increment(int times) {
    for (int i = 0; i < times; i++) {
        lock_guard<mutex> lock(mtx);
        counter++;
    }
}

int main() {
    vector<thread> threads;
    for (int i = 0; i < 4; i++)
        threads.emplace_back(increment, 1000);

    for (auto& t : threads) t.join();

    cout << "Final counter: " << counter << endl;  // 4000
    return 0;
}`,
            realWorldExample: 'Web servers handle multiple requests simultaneously using threads. Each connection gets its own thread. A mutex protects the shared session map from concurrent modification.',
            challenge: 'Write a program that creates 3 threads. Each thread prints its ID and a message. Use a mutex to ensure the prints do not interleave.',
            quiz: [
              { question: 'What is a race condition?', options: ['Two programs running at the same speed', 'Multiple threads accessing shared data without synchronization', 'A thread waiting for another', 'A deadlock condition'], answer: 1 },
              { question: 'What does a mutex do?', options: ['Creates threads', 'Ensures only one thread accesses a section at a time', 'Joins threads', 'Schedules threads'], answer: 1 },
              { question: 'What does thread.join() do?', options: ['Starts the thread', 'Pauses the thread', 'Waits for the thread to finish', 'Creates a new thread'], answer: 2 },
            ],
          },
        ],
      },
    ],
  },

  // ===== JAVA =====
  {
    id: 'java',
    name: 'Java Development',
    stream: 'Science',
    duration: '12 weeks',
    difficulty: 'Intermediate',
    totalXP: 2250,
    careerRelevance: 'Java powers the majority of enterprise backends, Android apps, and large-scale distributed systems. It is the most commonly used language in corporate IT and banking sectors.',
    skillsGained: ['Java OOP', 'Collections Framework', 'Exception Handling', 'Generics', 'Streams API', 'Design Patterns', 'Multithreading', 'Maven/Gradle basics'],
    prerequisites: ['Basic programming logic', 'OOP concepts recommended'],
    learningOutcomes: [
      'Write platform-independent Java programs using the JVM',
      'Use the Java Collections Framework effectively',
      'Design programs using key design patterns',
      'Handle exceptions and write robust code',
      'Use Java Streams API for functional-style data processing',
    ],
    requiredSkills: ['Java', 'OOP', 'Design Patterns', 'Enterprise Software', 'Android Basics'],
    eligibility: { subjects: ['Any'], minPercentage: 0, entranceExams: ['None'] },
    description: 'Build robust, object-oriented, clean enterprise software structures using Java classes and design patterns.',
    careerPaths: ['Java Backend Developer', 'Enterprise Architect', 'Android Developer'],
    averageSalary: '6-15 LPA',
    topColleges: ['Online Self-Paced', 'Oracle Academy', 'Coursera'],
    interests: ['Programming', 'Enterprise Software', 'Android'],
    skills: ['Java', 'OOP', 'Design Patterns'],
    workEnvironment: 'Corporate/Remote',
    futureScope: 'Very Good — backbone of corporate backends',
    projects: [
      { id: 'java_proj_1', level: 'Beginner', title: 'Library Management System', description: 'Use ArrayList and HashMap to build a system that manages books: add, search by title or author, and mark books as borrowed or returned.', skills: ['Collections', 'OOP', 'ArrayList'], xpReward: 150, estimatedTime: '4 hours' },
      { id: 'java_proj_2', level: 'Intermediate', title: 'Bank Transaction Engine', description: 'Build a bank with Account, SavingsAccount, and CurrentAccount classes. Process deposits, withdrawals, and transfers. Log all transactions.', skills: ['Inheritance', 'Exceptions', 'File I/O'], xpReward: 300, estimatedTime: '6 hours' },
      { id: 'java_proj_3', level: 'Advanced', title: 'Student REST API (Mock)', description: 'Simulate a REST API server using Java sockets. Handle GET and POST requests for student data stored in a HashMap.', skills: ['Networking', 'JSON Processing', 'Concurrency'], xpReward: 500, estimatedTime: '10 hours' },
    ],
    modules: [
      {
        id: 'java_m1', title: 'Java Foundations',
        description: 'JVM, data types, control flow, and methods.',
        lessons: [
          { id: 'java_m1_l1', title: 'Java and the JVM', duration: '20 min', xpReward: 50,
            concept: 'Java compiles to bytecode that runs on the Java Virtual Machine (JVM). This makes Java platform-independent ("Write Once, Run Anywhere"). JDK = compiler + JVM + libraries. JRE = JVM + libraries only.',
            codeExample: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Enterprise World!");
        System.out.printf("Java version: %s%n",
            System.getProperty("java.version"));

        // Compile: javac HelloWorld.java
        // Run:     java HelloWorld
    }
}`,
            realWorldExample: 'Netflix\'s backend microservices run on the JVM across Linux servers, macOS developer machines, and Windows CI pipelines — same bytecode, different OS.',
            challenge: 'Write a Java program that prints your name, the current Java version, and the operating system name (use System.getProperty("os.name")).',
            quiz: [
              { question: 'What does JVM stand for?', options: ['Java Verified Module', 'Java Virtual Machine', 'Java Variable Manager', 'Java Version Manager'], answer: 1 },
              { question: 'What type of code does javac produce?', options: ['Machine code', 'Python bytecode', 'Java bytecode', 'Assembly'], answer: 2 },
              { question: 'What does "Write Once, Run Anywhere" mean?', options: ['Java programs run without compilation', 'Java bytecode runs on any JVM regardless of OS', 'Java programs need no testing', 'Java works on mobile only'], answer: 1 },
            ],
          },
          { id: 'java_m1_l2', title: 'Data Types and Strings', duration: '20 min', xpReward: 50,
            concept: 'Java has 8 primitive types: byte, short, int, long, float, double, char, boolean. String is a class, not a primitive. Strings are immutable. Use StringBuilder for mutable string operations. Auto-boxing converts between primitives and wrapper classes.',
            codeExample: `public class DataTypes {
    public static void main(String[] args) {
        int age = 20;
        double gpa = 8.75;
        boolean isEnrolled = true;
        char grade = 'A';

        String name = "Arjun Kumar";
        System.out.println(name.length());          // 11
        System.out.println(name.toUpperCase());     // ARJUN KUMAR
        System.out.println(name.contains("Kumar")); // true
        System.out.println(name.split(" ")[0]);     // Arjun

        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) sb.append(i).append(",");
        System.out.println(sb.toString());  // 1,2,3,4,5,
    }
}`,
            realWorldExample: 'User profile systems use String methods extensively: name.trim() removes accidental whitespace, email.toLowerCase() normalizes for comparison, String.format() builds display text.',
            challenge: 'Write a Java program that reads a sentence and prints: word count, character count (no spaces), and the sentence reversed word by word.',
            quiz: [
              { question: 'Are Java Strings mutable?', options: ['Yes, always', 'Only after Java 8', 'No, they are immutable', 'Only inside StringBuilder'], answer: 2 },
              { question: 'Which class should you use for repeated string concatenation in a loop?', options: ['String', 'StringBuffer only', 'StringBuilder', 'StringArray'], answer: 2 },
              { question: 'What is auto-boxing in Java?', options: ['Converting double to int', 'Automatic conversion between primitives and wrapper classes', 'Type casting', 'String to number conversion'], answer: 1 },
            ],
          },
          { id: 'java_m1_l3', title: 'Control Flow and Methods', duration: '20 min', xpReward: 50,
            concept: 'Java has if/else, switch, for, while, do-while, and enhanced for-each loops. Methods are defined with access modifier, return type, name, and parameters. Method overloading allows multiple methods with the same name but different parameters.',
            codeExample: `public class Methods {
    // Overloaded methods
    static int add(int a, int b) { return a + b; }
    static double add(double a, double b) { return a + b; }
    static int add(int a, int b, int c) { return a + b + c; }

    static String classify(int score) {
        return switch (score / 10) {
            case 10, 9 -> "Outstanding";
            case 8     -> "Excellent";
            case 7     -> "Good";
            case 6     -> "Average";
            default    -> "Needs Improvement";
        };
    }

    public static void main(String[] args) {
        System.out.println(add(3, 5));        // 8
        System.out.println(add(3.14, 2.71));  // 5.85
        System.out.println(classify(85));      // Excellent
    }
}`,
            realWorldExample: 'E-commerce checkout methods are overloaded: applyDiscount(int percent), applyDiscount(String couponCode), applyDiscount(User premiumUser) — all named the same, different logic.',
            challenge: 'Write overloaded methods for area(): one for a circle (takes radius), one for a rectangle (takes width and height), one for a triangle (takes base and height).',
            quiz: [
              { question: 'What is method overloading?', options: ['Calling a method multiple times', 'Multiple methods with same name but different parameters', 'Overriding a parent method', 'Using static methods'], answer: 1 },
              { question: 'What new switch expression feature allows arrow syntax?', options: ['Java 6', 'Java 8', 'Java 14+', 'Java 11'], answer: 2 },
              { question: 'What is the return type if a method returns nothing?', options: ['null', 'void', '0', 'empty'], answer: 1 },
            ],
          },
        ],
      },
      {
        id: 'java_m2', title: 'OOP in Java',
        description: 'Classes, inheritance, interfaces, abstract classes, and polymorphism.',
        lessons: [
          { id: 'java_m2_l1', title: 'Classes, Objects, and Encapsulation', duration: '22 min', xpReward: 50,
            concept: 'Java enforces encapsulation with private fields and public getters/setters. Constructors initialize objects. The this keyword refers to the current object. Static members belong to the class, not instances.',
            codeExample: `public class Student {
    private String name;
    private int roll;
    private double cgpa;
    private static int totalStudents = 0;

    public Student(String name, int roll, double cgpa) {
        this.name = name;
        this.roll = roll;
        this.cgpa = cgpa;
        totalStudents++;
    }

    public String getName() { return name; }
    public void setCgpa(double cgpa) {
        if (cgpa < 0 || cgpa > 10) throw new IllegalArgumentException("Invalid CGPA");
        this.cgpa = cgpa;
    }
    public static int getTotalStudents() { return totalStudents; }

    @Override
    public String toString() {
        return String.format("[%d] %s — CGPA: %.2f", roll, name, cgpa);
    }
}`,
            realWorldExample: 'Every Java Spring Boot entity class (User, Product, Order) uses private fields with public getters/setters (called POJOs) — the standard pattern for enterprise Java.',
            challenge: 'Create a Car class with private fields: model, year, price. Add a static field totalCars. Include a constructor, getters, setters with validation, and a toString() method.',
            quiz: [
              { question: 'What does private mean in Java?', options: ['Accessible within the package', 'Accessible only within the class', 'Accessible by subclasses', 'Accessible everywhere'], answer: 1 },
              { question: 'What is the purpose of a getter method?', options: ['Set a field value', 'Provide controlled read access to private fields', 'Create the object', 'Delete field data'], answer: 1 },
              { question: 'Static members belong to?', options: ['Each instance individually', 'The class itself, shared by all instances', 'The subclass', 'The package'], answer: 1 },
            ],
          },
          { id: 'java_m2_l2', title: 'Interfaces and Abstract Classes', duration: '22 min', xpReward: 50,
            concept: 'An interface is a contract — it defines what a class must do, not how. Abstract classes can have both abstract and concrete methods. Java supports multiple interface implementation but single class inheritance.',
            codeExample: `interface Printable {
    void print();  // implicitly public abstract
    default String getFormat() { return "TEXT"; }
}

interface Serializable {
    String serialize();
}

abstract class Document implements Printable, Serializable {
    protected String title;
    Document(String t) { this.title = t; }
    abstract String getContent();

    @Override
    public void print() {
        System.out.println("=== " + title + " ===");
        System.out.println(getContent());
    }
}

class Invoice extends Document {
    private double amount;
    Invoice(String t, double a) { super(t); this.amount = a; }
    @Override String getContent() { return "Amount: Rs." + amount; }
    @Override public String serialize() { return title + ":" + amount; }
}`,
            realWorldExample: 'Java\'s JDBC uses the Connection interface — whether you connect to MySQL, PostgreSQL, or Oracle, your code calls connection.execute() the same way. The database driver implements the interface.',
            challenge: 'Define a Shape interface with area() and perimeter(). Create abstract class Polygon implementing it. Derive Triangle and Square from Polygon.',
            quiz: [
              { question: 'Can a Java class implement multiple interfaces?', options: ['No', 'Yes, one at a time', 'Yes, unlimited interfaces', 'Only 2'], answer: 2 },
              { question: 'What is a default method in an interface?', options: ['A method with no body', 'A method with a concrete implementation in the interface', 'A private method', 'A static method'], answer: 1 },
              { question: 'What is the key difference between abstract class and interface?', options: ['Interfaces can have constructors', 'Abstract classes can have state/fields; interfaces are pure contracts', 'Both are the same', 'Abstract classes cannot be inherited'], answer: 1 },
            ],
          },
          { id: 'java_m2_l3', title: 'Collections Framework', duration: '25 min', xpReward: 50,
            concept: 'Java Collections include List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap), Queue (PriorityQueue). All implement the Collection interface. Use generics for type safety.',
            codeExample: `import java.util.*;
import java.util.stream.*;

public class Collections {
    public static void main(String[] args) {
        // ArrayList
        List<String> names = new ArrayList<>(Arrays.asList("Arjun","Priya","Ravi"));
        names.add("Sneha");
        Collections.sort(names);

        // HashMap
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Arjun", 92); scores.put("Priya", 88);
        scores.forEach((k, v) -> System.out.println(k + ": " + v));

        // Stream to filter
        List<String> aNames = names.stream()
            .filter(n -> n.startsWith("A"))
            .collect(Collectors.toList());
        System.out.println(aNames);  // [Arjun]
    }
}`,
            realWorldExample: 'E-commerce platforms use HashMap<ProductId, Product> for O(1) product lookup by ID, and TreeMap<Price, List<Product>> to display products sorted by price.',
            challenge: 'Create an ArrayList of 10 students with their names and marks (use a Student class). Sort them by marks in descending order using Collections.sort() with a Comparator.',
            quiz: [
              { question: 'Which List implementation provides O(1) random access?', options: ['LinkedList', 'Stack', 'ArrayList', 'PriorityQueue'], answer: 2 },
              { question: 'What does HashMap guarantee about key order?', options: ['Insertion order', 'Sorted order', 'No guaranteed order', 'Random order'], answer: 2 },
              { question: 'Which collection stores only unique elements?', options: ['ArrayList', 'LinkedList', 'HashSet', 'Queue'], answer: 2 },
            ],
          },
        ],
      },
      {
        id: 'java_m3', title: 'Exception Handling and I/O',
        description: 'Checked/unchecked exceptions, custom exceptions, and Java I/O streams.',
        lessons: [
          { id: 'java_m3_l1', title: 'Exception Handling', duration: '22 min', xpReward: 50,
            concept: 'Java exceptions: checked (must handle or declare with throws) and unchecked (RuntimeException — optional). try-with-resources automatically closes AutoCloseable resources. Custom exceptions extend Exception or RuntimeException.',
            codeExample: `public class ExceptionDemo {
    static class InsufficientFundsException extends Exception {
        private double amount;
        InsufficientFundsException(double a) {
            super("Insufficient funds: need Rs." + a + " more");
            this.amount = a;
        }
        double getShortfall() { return amount; }
    }

    static void withdraw(double balance, double amount)
            throws InsufficientFundsException {
        if (amount > balance)
            throw new InsufficientFundsException(amount - balance);
        System.out.println("Withdrawn: Rs." + amount);
    }

    public static void main(String[] args) {
        try {
            withdraw(1000, 500);   // OK
            withdraw(1000, 1500);  // throws
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
            realWorldExample: 'Payment APIs throw custom exceptions (PaymentDeclinedException, NetworkTimeoutException) that the caller catches and shows as user-friendly messages in the app.',
            challenge: 'Create a custom checked exception InvalidEmailException. Write a validateEmail() method that throws it if the email does not contain @ and a dot.',
            quiz: [
              { question: 'What must you do with a checked exception you do not handle?', options: ['Ignore it', 'Declare it with throws', 'Convert it to unchecked', 'Use assert'], answer: 1 },
              { question: 'What does try-with-resources do?', options: ['Catches all exceptions', 'Auto-closes resources at the end of the block', 'Creates resources', 'Retries the try block'], answer: 1 },
              { question: 'Which class do unchecked exceptions extend?', options: ['Exception', 'Error', 'RuntimeException', 'Throwable'], answer: 2 },
            ],
          },
          { id: 'java_m3_l2', title: 'Java I/O Streams', duration: '20 min', xpReward: 50,
            concept: 'Java I/O uses streams of bytes (InputStream/OutputStream) and characters (Reader/Writer). BufferedReader wraps FileReader for efficient text reading. Files.readAllLines() (NIO) is a modern alternative. PrintWriter writes formatted text.',
            codeExample: `import java.io.*;
import java.nio.file.*;

public class IODemo {
    public static void main(String[] args) throws IOException {
        // Write using PrintWriter
        try (PrintWriter pw = new PrintWriter("students.txt")) {
            pw.println("Arjun,92");
            pw.println("Priya,88");
        }

        // Read using BufferedReader
        try (BufferedReader br = new BufferedReader(new FileReader("students.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",");
                System.out.printf("%-10s %s%n", parts[0], parts[1]);
            }
        }

        // NIO.2 approach
        List<String> lines = Files.readAllLines(Path.of("students.txt"));
        System.out.println("Total records: " + lines.size());
    }
}`,
            realWorldExample: 'Log analysis tools use BufferedReader to process gigabyte log files line-by-line without loading the whole file into memory — essential for production monitoring.',
            challenge: 'Write a Java program that reads a text file, counts how many times each word appears, and writes the frequency map to a new output file.',
            quiz: [
              { question: 'Why use BufferedReader instead of plain FileReader?', options: ['BufferedReader is more secure', 'BufferedReader reads efficiently in large blocks reducing I/O calls', 'FileReader cannot read text', 'BufferedReader supports binary data'], answer: 1 },
              { question: 'What does try-with-resources guarantee for file streams?', options: ['Exception suppression', 'Auto-close when block exits', 'Automatic flushing', 'Retry on failure'], answer: 1 },
              { question: 'What is the NIO.2 API class for file path manipulation?', options: ['File', 'FileSystem', 'Path', 'Directory'], answer: 2 },
            ],
          },
          { id: 'java_m3_l3', title: 'Generics in Java', duration: '20 min', xpReward: 50,
            concept: 'Generics enable type-safe collections and algorithms. Type parameters (<T>) eliminate casting and catch type errors at compile time. Bounded wildcards: <? extends T> (upper bound), <? super T> (lower bound).',
            codeExample: `public class GenericDemo {
    // Generic class
    static class Pair<A, B> {
        A first; B second;
        Pair(A f, B s) { first = f; second = s; }
        @Override public String toString() { return "(" + first + ", " + second + ")"; }
    }

    // Generic method
    static <T extends Comparable<T>> T maximum(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    // Wildcard
    static double sumList(List<? extends Number> list) {
        return list.stream().mapToDouble(Number::doubleValue).sum();
    }

    public static void main(String[] args) {
        Pair<String, Integer> p = new Pair<>("Score", 92);
        System.out.println(p);  // (Score, 92)
        System.out.println(maximum("Arjun", "Priya"));  // Priya
        System.out.println(maximum(3.14, 2.71));        // 3.14
    }
}`,
            realWorldExample: 'Java\'s Collections.sort(List<T>) uses generics — it sorts any List as long as T implements Comparable. Enterprise APIs return Response<T> generics to wrap any payload type.',
            challenge: 'Build a generic Stack<T> class with push, pop, peek, and isEmpty methods. Demonstrate it with Integer, String, and a custom object.',
            quiz: [
              { question: 'What is the benefit of Java generics?', options: ['Faster runtime', 'Type safety at compile time, eliminates casting', 'Smaller bytecode', 'Dynamic typing'], answer: 1 },
              { question: 'What does <? extends Number> mean?', options: ['Any type', 'Number and its subclasses', 'Number and its superclasses', 'Only Number'], answer: 1 },
              { question: 'When are generic types erased in Java?', options: ['At runtime', 'Never', 'At compile time (type erasure)', 'At startup'], answer: 2 },
            ],
          },
        ],
      },
      {
        id: 'java_m4', title: 'Streams API and Functional Programming',
        description: 'Lambda expressions, method references, and the Java Streams API.',
        lessons: [
          { id: 'java_m4_l1', title: 'Lambda Expressions', duration: '22 min', xpReward: 50,
            concept: 'Lambda expressions provide a concise way to implement functional interfaces (interfaces with one abstract method). Syntax: (parameters) -> expression or (parameters) -> { statements }. Common functional interfaces: Predicate<T>, Function<T,R>, Consumer<T>, Supplier<T>.',
            codeExample: `import java.util.*;
import java.util.function.*;

public class LambdaDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Arjun","Priya","Ravi","Sneha");

        // Predicate
        Predicate<String> longName = s -> s.length() > 4;
        names.stream().filter(longName).forEach(System.out::println);

        // Function
        Function<String, Integer> nameLength = String::length;
        names.stream().map(nameLength).forEach(System.out::println);

        // Sorting with Comparator lambda
        names.sort((a, b) -> a.compareTo(b));

        // Method reference
        names.forEach(System.out::println);
    }
}`,
            realWorldExample: 'Spring Boot controller methods use lambdas for request routing, response mapping, and async processing. Lambdas make enterprise code significantly more concise.',
            challenge: 'Create a list of 8 students (name, age, marks). Use lambdas to: filter students above 80 marks, sort by name, and print all using forEach.',
            quiz: [
              { question: 'What is a functional interface?', options: ['An interface with default methods', 'An interface with exactly one abstract method', 'An interface with no methods', 'An interface extending Comparable'], answer: 1 },
              { question: 'What does System.out::println represent?', options: ['A lambda expression', 'A method reference', 'A static method call', 'A constructor reference'], answer: 1 },
              { question: 'Which annotation marks a functional interface?', options: ['@Lambda', '@Functional', '@FunctionalInterface', '@SAM'], answer: 2 },
            ],
          },
          { id: 'java_m4_l2', title: 'Streams API', duration: '25 min', xpReward: 50,
            concept: 'Streams provide a declarative, functional-style way to process collections. Intermediate operations (filter, map, sorted) return a new stream. Terminal operations (collect, forEach, reduce, count) produce a result. Streams are lazy — only evaluated when a terminal operation is called.',
            codeExample: `import java.util.*;
import java.util.stream.*;

public class StreamDemo {
    record Student(String name, int marks, String dept) {}

    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Arjun", 92, "CS"),
            new Student("Priya", 88, "CS"),
            new Student("Ravi",  75, "EC"),
            new Student("Sneha", 95, "CS")
        );

        // Filter, sort, map, collect
        List<String> topCS = students.stream()
            .filter(s -> s.dept().equals("CS") && s.marks() > 85)
            .sorted(Comparator.comparingInt(Student::marks).reversed())
            .map(Student::name)
            .collect(Collectors.toList());
        System.out.println(topCS);  // [Sneha, Arjun, Priya]

        // Average marks
        OptionalDouble avg = students.stream()
            .mapToInt(Student::marks).average();
        System.out.printf("Average: %.2f%n", avg.getAsDouble());

        // Group by department
        Map<String, List<Student>> byDept = students.stream()
            .collect(Collectors.groupingBy(Student::dept));
    }
}`,
            realWorldExample: 'Reporting systems use Streams to process thousands of transaction records: filter by date range, group by category, sum amounts, and collect the top 10 — all in a readable pipeline.',
            challenge: 'Given a list of integers, use Streams to: filter even numbers, square each, collect to a list, and print their sum using reduce().',
            quiz: [
              { question: 'What type of operations are filter() and map() in Streams?', options: ['Terminal operations', 'Intermediate operations', 'Collector operations', 'Parallel operations'], answer: 1 },
              { question: 'When does a Stream actually execute its pipeline?', options: ['When the stream is created', 'When the first filter is applied', 'When a terminal operation is called', 'When collect() is defined'], answer: 2 },
              { question: 'What does Collectors.groupingBy() produce?', options: ['A sorted list', 'A Map grouping elements by a classifier', 'An average value', 'A filtered stream'], answer: 1 },
            ],
          },
          { id: 'java_m4_l3', title: 'Multithreading in Java', duration: '25 min', xpReward: 50,
            concept: 'Java supports multithreading via Thread class, Runnable interface, and ExecutorService. synchronized blocks prevent race conditions. The Callable interface returns results. Future.get() waits for an async result.',
            codeExample: `import java.util.concurrent.*;

public class ThreadDemo {
    static int counter = 0;
    static Object lock = new Object();

    static void increment() {
        synchronized (lock) {
            counter++;
        }
    }

    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(4);
        List<Future<Integer>> futures = new ArrayList<>();

        // Submit Callable tasks
        for (int i = 0; i < 10; i++) {
            final int taskId = i;
            futures.add(pool.submit(() -> {
                System.out.println("Task " + taskId + " on " + Thread.currentThread().getName());
                return taskId * taskId;
            }));
        }

        // Collect results
        for (Future<Integer> f : futures) System.out.print(f.get() + " ");
        pool.shutdown();
    }
}`,
            realWorldExample: 'Web servers use thread pools (ExecutorService) to handle concurrent HTTP requests. Each request is a Callable task — the pool limits resource usage and maximizes throughput.',
            challenge: 'Create an ExecutorService with 3 threads. Submit 6 tasks, each printing its ID and sleeping 1 second. Print "All done" after all tasks complete.',
            quiz: [
              { question: 'What does synchronized do in Java?', options: ['Creates a new thread', 'Ensures only one thread executes the block at a time', 'Starts multiple threads', 'Stops all threads'], answer: 1 },
              { question: 'What does ExecutorService provide over raw Thread?', options: ['Automatic thread naming', 'Thread pool management and task scheduling', 'GUI threading', 'Garbage collection'], answer: 1 },
              { question: 'What does Future.get() do?', options: ['Cancels the task', 'Returns the result immediately', 'Waits for the Callable to complete and returns result', 'Submits a new task'], answer: 2 },
            ],
          },
        ],
      },
      {
        id: 'java_m5', title: 'Design Patterns and Best Practices',
        description: 'Singleton, Builder, Strategy, and clean code principles in Java.',
        lessons: [
          { id: 'java_m5_l1', title: 'Builder and Strategy Patterns', duration: '22 min', xpReward: 50,
            concept: 'Builder constructs complex objects step by step — useful when constructors have many parameters. Strategy defines a family of algorithms, encapsulates each, and makes them interchangeable at runtime.',
            codeExample: `// Builder Pattern
class HttpRequest {
    private final String url;
    private final String method;
    private final Map<String, String> headers;
    private final String body;

    private HttpRequest(Builder b) {
        this.url = b.url; this.method = b.method;
        this.headers = b.headers; this.body = b.body;
    }

    static class Builder {
        private String url, method = "GET", body = "";
        private Map<String, String> headers = new HashMap<>();

        Builder url(String u) { this.url = u; return this; }
        Builder method(String m) { this.method = m; return this; }
        Builder header(String k, String v) { headers.put(k,v); return this; }
        Builder body(String b) { this.body = b; return this; }
        HttpRequest build() { return new HttpRequest(this); }
    }
}

// Strategy Pattern
interface SortStrategy { void sort(int[] arr); }
class BubbleSort implements SortStrategy {
    public void sort(int[] arr) { /* bubble sort */ }
}
class QuickSort implements SortStrategy {
    public void sort(int[] arr) { /* quick sort */ }
}`,
            realWorldExample: 'Java\'s StringBuilder itself is a builder. HTTP client libraries (OkHttp) use Builder pattern for request construction: new Request.Builder().url(url).post(body).build().',
            challenge: 'Create a Pizza class using the Builder pattern with optional toppings, size, and crust type. Build two different pizza configurations and print them.',
            quiz: [
              { question: 'What problem does the Builder pattern solve?', options: ['Thread synchronization', 'Complex object construction with many optional parameters', 'Multiple inheritance', 'Sorting algorithms'], answer: 1 },
              { question: 'What makes Strategy pattern different from inheritance?', options: ['Strategy uses multiple inheritance', 'Strategy swaps algorithms at runtime without subclassing the context', 'Strategy is compile-time only', 'Strategy is faster'], answer: 1 },
              { question: 'Builder\'s build() method typically returns?', options: ['The Builder itself', 'A new Builder', 'The fully constructed target object', 'void'], answer: 2 },
            ],
          },
          { id: 'java_m5_l2', title: 'SOLID Principles', duration: '20 min', xpReward: 50,
            concept: 'SOLID principles guide clean OOP design. S = Single Responsibility. O = Open/Closed. L = Liskov Substitution. I = Interface Segregation. D = Dependency Inversion. These principles make code maintainable, extensible, and testable.',
            codeExample: `// S — Single Responsibility
// BAD: UserService handles auth AND email AND DB
// GOOD: Separate UserRepository, EmailService, AuthService

// O — Open/Closed
// Use interfaces/abstract classes so you extend without modifying
interface Discount { double apply(double price); }
class SeasonalDiscount implements Discount { ... }
class LoyaltyDiscount implements Discount { ... }

// D — Dependency Inversion
// BAD:
class OrderService {
    MySqlRepository repo = new MySqlRepository(); // tightly coupled
}
// GOOD:
class OrderService {
    Repository repo;  // depends on abstraction
    OrderService(Repository repo) { this.repo = repo; }
}`,
            realWorldExample: 'Spring Boot frameworks are built on SOLID. Dependency Injection (D principle) is core: your service declares what it needs (interfaces), Spring provides the concrete implementations.',
            challenge: 'Identify and fix a Single Responsibility violation: a class UserManager that validates user data, saves to database, sends welcome emails, and generates reports.',
            quiz: [
              { question: 'What does Single Responsibility Principle state?', options: ['A class should be as small as possible', 'A class should have only one reason to change', 'A class should have one method', 'A class should inherit from one parent'], answer: 1 },
              { question: 'Open/Closed principle says code should be?', options: ['Open to inheritance, closed to interfaces', 'Open for extension, closed for modification', 'Open for reading, closed for writing', 'Open-source and closed-licensed'], answer: 1 },
              { question: 'Dependency Inversion says depend on?', options: ['Concrete classes for speed', 'Abstract interfaces, not concrete implementations', 'Static utility classes', 'Singleton instances'], answer: 1 },
            ],
          },
          { id: 'java_m5_l3', title: 'Unit Testing with JUnit', duration: '22 min', xpReward: 50,
            concept: 'Unit tests verify individual methods in isolation. JUnit 5 uses @Test, @BeforeEach, @AfterEach annotations. Assertions (assertEquals, assertTrue, assertThrows) check expected vs actual. Test-Driven Development (TDD) writes tests before code.',
            codeExample: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    private Calculator calc;

    @BeforeEach
    void setUp() { calc = new Calculator(); }

    @Test
    void testAdd() {
        assertEquals(5, calc.add(2, 3));
        assertEquals(0, calc.add(-1, 1));
    }

    @Test
    void testDivideByZero() {
        assertThrows(ArithmeticException.class, () -> calc.divide(10, 0));
    }

    @Test
    void testMultiply() {
        assertEquals(12, calc.multiply(3, 4));
        assertTrue(calc.multiply(0, 100) == 0);
    }
}`,
            realWorldExample: 'Netflix runs thousands of JUnit tests on every code change before deployment. A failing test blocks the release — preventing bugs from reaching 200 million users.',
            challenge: 'Write JUnit 5 tests for a BankAccount class. Test: deposit increases balance, withdraw decreases balance, withdraw throws exception when insufficient funds.',
            quiz: [
              { question: 'Which annotation marks a test method in JUnit 5?', options: ['@Unit', '@RunTest', '@Test', '@Assert'], answer: 2 },
              { question: 'What does @BeforeEach do?', options: ['Runs after all tests', 'Runs once before all tests', 'Runs before each individual test method', 'Skips the test'], answer: 2 },
              { question: 'Which assertion checks that an exception is thrown?', options: ['assertEquals', 'assertTrue', 'assertThrows', 'assertException'], answer: 2 },
            ],
          },
        ],
      },
    ],
  },

  // ===== MYSQL =====
  {
    id: 'mysql',
    name: 'MySQL Databases',
    stream: 'Science',
    duration: '6 weeks',
    difficulty: 'Beginner',
    totalXP: 2250,
    careerRelevance: 'MySQL is the most widely deployed relational database. Every web application, from small startups to Fortune 500 companies, uses a relational database for persistent data storage.',
    skillsGained: ['Database Design', 'SQL Queries', 'Joins & Subqueries', 'Indexes', 'Stored Procedures', 'Transactions', 'Security & Users', 'Query Optimization'],
    prerequisites: ['Basic logic and math', 'Familiarity with spreadsheets helpful'],
    learningOutcomes: [
      'Design normalized relational schemas from business requirements',
      'Write SELECT queries with filters, joins, and aggregations',
      'Create indexes to improve query performance',
      'Use transactions to maintain data integrity',
      'Set up user roles and permissions for database security',
    ],
    requiredSkills: ['SQL', 'MySQL', 'Database Design', 'Query Optimization', 'Relational Modeling'],
    eligibility: { subjects: ['Any'], minPercentage: 0, entranceExams: ['None'] },
    description: 'Design relational tables, handle keys, optimize execution queries, and master join statements.',
    careerPaths: ['Database Administrator', 'Data Analyst', 'Backend Developer'],
    averageSalary: '5-12 LPA',
    topColleges: ['Online Self-Paced', 'MySQL official docs', 'Udacity'],
    interests: ['Databases', 'Data Modeling', 'Queries'],
    skills: ['SQL', 'MySQL', 'Database Design'],
    workEnvironment: 'Office/Remote',
    futureScope: 'Excellent — database knowledge is essential',
    projects: [
      { id: 'mysql_proj_1', level: 'Beginner', title: 'Student Database', description: 'Design and populate a student database with tables for students, courses, and enrollments. Write queries to generate class lists, grade reports, and statistics.', skills: ['DDL', 'DML', 'Basic SELECT'], xpReward: 150, estimatedTime: '3 hours' },
      { id: 'mysql_proj_2', level: 'Intermediate', title: 'E-Commerce Schema', description: 'Design a normalized e-commerce schema (users, products, orders, order_items, categories). Write queries for sales reports, top products, and customer analytics.', skills: ['Normalization', 'Joins', 'Aggregation'], xpReward: 300, estimatedTime: '6 hours' },
      { id: 'mysql_proj_3', level: 'Advanced', title: 'Library Management System', description: 'Build a complete library system with stored procedures for book lending, triggers for overdue tracking, and views for report generation.', skills: ['Stored Procedures', 'Triggers', 'Views', 'Transactions'], xpReward: 500, estimatedTime: '10 hours' },
    ],
    modules: [
      {
        id: 'sql_m1', title: 'Database Foundations and SQL Basics',
        description: 'Relational concepts, DDL, and basic data manipulation.',
        lessons: [
          { id: 'sql_m1_l1', title: 'Relational Databases and SQL', duration: '20 min', xpReward: 50,
            concept: 'A relational database organizes data in tables (relations) with rows (records) and columns (attributes). SQL (Structured Query Language) has four categories: DDL (CREATE, ALTER, DROP), DML (INSERT, UPDATE, DELETE), DQL (SELECT), and DCL (GRANT, REVOKE).',
            codeExample: `-- Create a database
CREATE DATABASE college_db;
USE college_db;

-- Create a table (DDL)
CREATE TABLE students (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) UNIQUE NOT NULL,
    cgpa       DECIMAL(4,2) CHECK (cgpa BETWEEN 0 AND 10),
    dept       VARCHAR(50) DEFAULT 'Undeclared',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data (DML)
INSERT INTO students (name, email, cgpa, dept) VALUES
('Arjun Kumar',  'arjun@college.edu',  9.20, 'CSE'),
('Priya Sharma', 'priya@college.edu',  8.50, 'ECE'),
('Ravi Patel',   'ravi@college.edu',   7.80, 'MECH');

-- Query data (DQL)
SELECT name, cgpa, dept FROM students ORDER BY cgpa DESC;`,
            realWorldExample: 'Instagram stores 500 million posts daily in relational databases. Every like, comment, and follow creates rows in related tables, all queryable with SQL.',
            challenge: 'Create a products table with id, name, price, and stock_quantity columns. Insert 5 products and select all products where price is above 1000.',
            quiz: [
              { question: 'What does DDL stand for?', options: ['Data Display Language', 'Data Definition Language', 'Database Dynamic Language', 'Data Driven Logic'], answer: 1 },
              { question: 'Which constraint ensures a column has no duplicate values?', options: ['PRIMARY KEY', 'UNIQUE', 'NOT NULL', 'CHECK'], answer: 1 },
              { question: 'What does AUTO_INCREMENT do?', options: ['Increases column size', 'Automatically assigns incrementing numeric values', 'Creates an index', 'Validates input'], answer: 1 },
            ],
          },
          { id: 'sql_m1_l2', title: 'SELECT Queries with Filtering', duration: '22 min', xpReward: 50,
            concept: 'SELECT retrieves data. WHERE filters rows. ORDER BY sorts. LIMIT restricts count. LIKE for pattern matching (% = any chars, _ = one char). BETWEEN for ranges. IN for a set of values. IS NULL for null checks.',
            codeExample: `-- Basic SELECT
SELECT name, cgpa FROM students WHERE cgpa >= 8.0;

-- Pattern matching
SELECT * FROM students WHERE name LIKE 'A%';

-- Range
SELECT * FROM students WHERE cgpa BETWEEN 7.0 AND 8.5;

-- IN clause
SELECT * FROM students WHERE dept IN ('CSE', 'ECE');

-- Combined conditions
SELECT name, dept, cgpa
FROM students
WHERE dept = 'CSE' AND cgpa > 8.0
ORDER BY cgpa DESC
LIMIT 5;

-- NULL check
SELECT * FROM students WHERE dept IS NULL;`,
            realWorldExample: 'Netflix recommendation engines run SELECT queries with complex WHERE clauses to retrieve movies matching a user\'s genre preferences, language, rating range, and watch history.',
            challenge: 'Write queries to: (1) Find all students with CGPA above 8.5. (2) Find all CSE or ECE students sorted alphabetically by name. (3) Find students whose name starts with R.',
            quiz: [
              { question: 'What does % mean in a LIKE pattern?', options: ['Exactly one character', 'Any sequence of zero or more characters', 'Numeric value', 'Column alias'], answer: 1 },
              { question: 'What does BETWEEN 5 AND 10 mean?', options: ['5 < x < 10 (exclusive)', '5 <= x <= 10 (inclusive)', 'x = 5 OR x = 10', 'x > 5 AND x < 10'], answer: 1 },
              { question: 'Which clause limits the number of returned rows?', options: ['RESTRICT', 'MAX', 'LIMIT', 'COUNT'], answer: 2 },
            ],
          },
          { id: 'sql_m1_l3', title: 'Aggregate Functions and GROUP BY', duration: '22 min', xpReward: 50,
            concept: 'Aggregate functions operate on groups: COUNT(), SUM(), AVG(), MAX(), MIN(). GROUP BY groups rows sharing a value. HAVING filters groups (like WHERE but for aggregates). Use aliases with AS for readability.',
            codeExample: `-- Count students per department
SELECT dept, COUNT(*) AS student_count
FROM students
GROUP BY dept
ORDER BY student_count DESC;

-- Average CGPA per department
SELECT dept,
       ROUND(AVG(cgpa), 2) AS avg_cgpa,
       MAX(cgpa)           AS top_cgpa,
       MIN(cgpa)           AS lowest_cgpa
FROM students
GROUP BY dept;

-- Departments with average CGPA above 8.0
SELECT dept, ROUND(AVG(cgpa), 2) AS avg_cgpa
FROM students
GROUP BY dept
HAVING AVG(cgpa) > 8.0;`,
            realWorldExample: 'Business analytics dashboards run GROUP BY queries to show revenue by region, orders per day, average rating per product — all computed dynamically in SQL.',
            challenge: 'Write a query that shows each department with its student count, average CGPA, and the name of its top-performing student. Filter departments with fewer than 2 students.',
            quiz: [
              { question: 'What is the difference between WHERE and HAVING?', options: ['WHERE filters rows; HAVING filters aggregated groups', 'They are identical', 'HAVING filters rows; WHERE filters groups', 'WHERE uses aggregates; HAVING does not'], answer: 0 },
              { question: 'Which function counts non-NULL values in a column?', options: ['SUM(column)', 'COUNT(column)', 'COUNT(*)', 'TOTAL(column)'], answer: 1 },
              { question: 'What does GROUP BY do?', options: ['Sorts the results', 'Groups rows with same column value for aggregation', 'Filters rows', 'Joins tables'], answer: 1 },
            ],
          },
        ],
      },
      {
        id: 'sql_m2', title: 'Joins and Relationships',
        description: 'Primary/foreign keys, INNER JOIN, LEFT JOIN, and multi-table queries.',
        lessons: [
          { id: 'sql_m2_l1', title: 'Primary and Foreign Keys', duration: '20 min', xpReward: 50,
            concept: 'Primary key uniquely identifies each row. Foreign key references the primary key of another table, enforcing referential integrity. One-to-Many: one student can have many enrollments. Many-to-Many: use a junction table.',
            codeExample: `CREATE TABLE departments (
    dept_id   INT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(100) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE courses (id INT PRIMARY KEY, title VARCHAR(100));

-- Junction table for many-to-many
CREATE TABLE enrollments (
    student_id INT,
    course_id  INT,
    grade      DECIMAL(4,2),
    enrolled_at DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id)  REFERENCES courses(id)
);`,
            realWorldExample: 'Amazon\'s order system: orders table has a FOREIGN KEY to users table (one user, many orders) and a junction table order_products links orders to products (many-to-many).',
            challenge: 'Design a schema for a school: teachers table, classes table, and a teacher_classes junction table. Write the CREATE statements with proper primary and foreign keys.',
            quiz: [
              { question: 'What does a FOREIGN KEY constraint enforce?', options: ['Uniqueness of values', 'Referential integrity between tables', 'Data type validation', 'Index creation'], answer: 1 },
              { question: 'What is a junction table used for?', options: ['Storing temporary data', 'Implementing many-to-many relationships', 'Speeding up queries', 'Creating backups'], answer: 1 },
              { question: 'What does ON DELETE CASCADE do?', options: ['Prevents deletion of referenced rows', 'Deletes child rows when the parent row is deleted', 'Sets child FK to NULL on parent deletion', 'Creates a log of deletions'], answer: 1 },
            ],
          },
          { id: 'sql_m2_l2', title: 'SQL Joins', duration: '25 min', xpReward: 50,
            concept: 'INNER JOIN returns rows matching in both tables. LEFT JOIN returns all rows from the left + matching from right (NULL if no match). RIGHT JOIN is the reverse. FULL OUTER JOIN returns all rows from both. Self JOIN joins a table to itself.',
            codeExample: `-- INNER JOIN: students with their department names
SELECT s.name, d.dept_name, s.cgpa
FROM students s
INNER JOIN departments d ON s.dept_id = d.dept_id;

-- LEFT JOIN: all students, even those without a department
SELECT s.name, COALESCE(d.dept_name, 'Unassigned') AS dept
FROM students s
LEFT JOIN departments d ON s.dept_id = d.dept_id;

-- Multi-table join: student enrollments with course titles
SELECT s.name, c.title, e.grade
FROM enrollments e
JOIN students s ON e.student_id = s.id
JOIN courses c  ON e.course_id  = c.id
WHERE e.grade > 7.0
ORDER BY e.grade DESC;`,
            realWorldExample: 'E-commerce reports join orders, users, products, and categories tables to generate "Top 10 products by revenue in Q4 from premium customers" in a single SQL query.',
            challenge: 'Write a query that shows each student\'s name, their enrolled courses, and grades. Include students with no enrollments (they should show NULL for course and grade).',
            quiz: [
              { question: 'What does INNER JOIN return?', options: ['All rows from both tables', 'Only rows with matching values in both tables', 'All rows from left table', 'All rows from right table'], answer: 1 },
              { question: 'What does LEFT JOIN return for non-matching right rows?', options: ['Skips the row', 'NULL values for right table columns', 'Default values', 'Empty strings'], answer: 1 },
              { question: 'If Table A has 5 rows and Table B has 3 matching rows, how many rows does INNER JOIN return?', options: ['8', '5', '3', '15'], answer: 2 },
            ],
          },
          { id: 'sql_m2_l3', title: 'Subqueries and Views', duration: '22 min', xpReward: 50,
            concept: 'A subquery is a SELECT inside another query. Can be in WHERE, FROM, or SELECT. Correlated subqueries reference the outer query. Views are saved SELECT queries treated as virtual tables — improve reusability and security.',
            codeExample: `-- Subquery in WHERE
SELECT name, cgpa FROM students
WHERE cgpa > (SELECT AVG(cgpa) FROM students);

-- Subquery in FROM (derived table)
SELECT dept, avg_cgpa FROM (
    SELECT dept, AVG(cgpa) AS avg_cgpa
    FROM students GROUP BY dept
) AS dept_stats
WHERE avg_cgpa > 8.0;

-- Creating a view
CREATE VIEW top_students AS
    SELECT s.name, d.dept_name, s.cgpa
    FROM students s
    JOIN departments d ON s.dept_id = d.dept_id
    WHERE s.cgpa >= 8.5;

-- Query the view like a table
SELECT * FROM top_students ORDER BY cgpa DESC;`,
            realWorldExample: 'Database administrators create views that expose only non-sensitive columns to application users: the user_profile view excludes the password_hash column from the users table.',
            challenge: 'Create a view called high_scorers that shows students with CGPA above department average. Query the view to list all high scorers sorted by CGPA.',
            quiz: [
              { question: 'What is a correlated subquery?', options: ['A subquery in the FROM clause', 'A subquery that references columns from the outer query', 'A subquery with multiple results', 'A subquery inside a JOIN'], answer: 1 },
              { question: 'What is a database view?', options: ['A temporary table stored on disk', 'A saved SELECT query that behaves like a virtual table', 'A copy of a table', 'A cached query result'], answer: 1 },
              { question: 'WHERE column IN (subquery) — what must the subquery return?', options: ['A single value', 'Multiple columns', 'A single column', 'A JOIN result'], answer: 2 },
            ],
          },
        ],
      },
      {
        id: 'sql_m3', title: 'Indexes and Query Optimization',
        description: 'How indexes work, EXPLAIN, and writing efficient queries.',
        lessons: [
          { id: 'sql_m3_l1', title: 'Indexes in MySQL', duration: '22 min', xpReward: 50,
            concept: 'An index is a data structure (B-tree) that speeds up lookups. Without an index, MySQL scans every row (full table scan). With an index, it uses the B-tree to jump directly to matching rows. Indexes speed reads but slightly slow writes.',
            codeExample: `-- Check query performance without index
EXPLAIN SELECT * FROM students WHERE email = 'arjun@college.edu';
-- type: ALL (full table scan) — slow

-- Create indexes
CREATE INDEX idx_email ON students(email);
CREATE INDEX idx_dept_cgpa ON students(dept, cgpa);

-- After index
EXPLAIN SELECT * FROM students WHERE email = 'arjun@college.edu';
-- type: ref (index lookup) — fast

-- Composite index benefit
SELECT name, cgpa FROM students
WHERE dept = 'CSE' AND cgpa > 8.0;  -- uses idx_dept_cgpa

-- View all indexes on a table
SHOW INDEX FROM students;`,
            realWorldExample: 'Twitter (now X) has billions of tweets. Without an index on user_id, finding your tweets requires scanning all 500 billion rows. With a B-tree index on user_id, it takes microseconds.',
            challenge: 'Create a large test table and measure query time before and after adding an index using EXPLAIN. Compare the "type" column in both outputs.',
            quiz: [
              { question: 'What data structure does MySQL use for most indexes?', options: ['Hash table', 'Red-Black tree', 'B-tree', 'Trie'], answer: 2 },
              { question: 'What does EXPLAIN show?', options: ['Query result data', 'Query execution plan (how MySQL plans to run the query)', 'Table structure', 'Index list'], answer: 1 },
              { question: 'What is the downside of adding many indexes?', options: ['Slower reads', 'Increased memory and slower INSERT/UPDATE operations', 'SQL errors', 'Data corruption'], answer: 1 },
            ],
          },
          { id: 'sql_m3_l2', title: 'Transactions and ACID Properties', duration: '22 min', xpReward: 50,
            concept: 'A transaction is a group of SQL statements treated as one unit. ACID: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions do not interfere), Durability (committed changes persist). COMMIT saves, ROLLBACK undoes.',
            codeExample: `-- Bank transfer transaction
START TRANSACTION;

UPDATE accounts SET balance = balance - 5000
WHERE account_id = 101;

UPDATE accounts SET balance = balance + 5000
WHERE account_id = 202;

-- Verify the transfer
SELECT account_id, balance FROM accounts
WHERE account_id IN (101, 202);

-- Commit if everything is correct
COMMIT;

-- Or rollback if something failed
-- ROLLBACK;

-- With error handling (stored procedure style)
DELIMITER //
CREATE PROCEDURE transfer_funds(from_id INT, to_id INT, amount DECIMAL(10,2))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION ROLLBACK;
    START TRANSACTION;
    UPDATE accounts SET balance = balance - amount WHERE account_id = from_id;
    UPDATE accounts SET balance = balance + amount WHERE account_id = to_id;
    COMMIT;
END //`,
            realWorldExample: 'UPI payments use database transactions. If the debit from your account succeeds but the credit to the recipient fails, the ROLLBACK ensures your money is not lost.',
            challenge: 'Simulate a failed transaction: start a transfer, debit account A, then simulate an error before crediting account B. Use ROLLBACK and verify both accounts remain unchanged.',
            quiz: [
              { question: 'What does ROLLBACK do in SQL?', options: ['Saves the transaction', 'Undoes all changes since the last COMMIT', 'Creates a savepoint', 'Restarts the database'], answer: 1 },
              { question: 'What does Atomicity in ACID mean?', options: ['Transactions run in parallel', 'All statements in a transaction succeed or all fail together', 'Data is always consistent', 'Changes persist after commit'], answer: 1 },
              { question: 'What SQL command saves a transaction permanently?', options: ['SAVE', 'FINALIZE', 'COMMIT', 'APPLY'], answer: 2 },
            ],
          },
          { id: 'sql_m3_l3', title: 'Stored Procedures and Triggers', duration: '25 min', xpReward: 50,
            concept: 'Stored procedures are reusable SQL programs stored in the database. They accept parameters and execute complex logic. Triggers automatically execute SQL code in response to INSERT, UPDATE, or DELETE events.',
            codeExample: `-- Stored Procedure
DELIMITER //
CREATE PROCEDURE GetTopStudents(IN dept_name VARCHAR(50), IN min_cgpa DECIMAL(4,2))
BEGIN
    SELECT name, cgpa
    FROM students
    WHERE dept = dept_name AND cgpa >= min_cgpa
    ORDER BY cgpa DESC;
END //
DELIMITER ;

CALL GetTopStudents('CSE', 8.5);

-- Trigger: log every student deletion
CREATE TABLE student_audit_log (
    student_id INT, student_name VARCHAR(100),
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE TRIGGER before_student_delete
BEFORE DELETE ON students
FOR EACH ROW
BEGIN
    INSERT INTO student_audit_log(student_id, student_name)
    VALUES (OLD.id, OLD.name);
END //
DELIMITER ;`,
            realWorldExample: 'Banking systems use triggers to create audit logs: every UPDATE to an account balance automatically triggers an INSERT into the transaction_log table for compliance.',
            challenge: 'Create a stored procedure that inserts a new student and immediately calls another procedure to enroll them in a default course. Add a trigger that logs every new enrollment.',
            quiz: [
              { question: 'What is a stored procedure?', options: ['A table stored on disk', 'A saved, reusable SQL program executed by CALL', 'A temporary query', 'An index on procedures'], answer: 1 },
              { question: 'When does a BEFORE INSERT trigger fire?', options: ['After the row is inserted', 'Before the INSERT statement completes', 'Only on batch inserts', 'On SELECT statements'], answer: 1 },
              { question: 'In a DELETE trigger, how do you access the deleted row\'s data?', options: ['NEW.column', 'OLD.column', 'DELETED.column', 'ROW.column'], answer: 1 },
            ],
          },
        ],
      },
      {
        id: 'sql_m4', title: 'Database Security and Administration',
        description: 'User management, permissions, backups, and best practices.',
        lessons: [
          { id: 'sql_m4_l1', title: 'User Management and Permissions', duration: '20 min', xpReward: 50,
            concept: 'MySQL uses a privilege system. Create users with CREATE USER. Grant specific permissions with GRANT. Revoke with REVOKE. Principle of Least Privilege: grant only the permissions needed. Roles (MySQL 8+) group privileges for easier management.',
            codeExample: `-- Create a read-only user
CREATE USER 'reporter'@'localhost' IDENTIFIED BY 'SecurePass@123';
GRANT SELECT ON college_db.* TO 'reporter'@'localhost';

-- Create an application user with limited privileges
CREATE USER 'app_user'@'%' IDENTIFIED BY 'AppPass@456';
GRANT SELECT, INSERT, UPDATE ON college_db.students TO 'app_user'@'%';
GRANT EXECUTE ON college_db.* TO 'app_user'@'%';

-- View user privileges
SHOW GRANTS FOR 'reporter'@'localhost';

-- Revoke a privilege
REVOKE INSERT ON college_db.students FROM 'app_user'@'%';

-- Remove user
DROP USER 'reporter'@'localhost';
FLUSH PRIVILEGES;`,
            realWorldExample: 'Production databases have separate users: app_read (SELECT only), app_write (SELECT, INSERT, UPDATE), and dba (ALL PRIVILEGES). An SQL injection attack with app_read cannot delete data.',
            challenge: 'Create three users: a read-only analyst, a read-write application user, and an admin. Grant appropriate privileges to each. Verify with SHOW GRANTS.',
            quiz: [
              { question: 'What is the Principle of Least Privilege?', options: ['Users get all privileges by default', 'Grant only the minimum permissions needed', 'All users share the same account', 'Revoke permissions after each session'], answer: 1 },
              { question: 'Which command removes a user from MySQL?', options: ['DELETE USER', 'REMOVE USER', 'DROP USER', 'REVOKE USER'], answer: 2 },
              { question: 'What does % mean in \'user\'@\'%\'?', options: ['Any database', 'Any password', 'Connection from any host', 'Superuser privilege'], answer: 2 },
            ],
          },
          { id: 'sql_m4_l2', title: 'Normalization', duration: '22 min', xpReward: 50,
            concept: 'Normalization reduces data redundancy and prevents anomalies. 1NF: atomic values, no repeating groups. 2NF: no partial dependencies on composite key. 3NF: no transitive dependencies. Most production schemas target 3NF.',
            codeExample: `-- UN-NORMALIZED (bad): student, course, and instructor all in one row
-- student_id | student_name | course | instructor | dept | dept_head
-- Problems: dept_head repeats for every student in that dept

-- 1NF: Atomic values
-- Split repeating groups into separate rows

-- 2NF: Remove partial dependencies
-- If key is (student_id, course_id):
-- student_name depends only on student_id (partial) -- move to students table
-- course_title depends only on course_id (partial) -- move to courses table

-- 3NF: Remove transitive dependencies
-- dept_head depends on dept, not on student -- move to departments table

-- NORMALIZED RESULT:
-- students(id, name, dept_id)
-- departments(dept_id, dept_name, dept_head)
-- courses(course_id, title, instructor_id)
-- enrollments(student_id, course_id, grade)
-- instructors(id, name)`,
            realWorldExample: 'An un-normalized orders table stores customer name in every order row. If the customer changes their name, you must update thousands of rows. In 3NF, update one row in the customers table.',
            challenge: 'Given a flat table: (order_id, customer_name, customer_email, product_name, product_price, quantity) — normalize it to 3NF. Draw the resulting tables and their relationships.',
            quiz: [
              { question: 'What does 1NF require?', options: ['No null values', 'Each column holds atomic (single, indivisible) values', 'All columns depend on the primary key', 'No foreign keys'], answer: 1 },
              { question: 'What is a partial dependency?', options: ['Dependency on a NULL column', 'A non-key column depending on only part of a composite primary key', 'A foreign key relationship', 'A transitive dependency'], answer: 1 },
              { question: 'What anomaly does normalization prevent?', options: ['Slow queries', 'Data redundancy and update/insert/delete anomalies', 'Missing indexes', 'Permission errors'], answer: 1 },
            ],
          },
          { id: 'sql_m4_l3', title: 'Query Optimization Techniques', duration: '22 min', xpReward: 50,
            concept: 'Query optimization improves performance at scale. Key techniques: use indexes, avoid SELECT *, avoid functions on indexed columns in WHERE, use EXISTS instead of IN for correlated checks, analyze with EXPLAIN, and use query caching strategies.',
            codeExample: `-- BAD: Function on indexed column defeats the index
SELECT * FROM students WHERE YEAR(created_at) = 2024;

-- GOOD: Use range instead
SELECT * FROM students
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';

-- BAD: SELECT * fetches unnecessary columns
SELECT * FROM students WHERE dept = 'CSE';

-- GOOD: Select only needed columns
SELECT name, cgpa FROM students WHERE dept = 'CSE';

-- BAD: IN with large subquery
SELECT name FROM students
WHERE id IN (SELECT student_id FROM enrollments);

-- GOOD: EXISTS is often faster
SELECT name FROM students s
WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.id);

-- Always EXPLAIN your queries
EXPLAIN SELECT name, cgpa FROM students WHERE dept = 'CSE' AND cgpa > 8.0;`,
            realWorldExample: 'LinkedIn engineers use EXPLAIN on every query that touches 10M+ rows. A missing index or SELECT * can turn a 10ms query into a 10-second database lock that affects millions of users.',
            challenge: 'Take a slow query (using EXPLAIN to confirm full table scan). Add an appropriate index and verify EXPLAIN shows an index lookup. Measure the before/after time using SHOW PROFILES.',
            quiz: [
              { question: 'Why is SELECT * bad for performance?', options: ['It is syntactically invalid', 'It fetches unnecessary columns, increasing I/O and memory', 'It bypasses indexes', 'It locks all tables'], answer: 1 },
              { question: 'Why should you avoid functions on indexed columns in WHERE?', options: ['Functions cause errors', 'Functions on indexed columns prevent index usage', 'Functions slow down all queries', 'Functions are deprecated in MySQL 8'], answer: 1 },
              { question: 'What does EXPLAIN SELECT ... show?', options: ['The query result data', 'How MySQL plans to execute the query (index use, row estimates, type)', 'Table structure', 'User permissions'], answer: 1 },
            ],
          },
        ],
      },
      {
        id: 'sql_m5', title: 'Advanced MySQL and Real-World Application',
        description: 'Window functions, JSON, full-text search, and connecting to applications.',
        lessons: [
          { id: 'sql_m5_l1', title: 'Window Functions', duration: '22 min', xpReward: 50,
            concept: 'Window functions perform calculations across a set of related rows (window) without collapsing them into groups. ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), SUM() OVER(), AVG() OVER(). Defined with OVER (PARTITION BY ... ORDER BY ...).',
            codeExample: `-- Rank students within each department by CGPA
SELECT
    name, dept, cgpa,
    RANK() OVER (PARTITION BY dept ORDER BY cgpa DESC) AS dept_rank,
    ROW_NUMBER() OVER (ORDER BY cgpa DESC) AS overall_rank
FROM students;

-- Running total of enrollments per month
SELECT
    enrolled_at,
    COUNT(*) AS daily_count,
    SUM(COUNT(*)) OVER (ORDER BY enrolled_at) AS running_total
FROM enrollments
GROUP BY enrolled_at;

-- Compare each student's CGPA with previous admission batch
SELECT name, cgpa,
    LAG(cgpa, 1) OVER (ORDER BY id) AS prev_cgpa,
    cgpa - LAG(cgpa, 1) OVER (ORDER BY id) AS change
FROM students;`,
            realWorldExample: 'Financial dashboards use window functions to compute running balances, 7-day moving averages of transactions, and rank branches by monthly revenue — all without complex subqueries.',
            challenge: 'Write a query that ranks products by revenue within each category, computes a running total of revenue, and shows the percentage each product contributes to its category total.',
            quiz: [
              { question: 'What does PARTITION BY do in a window function?', options: ['Filters rows like WHERE', 'Groups rows into windows without collapsing them', 'Creates temporary tables', 'Sorts the output'], answer: 1 },
              { question: 'What does LAG(column, 1) return?', options: ['The next row\'s value', 'The current row\'s value', 'The previous row\'s value', 'NULL always'], answer: 2 },
              { question: 'What is the key difference between GROUP BY and OVER()?', options: ['No difference', 'GROUP BY collapses rows; OVER() keeps all rows and adds aggregate result', 'OVER() is faster', 'GROUP BY supports more functions'], answer: 1 },
            ],
          },
          { id: 'sql_m5_l2', title: 'JSON in MySQL', duration: '20 min', xpReward: 50,
            concept: 'MySQL 5.7+ supports a native JSON data type with validation, indexing, and extraction functions. JSON_EXTRACT() (or -> operator) reads values. JSON_SET(), JSON_ARRAY(), JSON_OBJECT() build and modify JSON. Use sparingly — prefer normalized tables for structured data.',
            codeExample: `CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    attributes JSON
);

INSERT INTO products (name, attributes) VALUES
('Laptop', '{"ram_gb": 16, "storage_gb": 512, "colors": ["Silver","Black"]}'),
('Phone',  '{"ram_gb": 8,  "storage_gb": 128, "5g": true}');

-- Extract JSON fields
SELECT name,
    attributes->>'$.ram_gb'     AS ram,
    attributes->>'$.storage_gb' AS storage
FROM products;

-- Filter by JSON value
SELECT name FROM products
WHERE JSON_EXTRACT(attributes, '$.ram_gb') >= 16;

-- Update a JSON field
UPDATE products
SET attributes = JSON_SET(attributes, '$.price', 79999)
WHERE id = 1;`,
            realWorldExample: 'E-commerce product catalogs use JSON columns to store varying product attributes: a shirt needs {"color","size","material"} while electronics need {"ram","storage","battery"} — JSON handles this without extra tables.',
            challenge: 'Create a users table with a JSON preferences column. Store theme, language, and notifications settings. Write a query to find all users who prefer dark theme.',
            quiz: [
              { question: 'What MySQL operator extracts a JSON value as text?', options: ['JSON.get()', '->', '->>',  'EXTRACT()'], answer: 2 },
              { question: 'When should you use JSON columns in MySQL?', options: ['Always, for flexibility', 'For semi-structured data with variable attributes', 'Instead of all VARCHAR columns', 'For primary keys'], answer: 1 },
              { question: 'Which function creates a JSON object in MySQL?', options: ['JSON_CREATE()', 'JSON_NEW()', 'JSON_OBJECT()', 'JSON_BUILD()'], answer: 2 },
            ],
          },
          { id: 'sql_m5_l3', title: 'Connecting MySQL to Applications', duration: '20 min', xpReward: 50,
            concept: 'Applications connect to MySQL using drivers/connectors. Python uses mysql-connector-python or SQLAlchemy. Java uses JDBC. Node.js uses mysql2. Connection pooling reuses connections for efficiency. Always use parameterized queries to prevent SQL injection.',
            codeExample: `# Python with mysql-connector-python
import mysql.connector

conn = mysql.connector.connect(
    host="localhost", user="app_user",
    password="AppPass@456", database="college_db"
)

cursor = conn.cursor()

# SAFE: Parameterized query (prevents SQL injection)
query = "SELECT name, cgpa FROM students WHERE dept = %s AND cgpa > %s"
cursor.execute(query, ("CSE", 8.0))

results = cursor.fetchall()
for name, cgpa in results:
    print(f"{name}: {cgpa}")

# Insert with parameters
insert_query = "INSERT INTO students (name, email, cgpa, dept) VALUES (%s,%s,%s,%s)"
cursor.execute(insert_query, ("Arjun", "arjun@test.com", 9.2, "CSE"))
conn.commit()

cursor.close()
conn.close()`,
            realWorldExample: 'Every web application (Django, Flask, Spring Boot, Express) connects to MySQL using connection pooling. HikariCP (Java) maintains a pool of 10 reusable connections for 1000 concurrent users.',
            challenge: 'Write a Python script that connects to a MySQL database, creates a students table if not exists, inserts 3 students using parameterized queries, and prints all records.',
            quiz: [
              { question: 'Why use parameterized queries instead of string concatenation?', options: ['Parameterized queries are faster', 'They prevent SQL injection attacks', 'They support more data types', 'They automatically create indexes'], answer: 1 },
              { question: 'What is connection pooling?', options: ['Storing queries in memory', 'Reusing a set of pre-established database connections for multiple requests', 'Backing up connections', 'Load balancing MySQL servers'], answer: 1 },
              { question: 'Which Python library is most commonly used for MySQL?', options: ['psycopg2', 'sqlite3', 'mysql-connector-python or SQLAlchemy', 'mongoengine'], answer: 2 },
            ],
          },
        ],
      },
    ],
  },
  // Science Stream
  // Science Stream - Engineering Branches
  {
    id: 'btech-cse',
    name: 'B.Tech in Computer Science & Engineering (CSE)',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      preferredElectives: ['Computer Science', 'Information Technology'],
      minPercentage: 75,
      entranceExams: ['JEE Main', 'JEE Advanced', 'State CETs']
    },
    description: 'Focuses on computer systems, software development, algorithms, and AI.',
    careerPaths: ['Software Engineer', 'Full Stack Developer', 'System Architect'],
    averageSalary: '8-20 LPA',
    topColleges: ['IITs', 'NITs', 'BITS Pilani', 'IIITs'],
    interests: ['Technology', 'Programming', 'Innovation', 'Problem Solving'],
    skills: ['Technical', 'Analytical', 'Logical', 'Creative'],
    workEnvironment: 'Corporate/Startup',
    futureScope: 'Excellent - High demand in Global IT'
  },
  {
    id: 'btech-it',
    name: 'B.Tech in Information Technology (IT)',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      preferredElectives: ['Computer Science', 'Information Technology'],
      minPercentage: 75,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Focuses on information systems, networking, and software applications.',
    careerPaths: ['IT Consultant', 'Network Engineer', 'Cloud Architect'],
    averageSalary: '7-18 LPA',
    topColleges: ['NITs', 'IIITs', 'NSUT', 'DTU'],
    interests: ['Technology', 'Innovation', 'Problem Solving'],
    skills: ['Technical', 'Analytical', 'Logical'],
    workEnvironment: 'Corporate',
    futureScope: 'Excellent - backbone of digital economy'
  },
  {
    id: 'btech-aiml',
    name: 'B.Tech in AI & Machine Learning',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      preferredElectives: ['Computer Science', 'Maths'],
      minPercentage: 80,
      entranceExams: ['JEE Main', 'JEE Advanced']
    },
    description: 'Specialized branch focusing on artificial intelligence, neural networks, and automation.',
    careerPaths: ['AI Engineer', 'Machine Learning Researcher', 'Data Scientist'],
    averageSalary: '10-25 LPA',
    topColleges: ['IIT Hyderabad', 'IIT Bombay', 'IIIT Hyderabad'],
    interests: ['Technology', 'Innovation', 'Programming', 'Science'],
    skills: ['Technical', 'Analytical', 'Research', 'Logical'],
    workEnvironment: 'R&D/Tech Labs',
    futureScope: 'Excellent - Fastest growing tech field'
  },
  {
    id: 'btech-ds',
    name: 'B.Tech in Data Science',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      preferredElectives: ['Computer Science', 'Statistics'],
      minPercentage: 78,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Focuses on extracting insights from large data sets using statistical and computational methods.',
    careerPaths: ['Data Analyst', 'Business Intelligence Developer', 'Data Engineer'],
    averageSalary: '8-22 LPA',
    topColleges: ['IITs', 'NITs', 'BITS Pilani'],
    interests: ['Technology', 'Problem Solving', 'Innovation'],
    skills: ['Analytical', 'Technical', 'Numerical', 'Logical'],
    workEnvironment: 'Corporate/Consulting',
    futureScope: 'Excellent - Data is the new oil'
  },
  {
    id: 'btech-ece',
    name: 'B.Tech in Electronics & Communication (ECE)',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 75,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Deals with electronic devices, circuits, communication equipment, and VLSI.',
    careerPaths: ['Electronics Engineer', 'Communication Specialist', 'VLSI Designer'],
    averageSalary: '6-15 LPA',
    topColleges: ['IITs', 'NITs', 'IIITs'],
    interests: ['Technology', 'Innovation', 'Innovation'],
    skills: ['Technical', 'Analytical', 'Numerical'],
    workEnvironment: 'Tech/Semiconductor/Manufacturing',
    futureScope: 'Very Good - Hardware and 5G/6G growth'
  },
  {
    id: 'btech-mech',
    name: 'B.Tech in Mechanical Engineering',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 70,
      entranceExams: ['JEE Main', 'GATE']
    },
    description: 'Deals with design, construction, and use of machinery.',
    careerPaths: ['Mechanical Engineer', 'Automotive Engineer', 'Production Manager'],
    averageSalary: '5-12 LPA',
    topColleges: ['IITs', 'NITs', 'BIT Mesra'],
    interests: ['Technology', 'Science', 'Innovation'],
    skills: ['Analytical', 'Technical', 'Logical'],
    workEnvironment: 'Industrial/Plant',
    futureScope: 'Good - Core engineering demand'
  },
  {
    id: 'btech-eee',
    name: 'B.Tech in Electrical & Electronics (EEE)',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 70,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Covers electrical power systems, electronics, and electromagnetism.',
    careerPaths: ['Electrical Engineer', 'Power Grid Manager', 'Control Systems Engineer'],
    averageSalary: '6-14 LPA',
    topColleges: ['IITs', 'NITs', 'DTU'],
    interests: ['Technology', 'Science', 'Innovation'],
    skills: ['Technical', 'Analytical', 'Numerical'],
    workEnvironment: 'Power/Telecom/Manufacturing',
    futureScope: 'Good - renewable energy push'
  },
  {
    id: 'cyber-security',
    name: 'B.Tech in Cyber Security',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 75,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Protection of systems, networks, and programs from digital attacks.',
    careerPaths: ['Security Analyst', 'Ethical Hacker', 'Forensic Expert'],
    averageSalary: '8-22 LPA',
    topColleges: ['IITs', 'NITs', 'IIITs', 'Amity'],
    interests: ['Technology', 'Problem Solving', 'Innovation'],
    skills: ['Technical', 'Analytical', 'Logical'],
    workEnvironment: 'Corporate/Government/Remote',
    futureScope: 'Excellent - High demand for data protection',
    trending: true
  },
  {
    id: 'robotics-ai',
    name: 'B.Tech in Robotics & AI',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 80,
      entranceExams: ['JEE Main', 'JEE Advanced']
    },
    description: 'Interdisciplinary branch combining mechanical, electrical, and computer science for automation.',
    careerPaths: ['Robotics Engineer', 'Automation Consultant', 'Machine Learning Engineer'],
    averageSalary: '10-25 LPA',
    topColleges: ['IIT Kanpur', 'IIT Madras', 'BITS Pilani'],
    interests: ['Technology', 'Science', 'Innovation'],
    skills: ['Technical', 'Analytical', 'Logical', 'Mathematical'],
    workEnvironment: 'R&D Labs/Manufacturing',
    futureScope: 'Excellent - Future of industry 4.0',
    trending: true
  },
  {
    id: 'mbbs',
    name: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
    stream: 'Science',
    duration: '5.5 years',
    eligibility: {
      subjects: ['PCB'],
      minPercentage: 85,
      entranceExams: ['NEET']
    },
    description: 'Medical degree to become a doctor with various specialization options.',
    careerPaths: ['Doctor', 'Surgeon', 'Medical Researcher', 'Healthcare Administrator'],
    averageSalary: '8-20 LPA',
    topColleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER', 'KGMU'],
    interests: ['Healthcare', 'Helping Others', 'Science'],
    skills: ['Empathy', 'Attention to Detail', 'Communication'],
    workEnvironment: 'Hospital/Clinic',
    futureScope: 'Excellent - Always in demand'
  },
  {
    id: 'bsc',
    name: 'B.Sc (Bachelor of Science)',
    stream: 'Science',
    duration: '3 years',
    eligibility: {
      subjects: ['PCM', 'PCB', 'PCMB'],
      minPercentage: 60,
      entranceExams: ['CUET', 'University-specific']
    },
    description: 'Undergraduate science degree with specializations in Physics, Chemistry, Biology, Mathematics, etc.',
    careerPaths: ['Research Scientist', 'Lab Technician', 'Teacher', 'Data Analyst'],
    averageSalary: '3-8 LPA',
    topColleges: ['St. Stephens', 'Loyola College', 'Fergusson College'],
    interests: ['Science', 'Research', 'Teaching'],
    skills: ['Analytical', 'Research', 'Technical'],
    workEnvironment: 'Lab/Academic',
    futureScope: 'Good - Foundation for higher studies'
  },
  {
    id: 'bca',
    name: 'BCA (Bachelor of Computer Applications)',
    stream: 'Science',
    duration: '3 years',
    eligibility: {
      subjects: ['Any with Math'],
      minPercentage: 55,
      entranceExams: ['CUET', 'IPU CET']
    },
    description: 'Computer applications degree focusing on programming and software development.',
    careerPaths: ['Software Developer', 'Web Developer', 'System Administrator', 'IT Consultant'],
    averageSalary: '4-10 LPA',
    topColleges: ['Christ University', 'Symbiosis', 'IGNOU'],
    interests: ['Technology', 'Programming', 'Problem Solving'],
    skills: ['Coding', 'Logical', 'Technical'],
    workEnvironment: 'IT Companies',
    futureScope: 'Very Good - Growing IT sector'
  },
  {
    id: 'bpharm',
    name: 'B.Pharm (Bachelor of Pharmacy)',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCB', 'PCM'],
      minPercentage: 70,
      entranceExams: ['NEET', 'GPAT']
    },
    description: 'Pharmaceutical sciences degree for drug development and healthcare.',
    careerPaths: ['Pharmacist', 'Drug Inspector', 'Medical Representative', 'Research Scientist'],
    averageSalary: '3-8 LPA',
    topColleges: ['NIPER', 'ICT Mumbai', 'JSS Mysore'],
    interests: ['Healthcare', 'Chemistry', 'Research'],
    skills: ['Analytical', 'Attention to Detail', 'Communication'],
    workEnvironment: 'Pharmacy/Lab/Hospital',
    futureScope: 'Good - Healthcare industry growth'
  },
  {
    id: 'sustainable-energy',
    name: 'B.Tech in Sustainable Energy Engineering',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM'],
      minPercentage: 75,
      entranceExams: ['JEE Main', 'State CETs']
    },
    description: 'Focuses on renewable energy sources, energy efficiency, and sustainable power systems.',
    careerPaths: ['Renewable Energy Engineer', 'Energy Auditor', 'Sustainability Consultant'],
    averageSalary: '6-15 LPA',
    topColleges: ['IIT Bombay', 'IIT Delhi', 'NIT Trichy'],
    interests: ['Science', 'Technology', 'Innovation', 'Environment'],
    skills: ['Technical', 'Analytical', 'Problem Solving'],
    workEnvironment: 'Office/Field',
    futureScope: 'Excellent - Global shift to green energy',
    trending: true
  },
  {
    id: 'food-tech',
    name: 'B.Tech in Food Technology & Nutrition',
    stream: 'Science',
    duration: '4 years',
    eligibility: {
      subjects: ['PCM', 'PCB'],
      minPercentage: 70,
      entranceExams: ['JEE Main', 'ICAR AIEEA']
    },
    description: 'Application of food science to the selection, preservation, processing, and distribution of safe food.',
    careerPaths: ['Food Scientist', 'Quality Control Manager', 'Nutritionist'],
    averageSalary: '5-12 LPA',
    topColleges: ['NIFTEM', 'CFTRI', 'ICT Mumbai'],
    interests: ['Science', 'Healthcare', 'Research'],
    skills: ['Analytical', 'Technical', 'Research'],
    workEnvironment: 'Lab/Factory',
    futureScope: 'Very Good - Expanding food processing sector',
    trending: true
  },

  // Commerce Stream
  {
    id: 'bcom',
    name: 'B.Com (Bachelor of Commerce)',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Commerce', 'Any'],
      minPercentage: 55,
      entranceExams: ['CUET', 'University-specific']
    },
    description: 'Commerce degree covering accounting, finance, economics, and business.',
    careerPaths: ['Accountant', 'Financial Analyst', 'Tax Consultant', 'Banker'],
    averageSalary: '3-8 LPA',
    topColleges: ['SRCC', 'St. Xaviers', 'Loyola College'],
    interests: ['Finance', 'Business', 'Economics'],
    skills: ['Numerical', 'Analytical', 'Communication'],
    workEnvironment: 'Corporate/Banking',
    futureScope: 'Good - Foundation for CA/MBA'
  },
  {
    id: 'bba',
    name: 'BBA (Bachelor of Business Administration)',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 55,
      entranceExams: ['CUET', 'IPU CET', 'NPAT']
    },
    description: 'Business administration degree focusing on management and entrepreneurship.',
    careerPaths: ['Business Manager', 'Marketing Executive', 'HR Manager', 'Entrepreneur'],
    averageSalary: '4-10 LPA',
    topColleges: ['Shaheed Sukhdev', 'Christ University', 'Symbiosis'],
    interests: ['Business', 'Leadership', 'Management'],
    skills: ['Leadership', 'Communication', 'Strategic Thinking'],
    workEnvironment: 'Corporate',
    futureScope: 'Very Good - Pathway to MBA'
  },
  {
    id: 'ca',
    name: 'CA (Chartered Accountancy)',
    stream: 'Commerce',
    duration: '4-5 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['CA Foundation']
    },
    description: 'Professional accounting qualification with articleship training.',
    careerPaths: ['Chartered Accountant', 'Tax Consultant', 'Auditor', 'Financial Advisor'],
    averageSalary: '8-25 LPA',
    topColleges: ['ICAI Centers'],
    interests: ['Finance', 'Taxation', 'Accounting'],
    skills: ['Numerical', 'Analytical', 'Attention to Detail'],
    workEnvironment: 'Corporate/Practice',
    futureScope: 'Excellent - High prestige and income'
  },
  {
    id: 'cs',
    name: 'CS (Company Secretary)',
    stream: 'Commerce',
    duration: '3-4 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['CS Foundation']
    },
    description: 'Corporate law and governance professional qualification.',
    careerPaths: ['Company Secretary', 'Compliance Officer', 'Legal Advisor', 'Corporate Consultant'],
    averageSalary: '6-15 LPA',
    topColleges: ['ICSI Centers'],
    interests: ['Law', 'Corporate Governance', 'Finance'],
    skills: ['Legal', 'Analytical', 'Communication'],
    workEnvironment: 'Corporate',
    futureScope: 'Good - Corporate sector demand'
  },
  {
    id: 'fintech',
    name: 'BBA in Fintech',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Math'],
      minPercentage: 65,
      entranceExams: ['CUET', 'IPMAT']
    },
    description: 'Combines finance and technology for modern banking and payment systems.',
    careerPaths: ['Blockchain Analyst', 'Fintech Consultant', 'Risk Manager'],
    averageSalary: '7-18 LPA',
    topColleges: ['NMIMS', 'Symbiosis', 'IIM Indore (IPM)'],
    interests: ['Finance', 'Technology', 'Business'],
    skills: ['Numerical', 'Technical', 'Analytical'],
    workEnvironment: 'Banks/Fintech Startups',
    futureScope: 'Excellent - Digital finance revolution',
    trending: true
  },
  {
    id: 'digital-marketing',
    name: 'B.Voc in Digital Marketing',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 55,
      entranceExams: ['CUET', 'Direct Merit']
    },
    description: 'Focuses on online brand promotion, social media, and data-driven marketing.',
    careerPaths: ['SEO Specialist', 'Content Strategist', 'E-commerce Manager'],
    averageSalary: '5-15 LPA',
    topColleges: ['TISS', 'St. Xaviers', 'DU'],
    interests: ['Business', 'Creative', 'Media'],
    skills: ['Creative', 'Analytical', 'Communication'],
    workEnvironment: 'Agencies/Corporate/Remote',
    futureScope: 'Very Good - Essential for all businesses',
    trending: true
  },
  {
    id: 'data-science-business',
    name: 'B.Sc in Data Science for Business',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Math'],
      minPercentage: 70,
      entranceExams: ['CUET']
    },
    description: 'Application of data science tools to business decision making.',
    careerPaths: ['Business Intelligence Analyst', 'Data Consultant', 'Marketing Analyst'],
    averageSalary: '6-16 LPA',
    topColleges: ['Christ University', 'Loyola College', 'Symbiosis'],
    interests: ['Finance', 'Technology', 'Analytical'],
    skills: ['Analytical', 'Numerical', 'Technical'],
    workEnvironment: 'Corporate/Consulting',
    futureScope: 'Excellent - High demand for data-driven insights',
    trending: true
  },
  {
    id: 'e-commerce-supply',
    name: 'B.BA in E-commerce & Digital Supply Chain',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 60,
      entranceExams: ['CUET', 'IPU CET']
    },
    description: 'Management of online business operations and digital logistics.',
    careerPaths: ['E-commerce Manager', 'Supply Chain Analyst', 'Logistics Coordinator'],
    averageSalary: '5-14 LPA',
    topColleges: ['IIM Indore (IPM)', 'Symbiosis', 'NMIMS'],
    interests: ['Business', 'Technology', 'Management'],
    skills: ['Analytical', 'Communication', 'Technical'],
    workEnvironment: 'Corporate/Remote',
    futureScope: 'Excellent - Growth of online retail',
    trending: true
  },
  {
    id: 'product-management',
    name: 'B.BA in Product Management',
    stream: 'Commerce',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 65,
      entranceExams: ['CUET', 'NPAT']
    },
    description: 'Focuses on the lifecycle of a product from conception to market success.',
    careerPaths: ['Associate Product Manager', 'Product Analyst', 'Business Analyst'],
    averageSalary: '7-18 LPA',
    topColleges: ['SPJIMR', 'IIM Rohtak', 'Symbiosis'],
    interests: ['Business', 'Technology', 'Leadership'],
    skills: ['Leadership', 'Analytical', 'Communication'],
    workEnvironment: 'Corporate/Startup',
    futureScope: 'Excellent - Critical role in tech companies',
    trending: true
  },

  // Arts/Humanities Stream
  {
    id: 'ba',
    name: 'B.A. (Bachelor of Arts)',
    stream: 'Arts',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['CUET', 'University-specific']
    },
    description: 'Liberal arts degree with specializations in History, Political Science, Psychology, English, etc.',
    careerPaths: ['Civil Services', 'Teacher', 'Content Writer', 'Social Worker'],
    averageSalary: '3-8 LPA',
    topColleges: ['St. Stephens', 'Lady Shri Ram', 'Presidency College'],
    interests: ['Social Sciences', 'Writing', 'Public Service'],
    skills: ['Communication', 'Critical Thinking', 'Research'],
    workEnvironment: 'Government/NGO/Media',
    futureScope: 'Good - Diverse career options'
  },
  {
    id: 'bjmc',
    name: 'BJMC (Bachelor of Journalism and Mass Communication)',
    stream: 'Arts',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 55,
      entranceExams: ['CUET', 'IPU CET']
    },
    description: 'Journalism and media studies degree for communication careers.',
    careerPaths: ['Journalist', 'Content Creator', 'PR Manager', 'News Anchor'],
    averageSalary: '4-12 LPA',
    topColleges: ['IIMC', 'Symbiosis', 'Xavier Institute'],
    interests: ['Media', 'Writing', 'Current Affairs'],
    skills: ['Communication', 'Creative', 'Research'],
    workEnvironment: 'Media Houses/Digital',
    futureScope: 'Good - Growing digital media'
  },
  {
    id: 'llb',
    name: 'LLB (Bachelor of Laws)',
    stream: 'Arts',
    duration: '3 years (after graduation) / 5 years (integrated)',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['CLAT', 'LSAT']
    },
    description: 'Law degree for legal practice and judiciary.',
    careerPaths: ['Lawyer', 'Judge', 'Legal Advisor', 'Corporate Counsel'],
    averageSalary: '5-20 LPA',
    topColleges: ['NLSIU Bangalore', 'NALSAR', 'NLU Delhi'],
    interests: ['Law', 'Justice', 'Debate'],
    skills: ['Analytical', 'Communication', 'Critical Thinking'],
    workEnvironment: 'Courts/Corporate',
    futureScope: 'Excellent - Always in demand'
  },
  {
    id: 'bdes',
    name: 'B.Des (Bachelor of Design)',
    stream: 'Arts',
    duration: '4 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['UCEED', 'NID DAT', 'NIFT']
    },
    description: 'Design degree for creative and visual communication careers.',
    careerPaths: ['UI/UX Designer', 'Graphic Designer', 'Product Designer', 'Fashion Designer'],
    averageSalary: '4-15 LPA',
    topColleges: ['NID', 'NIFT', 'IIT Bombay IDC'],
    interests: ['Art', 'Creativity', 'Visual Design'],
    skills: ['Creative', 'Visual', 'Technical'],
    workEnvironment: 'Studios/Agencies',
    futureScope: 'Very Good - Growing design industry'
  },
  {
    id: 'bfa',
    name: 'BFA (Bachelor of Fine Arts)',
    stream: 'Arts',
    duration: '4 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['University-specific']
    },
    description: 'Fine arts degree for painting, sculpture, and visual arts.',
    careerPaths: ['Artist', 'Art Teacher', 'Illustrator', 'Art Director'],
    averageSalary: '3-10 LPA',
    topColleges: ['JJ School of Art', 'MS University', 'BHU'],
    interests: ['Art', 'Creativity', 'Expression'],
    skills: ['Creative', 'Visual', 'Artistic'],
    workEnvironment: 'Studios/Freelance',
    futureScope: 'Moderate - Niche field'
  },
  {
    id: 'bhotel',
    name: 'B.Sc Hotel Management',
    stream: 'Any',
    duration: '3-4 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['NCHMCT JEE']
    },
    description: 'Hospitality management degree for hotel and tourism industry.',
    careerPaths: ['Hotel Manager', 'Chef', 'Event Manager', 'Tourism Consultant'],
    averageSalary: '4-12 LPA',
    topColleges: ['IHM Delhi', 'IHM Mumbai', 'Welcomgroup'],
    interests: ['Hospitality', 'People Management', 'Travel'],
    skills: ['Communication', 'Management', 'Customer Service'],
    workEnvironment: 'Hotels/Resorts',
    futureScope: 'Good - Growing tourism sector'
  },
  {
    id: 'clinical-psychology',
    name: 'B.A. in Clinical Psychology',
    stream: 'Arts',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 60,
      entranceExams: ['CUET']
    },
    description: 'Study of mental health, behavior, and psychological disorders.',
    careerPaths: ['Counselor', 'Psychologist Assistant', 'Mental Health Support'],
    averageSalary: '4-10 LPA',
    topColleges: ['TISS', 'DU', 'Christ University'],
    interests: ['Healthcare', 'Helping Others', 'Science'],
    skills: ['Empathy', 'Communication', 'Research'],
    workEnvironment: 'Clinics/Hospitals/Private Practice',
    futureScope: 'Excellent - Increasing focus on mental health',
    trending: true
  },
  {
    id: 'ux-ui-design',
    name: 'B.Des in UX/UI Design',
    stream: 'Any',
    duration: '4 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 55,
      entranceExams: ['UCEED', 'NID DAT']
    },
    description: 'Designing digital products with a focus on user experience and interface aesthetics.',
    careerPaths: ['Product Designer', 'UX Researcher', 'UI Developer'],
    averageSalary: '6-18 LPA',
    topColleges: ['NID', 'IIT Bombay', 'Srishti'],
    interests: ['Creative', 'Technology', 'Visual Design'],
    skills: ['Creative', 'Technical', 'Analytical'],
    workEnvironment: 'Tech Companies/Agencies',
    futureScope: 'Excellent - Every digital product needs good design',
    trending: true
  },
  {
    id: 'digital-media-animation',
    name: 'B.A. in Digital Media & Animation',
    stream: 'Arts',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['University-specific']
    },
    description: 'Creating visual content, animations, and special effects for media and gaming.',
    careerPaths: ['Animator', 'VFX Artist', 'Game Designer'],
    averageSalary: '5-15 LPA',
    topColleges: ['Whistling Woods', 'MAAC', 'NID'],
    interests: ['Creative', 'Media', 'Technology'],
    skills: ['Creative', 'Visual', 'Technical'],
    workEnvironment: 'Studios/Gaming Companies',
    futureScope: 'Very Good - Boom in content consumption',
    trending: true
  },
  {
    id: 'creative-writing',
    name: 'B.A. in Creative Writing & Content Strategy',
    stream: 'Arts',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 60,
      entranceExams: ['CUET']
    },
    description: 'Developing professional writing skills for media, advertising, and digital platforms.',
    careerPaths: ['Content Strategist', 'Copywriter', 'Author', 'Editor'],
    averageSalary: '4-12 LPA',
    topColleges: ['Ashoka University', 'FLAME', 'DU'],
    interests: ['Creative', 'Writing', 'Media'],
    skills: ['Creative', 'Communication', 'Research'],
    workEnvironment: 'Remote/Office',
    futureScope: 'Very Good - Content is king in digital era',
    trending: true
  },
  {
    id: 'culinary-arts',
    name: 'B.A. in Culinary Arts & Hospitality Management',
    stream: 'Any',
    duration: '3 years',
    eligibility: {
      subjects: ['Any'],
      minPercentage: 50,
      entranceExams: ['NCHMCT JEE']
    },
    description: 'Professional training in cooking, food preparation, and hospitality operations.',
    careerPaths: ['Executive Chef', 'Restaurant Manager', 'Food Stylist'],
    averageSalary: '4-15 LPA',
    topColleges: ['IHM Pusa', 'WGSHA Manipal', 'IHM Mumbai'],
    interests: ['Creative', 'Hospitality', 'Management'],
    skills: ['Creative', 'Leadership', 'Management'],
    workEnvironment: 'Hotels/Restaurants',
    futureScope: 'Good - Premium dining and tourism growth',
    trending: true
  }
];

export default coursesData;
