/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { LexiconDoc, Lexicons } from '@atproto/lexicon'

export const schemaDict = {
  AppVercelDecobokoPost: {
    lexicon: 1,
    id: 'app.vercel.decoboko.post',
    defs: {
      main: {
        type: 'record',
        description: 'Record containing a decoboko post.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['text', 'createdAt'],
          properties: {
            text: {
              type: 'string',
              maxLength: 3000,
              maxGraphemes: 300,
              description: 'The primary post content.',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
              description:
                'Client-declared timestamp when this post was originally created.',
            },
          },
        },
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>

export const schemas = Object.values(schemaDict)
export const lexicons: Lexicons = new Lexicons(schemas)
export const ids = { AppVercelDecobokoPost: 'app.vercel.decoboko.post' }
