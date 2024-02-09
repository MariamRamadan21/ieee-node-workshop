const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()) //

app.get('/users', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        const users = JSON.parse(data);
        res.json(users);
    });
    //لازم تبقي جوا الاسكوب بتاع فنكشن ال بتتعامل مع الفايل 
});
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    fs.readFile('users.json', 'utf8', (err, data) => {

        const users = JSON.parse(data);
        const user = users.find(u => u.id === userId);


        res.json(user);

    });
});

app.post('/user/save', (req, res) => {
    const newUser = req.body; //هنستقبل الريكويست من body

    fs.readFile('users.json', 'utf8', (err, data) => { //هنمسك الفايل عشان اقدر ابوش فيه الداتا اللي انا خزنتها في البدي

        const users = JSON.parse(data);
        users.push(newUser);

        fs.writeFile('users.json', JSON.stringify(users, null, 2), 'utf8', () => {
            res.status(201).json(newUser); // Respond with the newly created user
        });
    });
});

//const deleteBook = async (req, res) => {
//try {
// const id = users.params.id; //  هاخد idمن البرام
// const data = await fs.readFile('users.json', "utf8"); //store response in  const data
//const users = JSON.parse(data);
// const newUser = users.filter((user) => user.id !== id);
// await fs.writeFile("users.json", JSON.stringify(newUser));

// res.status(204).json(
//   {
//     message: "success",
//   error: err.message,


//     });
// } catch (err) {
//   res.status(500).json({
//     message: "error",
//   error: err.message,
//   });

// }
//}









//patch =>update
//app.patch('/users/:id', (req, res) => {
//  const id = req.params.id;
//const newUser = req.body;
// fs.readFile("users.json", "utf8", (err, data) => {
// if (err) {
//   console.log(err);

//   } else {
//     users = JSON.parse(data);

//    }
// }
// const I = users.findIndex((user) => user.id === id);
// for (let i = 0; i < users.length; i++) {
//   if (user[i].id === id) {
//     users[i] = newUser
//   }
// }

//

//fs.writeFile('users.json', JSON.stringify(users), 'utf8', () => {
// res.status(201).json({
//   message: success
// });
// Respond with the newly created user
//});

//})


//app.route('/ api/users/:id').delete(deleteBook);



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
