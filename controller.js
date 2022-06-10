
app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, firstname, lastname, location) 
                       values(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/index/login", checkAuthenticated, (req, res) => {
        // flash sets a messages variable. passport sets the error message
        console.log(req.session.flash.error);
        res.render("homepage.ejs", { use: "Hello" + eq.user.name });
    });

    app.get("/homepage/logout", (req, res) => {
        req.logout();
        res.render("index", { message: "You have logged out successfully" });
    });

    app.post("/index/register", async (req, res) => {
        let { username, password, name, surname } = req.body;

        let errors = [];

        console.log({
            username,
            password,
            name,
            surname
        });

        //input validation
        if (!username || !password || !name || !surname) {
            errors.push({ message: "Please enter all fields" });
        }

        if (password.length < 6) {
            errors.push({ message: "Password must be a least 6 characters long" });
        }

        if (errors.length > 0) {
            res.render("register", { errors, username, password, name, surname });
        } else {
            // Validation passed
            pool.query(`SELECT * FROM users WHERE username = $1`,
                [username],
                (err, results) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(results.rows);

                    if (results.rows.length > 0) {
                        return res.render("register", {
                            message: "user already registered"
                        });
                    } else {
                        pool.query(`INSERT INTO users (username, password, name, surname) VALUES ($1, $2, $3, $4) RETURNING id, password`,
                            [username, password, name, surname],
                            (err, results) => {
                                if (err) {
                                    throw err;
                                }
                                console.log(results.rows);
                                req.flash("success_msg", "You are now registered. Please log in");
                                //res.redirect("/");
                            }
                        );
                    }
                }
            );
        }
    });

