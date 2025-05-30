'use client';

import { Container } from "react-bootstrap"

export default function HelpPage () {
  return (
    <div>
      <style>
        {`
        .main-content {
          padding-top: 80px; /* 検索バーの高さ分 */
          padding-bottom: 80px; /* フッターの高さ分 */
        }
        `}
      </style>
      <div className="fixed-header-container">
        <nav className="navbar">
          <span className="navbar-brand mb-0 h5">ヘルプ</span>
        </nav>
      </div>
      <div className="main-content">
        <Container>
        <div className="card info-card shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-primary mb-3">このサンプルについて</h5>
            <p className="card-text mb-2">すべて架空のデータです。</p>
            <p className="card-text mb-2">データの新規作成や保存、削除もできます。</p>
            <p className="card-text mb-2">ブラウザをリロードするとデータは初期状態に戻ります。</p>
            <p className="card-text">自由に触ってみてください。</p>
            <p className="card-text">PCやタブレットをお持ちの方は、そちらでも開いてみてください。画面が切り替わります。</p>
        </div>
  </div>
        </Container>
      </div>
    </div>
  )
}