const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function generateFakeProducts(count = 10) {
  return Array.from({ length: count }).map(() => ({
    code: faker.string.alphanumeric(8).toUpperCase(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.urlLoremFlickr({ category: "product" }),
    category: faker.commerce.department(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
    quantity: faker.number.int({ min: 0, max: 100 }),
    internalReference: faker.string.uuid(),
    shellId: faker.number.int({ min: 1, max: 10 }),
    inventoryStatus: faker.helpers.arrayElement([
      "INSTOCK",
      "LOWSTOCK",
      "OUTOFSTOCK",
    ]),
    rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
    createdAt: faker.date.past(),
    updatedAt: new Date(),
  }));
}

async function seedDatabase() {
  try {
    console.log("Seeding database with fake products...");

    const fakeProducts = await generateFakeProducts(20); // Generate 20 fake products

    for (const product of fakeProducts) {
      await prisma.product.upsert({
        where: { code: product.code },
        update: {}, // If exists, do nothing
        create: product,
      });
    }

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the seed function
seedDatabase();
