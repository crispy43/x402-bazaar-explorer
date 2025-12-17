import type { FromSchema } from 'json-schema-to-ts';

export const discoverBazaarSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: ['http', 'mcp'],
      description: '탐색할 리소스의 프로토콜 타입',
    },
    // limit: {
    //   type: 'number',
    //   minimum: 1,
    //   maximum: 1000,
    //   description: '한 번에 가져올 리소스의 최대 개수',
    // },
    offset: {
      type: 'number',
      minimum: 0,
      description: '가져올 리소스의 시작 위치',
    },
  },
  required: [],
  additionalProperties: false,
} as const;

export type DiscoverBazaar = FromSchema<typeof discoverBazaarSchema>;
