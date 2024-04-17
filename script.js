console.log("I am Fengler. my IP is  Mac address is . Ncc student ID is: 223190712");
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database("./book.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the books database.');
});


// user input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


// create the table if not exists
db.run('CREATE TABLE IF NOT EXISTS books (ID INTEGER PRIMARY KEY, title712 TEXT, author712 TEXT, ISBN712 TEXT, description712 TEXT)', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Books Table created successfully');

    commandInterface();
});

function listBooks() {
    // list all books
    db.all('SELECT * FROM books', (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        rows.forEach((row) => {
            console.log(`ID: ${row.ID}, Title712: ${row.title712}, Author712: ${row.author712}, ISBN712: ${row.ISBN712}, Description712: ${row.description712}`);
        });
    });
}
// queue -> task 1(callback)
function commandInterface() {
    readline.question('Enter book title712: ', (title712) => {
        readline.question('Enter book author712: ', (author712) => {
            readline.question('Enter book ISBN712: ', (ISBN712) => {
                readline.question('Enter book description712: ', (description712) => {
                    // insert the book into the database
                    db.run('INSERT INTO books (title712, author712, ISBN712, description712) VALUES (?, ?, ?, ?)', [title712, author712, ISBN712, description712], (err) => {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log('Book added successfully.');
                        readline.question('Do you want to add another book? (yes/no): ', (answer) => {
                            if (answer === 'yes') {
                                commandInterface();
                            } else {
                                listBooks();
                                
                                readline.close();
                            }
                        });
                    });
                });
            });
        });
    });
    // callback hell
}