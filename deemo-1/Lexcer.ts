const str = `package compile;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
public class TestLexer {
    // 关键词表
    private String keyWords[] = { "abstract", "boolean", "break", "byte",
            "case", "catch", "char", "class", "continue", "default", "do",
            "double", "else", "extends", "final", "finally", "float", "for",
            "if", "implements", "import", "instanceof", "int", "interface",
            "long", "native", "new", "package", "private", "protected",
            "public", "return", "short", "static", "super", "switch",
            "synchronized", "this", "throw", "throws", "transient", "try",
            "void", "volatile", "while", "strictfp","enum","goto","const","assert" , "FileNotFoundException"};

    // 运算符
    private Character operators[] = new  Character[] { '+', '-', '*', '/', '=', '>', '<', '&' };

    // 分隔符
    private String[] separators ={ ",", ";", "{", "}", "(", ")", "[", "]", "_", ":", "、", ".", "\\"" };

    // 当前处理的字符
    private char token ;

    // 拼接的语句串
    private String strToken = "";

    //用来存放读取的序号
    private int i  ;

    //存放读取的词法单元类型
    private int keyType ;

    private static String fileSrcName = "./src/input.txt" ;

    // 判断是否为字母
    private boolean isLetter(){
        return Character.isLetter( token );
    }

    // 判断是否是数字
    private boolean isDigit (){
        return Character.isDigit( token ) ;
    }

    private StringBuffer buffer = new StringBuffer(); // 缓冲区

    // 判断是否为关键字
    private boolean isKeyword(){
        return Arrays.asList( keyWords ).contains( strToken ) ;
    }

    // 判断是否为分隔符
    private boolean isSeparator (){
        return Arrays.asList( separators ).contains(token + "") ;
    }

    // 判断是否为运算符号
    private boolean isOperate(){
        return Arrays.asList( operators ).contains( token ) ;
    }

    // 监测字符是否为空格 , 不是则继续读取
    private void isSpace(){
        if( Character.isSpaceChar( token ) ){
            getToken();
            isSpace();
        }
    }

    private void  getToken(){
        token = buffer.charAt(i);
        i++;
    }

    // 链接token到strToken上
    public void concat() {
        strToken += token ;
    }
    public void retract() {
        i--;
        token = ' ';
    }

    public void analyse(){
        while ( i < buffer.length() ){
            getToken();
            isSpace();
            if( isLetter() ){
                // 当前读取的字符为字母或者是数字时则继续读取
                while (isLetter() || isDigit()) {
                    concat();
                    getToken();
                }
                // 读取到非数字或者字母的字符 ， 则回退到上一个字符
                // 例如 page+= 1 , 读取到 + 号之后 , 跳出循环 , 回退到原本字符e的位置
                retract() ;

                // 如果是关键字则进行关键字处理
                if (isKeyword()) {
                    System.out.println("读取到关键字 ---- " + strToken );
                } else {
                    System.out.println("读取到其他词 ---- " + strToken );
                }

                // 分析完一个词 , 则置空strToken ;
                strToken = "";
            }else if( isDigit() ){

                while (isDigit()) {
                    concat();
                    getToken();
                }

                System.out.println("读取到数字 ---- " + strToken );
                retract() ;
                strToken = "";
            }else if( isOperate() ){
                System.out.println("读取到操作符 ---- " + token );
            }else if( isSeparator() ){
                System.out.println("读取到分隔符 ---- " + token );
            }
        }
    }

    public void readFile() {
        try {
            FileReader fis = new FileReader(this.fileSrcName);

            BufferedReader br = new BufferedReader(fis);

            String temp = null;

            while ( ( temp = br.readLine() ) != null ){
                buffer.append( temp ) ;
            }

        }catch (FileNotFoundException e) {
            System.out.println("源文件未找到!" + e );
        }catch ( Exception e ){
            System.out.println("异常" + e);
        }
    }

    public static void main(String[] args) {
        TestLexer alr = new TestLexer() ;
        alr.readFile();
        alr.analyse();
    }
}`;
class Util {
	static isLetter( token : string) : boolean {
		return /[a-zA-Z\u4E00-\u9FFF]/g.test(token) ;
	};

	static isDigit( token : string ) : boolean {
		return /\d/g.test( token ) ;
	}
}

class Lexcer {

	private token : string = "" ;

	private tokenStr : string = "" ;

	private index : number = 0 ;

	private buffer : string ;

	private keywords : string[] = ["abstract", "boolean", "break", "byte",
		"case", "catch", "char", "class", "continue", "default", "do",
		"double", "else", "extends", "final", "finally", "float", "for",
		"if", "implements", "import", "instanceof", "int", "interface",
		"long", "native", "new", "package", "private", "protected",
		"public", "return", "short", "static", "super", "switch",
		"synchronized", "this", "throw", "throws", "transient", "try",
		"void", "volatile", "while", "strictfp","enum","goto","const","assert" , "FileNotFoundException"];
	private operators : string[] =  [ '+', '-', '*', '/', '=', '>', '<', '&' ];
	private separators : string[] = [ ",", ";", "{", "}", "(", ")", "[", "]", "_", ":", "、", ".", "\"" ];

	private getToken() : void{
		const token : string = this.buffer.charAt( this.index ) ;
		this.index += 1 ;
		this.token = token ;
	}

	private analyse() : void{
		if( this.index <= this.buffer.length ){
			this.getToken() ;
			if(Util.isLetter( this.token )){
				this.isLetter();
			}

			if(Util.isDigit( this.token )){
				this.isDigit() ;
			}

			if(!!~this.operators.indexOf( this.token ) ){
				this.isOperatror() ;
			}

			if(!!~this.separators.indexOf( this.token )){
				this.isSeparator() ;
			}

			this.analyse() ;
		}
	}

	private isLetter () : void{

		while (Util.isDigit(this.token) || Util.isLetter( this.token )){
			this.tokenStr += this.token ;
			this.getToken() ;
		}

		this.retract() ;


		if(!!~this.keywords.indexOf( this.tokenStr ) ){
			console.log("检测到关键词 : " + this.tokenStr ) ;
		}else{
			console.log("检测到普通词 : " + this.tokenStr ) ;
		}

		this.tokenStr = '' ;
	}

	private isDigit () : void{
		while ( Util.isDigit(this.token) ){
			this.tokenStr += this.token ;
			this.getToken() ;
		}

		this.retract() ;

		console.log("检测到数字 : " + this.tokenStr ) ;
	}

	private isOperatror () : void {
		console.log("检测到操作符 : " + this.token ) ;
	}

	private isSeparator () : void {
		console.log("检测到分隔符 : " + this.token ) ;
	}

	public run() : void {
		this.analyse() ;
	}

	private retract () : void {
		this.index -= 1 ;
		this.token = ' ';
	}

	public setBuffer( str : string )  : Lexcer {
		this.buffer = str ;
		return this ;
	}
}

const lexcer : Lexcer = new Lexcer
lexcer
	.setBuffer( str )
	.run() ;