# Twitter Link Auto Expand for Misskey
Misskeyタイムライン上のTwitterリンクを自動で展開するTampermonkeyスクリプト

- 使用方法
一部のパラメータは [buicha.social](https://buicha.social/) 向けにハードコーディングしているため、使用環境に応じて書き換えが必要

1. 対象ドメイン
ヘッダ内の`@match https://buicha.social/*`箇所を実際に使用するインスタンスのURLへ修正する
2. クラス名
div要素, button要素のクラス名が実際のhtml内の値と異なる場合は修正する
```
const containerSelector = 'div.xyu7z.xoC1u';
const buttonSelector = 'button._button.xbaFh.xfjt2.xrmjY';
```
