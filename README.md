# hayayomi
速読（そくどく）アプリケーション
- 既存アプリケーションでは、現在の進捗が確認しにくく、読書の際につかれる
- サーバーサイドで実装しており、セグメンテーションにおいて負荷がかかるため大量の文章を処理する能力が乏しい
- 現代の会話分が多い物語においては地の文と会話文の区別が重用であり、この形式だと括弧の把握が重用になるが、１文字のコストとして存在しているのは重く、現在括弧内なのか外なのかの把握が問題である


- 全体の進捗を表示する事で残りの時間等の感覚を表示
- ユーザーサイドで実装する事で（精度は落ちるが）サーバーコスト無しで運用可能にし、長文のセグメンテーションを可能にする
- 会話文を色によってわけることにより、括弧内外であることを明示する


## やること
- 設定の初期化
- 本棚実装
- 読んだところまでメモ
- 自分のテキストを本棚に追加（データは保存しない）
- txtファイル読み込み

文章を読むスピードを決めるのは読視野(一度に認識する文字数)と視点停留時間(視線が止まっている時間)、そして視線を動かす時間にあるそうです。