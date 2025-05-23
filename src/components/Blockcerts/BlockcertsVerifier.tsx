// 1. パッケージのインストール
// npm install @blockcerts/blockcerts-verifier

// 2. Web Components用のNext.jsコンポーネント作成
// components/BlockcertsVerifier.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface BlockcertsVerifierProps {
  src?: string
  allowDownload?: boolean
  allowSocialShare?: boolean
  disableAutoVerify?: boolean
  disableVerify?: boolean
  displayMode?: 'card' | 'fullscreen'
  locale?: string
  theme?: 'bright' | 'dark'
  clickableUrls?: boolean
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'blockcerts-verifier': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string
          'allow-download'?: string
          'allow-social-share'?: string
          'disable-auto-verify'?: string
          'disable-verify'?: string
          'display-mode'?: string
          locale?: string
          theme?: string
          'clickable-urls'?: string
        },
        HTMLElement
      >
    }
  }
}

const BlockcertsVerifier: React.FC<BlockcertsVerifierProps> = ({
  src,
  allowDownload = false,
  allowSocialShare = false,
  disableAutoVerify = false,
  disableVerify = false,
  displayMode = 'card',
  locale = 'auto',
  theme = 'bright',
  clickableUrls = false,
}) => {
  const verifierRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Web Componentsライブラリの動的インポート
    const loadBlockcerts = async () => {
      if (typeof window !== 'undefined') {
        try {
          await import('@blockcerts/blockcerts-verifier')
        } catch (error) {
          console.error('Failed to load blockcerts-verifier:', error)
        }
      }
    }

    loadBlockcerts()
  }, [])

  return (
    <blockcerts-verifier
      ref={verifierRef}
      src={src}
      allow-download={allowDownload.toString()}
      allow-social-share={allowSocialShare.toString()}
      disable-auto-verify={disableAutoVerify.toString()}
      disable-verify={disableVerify.toString()}
      display-mode={displayMode}
      locale={locale}
      theme={theme}
      clickable-urls={clickableUrls.toString()}
    />
  )
}

export default BlockcertsVerifier

// 3. 使用例のページコンポーネント
// pages/certificate-verification.tsx または app/certificate-verification/page.tsx
'use client'


import dynamic from 'next/dynamic'

// Dynamic importでSSRを無効化
const BlockcertsVerifier = dynamic(() => import('../components/BlockcertsVerifier'), {
  ssr: false,
  loading: () => <div>証明書検証ツールを読み込み中...</div>
})

export default function CertificateVerification() {
  const [certificateUrl, setCertificateUrl] = useState('')
  const [showVerifier, setShowVerifier] = useState(false)

  const handleVerifyCertificate = () => {
    if (certificateUrl) {
      setShowVerifier(true)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ブロックチェーン証明書検証</h1>
      
      {/* 証明書URL入力フォーム */}
      <div className="mb-6 p-4 border rounded-lg">
        <label htmlFor="cert-url" className="block text-sm font-medium mb-2">
          証明書のURLまたはJSONファイルパス
        </label>
        <input
          id="cert-url"
          type="text"
          value={certificateUrl}
          onChange={(e) => setCertificateUrl(e.target.value)}
          placeholder="https://example.com/certificate.json"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleVerifyCertificate}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          証明書を検証
        </button>
      </div>

      {/* Blockcerts Verifier */}
      {showVerifier && (
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">証明書検証結果</h2>
          <BlockcertsVerifier
            src={certificateUrl}
            allowDownload={true}
            allowSocialShare={false}
            displayMode="card"
            theme="bright"
          />
        </div>
      )}

      {/* サンプル証明書のリンク */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">サンプル証明書</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setCertificateUrl('https://raw.githubusercontent.com/blockchain-certificates/blockcerts-verifier/master/tests/fixtures/valid-certificate-example.json')
              setShowVerifier(true)
            }}
            className="block w-full text-left p-3 border rounded hover:bg-gray-50"
          >
            サンプル証明書 #1 - 有効な証明書
          </button>
          <button
            onClick={() => {
              setCertificateUrl('https://raw.githubusercontent.com/blockchain-certificates/blockcerts-verifier/master/tests/fixtures/mainnet-certificate-example.json')
              setShowVerifier(true)
            }}
            className="block w-full text-left p-3 border rounded hover:bg-gray-50"
          >
            サンプル証明書 #2 - メインネット証明書
          </button>
        </div>
      </div>
    </div>
  )
}

// 4. next.config.jsの設定（必要に応じて）
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Web Componentsのサポートを改善
    esmExternals: 'loose',
  },
  // 外部リソースの許可（証明書のJSONファイル読み込み用）
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

// 5. TypeScript設定（tsconfig.json）
// "compilerOptions" に以下を追加:
// {
//   "compilerOptions": {
//     "skipLibCheck": true,