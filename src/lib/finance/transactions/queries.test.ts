import { prismaMock } from "@/lib/prisma/mock";
import { registerTransaction } from "./queries";

describe("Test Suit: Register Transaction", () => {

  it("Must register a transaction (success case)", async () => {
    const mockCategory = { id: 1, name: "Lanche", createdAt: new Date()};
    const mockTransaction = { 
      id: 1, 
      description: "Café no trabalho",
      type: "out", 
      amount: 2.5,
      categoryId: 1,
      createdAt: new Date(),
    };

    prismaMock.transaction.create.mockResolvedValue(mockTransaction);
    prismaMock.category.create.mockResolvedValue(mockCategory);

    const newTransaction = await registerTransaction({
      description: "Café no trabalho",
      amount: 2.5,
      type: "out",
      category: "Lanche"
    })

    expect(newTransaction.data).toEqual(mockTransaction);
    expect(prismaMock.transaction.create).toHaveBeenCalledTimes(1);
  })
});