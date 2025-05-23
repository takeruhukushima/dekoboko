// 1. 必要なパッケージのインストール
// npm install @blockcerts/cert-issuer bitcoinjs-lib node-forge crypto

// 2. 環境変数設定（.env.local）
/*
BITCOIN_NETWORK=testnet
BITCOIN_PRIVATE_KEY=your_bitcoin_private_key_here
ISSUER_URL=https://yourdomain.com/issuer-profile.json
BLOCKCHAIN_SERVICE_URL=https://api.blockcypher.com/v1/btc/test3
*/

// 3. 発行者プロフィール（public/issuer-profile.json）
/*
{
  "@context": [
    "https://w3id.org/openbadges/v2",
    "https://w3id.org/blockcerts/v3.0-beta"
  ],
  "type": "Profile",
  "id": "https://yourdomain.com/issuer-profile.json",
  "name": "Your Institution Name",
  "url": "https://yourinstitution.com",
  "introductionURL": "https://yourinstitution.com/about",
  "image": "https://yourinstitution.com/logo.png",
  "email": "contact@yourinstitution.com",
  "publicKey": [
    {
      "id": "ecdsa-koblitz-pubkey:your_bitcoin_address_here",
      "created": "2024-01-01T00:00:00Z"
    }
  ]
}
*/

