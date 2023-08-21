const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors=require("cors");
const fetch = require('node-fetch');
const session = require('express-session');
const path = require('path');


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
const app = express();
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));
// Set views directory
app.set('view engine', path.join(__dirname, 'views/'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for session
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ouday@123",
  database: "community_db",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to the database.");
});


// Middleware to check if user is logged in
const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
};


// Simple middleware for authentication
  function checkAdminRole(req, res, next) {
    const { username, password } = req.body;
    const query = 'SELECT user_role FROM users WHERE user_username = ? AND user_password = ?';
    db.query(query, [username, password], (error, results) => {
      if (error) {
        console.error('Error fetching user data from database:', error);
        return res.status(500).send('Error fetching user data.');
      }
  
      const user = results[0];
      if (!user) {
        return res.status(403).send('Invalid credentials.');
      }
  
      if (user.user_role === 'admin') {
        req.session.user = username;
        return res.redirect('/admin');
      } else if (user.user_role === 'user') {
        req.session.user = username;
        return res.redirect('/home');
      }
  
      return res.status(403).send('Access denied.');
    });
  }



// Route for login page
app.get('/login', (req, res) => {
  res.render('login');
});
// Define the admin page route with authentication middleware
app.get('/admin',requireLogin, (req, res) => {
  res.render('adminPage/adminPage');
});
// Route to authenticate the user
app.post("/login",checkAdminRole, (req, res) => {
    // const { username, password } = req.body;
    // const sql = `SELECT * FROM users WHERE user_username = ? AND user_password = ?`;
    // db.query(sql, [username, password], (err, result) => {
    //   if (err) throw err;
    //   if (result.length > 0) {
        
    //     req.session.user = username;
    //     res.redirect('/home');
        
    //   } else {
    //     res.send("Invalid username or password.");
    //   }
    // });
  });
// Retrieve records from the database
app.get('/Allparticipants', (req, res) => {
  const sql = 'SELECT * FROM participants';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
});
// Retrieve records from the database
app.get('/Allvolunteers', (req, res) => {
  const sql = 'SELECT * FROM volunteers';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
});
// Update route
app.post('/update/:id', (req, res) => {
  const ParticipantId = req.params.id;
  const { FirstName, LastName, MiddleName,DateOfBirth,PhoneNumber,Gender,Nationality,WithDisability } = req.body;
  const updatedWithDisability = WithDisability !== undefined ? WithDisability : 0;
  const updatedParticipant = { FirstName, LastName, MiddleName,DateOfBirth,PhoneNumber,Gender,Nationality,WithDisability: updatedWithDisability };
  db.query('UPDATE participants SET ? WHERE ParticipantId = ?', [updatedParticipant, ParticipantId], (err, result) => {
    if (err) throw err;
    res.json({ reload: true });
  });
});
// Route for the participant or restricted area
app.get('/participants', requireLogin, async (req, res) => {
  try {
    const apiUrl = 'http://localhost:3000/Allparticipants'; // Replace with the actual API URL
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.render('Participants/participant', { data });
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).send('Error fetching data from the API');
  }
});
// Route for the homepage or restricted area
app.get('/home', requireLogin, (req, res) => {
  res.render('Homepage/homepage');
});

// Route for the add clubs or restricted area
app.get('/addclub', requireLogin, (req, res) => {
  res.render('Clubs/addclub/index');
});
// Route for the volunteer or restricted area
app.get('/addvolunteer', requireLogin, (req, res) => {
  res.render('Volunteers/addvolunteer/index');
});
// Route for the volunteer or restricted area
app.get('/volunteer', requireLogin, async (req, res) => {
  try {
    const apiUrl = 'http://localhost:3000/Allvolunteers'; // Replace with the actual API URL
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.render('Volunteers/volunteers', { data });
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).send('Error fetching data from the API');
  }
});
// Route for the club or restricted area
app.get('/clubs', requireLogin, async (req, res) => {
  try {
    const apiUrl = 'http://localhost:3000/api/clubs'; // Replace with the actual API URL
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.render('Clubs/club', { data });
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).send('Error fetching data from the API');
  }
});

