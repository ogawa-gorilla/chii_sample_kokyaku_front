'use client';

import { Container } from "react-bootstrap";

export default function HomePage () {
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
            <p className="card-text mb-2">このアプリで使われているデータは、すべて架空のものです。</p>
            <p className="card-text mb-2">データの「追加・編集・削除」が自由にできますが、<strong>ブラウザを再読み込みすると初期状態に戻ります。</strong></p>
            <p className="card-text">ぜひ自由に操作して、使い心地を試してみてください。</p>
            <p className="card-text">PCやタブレットで開くと、PC用のレイアウトに自動で切り替わります。</p>
        </div>
  </div>
        </Container>
      </div>
    </div>
  )
} 