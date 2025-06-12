import { PrismaClient } from "../lib/generated/prisma";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  // Clear existing data
  await prisma.products.deleteMany();
  await prisma.productsCategories.deleteMany();
  console.log("🗑️  Cleared existing products and categories");

  // Seed categories first
  console.log("📂 Creating categories...");
  const categories = [
    {
      id: 1,
      name: "Vintage Film",
      description: "Klassiske filmoptagelser fra 1900-tallet",
    },
    {
      id: 2,
      name: "Reklamefilm",
      description: "Historiske reklamer og kommercielle optagelser",
    },
    {
      id: 3,
      name: "Tv-indhold",
      description: "Tv-serier, intros og udsendelser fra dansk fjernsyn",
    },
    {
      id: 4,
      name: "Lydoptagelser",
      description: "Lydklip, musik og lydeffekter fra forskellige epoker",
    },
  ];

  for (const category of categories) {
    const createdCategory = await prisma.productsCategories.create({
      data: category,
    });
    console.log(`✅ Created category: ${createdCategory.name}`);
  }

  // Seed products with category references
  console.log("🎬 Creating products...");
  const products = [
    {
      id: 1,
      name: "Svaner i tåge (1974)",
      description:
        "Optagelse i sort/hvid af svaner der flyver gennem morgentåge.",
      price: new Decimal("129.95"),
      stockUnits: 5,
      imageUrl: "",
      categoryId: 1, // Vintage Film
    },
    {
      id: 2,
      name: "DDR Margarine Reklame (1982)",
      description: "Autentisk reklameklip fra Østtyskland. 8mm rulle.",
      price: new Decimal("89.50"),
      stockUnits: 12,
      imageUrl: "",
      categoryId: 2, // Reklamefilm
    },
    {
      id: 3,
      name: "Mand i regnvejr",
      description:
        "Sort/hvid 8mm klip af en mand der går under en paraply i 1950'erne.",
      price: new Decimal("99.00"),
      stockUnits: 3,
      imageUrl: "",
      categoryId: 1, // Vintage Film
    },
    {
      id: 4,
      name: "Skole-tv intro (1979)",
      description: "Den klassiske introsekvens med synth-lyde og stjerneregn.",
      price: new Decimal("59.00"),
      stockUnits: 7,
      imageUrl: "",
      categoryId: 3, // Tv-indhold
    },
    {
      id: 5,
      name: "Lydklip: Ugle tuder",
      description: "Lydoptagelse af en ugle. Uden musik. Ca. 2 min.",
      price: new Decimal("19.95"),
      stockUnits: 25,
      imageUrl: "",
      categoryId: 4, // Lydoptagelser
    },
  ];

  for (const product of products) {
    const createdProduct = await prisma.products.create({
      data: product,
    });
    console.log(
      `✅ Created product: ${createdProduct.name} - ${createdProduct.price} DKK (Category ID: ${createdProduct.categoryId})`
    );
  }

  console.log("🎉 Seeding completed successfully!");
  console.log(
    `📊 Summary: ${categories.length} categories, ${products.length} products created`
  );
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
