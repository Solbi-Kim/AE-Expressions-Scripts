// renameSelectedLayers.jsx
// 선택한 레이어 이름을 "입력한 이름 n" 형식으로 리네임
// n은 1부터 시작, 내림차순 순서로 번호 매김

var comp = app.project.activeItem;

if (comp instanceof CompItem && comp.selectedLayers.length > 0) {
    app.beginUndoGroup("Rename Selected Layers");

    // 사용자에게 접두어 입력받기
    var prefix = prompt("레이어 이름 앞에 붙일 텍스트를 입력하세요:", "Layer");

    if (prefix != null) {
        var layers = comp.selectedLayers;

        // 선택된 레이어를 내림차순 정렬 (타임라인 상단 → 하단)
        layers.sort(function(a, b) {
            return b.index - a.index;
        });

        // 순서대로 이름 부여
        for (var i = 0; i < layers.length; i++) {
            layers[i].name = prefix + " " + (i + 1);
        }
    }

    app.endUndoGroup();
} else {
    alert("선택된 레이어가 없습니다!");
}
