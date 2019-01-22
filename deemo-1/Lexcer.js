var str = "package compile;\nimport java.io.BufferedReader;\nimport java.io.FileNotFoundException;\nimport java.io.FileReader;\nimport java.io.IOException;\nimport java.util.Arrays;\npublic class TestLexer {\n    // \u5173\u952E\u8BCD\u8868\n    private String keyWords[] = { \"abstract\", \"boolean\", \"break\", \"byte\",\n            \"case\", \"catch\", \"char\", \"class\", \"continue\", \"default\", \"do\",\n            \"double\", \"else\", \"extends\", \"final\", \"finally\", \"float\", \"for\",\n            \"if\", \"implements\", \"import\", \"instanceof\", \"int\", \"interface\",\n            \"long\", \"native\", \"new\", \"package\", \"private\", \"protected\",\n            \"public\", \"return\", \"short\", \"static\", \"super\", \"switch\",\n            \"synchronized\", \"this\", \"throw\", \"throws\", \"transient\", \"try\",\n            \"void\", \"volatile\", \"while\", \"strictfp\",\"enum\",\"goto\",\"const\",\"assert\" , \"FileNotFoundException\"};\n\n    // \u8FD0\u7B97\u7B26\n    private Character operators[] = new  Character[] { '+', '-', '*', '/', '=', '>', '<', '&' };\n\n    // \u5206\u9694\u7B26\n    private String[] separators ={ \",\", \";\", \"{\", \"}\", \"(\", \")\", \"[\", \"]\", \"_\", \":\", \"\u3001\", \".\", \"\\\"\" };\n\n    // \u5F53\u524D\u5904\u7406\u7684\u5B57\u7B26\n    private char token ;\n\n    // \u62FC\u63A5\u7684\u8BED\u53E5\u4E32\n    private String strToken = \"\";\n\n    //\u7528\u6765\u5B58\u653E\u8BFB\u53D6\u7684\u5E8F\u53F7\n    private int i  ;\n\n    //\u5B58\u653E\u8BFB\u53D6\u7684\u8BCD\u6CD5\u5355\u5143\u7C7B\u578B\n    private int keyType ;\n\n    private static String fileSrcName = \"./src/input.txt\" ;\n\n    // \u5224\u65AD\u662F\u5426\u4E3A\u5B57\u6BCD\n    private boolean isLetter(){\n        return Character.isLetter( token );\n    }\n\n    // \u5224\u65AD\u662F\u5426\u662F\u6570\u5B57\n    private boolean isDigit (){\n        return Character.isDigit( token ) ;\n    }\n\n    private StringBuffer buffer = new StringBuffer(); // \u7F13\u51B2\u533A\n\n    // \u5224\u65AD\u662F\u5426\u4E3A\u5173\u952E\u5B57\n    private boolean isKeyword(){\n        return Arrays.asList( keyWords ).contains( strToken ) ;\n    }\n\n    // \u5224\u65AD\u662F\u5426\u4E3A\u5206\u9694\u7B26\n    private boolean isSeparator (){\n        return Arrays.asList( separators ).contains(token + \"\") ;\n    }\n\n    // \u5224\u65AD\u662F\u5426\u4E3A\u8FD0\u7B97\u7B26\u53F7\n    private boolean isOperate(){\n        return Arrays.asList( operators ).contains( token ) ;\n    }\n\n    // \u76D1\u6D4B\u5B57\u7B26\u662F\u5426\u4E3A\u7A7A\u683C , \u4E0D\u662F\u5219\u7EE7\u7EED\u8BFB\u53D6\n    private void isSpace(){\n        if( Character.isSpaceChar( token ) ){\n            getToken();\n            isSpace();\n        }\n    }\n\n    private void  getToken(){\n        token = buffer.charAt(i);\n        i++;\n    }\n\n    // \u94FE\u63A5token\u5230strToken\u4E0A\n    public void concat() {\n        strToken += token ;\n    }\n    public void retract() {\n        i--;\n        token = ' ';\n    }\n\n    public void analyse(){\n        while ( i < buffer.length() ){\n            getToken();\n            isSpace();\n            if( isLetter() ){\n                // \u5F53\u524D\u8BFB\u53D6\u7684\u5B57\u7B26\u4E3A\u5B57\u6BCD\u6216\u8005\u662F\u6570\u5B57\u65F6\u5219\u7EE7\u7EED\u8BFB\u53D6\n                while (isLetter() || isDigit()) {\n                    concat();\n                    getToken();\n                }\n                // \u8BFB\u53D6\u5230\u975E\u6570\u5B57\u6216\u8005\u5B57\u6BCD\u7684\u5B57\u7B26 \uFF0C \u5219\u56DE\u9000\u5230\u4E0A\u4E00\u4E2A\u5B57\u7B26\n                // \u4F8B\u5982 page+= 1 , \u8BFB\u53D6\u5230 + \u53F7\u4E4B\u540E , \u8DF3\u51FA\u5FAA\u73AF , \u56DE\u9000\u5230\u539F\u672C\u5B57\u7B26e\u7684\u4F4D\u7F6E\n                retract() ;\n\n                // \u5982\u679C\u662F\u5173\u952E\u5B57\u5219\u8FDB\u884C\u5173\u952E\u5B57\u5904\u7406\n                if (isKeyword()) {\n                    System.out.println(\"\u8BFB\u53D6\u5230\u5173\u952E\u5B57 ---- \" + strToken );\n                } else {\n                    System.out.println(\"\u8BFB\u53D6\u5230\u5176\u4ED6\u8BCD ---- \" + strToken );\n                }\n\n                // \u5206\u6790\u5B8C\u4E00\u4E2A\u8BCD , \u5219\u7F6E\u7A7AstrToken ;\n                strToken = \"\";\n            }else if( isDigit() ){\n\n                while (isDigit()) {\n                    concat();\n                    getToken();\n                }\n\n                System.out.println(\"\u8BFB\u53D6\u5230\u6570\u5B57 ---- \" + strToken );\n                retract() ;\n                strToken = \"\";\n            }else if( isOperate() ){\n                System.out.println(\"\u8BFB\u53D6\u5230\u64CD\u4F5C\u7B26 ---- \" + token );\n            }else if( isSeparator() ){\n                System.out.println(\"\u8BFB\u53D6\u5230\u5206\u9694\u7B26 ---- \" + token );\n            }\n        }\n    }\n\n    public void readFile() {\n        try {\n            FileReader fis = new FileReader(this.fileSrcName);\n\n            BufferedReader br = new BufferedReader(fis);\n\n            String temp = null;\n\n            while ( ( temp = br.readLine() ) != null ){\n                buffer.append( temp ) ;\n            }\n\n        }catch (FileNotFoundException e) {\n            System.out.println(\"\u6E90\u6587\u4EF6\u672A\u627E\u5230!\" + e );\n        }catch ( Exception e ){\n            System.out.println(\"\u5F02\u5E38\" + e);\n        }\n    }\n\n    public static void main(String[] args) {\n        TestLexer alr = new TestLexer() ;\n        alr.readFile();\n        alr.analyse();\n    }\n}";
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.isLetter = function (token) {
        return /[a-zA-Z\u4E00-\u9FFF]/g.test(token);
    };
    ;
    Util.isDigit = function (token) {
        return /\d/g.test(token);
    };
    return Util;
}());
var Lexcer = /** @class */ (function () {
    function Lexcer() {
        this.token = "";
        this.tokenStr = "";
        this.index = 0;
        this.keywords = ["abstract", "boolean", "break", "byte",
            "case", "catch", "char", "class", "continue", "default", "do",
            "double", "else", "extends", "final", "finally", "float", "for",
            "if", "implements", "import", "instanceof", "int", "interface",
            "long", "native", "new", "package", "private", "protected",
            "public", "return", "short", "static", "super", "switch",
            "synchronized", "this", "throw", "throws", "transient", "try",
            "void", "volatile", "while", "strictfp", "enum", "goto", "const", "assert", "FileNotFoundException"];
        this.operators = ['+', '-', '*', '/', '=', '>', '<', '&'];
        this.separators = [",", ";", "{", "}", "(", ")", "[", "]", "_", ":", "、", ".", "\""];
    }
    Lexcer.prototype.getToken = function () {
        var token = this.buffer.charAt(this.index);
        this.index += 1;
        this.token = token;
    };
    Lexcer.prototype.analyse = function () {
        if (this.index <= this.buffer.length) {
            this.getToken();
            if (Util.isLetter(this.token)) {
                this.isLetter();
            }
            if (Util.isDigit(this.token)) {
                this.isDigit();
            }
            if (!!~this.operators.indexOf(this.token)) {
                this.isOperatror();
            }
            if (!!~this.separators.indexOf(this.token)) {
                this.isSeparator();
            }
            this.analyse();
        }
    };
    Lexcer.prototype.isLetter = function () {
        while (Util.isDigit(this.token) || Util.isLetter(this.token)) {
            this.tokenStr += this.token;
            this.getToken();
        }
        this.retract();
        if (!!~this.keywords.indexOf(this.tokenStr)) {
            console.log("检测到关键词 : " + this.tokenStr);
        }
        else {
            console.log("检测到普通词 : " + this.tokenStr);
        }
        this.tokenStr = '';
    };
    Lexcer.prototype.isDigit = function () {
        while (Util.isDigit(this.token)) {
            this.tokenStr += this.token;
            this.getToken();
        }
        this.retract();
        console.log("检测到数字 : " + this.tokenStr);
    };
    Lexcer.prototype.isOperatror = function () {
        console.log("检测到操作符 : " + this.token);
    };
    Lexcer.prototype.isSeparator = function () {
        console.log("检测到分隔符 : " + this.token);
    };
    Lexcer.prototype.run = function () {
        this.analyse();
    };
    Lexcer.prototype.retract = function () {
        this.index -= 1;
        this.token = ' ';
    };
    Lexcer.prototype.setBuffer = function (str) {
        this.buffer = str;
        return this;
    };
    return Lexcer;
}());
var lexcer = new Lexcer;
lexcer
    .setBuffer(str)
    .run();
