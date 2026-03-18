# 📝 Fullstack ToDo App | React & .NET Minimal API

ברוכים הבאים לפרויקט ה-**ToDo List**! 🚀  
אפליקציית Fullstack לניהול משימות מקצה לקצה. הפרויקט נועד להדגים ארכיטקטורה מודרנית ונקייה, תוך שימוש ב-**Minimal API** של .NET ליצירת שרת רזה ומהיר, צד לקוח דינמי ב-React, וחיבור למסד נתונים רלוציוני (MySQL) בגישת DB-First.

המערכת מוכנה לפריסה בענן (Cloud-Ready), עם תמיכה במשתני סביבה (Environment Variables) והגדרות אבטחה (CORS) מותאמות לסביבות פרודקשן כמו Render.

---

## ✨ תכונות ויכולות מרכזיות (Key Features)

* **🏗️ ארכיטקטורת Minimal API:** שרת Backend קומפקטי ויעיל ללא ה"רעש" של Controllers מסורתיים. כל הראוטים וההגדרות מנוהלים בצורה אלגנטית בקובץ `Program.cs` יחיד.
* **🗄️ אינטגרציה מלאה ל-Database:** עבודה מול **MySQL** באמצעות **Entity Framework Core**. שימוש בגישת `DB-First` (פקודות `scaffold`) ליצירת מודלים אוטומטית מתוך הטבלאות.
* **☁️ Cloud-Ready & Async:** * בדיקה אסינכרונית חכמה (`CanConnectAsync`) בעליית השרת לווידאו חיבור תקין למסד הנתונים.
  * שימוש במשתני סביבה לניהול דינמי של ה-Port וה-Connection String (מותאם לפריסה ב-Render).
* **🌐 תקשורת מאובטחת וחכמה:** * הגדרת **CORS Policy** מדויקת המאפשרת גישה רק לדומיין של ה-Frontend.
  * שכבת שירות בצד הלקוח (`service.js`) מבוססת **Axios** שמנרמלת את כתובות ה-API ומונעת שגיאות ניתוב.
* **🔐 מוכנות להזדהות (Authentication):** תשתית נתונים מוכנה (מודל `User`) לקראת אינטגרציה של מנגנון הזדהות מבוסס **JWT**.

---

## 🛠️ סטאק טכנולוגי (Tech Stack)

### **צד שרת (Backend)**
* **C# .NET Core** (Minimal API Architecture)
* **Entity Framework Core** (Pomelo.EntityFrameworkCore.MySql)
* **Swagger / OpenAPI** (לתיעוד ובדיקת ה-API)

### **צד לקוח (Frontend)**
* **React.js**
* **Axios** (לניהול קריאות HTTP מול השרת)

### **מסד נתונים (Database)**
* **MySQL** (ניהול לוקאלי דרך MySQL Workbench)

---

## 📁 מבנה הפרויקט

```text
📦 ToDoList-Fullstack
├── 📂 TodoApi                 # צד השרת (.NET Minimal API)
│   ├── 📂 Models              # מודלים שנוצרו אוטומטית (Item, User, DbContext)
│   ├── 📄 Program.cs          # הליבה של השרת: הגדרת CORS, חיבור ל-DB ו-Endpoints
│   └── 📄 appsettings.json    # הגדרות מקומיות (Connection String)
└── 📂 ToDoListReact-master    # צד הלקוח (React)
    ├── 📂 src
    │   ├── 📄 App.js          # רכיב ה-UI המרכזי
    │   └── 📄 service.js      # שכבת התקשורת מול ה-API (Axios)
    └── 📄 package.json
```

---

## 🚀 הוראות התקנה והרצה (Getting Started)

כדי להריץ את הפרויקט בסביבת הפיתוח המקומית שלך (Localhost), עקבי אחר השלבים הבאים:

### 1️⃣ הכנת מסד הנתונים (MySQL)
1. ודאי ש-**MySQL Server** ו-**MySQL Workbench** מותקנים אצלך.
2. צרי סכמה חדשה (Database) בשם `ToDoDB`.
3. הריצי את השאילתה הבאה ליצירת טבלת המשימות:
   ```sql
   CREATE TABLE Items (
       Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
       Name VARCHAR(100),
       IsComplete TINYINT(1)
   );
   ```

### 2️⃣ הרצת צד השרת (Backend)
1. פתחי את הטרמינל ונווטי לתיקיית השרת:
   ```bash
   cd TodoApi
   ```
2. ודאי שה-Connection String בקובץ `appsettings.json` תואם לסיסמה של ה-MySQL המקומי שלך.
3. הריצי את השרת (מומלץ עם Hot Reload):
   ```bash
   dotnet watch run
   ```
   *השרת ירוץ. ניתן לגשת לממשק ה-Swagger בכתובת המקומית שתוצג בטרמינל (לרוב תחת `/swagger`).*

### 3️⃣ הרצת צד הלקוח (Frontend)
1. פתחי טרמינל **חדש** (במקביל לשרת שרץ) ונווטי לתיקיית הלקוח:
   ```bash
   cd ToDoListReact-master/ToDoListReact-master
   ```
2. התקיני את חבילות ה-NPM הנדרשות:
   ```bash
   npm install
   ```
3. צרי קובץ `.env` בתיקיית הלקוח והגדירי את כתובת ה-API המקומית שלך (לדוגמה):
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```
4. הריצי את אפליקציית ה-React:
   ```bash
   npm start
   ```
   *הדפדפן יפתח אוטומטית בכתובת `http://localhost:3000` והאפליקציה תסתנכרן עם השרת!*

---
*פותח מתוך אהבה לקוד נקי, ארכיטקטורה מינימליסטית, והרצון להפוך רעיונות למערכות עובדות. 💡*
