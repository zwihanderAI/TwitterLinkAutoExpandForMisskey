// ==UserScript==
// @name         Twitter Link Auto Expand for Misskey
// @version      1.1
// @author       NyaHo
// @match        https://buicha.social/*
// @grant        none
// @run-at       document-idle
// @description  Twitterのリンクを自動的に展開する
// ==/UserScript==

(function ()
{
    'use strict';

    console.log(
        '[Tampermonkey::Twitter Link Auto Expand for Misskey] Script loaded'
    );

    const containerSelector = 'div.xyu7z.xoC1u'; //タイムラインdiv要素のクラス名
    const expandButtonText = 'ポストを展開する'; //ボタン内の表示文字列

    setTimeout(() =>
    {
        console.log(
            '[Tampermonkey::Twitter Link Auto Expand for Misskey] Script Start'
        );

        const containers = document.querySelectorAll(containerSelector);

        containers.forEach((container) =>
        {
            const observer = new MutationObserver((mutationList) =>
            {
                mutationList.forEach((mutation) =>
                {
                    mutation.addedNodes.forEach((addedNode) =>
                    {
                        // テキストノードなどを除外
                        if (addedNode.nodeType !== Node.ELEMENT_NODE)
                        {
                            return;
                        }

                        //ボタン要素を検索しクリックイベントを発火
                        const buttons = addedNode.matches('button')
                            ? [addedNode]
                            : addedNode.querySelectorAll('button');

                        buttons.forEach((button) =>
                        {
                            if (!button.textContent.includes(expandButtonText))
                            {
                                return;
                            }

                            console.log('[Tampermonkey::Twitter Link Auto Expand for Misskey] Button Click');
                            button.click();
                        });
                    });
                });
            });

            observer.observe(container, {
                childList: true,
                subtree: false
            });
        });
    }, 1500);
})();
