// ==UserScript==
// @name         Twitter Link Auto Expand for Misskey
// @version      1.0
// @author       NyaHo
// @match        https://buicha.social/*
// @grant        none
// @run-at       document-idle
// @description  Twitterの展開ボタンを自動的にクリックする
// ==/UserScript==

(function ()
{
    'use strict';

    console.log(
        '[Tampermonkey::Twitter Link Auto Expand for Misskey] Script loaded'
    );

    const containerSelector = 'div.xyu7z.xoC1u'; //タイムラインdiv要素のクラス名
    const buttonSelector = 'button._button.xbaFh.xfjt2.xrmjY'; //ボタン要素のクラス名

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
                        const buttons = addedNode.querySelectorAll(buttonSelector);

                        buttons.forEach((button) =>
                        {
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