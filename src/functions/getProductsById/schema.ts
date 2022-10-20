export default {
  type: "string",
  params: {
    productId: { type: 'string' }
  },
  required: ['productId']
} as const;
