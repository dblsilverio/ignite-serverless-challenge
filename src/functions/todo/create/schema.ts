export default {
  type: "object",
  properties: {
    id: { type: 'string' },
    userId: { type: 'string' },
    title: { type: 'string' },
    deadline: { type: 'date' },
    done: { type: 'boolean' },
  },
  required: ['title']
} as const;
