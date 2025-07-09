// ==UserScript==
// @name         Bangumi 追番点格子纯享
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  隐藏首页右栏，同时隐藏番剧页的角色介绍/评论/讨论版/吐槽箱/推荐本条目的目录/谁看这部动画，保持纯净界面~
// @author       Bokoblink
// @include      *://bangumi.tv/*
// @include      *://bgm.tv/*
// @include      *://chii.in/*
// @grant        none
// @license      MIT License
// @downloadURL https://update.greasyfork.org/scripts/542079/Bangumi%20%E8%BF%BD%E7%95%AA%E7%82%B9%E6%A0%BC%E5%AD%90%E7%BA%AF%E4%BA%AB.user.js
// @updateURL https://update.greasyfork.org/scripts/542079/Bangumi%20%E8%BF%BD%E7%95%AA%E7%82%B9%E6%A0%BC%E5%AD%90%E7%BA%AF%E4%BA%AB.meta.js
// ==/UserScript==

(function () {
    'use strict';

    // 隐藏的番剧模块标题关键词（用于 .subject_section）
    const keywordsToHide = [
        '角色介绍',
        '吐槽箱',
        '讨论版',
        '评论'
    ];

    // 番剧详情页隐藏
    function hideSubjectPageModules() {
        // 遍历所有 .subject_section，根据 h2/h3 判断标题
        const sections = document.querySelectorAll('.subject_section');
        sections.forEach(section => {
            const heading = section.querySelector('h2, h3');
            if (heading) {
                const titleText = heading.innerText.trim();
                for (let keyword of keywordsToHide) {
                    if (titleText.includes(keyword)) {
                        section.style.display = 'none';
                        console.log(`隐藏模块（匹配标题）：${titleText}`);
                        break;
                    }
                }
            }
        });

        // 直接隐藏指定 id 的模块(推荐本条目的目录/谁看这部动画)
        const extraIds = ['subjectPanelIndex', 'subjectPanelCollect'];
        extraIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.style.display = 'none';
                console.log(`隐藏模块（按 ID）：${id}`);
            }
        });
    }

    // 首页隐藏右栏
    function hideHomeModules() {
        const rightColumn = document.getElementById('columnHomeB');
        if (rightColumn) {
            rightColumn.style.display = 'none';
            console.log('隐藏首页右栏 columnHomeB');
        }
    }

    // 页面类型判断
    function run() {
        const url = location.href;
        if (url.includes('/subject/')) {
            // 如果是番剧详情页
            hideSubjectPageModules();
        } else if (location.pathname === '/' || location.pathname === '/index') {
            // 如果是主页
            hideHomeModules();
        }
    }

    // 页面加载完毕后执行（延迟以兼容后加载）
    window.addEventListener('load', () => {
        setTimeout(run, 800);
    });
})();
