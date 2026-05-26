---
---

window.onload = function () {
    var $searchbar = document.getElementById('searchbar');
    var $searchResults = document.getElementById('search-results');
    var $searchContainer = document.querySelector('.search');

    // 검색바나 결과창 요소가 없으면 실행을 중단합니다.
    if (!$searchbar || !$searchResults)
        return;

    // 1. SimpleJekyllSearch 라이브러리 초기화 (기존 동일)
    SimpleJekyllSearch({
        searchInput: $searchbar,
        resultsContainer: $searchResults,
        json: '{{ "/search.json" | relative_url }}',
        searchResultTemplate: '<a href="{url}" target="_blank">{title}</a>',
        noResultsText: '',
    });

    /* hack ios safari unfocus */
    if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
        document.body.firstElementChild.tabIndex = 1;
    }

    // 2. 검색창에 입력이 시작되거나 포커스되면 결과창 열기
    $searchbar.addEventListener("input", function () {
        if ($searchResults.style.display === "none") {
            $searchResults.style.display = "block"; // 또는 null
        }
    });

    // 3. 마우스가 검색 영역(.search)을 벗어나면 외부 클릭 감지 레이더 작동
    if ($searchContainer) {
        $searchContainer.addEventListener("mouseleave", function () {
            document.body.onclick = searchCollapse;
        });
        
        // 마우스가 다시 검색 영역 안으로 들어오면 외부 클릭 감지 해제
        $searchContainer.addEventListener("mouseenter", function () {
            document.body.onclick = null;
        });
    }

    // 4. 외부 클릭 시 결과창을 닫는 함수
    var searchCollapse = function () {
        $searchResults.style.display = "none";
        document.body.onclick = null; // 이벤트 중복 실행 방지
    };
}

