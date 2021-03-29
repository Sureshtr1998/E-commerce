const bcrypt = require('bcryptjs')

const users = [

    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true
    },
    {
        name: 'Suresh',
        email: 'suresh@example.com',
        password: bcrypt.hashSync('12345', 10),
    },
    {
        name: 'Test',
        email: 'test@example.com',
        password: bcrypt.hashSync('12345', 10),
    },
]

module.exports = users