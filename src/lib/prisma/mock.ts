import { jest } from '@jest/globals';
import { prisma } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { beforeEach } from 'node:test';

const prismaMockInstance = mockDeep<PrismaClient>();

if (!(prismaMockInstance as any).transaction) {
  (prismaMockInstance as any).transaction = {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    // adicione outros métodos se sua query usar
  };
}

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  prisma: prismaMockInstance,
}));

export const prismaMock = prismaMockInstance as unknown as DeepMockProxy<PrismaClient>;

// Limpa o mock antes de cada teste para evitar interferências
beforeEach(() => {
  mockReset(prismaMock);
});