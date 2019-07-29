const vscode = require('vscode');
function eeee(s) {
    var str = s.substr(3);
    var uuu = parseInt(str, 16);
    return String.fromCharCode(uuu);
}
function activate() {
    vscode.commands.registerCommand('extension.utf8->codePoint', () => {
        var editor = vscode.window.activeTextEditor;
        var text = editor.document.getText(editor.selection);
        var arr = [];
        var str = "";
        for (var i = 0; i < text.length; i++) {
            var num = text.charCodeAt(i);
            if (num >= 128) {
                var tmp =num.toString(16).toUpperCase();
                while ( tmp.length < 4)
                {
                    tmp = "0" + tmp;
                }
                str = str + "\\\\u+" + tmp;
            }
            else {
                str = str + text.charAt(i);
            }
            arr.push(num);
        }
        editor.edit((builder) => {
            builder.replace(editor.selection, str);
        });
    });
    vscode.commands.registerCommand('extension.codePoint->utf8', () => {
        var editor = vscode.window.activeTextEditor;
        var text = editor.document.getText(editor.selection);
        var regexp = new RegExp(/\\\\u\+[0-9A-F]{4}/ig);
        var res = text.match(regexp);
        var res = text.replace(regexp, eeee);
        editor.edit((builder) => {
            builder.replace(editor.selection, res);
        });
    });
}
exports.activate = activate;
