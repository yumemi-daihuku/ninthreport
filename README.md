# 第九報告書 — 制作メモ（サイト管理者用）

## ファイル構成
```
ninthreport/
├── main.html         深度1（入口・第九報告書トップ）
├── mirror.html        深度2（URL反転ツール）
├── reflection.html    深度3（端末情報の演出）
├── other-side.html    深度4（カメラ演出／鏡世界トーン開始）
├── boundary.html      深度5（証言の矛盾パズル）
├── final.html          深度6（長押しギミック）
├── nalif.html          深度7（一方通行の終着点）
├── assets/
│   ├── style.css       全ページ共通デザイン
│   ├── common.js       深度演出・音声・ゲート判定の共通処理
│   └── audio/
│       ├── white_noise1.mp3   環境音（深度が進むほど音量UP）
│       └── death_sound4.mp3   要所での効果音
└── README.md（このファイル）
```

## 全体の導線とURL直打ち設計
ページ間に `<a>` リンクは一切設置していません。各ページ末尾の「照合フォーム」に
正しい語を入力すると、次に**手動でアドレスバーに入力すべきファイル名**が表示される
仕組みです（プレイヤーの操作ログにも依存しない、シンプルなクライアントサイド判定）。

| ページ | 手がかりの種類 | 答え | 次のURL |
|---|---|---|---|
| main.html | 被害者6名の初回接触日を古い順に並べ、姓の頭文字を連結 → **M-I-R-R-O-R** | `mirror` | mirror.html |
| mirror.html | 何を反転しても末尾に固定で現れる鏡文字（CSSで正しく読める） | `reflection` | reflection.html |
| reflection.html | 数字列 15-20-8-5-18-19-9-4-5 を A=1,B=2… に変換 | `otherside` | other-side.html |
| other-side.html | シーザー暗号（+3）`erxqgdub` を-3して復号 | `boundary` | boundary.html |
| boundary.html | 4件の証言のうち、本人の失踪日より後に書かれた証言Cが矛盾。文中に答えがそのまま記載 | `final` | final.html |
| final.html | 4.2秒間の長押し完了で自動表示（テキスト入力不要） | — | nalif.html |
| nalif.html | 到達点。以降のリンクなし（一方通行） | — | — |

すべて **半角英字・小文字** で判定しています（`assets/common.js` の `data-gate` 属性値と照合）。

## デプロイ手順（GitHub Pages）
1. 新規リポジトリ（例：`ninthreport`）を作成し、このフォルダ一式をルートに配置してpush。
2. リポジトリの **Settings → Pages** で、Branch: `main` / Folder: `/(root)` を選択して保存。
3. 数分後、`https://<ユーザー名>.github.io/ninthreport/main.html` で公開されます。
   - トップURLを `main.html` ではなく `index.html` にしたい場合は、`main.html` を
     `index.html` にリネームしてください（他ファイルからの参照はありません）。

## 音声について
- ブラウザの自動再生制限のため、環境音（white_noise1）は**ユーザーの最初のクリック／タップ／
  キー操作**で再生を開始します（`assets/common.js` の `initAmbient()`）。
- 効果音（death_sound4）はカメラ許可時・長押し完了時・証言ページの一定時間後などに
  一度だけ再生されます。音量は各ページの `NR.initAmbient(音量)` / `NR.playSting(音量)` の
  引数で調整可能です（0〜1）。

## 前作との整合性
- 第七報告書：怪異の存在と初期被害者7名。
- 第八報告書：「事案終結」を対象自身が偽装して宣言。
- 第九報告書（本作）：終結宣言そのものが偽装であったことを明かし、調査機関自体が
  既に対象の管理下にあるという構造を提示。プレイヤーは報告書の「読者」から
  「観測対象」へと役割を移行させられる。

## カスタマイズしやすい箇所
- `assets/style.css` の `:root` 内カラートークンを変更すると全体の配色を一括調整可能。
- 被害者データ・証言内容は各HTML内に直書きしているため、文面変更のみでシリーズを
  拡張しやすい構成にしています。
