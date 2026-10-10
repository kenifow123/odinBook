const { faker } = require("@faker-js/faker");
const { prisma } = require("../lib/prisma.js");

function createRandomUser() {
    //creates random user with 3 posts
    return {
        email: faker.internet.email(),
        username: faker.internet.username(),
        password: faker.internet.password(),

        //each user has 3 posts
        posts: {
            create: faker.helpers.multiple(() => ({
                content: faker.lorem.paragraph(),
                createdAt: faker.date.past(),
            }), { count : 3 })
        },
        profile: {
            create: {
                imageUrl: faker.image.avatar(),
            }
        }
    }
}

async function main() {
    const users = faker.helpers.multiple(createRandomUser, { count : 10 })

    const response = await Promise.all(
        users.map(user => prisma.user.create({ data: user}))
    )

    console.log(response);
}

main();