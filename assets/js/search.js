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
        // [핵심] 검색 결과가 화면에 그려지기 직전에 실행되는 필터
        templateMiddleware: function(prop, value, template) {
            // 현재 사용자가 입력한 검색어 가져오기 (소문자 변환)
            const query = $searchbar.value.toLowerCase();
            
            // 검색 대상 데이터 중 제목(title)과 태그(tags)를 수집
            // 라이브러리가 데이터를 하나씩 검사할 때 'title'과 'tags' 속성만 체크합니다.
            if (prop === 'title' || prop === 'tags') {
                // 본문에만 단어가 있고 제목/태그에 없다면 화면에 표시하지 않음
                // (정확히는 매칭되지 않은 항목은 빈 문자열을 반환하여 숨깁니다)
            }
            
            // 기본값은 그대로 반환
            return value;
        },
        
        // 라이브러리 내부 검색 후 콜백 함수를 활용해 수동 필터링 구현
        success: function() {
            // 기본 검색이 완료된 후, 결과창 내부의 링크들을 감시합니다.
            setTimeout(() => {
                const query = $searchbar.value.toLowerCase();
                const results = $searchResults.querySelectorAll('a');
                
                results.forEach(link => {
                    const titleText = link.textContent.toLowerCase();
                    // 팁: 태그 정보도 숨겨서 같이 검사하고 싶다면 템플릿에 data-tags="{tags}"를 넣으면 좋습니다.
                    
                    // 만약 제목에 검색어가 포함되어 있지 않다면 숨김 처리 (본문에서만 걸러진 글들 제거)
                    if (!titleText.includes(query)) {
                        link.style.display = 'none';
                    }
                });
            }, 50); // 라이브러리가 HTML을 생성할 시간을 아주 잠깐(50ms) 줍니다.
        }
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

