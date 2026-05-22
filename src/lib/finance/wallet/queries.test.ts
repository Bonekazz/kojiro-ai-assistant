import { prismaMock } from "@/lib/prisma/mock";
import { getWalletBalance } from "./queries";

describe("Test Suit: Get Wallet Balance.", () => {
  it ( "Must return the user wallet balance.", async () => {
    const mockGropByResult = [
      { type: "in", _sum: { amount: 150.50}},
      { type: "out", _sum: { amount: 50.0}},
    ];
    (prismaMock.transaction.groupBy as jest.Mock).mockResolvedValue(mockGropByResult);

    const wBalance = await getWalletBalance();
    
    expect(wBalance).toBe(100.50);
    expect(prismaMock.transaction.groupBy).toHaveBeenCalledWith({
      by: ["type"],
      _sum: { amount: true }
    })

  })
});