import { prismaMock } from "@/lib/prisma/mock";
import { registerTransaction } from "./queries";
import { RegisterTransactionInput } from "./schemas";

describe("Test Suit: Register Transaction", () => {
  it("Must register a single transaction and return success.", async () => {
    const mockTransaction = { 
      id: 1, 
      description: "Café no trabalho",
      type: "out", 
      amount: 2.5,
      categoryId: 1,
      category: { id: 1, name: "Lanche", createdAt: new Date()},
      createdAt: new Date(),
    };

    prismaMock.$transaction.mockResolvedValue([mockTransaction]);

    const result = await registerTransaction([
      {
        description: "Café no trabalho",
        amount: 2.5,
        type: "out",
        category: "Lanche"
      }
    ]);

    expect(result.sucess).toBe(true);
    expect(result.data).toEqual([mockTransaction]);
    expect(result.data).toHaveLength(1);
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
  });

  it ("Must register multiples transactions in a slingle call with success.", async () => {
    const mockCategory = { id: 1, name: "Lanche", createdAt: new Date()};
    const multipleInput: RegisterTransactionInput[] = [
      { description: "Café no trabalho", type: "out", amount: 2.5, category: "Lanche" },
      { description: "Salgado no trabalho", type: "out", amount: 2.5, category: "Lanche" }
    ];
    const mockCreateRecords = [
      { id: 1, description: "Café no trabalho", type: "out", amount: 2.5, categoryId: 1, category: mockCategory, createdAt: new Date() },
      { id: 2, description: "Salgado no trabalho", type: "out", amount: 2.5, categoryId: 1, category: mockCategory, createdAt: new Date() }
    ];

    prismaMock.$transaction.mockResolvedValue(mockCreateRecords);
    const result = await registerTransaction(multipleInput);

    expect(result.sucess).toBe(true);
    expect(result.data).toHaveLength(2);
    expect(result.data).toEqual(mockCreateRecords);
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);

  })

  // it("Must reject and return validation error if invalid input.")
  // it("Must return failure if prisma return an error.")
});