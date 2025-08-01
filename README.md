<!DOCTYPE html>
<html>
  <body>

    <h1>AAHARAVEDA 🍲 – Digital Cookbook</h1>

    <p align="right">
      <img src="./aaharaveda.png" alt="Aaharaveda Logo" width="150"/>
    </p>

    <p><strong>Aaharaveda</strong> is a digital cookbook platform where users can organize, save, and explore their favorite recipes all in one place. With a clean UI and customizable categories, it helps food lovers curate their personal kitchen library effortlessly.</p>

    <hr/>

    <h2>🛠 <strong>Tech Stack</strong></h2>
    <ul>
      <li><strong>Frontend</strong>: React.js</li>
      <li><strong>Backend</strong>: Node.js, Express.js</li>
      <li><strong>Database</strong>: MySQL</li>
      <li><strong>UI Libraries</strong>: Chakra UI, Material UI, Mantine, DaisyUI, Bulma</li>
      <li><strong>Tools & Components</strong>:
        <ul>
          <li>Material React Table</li>
          <li>React Quill (Rich Text Editor)</li>
          <li>React Router</li>
          <li>React CSS Modules</li>
        </ul>
      </li>
    </ul>

    <hr/>

    <h2>🚀 <strong>How to Run Locally</strong></h2>

    <h3>1️⃣ Clone the Repository</h3>
    <pre><code>git clone https://github.com/your-username/aaharaveda.git</code></pre>

    <h3>2️⃣ Install Dependencies</h3>
    <p><strong>Frontend:</strong></p>
    <pre><code>cd app

npm install</code></pre>

<p><strong>Backend:</strong></p>
<pre><code>cd ../server
npm install</code></pre>

    <h3>3️⃣ Configure Environment Variables</h3>
    <p>Create <code>.env</code> files in both frontend and backend folders.</p>

    <p><strong>For /server/.env:</strong></p>
    <pre><code>DB_HOST=localhost

DB_USER=root
DB_PASSWORD=your_mysql_password
DB=my_db</code></pre>

    <p><strong>For /app/.env:</strong></p>
    <pre><code>VITE_API_DOMAIN=http://localhost:5000</code></pre>

    <h3>4️⃣ Start the Development Servers</h3>
    <p><strong>Frontend:</strong></p>
    <pre><code>cd app

npm run dev</code></pre>

    <p><strong>Backend:</strong></p>
    <pre><code>cd server

npm run dev</code></pre>

    <hr/>

    <h2>💡 <strong>Features</strong></h2>
    <ul>
      <li>🧾 View, create, update, and delete recipes and categories</li>
      <li>📝 Use a rich text editor to write recipe instructions</li>
      <li>🔎 Filter, sort, and search recipes using an interactive table</li>
      <li>📚 Categorize recipes with descriptions</li>
      <li>🧠 SQL schema designed with foreign key constraints</li>
    </ul>

    <hr/>

    <h2>📌 <strong>Database Schema</strong></h2>

    <pre><code>CREATE TABLE categories (

categoryName VARCHAR(100) PRIMARY KEY NOT NULL,
createdAt VARCHAR(100) NOT NULL,
categoryDescription VARCHAR(200) NOT NULL
) ENGINE=INNODB;

CREATE TABLE recipes (
recipeId VARCHAR(100) PRIMARY KEY,
recipeTitle VARCHAR(100) NOT NULL,
recipeAuthor VARCHAR(100) NOT NULL,
createdAt VARCHAR(100) NOT NULL,
recipeContent VARCHAR(10000) NOT NULL,
recipeCategory VARCHAR(100),
CONSTRAINT fk_category FOREIGN KEY (recipeCategory)
REFERENCES categories(categoryName)
) ENGINE=INNODB;</code></pre>

    <hr/>

    <h2>🧠 <strong>Future Improvements</strong></h2>
    <ul>
      <li>Add user authentication</li>
      <li>Enable comments & likes on recipes</li>
      <li>Integrate recipe image uploads</li>
      <li>Deploy with CI/CD pipeline</li>
    </ul>

    <p align="center"><i>Curated with love for foodies and coders alike 🍽️</i></p>

  </body>
</html>