// Route for the homepage or restricted area
app.get('/addParticipant',requireLogin, (req, res) => {
  res.render('Participants/addparticipant');
});

// Route for the homepage or restricted area
app.post('/api/addParticipant', (req, res) => {
  const { FirstName, LastName, MiddleName, DateOfBirth, PhoneNumber, Gender, Nationality, WithDisability } = req.body;
  const sql = `
    INSERT INTO participants (FirstName, LastName, MiddleName, DateOfBirth, PhoneNumber, Gender, Nationality, WithDisability)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [FirstName, LastName, MiddleName, DateOfBirth, PhoneNumber, Gender, Nationality, WithDisability], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ message: "Error inserting data" });
    } else {
      res.json({ message: "Registration successful" });
    }
  });
});
// Route for the homepage or restricted area
app.post('/api/addclub', (req, res) => {
  const { LocationPHCC, StartDate, ProjectName, Status, EndDate, volunteerid, phccname } = req.body;
  const sql = `
    INSERT INTO clubs (LocationPHCC, StartDate, ProjectName, Status, EndDate, volunteerid, phccname)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [LocationPHCC, StartDate, ProjectName, Status, EndDate, volunteerid, phccname], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ message: "Error inserting data" });
    } else {
     
      res.json({ message: "Registration successful" });
    }
  });
});
// Route for the admin or restricted area
// app.get('/admin', requireLogin, (req, res) => {
//   res.render('adminPage/adminPage');
// });

app.post("/api/volunteers", (req, res) => {
  const data = req.body;

  const query = `
    INSERT INTO volunteers (
      FirstName, MiddleName, LastName, Gender, PhoneNumber,
      Adress, Nationality, Supervisor, StartDate, EndDate, DateOfBirth
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data["FirstName"],
    data["MiddleName"],
    data["LastName"],
    data["Gender"],
    data["PhoneNumber"],
    data["Adress"],
    data["Nationality"],
    data["Supervisor"],
    data["StartDate"],
    data["EndDate"],
    data["DateOfBirth"]
  ];

  db.query(query, values, (err) => {
    if (err) {
      console.error("Insert query error:", err.message);
      res.status(500).json({ error: "Failed to insert data." });
    } else {
      res.json({ message: "Registration successful" });
    }
  });
});
// Update route
app.post('/api/volunteer/update/:id', (req, res) => {
  const volunteerId = req.params.id;
  const { FirstName, LastName, MiddleName,DateOfBirth,PhoneNumber,Gender,Nationality,Supervisor,StartDate,EndDate,Adress } = req.body;
  const updatedVolunteer = { FirstName, LastName, MiddleName,DateOfBirth,PhoneNumber,Gender,Nationality,Supervisor,StartDate,EndDate,Adress };
  db.query('UPDATE volunteers SET ? WHERE VolunteerId = ?', [updatedVolunteer, volunteerId], (err, result) => {
    if (err) throw err;
    res.redirect('/volunteer');
  });
});

// Retrieve volunteer full name 
app.get('/api/clubs', (req, res) => {
  const sqlUse = 'USE community_db;';
  const sqlQuery = "SELECT c.*, CONCAT(v.FirstName, ' ', v.LastName) AS full_name FROM clubs c LEFT JOIN volunteers v ON c.volunteerid = v.VolunteerId;";
  
  db.query(sqlUse, (useErr) => {
    if (useErr) {
      console.error('Error using database:', useErr);
      res.sendStatus(500);
      return;
    }

    db.query(sqlQuery, (queryErr, results) => {
      if (queryErr) {
        console.error('Error executing query:', queryErr);
        res.sendStatus(500);
        return;
      }
      res.json(results);
    });
  });
});

app.post('/api/club/update/:id', (req, res) => {
  const ClubId = req.params.id;
  const { LocationPHCC, StartDate, volunteerid, EndDate, phccname, ProjectName } = req.body;
  const updatedClub = { LocationPHCC, volunteerid, StartDate, EndDate, phccname, ProjectName };
  
  db.query('UPDATE clubs SET ? WHERE ClubId = ?', [updatedClub, ClubId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred.");
      return; // Exit the function after sending an error response
    }
    res.json(updatedClub);
  });
});

// Route for logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});
  
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });