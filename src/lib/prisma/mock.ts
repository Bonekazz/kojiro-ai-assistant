import { jest } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

const prismaMockInstance = mockDeep<PrismaClient>();

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  prisma: prismaMockInstance,
}));

export const prismaMock = prismaMockInstance as unknown as DeepMockProxy<PrismaClient>;

// Limpa o mock antes de cada teste para evitar interferências
beforeEach(() => {
  mockReset(prismaMock);
});