// applyExpressionToLayers.jsx
// 선택한 레이어들의 특정 속성에 사용자가 입력한 익스프레션 적용

var comp = app.project.activeItem;

if (comp instanceof CompItem && comp.selectedLayers.length > 0) {
    app.beginUndoGroup("Apply Expression To Layers");

    // 속성 선택
    var property = prompt(
        "어느 속성에 익스프레션을 적용할까요?\n옵션: position, rotation, scale, opacity",
        "position"
    );

    if (property != null) {
        property = property.toLowerCase();

        // 익스프레션 입력
        var expr = prompt("적용할 익스프레션을 입력하세요:", "");

        if (expr != null && expr !== "") {
            var layers = comp.selectedLayers;

            for (var i = 0; i < layers.length; i++) {
                var lyr = layers[i];
                var prop = null;

                switch (property) {
                    case "position":
                        prop = lyr.property("Transform").property("Position");
                        break;
                    case "rotation":
                        prop = lyr.property("Transform").property("Rotation");
                        break;
                    case "scale":
                        prop = lyr.property("Transform").property("Scale");
                        break;
                    case "opacity":
                        prop = lyr.property("Transform").property("Opacity");
                        break;
                }

                if (prop != null) {
                    prop.expression = expr;
                }
            }
        }
    }

    app.endUndoGroup();
} else {
    alert("선택된 레이어가 없습니다!");
}
