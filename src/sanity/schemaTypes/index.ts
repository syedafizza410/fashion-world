import { type SchemaTypeDefinition } from 'sanity'
import { home } from './home'
import { product } from './products'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [home,product],
}
