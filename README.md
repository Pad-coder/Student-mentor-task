Mentor-Student Assigning System 

A simple system built using Node.js, Express, and MongoDB to manage mentors and students. The system provides APIs for creating mentors and students, assigning students to mentors, and managing relationships between them.

Features
Create Mentors
Create Students
Assign Students to Mentors (Multiple students to a single mentor)
Change or Reassign Mentor for a Student
View all Students for a specific Mentor
List available students (those without mentors)
View the previously assigned mentors for a Student

API Endpoints

1. Create Mentor

POST /api/mentor/create

Request Body:

{
  "name": "Mentor Name"
  "username": "username"  *for unique*
}


2. Create Student
POST /api/student/create

Request Body:

{
  "name": "Student Name"
  "email": "email"  *for unique*
}


3. Assign Students to a Mentor
POST /api/mentor/assignStudent/:mentorId

Request Body:

{
  "studentIds": ["studentId1", "studentId2"]
}

4. List Available Students
Get students who are not yet assigned to any mentor.

GET /api/student/availableStudents


5. Assign or Change Mentor for a Student
Assign a new mentor or change an existing mentor for a particular student.

POST /api/student/:studentId/assignMentor/:mentorId


6. Show All Students for a Mentor

GET /api/mentor/:mentorId/getStudents

7. Show Previously Assigned Mentors for a Student

GET /api/student/:studentId/previousMentor

