/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc'
import { schemas } from './lexicons'
import { CID } from 'multiformats/cid'
import * as AppVercelDekobokoQuest from './types/app/vercel/dekoboko/quest'
import * as AppVercelDekobokoPost from './types/app/vercel/dekoboko/post'

export * as AppVercelDekobokoQuest from './types/app/vercel/dekoboko/quest'
export * as AppVercelDekobokoPost from './types/app/vercel/dekoboko/post'

export class AtpBaseClient extends XrpcClient {
  app: AppNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.app = new AppNS(this)
  }

  /** @deprecated use `this` instead */
  get xrpc(): XrpcClient {
    return this
  }
}

export class AppNS {
  _client: XrpcClient
  vercel: AppVercelNS

  constructor(client: XrpcClient) {
    this._client = client
    this.vercel = new AppVercelNS(client)
  }
}

export class AppVercelNS {
  _client: XrpcClient
  dekoboko: AppVercelDekobokoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.dekoboko = new AppVercelDekobokoNS(client)
  }
}

export class AppVercelDekobokoNS {
  _client: XrpcClient
  quest: QuestRecord
  post: PostRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.quest = new QuestRecord(client)
    this.post = new PostRecord(client)
  }
}

export class QuestRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppVercelDekobokoQuest.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.vercel.dekoboko.quest',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppVercelDekobokoQuest.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.vercel.dekoboko.quest',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppVercelDekobokoQuest.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.vercel.dekoboko.quest'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.vercel.dekoboko.quest', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.vercel.dekoboko.quest', ...params },
      { headers },
    )
  }
}

export class PostRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppVercelDekobokoPost.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.vercel.dekoboko.post',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppVercelDekobokoPost.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.vercel.dekoboko.post',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppVercelDekobokoPost.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.vercel.dekoboko.post'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.vercel.dekoboko.post', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.vercel.dekoboko.post', ...params },
      { headers },
    )
  }
}
