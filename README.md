## Lab 5.2 — Role-Based Authorization

### 1. What change I wanted to make
I wanted to restrict who can add employees and roles in the application. 
Previously any logged-in user could add entries. The goal was to limit 
this functionality to administrators only, while regular members and 
guests can still view the data.

### 2. Tools used
I used Clerk's Organizations feature along with the `useOrganization` hook 
from `@clerk/clerk-react`. Clerk manages roles natively through its dashboard, 
where users can be assigned `org:admin` or `org:member` roles within an organization.

### 3. How this affects user experience
Users who are not admins now see a message instead of the form, making it 
clear they don't have permission to add data. Admins see the forms as normal. 
This makes the app feel more like a real workplace tool where not everyone 
has the same level of access.

### 4. How this affects my understanding of the app
This change made me think about the app in terms of user roles and 
permissions rather than just authentication. It shifts the mental model 
from "is the user logged in?" to "what is the user allowed to do?", which 
is how most real-world applications need to be designed.