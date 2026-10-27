// ==UserScript==
// @name         Twitter Link Auto Expand for Misskey
// @version      2.0
// @author       NyaHo
// @match        https://buicha.social/*
// @grant        none
// @run-at       document-idle
// @description  Twitterの展開ボタンを自動的にクリックする
// ==/UserScript==

(function () {
    'use strict';

    const BUTTON_TEXTS = [
        'ポストを展開する',
        'ツイートを展開する'
    ];

    const clickedButtons = new WeakSet();
    let scanTimer = null;

    // X(Twitter)のポストURLか確認
    function isTwitterUrl(href) {
        try {
            const url = new URL(href);
            const hosts = [
                'x.com',
                'mobile.x.com',
                'twitter.com',
                'mobile.twitter.com'
            ];

            return hosts.includes(url.hostname)
                && /^\/[^/]+\/status(?:es)?\/\d+/.test(url.pathname);
        } catch {
            return false;
        }
    }

    // 展開ボタンを検索してクリック
    function expandTwitterPosts() {
        document.querySelectorAll('button').forEach(button => {
            if (clickedButtons.has(button)) return;
            if (button.disabled) return;

            const text = button.textContent.trim();
            if (!BUTTON_TEXTS.includes(text)) return;

            // MisskeyのURLプレビューの親要素
            const preview = button.parentElement?.parentElement;
            if (!preview) return;

            // 対応するX(Twitter)のリンクを確認
            const link = preview.querySelector('a[href]');
            if (!link || !isTwitterUrl(link.href)) return;

            clickedButtons.add(button);
            button.click();
        });
    }

    // DOM更新時の処理をまとめる
    function scheduleScan() {
        if (scanTimer !== null) return;

        scanTimer = setTimeout(() => {
            scanTimer = null;
            expandTwitterPosts();
        }, 100);
    }

    // 初期表示の投稿を処理
    expandTwitterPosts();

    // タイムラインの更新やスクロールによる追加投稿を監視
    const observer = new MutationObserver(scheduleScan);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();