// 4. 証明書テンプレート定義
// types/certificate.ts
export interface CertificateTemplate {
    id: string
    name: string
    description: string
    displayHtml: string
    criteria?: {
      narrative: string
    }
  }
  
  export interface CertificateData {
    recipientName: string
    recipientEmail: string
    recipientId: string
    issueDate: string
    additionalData?: Record<string, any>
  }
  
  export interface IssuedCertificate {
    "@context": string[]
    id: string
    type: string[]
    issuer: string
    issuanceDate: string
    credentialSubject: {
      id: string
      name?: string
      email?: string
    }
    display: {
      contentMediaType: string
      content: string
    }
    metadata?: string
    proof?: any
  }
  
  // 5. 証明書発行ユーティリティ
  // lib/certificateIssuer.ts
  import * as bitcoin from 'bitcoinjs-lib'
  import { createHash } from 'crypto'
  import * as forge from 'node-forge'
  
  export class CertificateIssuer {
    private privateKey: string
    private network: bitcoin.Network
    private issuerUrl: string
  
    constructor(privateKey: string, network: 'mainnet' | 'testnet' = 'testnet', issuerUrl: string) {
      this.privateKey = privateKey
      this.network = network === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet
      this.issuerUrl = issuerUrl
    }
  
    // 証明書の作成
    createCertificate(template: CertificateTemplate, data: CertificateData): IssuedCertificate {
      const certificateId = `urn:uuid:${this.generateUUID()}`
      
      // HTMLコンテンツに受講者情報を埋め込み
      const personalizedHtml = template.displayHtml
        .replace('{{recipientName}}', data.recipientName)
        .replace('{{issueDate}}', new Date(data.issueDate).toLocaleDateString('ja-JP'))
        .replace('{{certificateName}}', template.name)
  
      const certificate: IssuedCertificate = {
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://w3id.org/blockcerts/v3.0-beta"
        ],
        id: certificateId,
        type: ["VerifiableCredential", "BlockcertsCredential"],
        issuer: this.issuerUrl,
        issuanceDate: data.issueDate,
        credentialSubject: {
          id: data.recipientId,
          name: data.recipientName,
          email: data.recipientEmail
        },
        display: {
          contentMediaType: "text/html",
          content: personalizedHtml
        },
        metadata: JSON.stringify(data.additionalData || {})
      }
  
      return certificate
    }
  
    // 証明書にデジタル署名を追加
    async signCertificate(certificate: IssuedCertificate): Promise<IssuedCertificate> {
      // 証明書のハッシュを計算
      const certificateHash = this.calculateHash(certificate)
      
      // Bitcoin秘密鍵でメッセージに署名
      const keyPair = bitcoin.ECPair.fromWIF(this.privateKey, this.network)
      const signature = keyPair.sign(Buffer.from(certificateHash, 'hex'))
  
      // Merkle証明を生成（簡略化版）
      const proof = {
        type: "MerkleProof2019",
        created: new Date().toISOString(),
        proofValue: this.createProofValue(certificateHash, signature),
        proofPurpose: "assertionMethod",
        verificationMethod: `did:example:${this.getPublicKeyFromPrivate()}#key-1`
      }
  
      return {
        ...certificate,
        proof
      }
    }
  
    // ブロックチェーンに証明書ハッシュを記録
    async recordOnBlockchain(certificateHash: string): Promise<string> {
      // 実際の実装ではBitcoin APIを使用してトランザクションを作成
      // ここでは簡略化
      console.log(`Recording certificate hash on blockchain: ${certificateHash}`)
      
      // 模擬的なトランザクションID
      return `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
  
    private calculateHash(certificate: IssuedCertificate): string {
      const certString = JSON.stringify(certificate, Object.keys(certificate).sort())
      return createHash('sha256').update(certString).digest('hex')
    }
  
    private createProofValue(hash: string, signature: Buffer): string {
      // Base58エンコード（簡略化版）
      const proofData = {
        path: [],
        merkleRoot: hash,
        targetHash: hash,
        anchors: [`blink:btc:testnet:${hash.substring(0, 32)}`]
      }
      
      return Buffer.from(JSON.stringify(proofData)).toString('base64')
    }
  
    private getPublicKeyFromPrivate(): string {
      const keyPair = bitcoin.ECPair.fromWIF(this.privateKey, this.network)
      return keyPair.publicKey.toString('hex')
    }
  
    private generateUUID(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }
  }
  
  // 6. API Route - 証明書発行
  // pages/api/certificates/issue.ts または app/api/certificates/issue/route.ts
  import { NextApiRequest, NextApiResponse } from 'next'
  import { CertificateIssuer } from '../../../lib/certificateIssuer'
  
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  
    try {
      const { templateId, recipientData } = req.body
  
      // 環境変数から設定を取得
      const privateKey = process.env.BITCOIN_PRIVATE_KEY!
      const network = process.env.BITCOIN_NETWORK as 'mainnet' | 'testnet'
      const issuerUrl = process.env.ISSUER_URL!
  
      // 証明書発行者を初期化
      const issuer = new CertificateIssuer(privateKey, network, issuerUrl)
  
      // テンプレートを取得（実際はデータベースから）
      const template = await getTemplate(templateId)
      
      // 証明書を作成
      const certificate = issuer.createCertificate(template, recipientData)
      
      // 証明書に署名
      const signedCertificate = await issuer.signCertificate(certificate)
      
      // ブロックチェーンに記録
      const txId = await issuer.recordOnBlockchain(
        issuer['calculateHash'](signedCertificate)
      )
  
      // データベースに保存
      await saveCertificate({
        ...signedCertificate,
        transactionId: txId
      })
  
      res.status(200).json({
        success: true,
        certificate: signedCertificate,
        transactionId: txId
      })
  
    } catch (error) {
      console.error('Certificate issuance error:', error)
      res.status(500).json({ error: 'Failed to issue certificate' })
    }
  }
  
  async function getTemplate(templateId: string): Promise<CertificateTemplate> {
    // 実際の実装ではデータベースから取得
    return {
      id: templateId,
      name: "修了証明書",
      description: "コース修了の証明書",
      displayHtml: `
        <div style="padding: 40px; border: 2px solid #000; font-family: Arial;">
          <h1 style="text-align: center;">修了証明書</h1>
          <p style="text-align: center; font-size: 18px;">
            {{recipientName}} 様
          </p>
          <p style="text-align: center;">
            上記の方は、{{certificateName}}を修了したことを証明します。
          </p>
          <p style="text-align: center;">
            発行日: {{issueDate}}
          </p>
        </div>
      `
    }
  }
  
  async function saveCertificate(certificate: any): Promise<void> {
    // データベースに保存する実装
    console.log('Saving certificate to database:', certificate.id)
  }
  
  // 7. フロントエンド - 証明書発行フォーム
  // components/CertificateIssuer.tsx
  'use client'
  
  import { useState } from 'react'
  
  interface IssueFormData {
    templateId: string
    recipientName: string
    recipientEmail: string
    recipientId: string
    additionalData?: Record<string, any>
  }
  
  export default function CertificateIssuer() {
    const [formData, setFormData] = useState<IssueFormData>({
      templateId: 'completion-cert',
      recipientName: '',
      recipientEmail: '',
      recipientId: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
  
      try {
        const response = await fetch('/api/certificates/issue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            templateId: formData.templateId,
            recipientData: {
              ...formData,
              issueDate: new Date().toISOString()
            }
          })
        })
  
        const data = await response.json()
        setResult(data)
      } catch (error) {
        console.error('Error issuing certificate:', error)
        setResult({ error: 'Failed to issue certificate' })
      } finally {
        setIsLoading(false)
      }
    }
  
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">証明書発行</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              証明書テンプレート
            </label>
            <select
              value={formData.templateId}
              onChange={(e) => setFormData({...formData, templateId: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="completion-cert">修了証明書</option>
              <option value="achievement-cert">達成証明書</option>
            </select>
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-2">
              受講者名
            </label>
            <input
              type="text"
              required
              value={formData.recipientName}
              onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              required
              value={formData.recipientEmail}
              onChange={(e) => setFormData({...formData, recipientEmail: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-2">
              受講者ID
            </label>
            <input
              type="text"
              required
              value={formData.recipientId}
              onChange={(e) => setFormData({...formData, recipientId: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
  
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? '発行中...' : '証明書を発行'}
          </button>
        </form>
  
        {result && (
          <div className="mt-6 p-4 border rounded">
            {result.success ? (
              <div className="text-green-600">
                <h3 className="font-bold">発行完了</h3>
                <p>証明書ID: {result.certificate.id}</p>
                <p>トランザクションID: {result.transactionId}</p>
                
                <div className="mt-4">
                  <h4 className="font-semibold">証明書プレビュー:</h4>
                  <div 
                    className="border p-4 mt-2"
                    dangerouslySetInnerHTML={{ 
                      __html: result.certificate.display.content 
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-red-600">
                <h3 className="font-bold">エラー</h3>
                <p>{result.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }