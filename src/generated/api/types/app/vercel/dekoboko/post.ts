/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import { CID } from 'multiformats/cid'

export interface Record {
  /** The primary post content. */
  text: string
  /** Client-declared timestamp when this post was originally created. */
  createdAt: string
  [k: string]: unknown
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'app.vercel.dekoboko.post#main' ||
      v.$type === 'app.vercel.dekoboko.post')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('app.vercel.dekoboko.post#main', v)
}
