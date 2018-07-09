
export const ARRAY = (items) => ({
  type: 'array',
  items
})

export const OPTIONAL = (property) => ({
  ...property,
  required: false
})

export const ONEOF = (property, list: any[])=> ({
  ...property,
  enum: list
})

export const EMAIL = {
  type: 'string',
  pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  maximum: 1000,
  required: true,
  message: 'is not a valid email address'
}

export const PASSWORD = {
  type: 'string',
  minimum: 8,
  maximum: 1000,
  required: true
}

export const TEXT = {
  type: 'string',
  maximum: 10000,
  required: true
}

export const OBJECT_ID = {
  type: 'string',
  maximum: 10000,
  required: true
}

export const DATE = {
  type: 'date',
  required: true
}

export const ADDRESS = {
  type: 'object',
  required: true,
  properties: {
    first_name: TEXT,
    last_name: TEXT,
    address_1: TEXT,
    address_2: OPTIONAL(TEXT),
    city: TEXT,
    country: TEXT,
    state: TEXT,
    postal_code: TEXT,
    note: OPTIONAL(TEXT)
  }
}

export const PAYMENT_METHOD = {
  type: 'object',
  required: true,
  properties: {
    token: TEXT
  }
}